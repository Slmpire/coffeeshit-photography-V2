import { NextResponse } from "next/server";
import { SendMailClient } from "zeptomail";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, whatsapp, service, message } = body;
        const customerName = `${firstName} ${lastName}`.trim();

        const client = new SendMailClient({
            url: "https://api.zeptomail.com/",
            token: `Zoho-enczapikey ${process.env.ZEPTOMAIL_TOKEN}`,
        });

        const from = {
            address: process.env.ZEPTOMAIL_FROM_EMAIL as string,
            name: "CoffeeShotIt Media",
        };

        // 1. Notify admin
        await client.sendMail({
            from,
            to: [
                {
                    email_address: {
                        address: process.env.ADMIN_EMAIL as string,
                        name: "Coffee",
                    },
                },
            ],
            subject: `New enquiry from ${customerName} — ${service}`,
            htmlbody: `
                <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
                    <h2 style="color:#f59e0b;margin-bottom:24px;">New Enquiry</h2>
                    <table style="width:100%;border-collapse:collapse;">
                        <tr><td style="padding:8px 0;color:#888;width:140px;">Name</td><td style="padding:8px 0;color:#fff;">${customerName}</td></tr>
                        <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;color:#fff;">${email}</td></tr>
                        <tr><td style="padding:8px 0;color:#888;">WhatsApp</td><td style="padding:8px 0;color:#fff;">${whatsapp}</td></tr>
                        <tr><td style="padding:8px 0;color:#888;">Service</td><td style="padding:8px 0;color:#f59e0b;">${service}</td></tr>
                        <tr><td style="padding:8px 0;color:#888;vertical-align:top;">Message</td><td style="padding:8px 0;color:#fff;">${message}</td></tr>
                    </table>
                    <a href="https://wa.me/${whatsapp?.replace(/\D/g, "")}" style="display:inline-block;margin-top:24px;padding:12px 24px;background:#25D366;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">Reply on WhatsApp</a>
                </div>
            `,
        });

        // 2. Auto-reply to client
        await client.sendMail({
            from,
            to: [
                {
                    email_address: {
                        address: email,
                        name: customerName,
                    },
                },
            ],
            subject: "Coffee got your message 📸",
            htmlbody: `
                <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
                    <h2 style="color:#f59e0b;margin-bottom:8px;">Hey ${firstName}!</h2>
                    <p style="color:#888;margin-bottom:24px;">Thanks for reaching out to CoffeeShotIt.</p>
                    <p style="color:#fff;line-height:1.6;">I've received your message about <strong style="color:#f59e0b;">${service}</strong> and will get back to you within 24 hours.</p>
                    <p style="color:#fff;line-height:1.6;margin-top:16px;">For urgent enquiries, you can reach me directly on WhatsApp:</p>
                    <a href="https://wa.me/2348116273856" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#25D366;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">Message on WhatsApp</a>
                    <p style="color:#444;font-size:12px;margin-top:32px;border-top:1px solid #222;padding-top:16px;">CoffeeShotIt Media · Lagos, Nigeria</p>
                </div>
            `,
        });

        return NextResponse.json({ message: "Sent successfully" });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}