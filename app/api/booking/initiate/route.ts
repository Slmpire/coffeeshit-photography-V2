import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            email,
            firstName,
            lastName,
            bookingType,
            depositAmount,
            totalPrice,
            weddingPackage,
            eventPackage,
            studioPackage,
            weddingEvents,
            extras,
            contentPackage,
            ...rest
        } = body;

        const customerName = `${firstName} ${lastName}`.trim();

        // Use deposit from form, fallback to 20% of total
        const amount = depositAmount
            ? depositAmount * 100
            : Math.round((totalPrice ?? 50000) * 0.2) * 100;

        const BOOKING_LABELS: Record<string, string> = {
            wedding: "Wedding Photography",
            event: "Event Photography",
            studio: "Portrait / Studio Session",
        };

        const label = BOOKING_LABELS[bookingType] ?? "Photography Session";

        const metadata = {
            custom_fields: [
                { display_name: "Customer Name", variable_name: "customer_name", value: customerName },
                { display_name: "Booking Type", variable_name: "booking_type", value: bookingType },
                { display_name: "Phone", variable_name: "phone", value: rest.phone ?? "" },
                { display_name: "Total Price", variable_name: "total_price", value: `₦${(totalPrice ?? 0).toLocaleString()}` },
            ],
            booking_data: JSON.stringify({
                firstName,
                lastName,
                email,
                bookingType,
                weddingPackage,
                eventPackage,
                studioPackage,
                weddingEvents,
                extras,
                contentPackage,
                totalPrice,
                depositAmount,
                ...rest,
            }),
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
                callback_url: `${process.env.SITE_URL ?? "http://localhost:3000"}/booking/confirmation`,
                metadata,
                label,
                channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
            }),
        });

        const data = await response.json();
        console.log("Paystack response:", JSON.stringify(data, null, 2));

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