import { NextResponse } from 'next/server';
import { render } from '@react-email/components';
import { SendMailClient } from 'zeptomail';
import { ContactNotification } from '@/emails/contact-notification';

export async function POST(request: Request)
{
    try {
        const url = "https://api.zeptomail.com/";
        const token = `Zoho-enczapikey ${process.env.ZEPTOMAIL_TOKEN}`;
        const client = new SendMailClient({ url, token });

        const formData = await request.json();

        const {
            firstName,
            lastName,
            email,
            phone,
            instagram,
            message,
        } = formData;

        const customerName = `${firstName} ${lastName}`.trim();

        console.log("Processing contact form:", {
            customerName,
            email,
            message: message.substring(0, 100) + '...'
        });

        // Render the admin notification email template
        const adminEmailHtml = await render(
            await ContactNotification({
                customerName,
                customerEmail: email,
                phone,
                instagram,
                message,
            })
        );

        // Send notification email to admin
        await client.sendMail({
            from: {
                address: process.env.ZEPTOMAIL_FROM_EMAIL as string,
                name: 'Coffeeshotit Media Service'
            },
            to: [
                {
                    email_address: {
                        address: process.env.ADMIN_EMAIL as string,
                        name: 'Coffeeshotit Admin'
                    }
                }
            ],
            subject: `New Contact Form Submission: ${customerName}`,
            htmlbody: adminEmailHtml,
            track_opens: true,
            track_clicks: true,
            mime_headers: {
                'X-Mailer': 'Coffeeshotit Portfolio Website'
            }
        });

        return NextResponse.json({
            message: 'Contact form submitted successfully'
        });
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            { error: 'Failed to process contact form' },
            { status: 500 }
        );
    }
}
