import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Text,
    Section,
    Hr,
    Link,
} from "@react-email/components";
import * as React from "react";

interface AdminBookingNotificationProps {
    customerName: string;
    customerEmail: string;
    serviceName: string;
    bookingDate: string;
    bookingTime: string;
    additionalNotes?: string;
    bookingType?: string;
    eventType?: string;
    sessionType?: string;
    phone?: string;
    instagram?: string;
    location?: string;
}

export const AdminBookingNotification: React.FC<
    AdminBookingNotificationProps
> = ({
    customerName,
    customerEmail,
    serviceName,
    bookingDate,
    bookingTime,
    additionalNotes,
    bookingType,
    eventType,
    sessionType,
    phone,
    instagram,
    location,
}) => {
    return (
        <Html>
            <Head />
            <Preview>
                New Booking: {customerName} - {serviceName}
            </Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Text style={headerText}>Coffeeshotit Media</Text>
                        <Text style={headerSubtext}>
                            Professional Photography & Videography
                        </Text>
                    </Section>

                    <Section style={contentCard}>
                        <Heading style={h1}>New Booking Received</Heading>

                        <Text style={introText}>
                            A new booking has been submitted through your
                            website. Please review the details below and take
                            appropriate action.
                        </Text>

                        <Section style={priorityCard}>
                            <Text style={priorityText}>
                                ⚡ High Priority - Contact Required Within 1
                                Hour
                            </Text>
                        </Section>

                        <Section style={section}>
                            <Text style={sectionTitle}>
                                Customer Information
                            </Text>
                            <Section style={detailCard}>
                                <Text style={detailLabel}>Full Name</Text>
                                <Text style={detailValue}>{customerName}</Text>

                                <Text style={detailLabel}>Email Address</Text>
                                <Text style={detailValue}>
                                    <Link
                                        href={`mailto:${customerEmail}`}
                                        style={emailLink}
                                    >
                                        {customerEmail}
                                    </Link>
                                </Text>

                                {phone && (
                                    <>
                                        <Text style={detailLabel}>
                                            Phone Number
                                        </Text>
                                        <Text style={detailValue}>
                                            <Link
                                                href={`tel:${phone}`}
                                                style={phoneLink}
                                            >
                                                {phone}
                                            </Link>
                                        </Text>
                                    </>
                                )}

                                {instagram && (
                                    <>
                                        <Text style={detailLabel}>
                                            Instagram Handle
                                        </Text>
                                        <Text style={detailValue}>
                                            @{instagram.replace("@", "")}
                                        </Text>
                                    </>
                                )}
                            </Section>
                        </Section>

                        <Section style={section}>
                            <Text style={sectionTitle}>Booking Details</Text>
                            <Section style={detailCard}>
                                <Text style={detailLabel}>
                                    Service Requested
                                </Text>
                                <Text style={detailValue}>{serviceName}</Text>

                                {bookingType && (
                                    <>
                                        <Text style={detailLabel}>
                                            Booking Type
                                        </Text>
                                        <Text style={detailValue}>
                                            {bookingType}
                                        </Text>
                                    </>
                                )}

                                {eventType && (
                                    <>
                                        <Text style={detailLabel}>
                                            Event Type
                                        </Text>
                                        <Text style={detailValue}>
                                            {eventType}
                                        </Text>
                                    </>
                                )}

                                {sessionType && (
                                    <>
                                        <Text style={detailLabel}>
                                            Session Type
                                        </Text>
                                        <Text style={detailValue}>
                                            {sessionType}
                                        </Text>
                                    </>
                                )}

                                <Text style={detailLabel}>Scheduled Date</Text>
                                <Text style={detailValue}>{bookingDate}</Text>

                                <Text style={detailLabel}>Scheduled Time</Text>
                                <Text style={detailValue}>{bookingTime}</Text>

                                {location && (
                                    <>
                                        <Text style={detailLabel}>
                                            Location
                                        </Text>
                                        <Text style={detailValue}>
                                            {location}
                                        </Text>
                                    </>
                                )}
                            </Section>
                        </Section>

                        {additionalNotes && (
                            <Section style={section}>
                                <Text style={sectionTitle}>
                                    Additional Notes
                                </Text>
                                <Section style={messageCard}>
                                    <Text style={messageText}>
                                        {additionalNotes}
                                    </Text>
                                </Section>
                            </Section>
                        )}

                        <Section style={actionSection}>
                            <Text style={actionTitle}>Required Actions</Text>
                            <Text style={actionText}>
                                1. <strong>Contact the customer</strong> within
                                the next hour via phone or email
                            </Text>
                            <Text style={actionText}>
                                2. <strong>Confirm booking details</strong> and
                                discuss any specific requirements
                            </Text>
                            <Text style={actionText}>
                                3. <strong>Send confirmation email</strong> with
                                detailed session information
                            </Text>
                            <Text style={actionText}>
                                4. <strong>Update calendar</strong> and prepare
                                for the session
                            </Text>
                        </Section>

                        <Section style={quickActionsSection}>
                            <Text style={quickActionsTitle}>Quick Actions</Text>
                            <Section style={quickActionsCard}>
                                <Link
                                    href={`mailto:${customerEmail}`}
                                    style={quickActionLink}
                                >
                                    📧 Reply via Email
                                </Link>
                                {phone && (
                                    <Link
                                        href={`tel:${phone}`}
                                        style={quickActionLink}
                                    >
                                        📞 Call Customer
                                    </Link>
                                )}
                                <Link
                                    href='https://wa.me/2348116273856'
                                    style={quickActionLink}
                                >
                                    💬 WhatsApp Support
                                </Link>
                            </Section>
                        </Section>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            This is an automated notification from your
                            Coffeeshotit Media booking system.
                        </Text>
                        <Text style={footerText}>
                            © 2024 Coffeeshotit Media. All rights reserved.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    backgroundColor: "#f8fafc",
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: 0,
};

const container = {
    margin: "0 auto",
    padding: "20px",
    maxWidth: "600px",
};

const header = {
    backgroundColor: "#1e293b",
    padding: "32px 24px",
    textAlign: "center" as const,
    borderRadius: "12px 12px 0 0",
    marginBottom: "0",
};

const headerText = {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: "700",
    margin: "0 0 8px 0",
    letterSpacing: "-0.025em",
};

const headerSubtext = {
    color: "#94a3b8",
    fontSize: "16px",
    margin: "0",
    fontWeight: "400",
};

const contentCard = {
    backgroundColor: "#ffffff",
    padding: "40px 32px",
    borderRadius: "0 0 12px 12px",
    boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    marginBottom: "24px",
};

const h1 = {
    color: "#1e293b",
    fontSize: "24px",
    fontWeight: "700",
    margin: "0 0 16px 0",
    letterSpacing: "-0.025em",
};

const introText = {
    color: "#64748b",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "0 0 24px 0",
};

const priorityCard = {
    backgroundColor: "#fef3c7",
    padding: "16px 20px",
    borderRadius: "8px",
    border: "1px solid #f59e0b",
    margin: "24px 0",
    textAlign: "center" as const,
};

const priorityText = {
    color: "#92400e",
    fontSize: "16px",
    fontWeight: "600",
    margin: "0",
};

const section = {
    margin: "32px 0",
};

const sectionTitle = {
    color: "#1e293b",
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 16px 0",
    letterSpacing: "-0.025em",
};

const detailCard = {
    backgroundColor: "#f8fafc",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
};

const detailLabel = {
    color: "#64748b",
    fontSize: "14px",
    fontWeight: "500",
    margin: "16px 0 4px 0",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
};

const detailValue = {
    color: "#1e293b",
    fontSize: "16px",
    fontWeight: "500",
    margin: "0 0 8px 0",
};

const emailLink = {
    color: "#3b82f6",
    textDecoration: "none",
};

const phoneLink = {
    color: "#3b82f6",
    textDecoration: "none",
};

const messageCard = {
    backgroundColor: "#f8fafc",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
};

const messageText = {
    color: "#1e293b",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "0",
    whiteSpace: "pre-wrap" as const,
};

const actionSection = {
    backgroundColor: "#dbeafe",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #bfdbfe",
    margin: "32px 0",
};

const actionTitle = {
    color: "#1e40af",
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 16px 0",
};

const actionText = {
    color: "#1e40af",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "8px 0",
};

const quickActionsSection = {
    margin: "32px 0",
};

const quickActionsTitle = {
    color: "#1e293b",
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 16px 0",
    letterSpacing: "-0.025em",
};

const quickActionsCard = {
    backgroundColor: "#f8fafc",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    textAlign: "center" as const,
};

const quickActionLink = {
    display: "inline-block",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    padding: "12px 24px",
    margin: "8px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
};

const footer = {
    textAlign: "center" as const,
    padding: "24px 0",
};

const footerText = {
    color: "#64748b",
    fontSize: "14px",
    margin: "4px 0",
};

export default AdminBookingNotification;
