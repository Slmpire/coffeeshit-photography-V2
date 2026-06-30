import { NextResponse } from 'next/server';
import { render } from '@react-email/components';
import { SendMailClient } from 'zeptomail';
import { BookingConfirmationEmail } from '@/emails/booking-confirmation';
import { AdminBookingNotification } from '@/emails/admin-booking-notification';

export async function POST(request: Request)
{
    try {
        const url = "https://api.zeptomail.com/";
        const token = `Zoho-enczapikey ${process.env.ZEPTOMAIL_TOKEN}`;
        const client = new SendMailClient({ url, token });

        const formData = await request.json();

        // Extract form data based on booking type
        const {
            firstName,
            lastName,
            email,
            phone,
            instagram,
            bookingType,
            // Wedding specific fields
            weddingDate,
            receptionDate,
            weddingLocation,
            receptionLocation,
            aboutWedding,
            aboutCouple,
            whyUs,
            // Event specific fields
            eventType,
            eventDate,
            eventTime,
            eventLocation,
            aboutEvent,
            aboutYou,
            // Studio specific fields
            sessionType,
            sessionDate,
        } = formData;

        const customerName = `${firstName} ${lastName}`.trim();

        // Determine service name and additional details based on booking type
        let serviceName = '';
        let bookingDate = '';
        let bookingTime = '';
        let location = '';
        let additionalNotes = '';

        switch (bookingType) {
            case 'wedding':
                serviceName = 'Wedding Photography';
                bookingDate = weddingDate;
                bookingTime = 'Full Day';
                location = `${weddingLocation}${receptionLocation ? ` / ${receptionLocation}` : ''}`;
                additionalNotes = `Wedding Details: ${aboutWedding}\n\nAbout Couple: ${aboutCouple}\n\nWhy Choose Us: ${whyUs}`;
                break;
            case 'event':
                serviceName = 'Event Photography';
                bookingDate = eventDate;
                bookingTime = eventTime;
                location = eventLocation;
                additionalNotes = `Event Details: ${aboutEvent}\n\nAbout Group: ${aboutYou}\n\nWhy Choose Us: ${whyUs}`;
                break;
            case 'studio':
                serviceName = 'Studio/Outdoor Session';
                bookingDate = sessionDate;
                bookingTime = 'Session';
                location = 'Studio/Outdoor';
                additionalNotes = `Session Type: ${sessionType}`;
                break;
            default:
                serviceName = 'Photography Service';
                bookingDate = 'TBD';
                bookingTime = 'TBD';
        }

        // Format the date if it exists
        const formattedDate = bookingDate ? new Date(bookingDate).toISOString().split('T')[ 0 ] : 'TBD';
        const formattedTime = bookingTime || 'TBD';

        console.log("Processing booking:", {
            customerName,
            serviceName,
            bookingType,
            formattedDate,
            formattedTime
        });

        // Render the customer confirmation email template
        const customerEmailHtml = await render(
            await BookingConfirmationEmail({
                customerName,
                serviceName,
                bookingDate: formattedDate,
                bookingTime: formattedTime,
                additionalNotes,
            })
        );

        // Render the admin notification email template
        const adminEmailHtml = await render(
            await AdminBookingNotification({
                customerName,
                customerEmail: email,
                serviceName,
                bookingDate: formattedDate,
                bookingTime: formattedTime,
                additionalNotes,
                bookingType,
                eventType,
                sessionType,
                phone,
                instagram,
                location,
            })
        );

        // Send confirmation email to customer
        await client.sendMail({
            from: {
                address: process.env.ZEPTOMAIL_FROM_EMAIL as string,
                name: 'Coffeeshotit Media Service'
            },
            to: [
                {
                    email_address: {
                        address: email,
                        name: customerName
                    }
                }
            ],
            subject: 'Booking Confirmation - Coffeeshotit Media Service',
            htmlbody: customerEmailHtml,
            track_opens: true,
            track_clicks: true,
            mime_headers: {
                'X-Mailer': 'Coffeeshotit Portfolio Website'
            }
        });

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
            subject: `New Booking: ${customerName} - ${serviceName}`,
            htmlbody: adminEmailHtml,
            track_opens: true,
            track_clicks: true,
            mime_headers: {
                'X-Mailer': 'Coffeeshotit Portfolio Website'
            }
        });

        return NextResponse.json({
            message: 'Booking submitted successfully'
        });
    } catch (error) {
        console.error('Error processing booking:', error);
        return NextResponse.json(
            { error: 'Failed to process booking' },
            { status: 500 }
        );
    }
}
