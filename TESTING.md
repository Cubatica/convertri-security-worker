# Testing Security Headers

## Using Google CSP Evaluator

The [CSP Evaluator](https://csp-evaluator.withgoogle.com/) tool can check your Content Security Policy, but it needs the CSP header to be present in the HTTP response.

### If you see "Cannot fetch CSP headers!"

This means the tool cannot find the CSP header in the response. Common causes:

1. **Worker not deployed** - The worker needs to be deployed to Cloudflare
2. **Route not configured** - The worker must be attached to the domain route
3. **Worker not active** - Check that the worker is running and intercepting requests

## How to Verify Headers Are Present

### Method 1: Browser DevTools

1. Open your site: `https://article.wheelofcharlotte.com/auto-lander-gg2`
2. Open Browser DevTools (F12)
3. Go to **Network** tab
4. Refresh the page
5. Click on the main document request
6. Go to **Headers** tab
7. Look for **Response Headers** and verify:
   - `Content-Security-Policy` is present
   - `Strict-Transport-Security` is present
   - `X-Frame-Options` is present
   - `X-Content-Type-Options` is present

### Method 2: Command Line (curl)

```bash
curl -I https://article.wheelofcharlotte.com/auto-lander-gg2
```

Look for the security headers in the response.

### Method 3: Online Header Checkers

- **SecurityHeaders.com**: https://securityheaders.com/?q=https://article.wheelofcharlotte.com/auto-lander-gg2
- **Sucuri SiteCheck**: https://sitecheck.sucuri.net/results/https/article.wheelofcharlotte.com/auto-lander-gg2

### Method 4: Manual CSP Testing

If the CSP Evaluator can't fetch headers automatically:

1. Copy your CSP policy from the worker code:
   ```
   default-src 'self' https: data:; script-src 'self' https: blob: 'unsafe-inline' 'unsafe-eval'; style-src 'self' https: 'unsafe-inline'; img-src 'self' https: data: blob:; font-src 'self' https: data:; connect-src 'self' https:; object-src 'none'; base-uri 'self'; frame-src 'self' https:; frame-ancestors 'none';
   ```

2. Paste it directly into the CSP Evaluator tool
3. The tool will analyze the policy and show warnings/errors

## Current CSP Policy

Your current CSP (from worker.js):
```
default-src 'self' https: data:; 
script-src 'self' https: blob: 'unsafe-inline' 'unsafe-eval'; 
style-src 'self' https: 'unsafe-inline'; 
img-src 'self' https: data: blob:; 
font-src 'self' https: data:; 
connect-src 'self' https:; 
object-src 'none'; 
base-uri 'self'; 
frame-src 'self' https:; 
frame-ancestors 'none';
```

## Troubleshooting

### Headers Not Appearing

1. **Check worker deployment**:
   ```bash
   npx wrangler deployments list
   ```

2. **Verify route configuration**:
   - Go to Cloudflare Dashboard → Workers & Pages → Your Worker → Settings → Triggers
   - Ensure route `article.wheelofcharlotte.com/*` is configured

3. **Check worker logs**:
   - Go to Cloudflare Dashboard → Workers & Pages → Your Worker → Logs
   - Look for any errors

4. **Test worker locally**:
   ```bash
   npx wrangler dev
   ```

### CSP Evaluator Still Can't Fetch

If headers are present but CSP Evaluator still can't fetch them:

1. The tool may have CORS restrictions
2. Try using the manual input method (paste CSP directly)
3. Use alternative tools like SecurityHeaders.com
4. Check browser console for any errors

## Expected CSP Evaluator Warnings

When you paste your CSP into the evaluator, you may see warnings about:
- `'unsafe-inline'` in script-src (needed for Convertri)
- `'unsafe-eval'` in script-src (needed for Convertri)
- `'unsafe-inline'` in style-src (needed for Convertri)

These are acceptable trade-offs for Convertri compatibility while still maintaining the security headers that Sucuri checks for.

