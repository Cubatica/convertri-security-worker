# Setup Instructions for Security Headers Worker

## Prerequisites

Before deploying this worker, ensure:

1. **Domain is on Cloudflare**: The domain `wheelofcharlotte.com` must be added to your Cloudflare account
2. **DNS is managed by Cloudflare**: The domain's nameservers should point to Cloudflare
3. **Cloudflare account**: You need an active Cloudflare account with Workers enabled

## Deployment Steps

### 1. Deploy the Worker

```bash
npx wrangler login
npx wrangler deploy
```

### 2. Configure the Route in Cloudflare Dashboard

After deployment, you need to attach the worker to your domain:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your account
3. Go to **Workers & Pages**
4. Click on your worker: `convertri-security-worker`
5. Go to **Settings** → **Triggers**
6. Under **Routes**, add:
   - **Route**: `article.wheelofcharlotte.com/*`
   - **Zone**: `wheelofcharlotte.com`
7. Click **Add route**

### Alternative: Configure via wrangler.toml

The `wrangler.toml` file is already configured with the route. After deploying, the route should be automatically configured if:
- The domain is in your Cloudflare account
- You have the correct permissions

## Verification

After deployment and route configuration:

1. Visit: https://article.wheelofcharlotte.com/auto-lander-gg2
2. Check the response headers using browser DevTools (Network tab)
3. Verify headers are present:
   - `Strict-Transport-Security`
   - `Content-Security-Policy`
   - `X-Frame-Options`
   - `X-Content-Type-Options`

4. Re-run Sucuri scan: https://sitecheck.sucuri.net/results/https/article.wheelofcharlotte.com/auto-lander-gg2

## Troubleshooting

### Headers Still Missing

If headers are still missing after deployment:

1. **Check route configuration**: Ensure the route is properly configured in Cloudflare Dashboard
2. **Verify domain is on Cloudflare**: The domain must be added to Cloudflare
3. **Check worker is active**: Go to Workers & Pages → Your Worker → Check deployment status
4. **Clear cache**: Cloudflare may cache responses - wait a few minutes or purge cache
5. **Verify DNS**: Ensure `article.wheelofcharlotte.com` DNS is pointing to Cloudflare

### Worker Not Intercepting Requests

- Ensure the route pattern matches: `article.wheelofcharlotte.com/*`
- Check that the zone name matches: `wheelofcharlotte.com`
- Verify the worker is deployed to the correct Cloudflare account

## Testing Locally

You can test the worker locally before deploying:

```bash
npx wrangler dev
```

This will start a local development server where you can test the worker functionality.

