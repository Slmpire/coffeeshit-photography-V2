/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║          CoffeeShotIt — Single Content Configuration            ║
 * ║                                                                  ║
 * ║  This is the ONLY file you need to edit to update any content   ║
 * ║  on the entire site — images, text, projects, FAQ, services.    ║
 * ║                                                                  ║
 * ║  HOW TO USE CLOUDINARY:                                          ║
 * ║  1. Upload your photo to Cloudinary                              ║
 * ║  2. Copy its Public ID from the Media Library                    ║
 * ║  3. Use: cld("your/public-id")  OR paste full Cloudinary URL    ║
 * ║                                                                  ║
 * ║  Until then, just paste any direct image URL and it will work.  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

// ─── Cloudinary URL helper ────────────────────────────────────────────────────
// Usage: cld("coffeeshotit/hero/photo1")
// Optionally override transforms: cld("my-id", "f_auto,q_auto,w_1200")
export const cld = (
    publicId: string,
    transforms = "f_auto,q_auto"
): string => {
    const cloud =
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "YOUR_CLOUD_NAME";
    return `https://res.cloudinary.com/${cloud}/image/upload/${transforms}/${publicId}`;
};

// ─────────────────────────────────────────────────────────────────────────────
// IMAGES — Replace any URL below with cld("your-public-id") once on Cloudinary
// ─────────────────────────────────────────────────────────────────────────────
export const IMAGES = {
    // ── Hero slider ───────────────────────────────────────────────────────────
    // These cycle on the homepage hero (mobile: auto-slider, desktop: 3-panel)
    // Add/remove as many as you want. 6+ recommended.
    heroSlider: [
        {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793013874/agIlTKYofJOwHGKx_5I5A2870.jpg?auto=format,compress",
            alt: "CoffeeShotIt portrait photography",
        },
        {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793014086/agEL06YofJOwHC4J_5I5A6759.jpg?auto=format,compress",
            alt: "Coffee — professional photographer",
        },
         {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793014850/aGbPCXfc4bHWjB_k_IMG_0584.jpg?auto=format,compress",
            alt: "CoffeeShotIt studio session",
        },
          {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793015011/aGaidnfc4bHWjBYf_5I5A1224.jpg?auto=format,compress",
            alt: "CoffeeShotIt photography Lagos",
        },
         {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793014187/aLyCWGGNHVfTOu7Z_WD3.jpg?auto=format,compress",
            alt: "CoffeeShotIt photography Lagos",
        },
          {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793014966/aGai8Hfc4bHWjBaC_5I5A1263.jpg?auto=format,compress",
            alt: "CoffeeShotIt portrait photography",
        },
        {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793014033/agENvaYofJOwHC4s_5I5A9281.jpg?auto=format,compress",
            alt: "CoffeeShotIt portrait photography",
        },
        {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793014215/aLDzXmGNHVfTObRC_5I5A1026-2.jpg?auto=format,compress",
            alt: "CoffeeShotIt studio session",
        },
         {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793015038/aGMWw3fc4bHWi4TS_IMG_2369.jpg?auto=format,compress",
            alt: "CoffeeShotIt studio session",
        },
         {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793013996/agHssaYofJOwHFPS_5I5A8525.jpg?auto=format,compress",
            alt: "CoffeeShotIt studio session",
        },
          {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793014910/aGbKI3fc4bHWjB-c_5I5A0970.jpg?auto=format,compress",
            alt: "CoffeeShotIt event photography",
        },
    ],

    // ── About page hero ───────────────────────────────────────────────────────
    aboutHero: {
        url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793017822/_J6to0wx10keiQXZ_5I5A0138.jpg?auto=format,compress",
        alt: "Coffee — Professional Photographer",
    },

    // ── Booking page category cards ───────────────────────────────────────────
    bookingCards: {
        wedding: {
            url: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
            alt: "Wedding Photography",
        },
        event: {
            url: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
            alt: "Event Photography",
        },
        studio: {
            url: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
            alt: "Studio & Outdoor Sessions",
        },
    },

    // ── TheVoice / Storyteller section (4 images) ─────────────────────────────
    storyteller: [
        {
            url: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
            alt: "CoffeeShotIt photography",
        },
        {
            url: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
            alt: "Coffee behind the lens",
        },
        {
            url: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
            alt: "Wedding photography Lagos",
        },
        {
            url: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
            alt: "Portrait photography",
        },
    ],

    // ── Stats section ─────────────────────────────────────────────────────────
    stats: {
        // Marquee strip: add as many as you want — they loop infinitely
        marquee: [
            {
                url: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
                alt: "CoffeeShotIt work",
            },
            {
                url: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
                alt: "CoffeeShotIt work",
            },
            {
                url: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
                alt: "CoffeeShotIt work",
            },
            {
                url: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
                alt: "CoffeeShotIt work",
            },
            {
                url: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
                alt: "CoffeeShotIt work",
            },
            {
                url: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
                alt: "CoffeeShotIt work",
            },
        ],
        // Featured: cycling large image below stats numbers (1–4 images)
        featured: [
            {
                url: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
                alt: "CoffeeShotIt featured work",
            },
            {
                url: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
                alt: "CoffeeShotIt featured work",
            },
        ],
    },

    // ── Services section bottom image ─────────────────────────────────────────
    servicesBanner: {
        url: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
        alt: "CoffeeShotIt in action",
    },

    // ── Portfolio categories ───────────────────────────────────────────────────
    portfolioCategories: [
        {
            uid: "wedding",
            label: "Weddings",
            description: "Full-day wedding coverage from getting ready to the last dance.",
            url: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
            alt: "Wedding Photography",
        },
        {
            uid: "event",
            label: "Events",
            description: "Birthdays, proposals, burials, corporate events — every celebration deserves to be remembered.",
            url: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
            alt: "Event Photography",
        },
        {
            uid: "portrait",
            label: "Portraits",
            description: "Studio & outdoor portraits — personal branding, headshots, and creative sessions.",
            url: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
            alt: "Portrait Photography",
        },
        {
            uid: "proposal",
            label: "Proposals",
            description: "Discreet, professional coverage of your most important question.",
            url: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
            alt: "Proposal Photography",
        },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT — All text content on the site
// ─────────────────────────────────────────────────────────────────────────────

// ── Services ─────────────────────────────────────────────────────────────────
export const SERVICES = [
    {
        uid: "wedding",
        title: "Wedding Photography",
        subtitle: "Full Day Coverage",
        description:
            "From getting ready to the last dance — every emotion, every moment, captured with intention and artistry. Coffee's cinematic style ensures your wedding album feels like a film, not just photos.",
        image: {
            url: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
            alt: "Wedding Photography",
        },
    },
    {
        uid: "event",
        title: "Event Photography",
        subtitle: "Half Day or Full Day",
        description:
            "Birthdays, proposals, burials, corporate events — every celebration deserves to be remembered. Coffee captures the energy, the people, and the moments that make events unforgettable.",
        image: {
            url: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
            alt: "Event Photography",
        },
    },
    {
        uid: "portrait",
        title: "Portrait Sessions",
        subtitle: "Studio & Outdoor",
        description:
            "Professional headshots, personal branding, creative portraits — images that tell your story. Whether in the studio or outdoors in Lagos, Coffee creates images with depth, light, and character.",
        image: {
            url: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
            alt: "Portrait Sessions",
        },
    },
    {
        uid: "proposal",
        title: "Proposal Photography",
        subtitle: "Surprise Coverage",
        description:
            "Capture the moment she says yes. Discreet, professional coverage of your most important question. Coffee stays hidden until the perfect moment, ensuring you have the reaction captured forever.",
        image: {
            url: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
            alt: "Proposal Photography",
        },
    },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
export const FAQ = [
    {
        question: "How far in advance should I book?",
        answer: "For weddings, at least 3–6 months in advance. For events and portrait sessions, 2–4 weeks is usually sufficient. The earlier the better to secure your preferred date.",
    },
    {
        question: "How long does it take to receive my photos?",
        answer: "Wedding galleries are delivered within 4–6 weeks. Event photos within 2–3 weeks. Portrait sessions within 1–2 weeks. Rush delivery is available on request.",
    },
    {
        question: "Does Coffee travel outside Lagos?",
        answer: "Yes. Coffee is available anywhere in Nigeria and internationally. Travel costs are added to the package price and confirmed during consultation.",
    },
    {
        question: "What happens if it rains on my wedding day?",
        answer: "Rain doesn't stop the shoot. Coffee has experience shooting in all weather conditions and often creates the most dramatic and beautiful images on rainy days. If you prefer to reschedule, we can discuss options.",
    },
    {
        question: "How does the deposit work?",
        answer: "A 50% deposit is required to secure your date. The remaining balance is due 7 days before your session. Deposits are non-refundable but transferable to another date with 30 days notice.",
    },
    {
        question: "What is the cancellation policy?",
        answer: "Cancellations made 30+ days before the event can transfer the deposit to a new date. Cancellations within 30 days forfeit the deposit. Full payment is non-refundable within 7 days of the event.",
    },
    {
        question: "What format are photos delivered in?",
        answer: "All photos are delivered as high-resolution JPEGs via a private Pixieset gallery. You can download full-resolution files and order prints directly from the gallery.",
    },
    {
        question: "Are raw or unedited files available?",
        answer: "No. Raw files are not delivered. The editing process is an essential part of the final product and reflects Coffee's signature style.",
    },
    {
        question: "How should I prepare for a portrait session?",
        answer: "Wear outfits that make you feel confident and comfortable. Avoid very busy patterns. Coffee will share a prep guide after booking with detailed tips on what to bring and how to prepare.",
    },
    {
        question: "Is a second shooter available?",
        answer: "Yes, a second shooter can be added to wedding packages. This ensures full coverage of different moments happening simultaneously. Ask about pricing during consultation.",
    },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
    {
        initials: "AG",
        name: "Austin & Gbemii",
        location: "Toronto, Canada",
        type: "Wedding Photography",
        content:
            "Coffee made us really comfortable — very professional, made us laugh and forget we were even having our pictures taken.",
    },
    {
        initials: "ML",
        name: "Manuel & Lara",
        location: "New York, USA",
        type: "Couples Session",
        content:
            "Coffee captured our love story beautifully. We had an amazing and fun experience from start to finish.",
    },
    {
        initials: "NL",
        name: "Nifemi & Lola",
        location: "London, UK",
        type: "Wedding Photography",
        content:
            "The pictures are so timeless and his eye for detail is beautiful. I'd book him over and over again.",
    },
    {
        initials: "FT",
        name: "Fehintoluwa",
        location: "Dubai, UAE",
        type: "Portrait Session",
        content:
            "Best photo session I've had. The photos were exceptional — got other professionals asking for his contact.",
    },
    {
        initials: "AR",
        name: "Adams & Romola",
        location: "Madrid, Spain",
        type: "Wedding Photography",
        content:
            "Captured our wedding love story so beautifully. Every detail, moment, and memory was perfect.",
    },
    {
        initials: "TM",
        name: "Temi & Mariam",
        location: "Berlin, Germany",
        type: "Event Photography",
        content:
            "Every session with Coffee got better and better. Seamless process — exactly what we wanted.",
    },
];

// ── Project Categories ────────────────────────────────────────────────────────
export const PROJECT_CATEGORIES = [
    { uid: "all",      title: "All"       },
    { uid: "wedding",  title: "Weddings"  },
    { uid: "event",    title: "Events"    },
    { uid: "portrait", title: "Portraits" },
    { uid: "proposal", title: "Proposals" },
];

// ── Projects ──────────────────────────────────────────────────────────────────
// Add every project here. uid must be unique (used in the URL: /projects/[uid])
export const PROJECTS = [
    {
        uid: "prisca-deji-wedding",
        title: "Prisca & Deji Wedding",
        category: "wedding",
        client: "Prisca & Deji",
        location: "Lagos, Nigeria",
        date: "2025-03-15",
        description:
            "A beautiful wedding celebration filled with joy, elegance, and unforgettable moments. Captured in Coffee's signature cinematic style.",
        coverImage: {
            url: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
            alt: "Prisca & Deji Wedding",
        },
        gallery: [
            {
                url: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
                alt: "Wedding ceremony",
            },
            {
                url: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
                alt: "Couple portrait",
            },
            {
                url: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
                alt: "Reception details",
            },
            {
                url: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
                alt: "First dance",
            },
            {
                url: "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
                alt: "Family portrait",
            },
            {
                url: "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
                alt: "Bridal details",
            },
        ],
    },
    // ── Add more projects below ──────────────────────────────────────────────
    // {
    //   uid: "your-project-slug",          ← appears in /projects/your-project-slug
    //   title: "Project Title",
    //   category: "wedding",               ← must match a uid in PROJECT_CATEGORIES
    //   client: "Client Name",
    //   location: "Lagos, Nigeria",
    //   date: "2025-01-20",                ← ISO date string
    //   description: "Describe the shoot...",
    //   coverImage: { url: cld("your/cover-id"), alt: "Alt text" },
    //   gallery: [
    //     { url: cld("your/photo-1"), alt: "Photo description" },
    //     { url: cld("your/photo-2"), alt: "Photo description" },
    //   ],
    // },
];

// Featured projects shown on the homepage (use project UIDs)
export const FEATURED_PROJECT_UIDS = ["prisca-deji-wedding"];

// ── Client Gallery Portal ─────────────────────────────────────────────────────
// Add new clients here after each shoot.
// Format: "CODE": { url: "pixieset_url", name: "Client Name" }
export const CLIENT_GALLERIES: Record<string, { url: string; name: string }> = {
    "PRISCA2025": {
        url: "https://coffeeshotit.pixieset.com/priscadeji",
        name: "Prisca & Deji",
    },
    // "CODE123": { url: "https://coffeeshotit.pixieset.com/...", name: "Client Name" },
};
