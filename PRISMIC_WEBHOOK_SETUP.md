# Prismic Webhook Setup for Automatic Content Updates

## Overview
This setup ensures that your website automatically updates when content changes in Prismic CMS.

## Webhook Configuration

### 1. Prismic Webhook Setup
1. Go to your Prismic repository settings
2. Navigate to "Webhooks" section
3. Add a new webhook with the following details:
   - **URL**: `https://your-domain.com/api/revalidate`
   - **Secret**: (optional but recommended for security)
   - **Events**: Select "Content updates"

### 2. Environment Variables
Add the following to your `.env.local` file:
```env
PRISMIC_WEBHOOK_SECRET=your_webhook_secret_here
```

### 3. How It Works
- When content is updated in Prismic, it sends a webhook to `/api/revalidate`
- The webhook handler revalidates the homepage and specific content types
- The page will automatically update with new content within 60 seconds

### 4. Manual Revalidation
You can also manually trigger revalidation by making a POST request to:
```
POST /api/revalidate
```

### 5. Testing
To test if the webhook is working:
1. Update slider content in Prismic
2. Check the webhook logs in your hosting platform
3. The homepage should update within 60 seconds

## Troubleshooting

### Webhook Not Working
1. Check if the webhook URL is accessible from Prismic
2. Verify the webhook secret matches
3. Check server logs for any errors

### Content Not Updating
1. Ensure the page is not using `dynamic = "force-dynamic"`
2. Check if the revalidation time is set correctly
3. Verify the webhook is being triggered

### Performance
- The page uses ISR with 60-second revalidation
- This provides a good balance between freshness and performance
- You can adjust the revalidation time in `app/page.tsx`
