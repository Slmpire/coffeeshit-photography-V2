import { NextResponse } from "next/server";
import { SendMailClient } from "zeptomail";

const WEDDING_PACKAGES: Record<string, string> = {
    w1: "Package One",
    w1plus: "Package One Plus",
    w2: "Package Two",
    w2plus: "Package Two Plus",
    w3: "Package Three — Deluxe",
};

const EVENT_PACKAGES: Record<string, string> = {
    "cs-basic": "CoffeeShoot Basic",
    "cs-premium": "CoffeeShoot Premium",
    "day-basic": "Day's Event Basic",
    "day-standard": "Day's Event Standard",
    "day-premium": "Day's Event Premium",
    "day-luxury": "Day's Event Luxury",
};

const STUDIO_PACKAGES: Record<string, string> = {
    "studio-1": "Studio Package One",
    "studio-2": "Studio Package Two",
    "outdoor-1": "Outdoor Package One",
    "outdoor-2": "Outdoor Package Two",
};

const EXTRAS: Record<string, string> = {
    "extra-hour": "Extra Hour (₦31,250)",
    "extra-outfit": "Extra Outfit Change (₦43,750)",
    "content-creator": "Content Creator Add-on (₦100,000)",
};

const CONTENT_PACKAGES: Record<string, string> = {
    c1: "1 Reel (₦150,000)",
    c2: "Reels Package (₦187,500)",
    c3: "3 Reels (₦237,500)",
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            firstName,
            lastName,
            email,
            phone,
            instagram,
            message,
            bookingType,
            weddingPackage,
            weddingEvents,
            weddingDate,
            eventPackage,
            eventDate,
            studioPackage,
            sessionDate,
            extras,
            contentPackage,
            totalPrice,
        } = body;

        const customerName = `${firstName} ${lastName}`.trim();

        // Build package summary
        let packageSummary = "";
        if (bookingType === "wedding") {
            packageSummary = WEDDING_PACKAGES[weddingPackage] ?? weddingPackage;
            packageSummary += ` (${weddingEvents === "one" ? "1 Event" : "2 Events"})`;
            if (weddingDate) packageSummary += ` — Date: ${weddingDate}`;
        } else if (bookingType === "event") {
            packageSummary = EVENT_PACKAGES[eventPackage] ?? eventPackage;
            if (eventDate) packageSummary += ` — Date: ${eventDate}`;
            if (contentPackage) packageSummary += ` + ${CONTENT_PACKAGES[contentPackage]}`;
        } else if (bookingType === "studio") {
            packageSummary = STUDIO_PACKAGES[studioPackage] ?? studioPackage;
            if (sessionDate) packageSummary += ` — Date: ${sessionDate}`;
            if (extras?.length > 0) {
                packageSummary += ` + ${extras.map((e: string) => EXTRAS[e]).join(", ")}`;
            }
        }

        const formattedTotal = totalPrice
            ? `₦${Number(totalPrice).toLocaleString()}`
            : "To be confirmed";

        // Send emails if ZeptoMail is configured
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

                // Notify Coffee
                await client.sendMail({
                    from,
                    to: [{ email_address: { address: process.env.ADMIN_EMAIL as string, name: "Coffee" } }],
                    subject: `New Booking Request — ${customerName} (${bookingType})`,
                    htmlbody: `
                        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
                            <h2 style="color:#f59e0b;margin-bottom:24px;">New Booking Request 📸</h2>
                            <table style="width:100%;border-collapse:collapse;">
                                <tr><td style="padding:8px 0;color:#888;width:160px;">Client</td><td style="padding:8px 0;color:#fff;font-weight:bold;">${customerName}</td></tr>
                                <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;color:#fff;">${email}</td></tr>
                                <tr><td style="padding:8px 0;color:#888;">WhatsApp</td><td style="padding:8px 0;color:#fff;">${phone}</td></tr>
                                ${instagram ? `<tr><td style="padding:8px 0;color:#888;">Instagram</td><td style="padding:8px 0;color:#fff;">${instagram}</td></tr>` : ""}
                                <tr><td style="padding:8px 0;color:#888;">Session Type</td><td style="padding:8px 0;color:#f59e0b;font-weight:bold;">${bookingType?.toUpperCase()}</td></tr>
                                <tr><td style="padding:8px 0;color:#888;">Package</td><td style="padding:8px 0;color:#fff;">${packageSummary}</td></tr>
                                <tr><td style="padding:8px 0;color:#888;">Estimated Total</td><td style="padding:8px 0;color:#4ade80;font-weight:bold;">${formattedTotal}</td></tr>
                                ${message ? `<tr><td style="padding:8px 0;color:#888;vertical-align:top;">Notes</td><td style="padding:8px 0;color:#fff;">${message}</td></tr>` : ""}
                            </table>
                            <a href="https://wa.me/${phone?.replace(/\D/g, "")}" style="display:inline-block;margin-top:24px;padding:12px 24px;background:#25D366;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">
                                Reply on WhatsApp
                            </a>
                            <a href="mailto:${email}" style="display:inline-block;margin-top:24px;margin-left:12px;padding:12px 24px;background:#f59e0b;color:#000;text-decoration:none;border-radius:8px;font-weight:bold;">
                                Reply by Email
                            </a>
                        </div>
                    `,
                });

                // Auto-reply to client
                await client.sendMail({
                    from,
                    to: [{ email_address: { address: email, name: customerName } }],
                    subject: "Coffee got your booking request 📸",
                    htmlbody: `
                        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
                            <h2 style="color:#f59e0b;margin-bottom:8px;">Hey ${firstName}!</h2>
                            <p style="color:#888;margin-bottom:24px;">Thanks for reaching out to CoffeeShotIt.</p>
                            <p style="color:#fff;line-height:1.6;">Your booking request for <strong style="color:#f59e0b;">${packageSummary}</strong> has been received.</p>
                            <p style="color:#fff;line-height:1.6;margin-top:16px;">Coffee will be in touch within <strong>24 hours</strong> to confirm your date, discuss the details, and arrange payment.</p>

                            <div style="background:#1a1a1a;border-radius:8px;padding:16px;margin:24px 0;">
                                <p style="color:#888;font-size:12px;margin:0 0 8px;">Your request summary:</p>
                                <p style="color:#f59e0b;font-weight:bold;margin:4px 0;">${packageSummary}</p>
                                <p style="color:#4ade80;font-size:13px;margin:4px 0;">Estimated: ${formattedTotal}</p>
                            </div>

                            <p style="color:#fff;line-height:1.6;">For urgent enquiries, message Coffee directly:</p>
                            <a href="https://wa.me/2348116273856" style="display:inline-block;margin-top:12px;padding:12px 24px;background:#25D366;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">
                                Message on WhatsApp
                            </a>
                            <p style="color:#444;font-size:11px;margin-top:32px;border-top:1px solid #222;padding-top:16px;">
                                CoffeeShotIt Media · Lagos, Nigeria · hello@coffeeshotit.org
                            </p>
                        </div>
                    `,
                });
            } catch (emailError: any) {
                console.error("Email error:", emailError?.message ?? emailError);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Booking error:", error);
        return NextResponse.json({ error: "Failed to submit booking" }, { status: 500 });
    }
}