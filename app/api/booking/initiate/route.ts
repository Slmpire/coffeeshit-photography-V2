import { NextResponse } from "next/server";

// Deposit amounts per booking type in kobo (₦ × 100)
const DEPOSITS: Record<string, number> = {
    wedding: 50000 * 100,  // ₦50,000
    event: 20000 * 100,    // ₦20,000
    studio: 15000 * 100,   // ₦15,000
};

const DEPOSIT_LABELS: Record<string, string> = {
    wedding: "Wedding Photography Deposit",
    event: "Event Photography Deposit",
    studio: "Portrait/Studio Session Deposit",
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, firstName, lastName, bookingType, ...rest } = body;

        const customerName = `${firstName} ${lastName}`.trim();
        const amount = DEPOSITS[bookingType] ?? 20000 * 100;
        const label = DEPOSIT_LABELS[bookingType] ?? "Photography Deposit";

        // Store booking data in metadata to retrieve after payment
        const metadata = {
            custom_fields: [
                { display_name: "Customer Name", variable_name: "customer_name", value: customerName },
                { display_name: "Booking Type", variable_name: "booking_type", value: bookingType },
                { display_name: "Phone", variable_name: "phone", value: rest.phone ?? "" },
            ],
            booking_data: JSON.stringify({ firstName, lastName, email, bookingType, ...rest }),
        };

        const response = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                amount,
                currency: "NGN",
                callback_url: `${process.env.SITE_URL}/booking/confirmation`,
                metadata,
                label,
                channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
            }),
        });

        const data = await response.json();

        if (!data.status) {
            throw new Error(data.message ?? "Paystack initialization failed");
        }

        return NextResponse.json({
            authorization_url: data.data.authorization_url,
            reference: data.data.reference,
        });
    } catch (error) {
        console.error("Payment initiation error:", error);
        return NextResponse.json(
            { error: "Failed to initiate payment" },
            { status: 500 }
        );
    }
}