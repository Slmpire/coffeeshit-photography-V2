import { NextResponse } from "next/server";
import { SendMailClient } from "zeptomail";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const reference = searchParams.get("reference");

        if (!reference) {
            return NextResponse.json({ error: "No reference provided" }, { status: 400 });
        }

        // Verify payment with Paystack
        const response = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        const data = await response.json();

        if (!data.status || data.data.status !== "success") {
            return NextResponse.json(
                { verified: false, message: "Payment not successful" },
                { status: 400 }
            );
        }

        const transaction = data.data;
        const bookingData = JSON.parse(transaction.metadata?.booking_data ?? "{}");
        const amountPaid = transaction.amount / 100;
        const customerName = `${bookingData.firstName} ${bookingData.lastName}`.trim();

        const BOOKING_LABELS: Record<string, string> = {
            wedding: "Wedding Photography",
            event: "Event Photography",
            studio: "Portrait / Studio Session",
        };

        const serviceName = BOOKING_LABELS[bookingData.bookingType] ?? "Photography Session";

        // Send emails via ZeptoMail
        
// Send emails via ZeptoMail (only if token is configured)
if (process.env.ZEPTOMAIL_TOKEN) {
    try {
        const client = new SendMailClient({
            url: "https://api.zeptomail.com/",
            token: `Zoho-enczapikey ${process.env.ZEPTOMAIL_TOKEN}`,
        });

        const from = {
            address: process.env.ZEPTOMAIL_FROM_EMAIL as string,
            name: "CoffeeShotIt Media",
        };

        await client.sendMail({
            from,
            to: [{ email_address: { address: bookingData.email, name: customerName } }],
            subject: `Your session with Coffee is confirmed 🎉`,
            htmlbody: `
                <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
                    <h2 style="color:#f59e0b;margin-bottom:8px;">You're booked, ${bookingData.firstName}!</h2>
                    <p style="color:#888;margin-bottom:24px;">Your deposit has been received and your session is confirmed.</p>
                    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
                        <tr><td style="padding:8px 0;color:#888;width:160px;">Service</td><td style="padding:8px 0;color:#f59e0b;font-weight:bold;">${serviceName}</td></tr>
                        <tr><td style="padding:8px 0;color:#888;">Deposit Paid</td><td style="padding:8px 0;color:#fff;">₦${amountPaid.toLocaleString()}</td></tr>
                        <tr><td style="padding:8px 0;color:#888;">Reference</td><td style="padding:8px 0;color:#fff;font-family:monospace;font-size:12px;">${reference}</td></tr>
                    </table>
                    <a href="https://wa.me/2348116273856" style="display:inline-block;padding:12px 24px;background:#25D366;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">
                        Message Coffee on WhatsApp
                    </a>
                </div>
            `,
        });

        await client.sendMail({
            from,
            to: [{ email_address: { address: process.env.ADMIN_EMAIL as string, name: "Coffee" } }],
            subject: `New booking: ${serviceName} — ${customerName}`,
            htmlbody: `
                <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
                    <h2 style="color:#f59e0b;margin-bottom:24px;">New Paid Booking 🎉</h2>
                    <table style="width:100%;border-collapse:collapse;">
                        <tr><td style="padding:8px 0;color:#888;width:160px;">Client</td><td style="padding:8px 0;color:#fff;">${customerName}</td></tr>
                        <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;color:#fff;">${bookingData.email}</td></tr>
                        <tr><td style="padding:8px 0;color:#888;">WhatsApp</td><td style="padding:8px 0;color:#fff;">${bookingData.phone}</td></tr>
                        <tr><td style="padding:8px 0;color:#888;">Service</td><td style="padding:8px 0;color:#f59e0b;font-weight:bold;">${serviceName}</td></tr>
                        <tr><td style="padding:8px 0;color:#888;">Deposit</td><td style="padding:8px 0;color:#4ade80;font-weight:bold;">₦${amountPaid.toLocaleString()} PAID</td></tr>
                        <tr><td style="padding:8px 0;color:#888;">Reference</td><td style="padding:8px 0;color:#fff;font-family:monospace;font-size:12px;">${reference}</td></tr>
                    </table>
                    <a href="https://wa.me/${bookingData.phone?.replace(/\D/g, "")}" style="display:inline-block;margin-top:24px;padding:12px 24px;background:#25D366;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">
                        Reply on WhatsApp
                    </a>
                </div>
            `,
        });
    } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Don't fail the whole verification if email fails
    }
}

return NextResponse.json({
    verified: true,
    customerName,
    serviceName,
    amountPaid,
    reference,
    email: bookingData.email,
});
    } catch (error) {
        console.error("Payment verification error:", error);
        return NextResponse.json(
            { error: "Verification failed" },
            { status: 500 }
        );
    }
}