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
    Img,
    Link,
} from "@react-email/components";
import * as React from "react";

interface ContactNotificationProps {
    customerName: string;
    customerEmail: string;
    phone?: string;
    instagram?: string;
    message: string;
}

export const ContactNotification: React.FC<ContactNotificationProps> = ({
    customerName,
    customerEmail,
    phone,
    instagram,
    message,
}) => {
    return (
        <Html>
            <Head />
            <Preview>New Contact Form Submission: {customerName}</Preview>
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
                        <Heading style={h1}>
                            New Contact Form Submission
                        </Heading>

                        <Text style={introText}>
                            A new contact form has been submitted through your
                            website. Please review the details below and respond
                            promptly.
                        </Text>

                        <Section style={section}>
                            <Text style={sectionTitle}>Customer Details</Text>
                            <Section style={detailCard}>
                                <Text style={detailLabel}>Name</Text>
                                <Text style={detailValue}>{customerName}</Text>

                                <Text style={detailLabel}>Email</Text>
                                <Text style={detailValue}>{customerEmail}</Text>

                                {phone && (
                                    <>
                                        <Text style={detailLabel}>Phone</Text>
                                        <Text style={detailValue}>{phone}</Text>
                                    </>
                                )}

                                {instagram && (
                                    <>
                                        <Text style={detailLabel}>
                                            Instagram
                                        </Text>
                                        <Text style={detailValue}>
                                            @{instagram.replace("@", "")}
                                        </Text>
                                    </>
                                )}
                            </Section>
                        </Section>

                        <Section style={section}>
                            <Text style={sectionTitle}>Message</Text>
                            <Section style={messageCard}>
                                <Text style={messageText}>{message}</Text>
                            </Section>
                        </Section>

                        <Section style={actionSection}>
                            <Text style={actionText}>
                                <strong>Action Required:</strong> Please respond
                                to this inquiry within the next hour to maintain
                                a good customer service standards.
                            </Text>
                        </Section>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            This is an automated notification from your
                            Coffeeshotit Media website.
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
    margin: "0 0 32px 0",
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
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #bfdbfe",
    marginTop: "32px",
};

const actionText = {
    color: "#1e40af",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "0",
    textAlign: "center" as const,
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

export default ContactNotification;
