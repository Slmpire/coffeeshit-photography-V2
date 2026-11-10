# Email Setup Guide

## Required Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# ZeptoMail Configuration
ZEPTOMAIL_TOKEN=your_zeptomail_token_here
ZEPTOMAIL_FROM_EMAIL=your_verified_email@domain.com

# Admin Email for Notifications
ADMIN_EMAIL=coffeeshotit@gmail.com
```

## Setup Instructions

1. **Get ZeptoMail Token:**
   - Sign up at [ZeptoMail](https://zeptomail.com)
   - Create an API token in your dashboard
   - Copy the token to `ZEPTOMAIL_TOKEN`

2. **Verify Email Domain:**
   - Add and verify your domain in ZeptoMail
   - Use a verified email address for `ZEPTOMAIL_FROM_EMAIL`

3. **Set Admin Email:**
   - Set `ADMIN_EMAIL` to the email where you want to receive booking and contact notifications

## Features

### Booking Form
- Sends confirmation email to customer with WhatsApp contact info
- Sends detailed notification to admin with all booking details
- Supports Wedding, Event, and Studio/Outdoor session types
- Includes all form fields in admin notification

### Contact Form
- Sends notification to admin with contact details
- Includes customer name, email, phone, Instagram, and message
- Shows success message to user after submission

## Email Templates

The email templates are located in the `emails/` directory:
- `booking-confirmation.tsx` - Customer confirmation email
- `admin-booking-notification.tsx` - Admin booking notification
- `contact-notification.tsx` - Admin contact form notification

All templates use react-email components and are styled consistently.
