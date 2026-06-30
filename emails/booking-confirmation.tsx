import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Text,
    Section,
    Link,
    Button,
} from "@react-email/components";
import * as React from "react";

interface BookingConfirmationEmailProps {
    customerName: string;
    serviceName: string;
    bookingDate: string;
    bookingTime: string;
    additionalNotes?: string;
}

export const BookingConfirmationEmail: React.FC<
    BookingConfirmationEmailProps
> = ({
    customerName,
    serviceName,
    bookingDate,
    bookingTime,
    additionalNotes,
}) => {
    return (
        <Html>
            <Head />
            <Preview>Booking Confirmation - Coffeeshotit Media Service</Preview>
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
                        <Heading style={h1}>Booking Confirmation</Heading>

                        <Text style={greetingText}>Dear {customerName},</Text>

                        <Text style={bodyText}>
                            Thank you for choosing Coffeeshotit Media for your
                            photography and videography needs! We're excited to
                            work with you and create something amazing together.
                        </Text>

                        <Section style={confirmationCard}>
                            <Text style={confirmationTitle}>
                                Booking Confirmed
                            </Text>
                            <Text style={confirmationText}>
                                Your booking has been successfully received and
                                confirmed.
                            </Text>
                        </Section>

                        <Section style={detailsSection}>
                            <Text style={sectionTitle}>Booking Details</Text>
                            <Section style={detailsCard}>
                                <Text style={detailLabel}>Service</Text>
                                <Text style={detailValue}>{serviceName}</Text>

                                <Text style={detailLabel}>Date</Text>
                                <Text style={detailValue}>{bookingDate}</Text>

                                <Text style={detailLabel}>Time</Text>
                                <Text style={detailValue}>{bookingTime}</Text>

                                {additionalNotes && (
                                    <>
                                        <Text style={detailLabel}>
                                            Additional Notes
                                        </Text>
                                        <Text style={detailValue}>
                                            {additionalNotes}
                                        </Text>
                                    </>
                                )}
                            </Section>
                        </Section>

                        <Section style={nextStepsSection}>
                            <Text style={nextStepsTitle}>What's Next?</Text>
                            <Text style={bodyText}>
                                A member of our team will contact you within the
                                next hour to discuss the details of your session
                                and answer any questions you may have.
                            </Text>

                            <Text style={bodyText}>
                                In the meantime, feel free to reach out to us
                                directly via WhatsApp:
                            </Text>

                            <Section style={contactCard}>
                                <Link
                                    href='https://wa.me/2348116273856'
                                    style={whatsappLink}
                                >
                                    <Text style={whatsappText}>
                                        📱 +234 811 627 3856
                                    </Text>
                                </Link>
                            </Section>
                        </Section>

                        <Section style={closingSection}>
                            <Text style={bodyText}>
                                Thank you for trusting us with your special
                                moments. We look forward to creating beautiful
                                memories together!
                            </Text>

                            <Text style={signatureText}>
                                Best regards,
                                <br />
                                <strong>The Coffeeshotit Media Team</strong>
                            </Text>
                        </Section>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            This email confirms your booking with Coffeeshotit
                            Media.
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

const greetingText = {
    color: "#1e293b",
    fontSize: "18px",
    fontWeight: "500",
    margin: "0 0 24px 0",
};

const bodyText = {
    color: "#64748b",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "0 0 16px 0",
};

const confirmationCard = {
    backgroundColor: "#dcfce7",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #bbf7d0",
    margin: "24px 0",
    textAlign: "center" as const,
};

const confirmationTitle = {
    color: "#166534",
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 8px 0",
};

const confirmationText = {
    color: "#166534",
    fontSize: "16px",
    margin: "0",
};

const detailsSection = {
    margin: "32px 0",
};

const sectionTitle = {
    color: "#1e293b",
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 16px 0",
    letterSpacing: "-0.025em",
};

const detailsCard = {
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

const nextStepsSection = {
    margin: "32px 0",
};

const nextStepsTitle = {
    color: "#1e293b",
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 16px 0",
    letterSpacing: "-0.025em",
};

const contactCard = {
    backgroundColor: "#dbeafe",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #bfdbfe",
    margin: "16px 0",
    textAlign: "center" as const,
};

const whatsappLink = {
    textDecoration: "none",
};

const whatsappText = {
    color: "#1e40af",
    fontSize: "18px",
    fontWeight: "600",
    margin: "0",
};

const closingSection = {
    margin: "32px 0 0 0",
    padding: "24px 0",
    borderTop: "1px solid #e2e8f0",
};

const signatureText = {
    color: "#1e293b",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "16px 0 0 0",
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

export default BookingConfirmationEmail;
