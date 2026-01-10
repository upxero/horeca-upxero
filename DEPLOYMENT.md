# Deployment Guide

## Netlify Setup

### 1. Environment Variables

Set in Netlify Dashboard (Site settings > Environment variables):

```
RESEND_API_KEY=your_resend_api_key_here
```

### 2. Build Settings

These are configured in `netlify.toml`:

- **Base directory**: `frontend`
- **Build command**: `yarn build`
- **Publish directory**: `frontend/build`
- **Functions directory**: `netlify/functions`

### 3. Domain Configuration

- Add custom domain: `www.upxero.com`
- Configure DNS:
  - CNAME record: `www` → `upxero.netlify.app`
  - Netlify handles SSL automatically

### 4. Deploy

```bash
# Option 1: Git push (recommended)
git push origin main

# Option 2: Netlify CLI
netlify deploy --prod
```

## Testing

### Test Netlify Function

```bash
# Direct function call
curl -X POST https://upxero.netlify.app/.netlify/functions/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+32123456789",
    "business": "Test Restaurant",
    "planInterest": "grow",
    "message": "Test message"
  }'
```

### Expected Response

```json
{
  "success": true,
  "message": "Demo aanvraag succesvol verzonden",
  "id": "email-id-from-resend"
}
```

## Troubleshooting

### CORS Errors

The function includes CORS headers:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: POST, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type`

### Function Not Found

Check:
1. Functions directory is `netlify/functions`
2. File is named `contact.js`
3. Function is properly exported

### Email Not Sending

Check:
1. `RESEND_API_KEY` is set in Netlify
2. Domain `upxero.com` is verified in Resend
3. Sender email `no-reply@upxero.com` uses verified domain
4. Check Netlify function logs

### Blank Response

The function now:
- Handles OPTIONS preflight
- Returns proper JSON with headers
- Includes error details in response

## Resend Configuration

Required in Resend Dashboard:

1. Verify domain: `upxero.com`
2. Add DNS records provided by Resend
3. Sender email must use verified domain: `no-reply@upxero.com`

## Contact Form Path

The contact form submits to:
```
/.netlify/functions/contact
```

This is a relative path that works on:
- `https://upxero.netlify.app`
- `https://www.upxero.com`

No hardcoded URLs needed.
