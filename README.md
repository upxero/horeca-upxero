# Upxero Website

Professional B2B website for Upxero - commission-free online ordering solution for Belgian horeca businesses.

## Tech Stack

- **Frontend**: React 19, Tailwind CSS, Shadcn UI
- **Functions**: Netlify Functions (Node.js)
- **Email**: Resend API

## Deployment

### Prerequisites

1. Netlify account
2. Resend account with verified domain `upxero.com`
3. Custom domain `www.upxero.com` configured in Netlify

### Environment Variables

Set in Netlify dashboard:

```
RESEND_API_KEY=your_resend_api_key
```

### Deploy to Netlify

1. Connect repository to Netlify
2. Build settings are configured in `netlify.toml`
3. Set environment variable `RESEND_API_KEY`
4. Deploy

### Local Development

```bash
# Install dependencies
cd frontend && yarn install
cd .. && yarn install

# Run locally with Netlify CLI
netlify dev
```

## Structure

```
repo-root/
├─ frontend/              # React application
│  ├─ src/
│  └─ public/
├─ netlify/
│  └─ functions/
│     └─ contact.js      # Email sending function
├─ netlify.toml          # Netlify configuration
└─ package.json          # Root dependencies
```

## Email Configuration

Contact form submissions are sent via Netlify Function to:
- **From**: no-reply@upxero.com
- **To**: info@upxero.com
- **Reply-To**: User's email

## Domain Setup

Website is configured for: `https://www.upxero.com`

No code changes needed when deploying to custom domain.

## License

Proprietary
