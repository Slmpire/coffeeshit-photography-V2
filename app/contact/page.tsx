import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import ContactInfo from "@/components/contact-info";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with Coffee to book a session or ask a question.",
};

export default function ContactPage() {
    return (
        <main className="w-full bg-black text-white min-h-screen">

            {/* Hero */}
            <section className="relative w-full min-h-[50vh] flex items-end pb-16 pt-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center top",
                        }}
                    />
                    <div className="absolute inset-0 bg-black/70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    {/* Label */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-px w-10 bg-amber-400/60" />
                        <span className="text-[10px] text-amber-400 uppercase tracking-[0.5em]">
                            Get in Touch
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9] tracking-tight max-w-3xl">
                        Let's create
                        <br />
                        <span className="text-white/20">something</span>
                        <br />
                        together.
                    </h1>
                </div>
            </section>

            {/* Main content */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

                    {/* Form — takes 2 cols */}
                    <div className="lg:col-span-2">
                        <ContactForm />
                    </div>

                    {/* Info sidebar */}
                    <div>
                        <ContactInfo />
                    </div>
                </div>
            </section>
        </main>
    );
}