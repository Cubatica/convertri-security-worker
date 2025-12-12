# How to Deploy to Cloudflare Workers

## Prerequisites
1. A Cloudflare account (sign up at https://dash.cloudflare.com/sign-up)
2. Node.js installed (v18 or higher recommended)
3. npm or yarn package manager

## Step-by-Step Deployment

### Method 1: Using npx (Recommended - No Installation Required)

1. **Login to Cloudflare** (first time only):
   ```bash
   npx wrangler login
   ```
   This will open your browser to authenticate with Cloudflare.

2. **Deploy the worker**:
   ```bash
   npx wrangler deploy
   ```

### Method 2: Install Wrangler Locally

1. **Install Wrangler as a dev dependency**:
   ```bash
   npm install
   ```

2. **Login to Cloudflare** (first time only):
   ```bash
   npm run deploy
   # or
   npx wrangler login
   ```

3. **Deploy the worker**:
   ```bash
   npm run deploy
   # or
   npx wrangler deploy
   ```

### Method 3: Install Wrangler Globally

1. **Install Wrangler globally**:
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```

3. **Deploy the worker**:
   ```bash
   wrangler deploy
   ```

## After Deployment

Once deployed, your worker will be available at:
- `https://convertri-security-worker.YOUR_SUBDOMAIN.workers.dev`

## Configuration Options

### Deploy to a Custom Domain

Edit `wrangler.toml` and add routes:

```toml
routes = [
  { pattern = "example.com/*", zone_name = "example.com" }
]
```

### Deploy to workers.dev subdomain

The `workers_dev = true` option is already enabled in your `wrangler.toml`, which allows deployment to a workers.dev subdomain.

## Troubleshooting

- **Authentication issues**: Run `wrangler login` again
- **Deployment errors**: Check that your Cloudflare account has Workers enabled
- **Module errors**: Ensure Node.js version is 18+ (check with `node --version`)

