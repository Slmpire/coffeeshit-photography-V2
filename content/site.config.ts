/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║          CoffeeShotIt — Single Content Configuration            ║
 * ║                                                                  ║
 * ║  This is the ONLY file you need to edit to update any content   ║
 * ║  on the entire site — images, text, projects, FAQ, services.    ║
 * ║                                                                  ║
 * ║  ADDING A PHOTO:                                                 ║
 * ║  1. Upload to Cloudinary                                         ║
 * ║  2. Copy the part of the URL AFTER "/upload/"                    ║
 * ║     e.g. v1793013874/agIlTKYofJOwHGKx_5I5A2870.jpg               ║
 * ║  3. Paste it into the matching list below                        ║
 * ║                                                                  ║
 * ║  Every photo is auto-resized + compressed by Cloudinary          ║
 * ║  (f_auto, q_auto, width limit) so pages load fast.               ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

// ─── Cloudinary helpers ───────────────────────────────────────────────────────
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "wuruxed3";

// cld("v123/file.jpg") or cld("v123/file.jpg", "f_auto,q_auto,w_800")
export const cld = (publicId: string, transforms = "f_auto,q_auto"): string =>
    `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms}/${publicId}`;

type Img = { url: string; alt: string };

// Resize-limited + auto format/quality (never upscales)
const px = (w: number) => `f_auto,q_auto,c_limit,w_${w}`;
const pic = (path: string, alt: string, w = 1600): Img => ({
    url: cld(path, px(w)),
    alt,
});
const pics = (paths: string[], alt: string, w = 1600): Img[] =>
    paths.map((p, i) => pic(p, `${alt} ${i + 1}`, w));

// ─────────────────────────────────────────────────────────────────────────────
// PHOTO LISTS — one list per category. Paste new paths here.
// ─────────────────────────────────────────────────────────────────────────────
const PORTRAITS = [
    "v1793013874/agIlTKYofJOwHGKx_5I5A2870.jpg",
    "v1793013935/agIlBKYofJOwHGKt_IMG_8696.jpg",
    "v1793013996/agHssaYofJOwHFPS_5I5A8525.jpg",
    "v1793014068/agEMU6YofJOwHC4Y_5I5A6856.jpg",
    "v1793575325/tKOnTLaNy68kSPt9__I5A1576.jpg",
    "v1793575357/RM3c-dGKZZol3pmp_5I5A8644.jpg",
    "v1793575376/FxUUECDsplahCbls_tope5.jpg",
    "v1793575396/0DtOI1FCUqbyoG9t_tope3.jpg",
    "v1793575432/NgnUd_nD5uSpBzBL_tope1.jpg",
    "v1793575452/HYkNpUurnLoFujtD_ginger1.jpg",
    "v1793575476/Y_D_llXBZn9Uo97D_debisi2.jpg",
    "v1793575498/B4u6YH-NjvA5kDUT_5I5A0020.jpg",
    "v1793575504/WBCYaStofctkVan8_5I5A9929.jpg",
    "v1793575553/ZgRu7J8YKLCflNpN_5I5A9616.jpg",
    "v1793575560/x-LhyLGUHFeP_sTu_5I5A9674.jpg",
    "v1793575595/FlRXyT_eFRiIYcWC__I5A4187.jpg",
    "v1793575581/Q3EXqtQkI7DwttiC__I5A3752-2.jpg",
    "v1793015299/5I5A9579.jpg",
    "v1793014159/aLyEmmGNHVfTOu7l_OR1.jpg",
    "v1793014127/aLyLo2GNHVfTOu8R_bt2.jpg",
    "v1793014698/aKQvuaTt2nPbacpr_5I5A7990.jpg",
    "v1793014399/aGbVBnfc4bHWjCA0_IMG_9933.jpg",
    "v1793014930/aGa8z3fc4bHWjB1-_5I5A2102.jpg",
    "v1793014940/aGa7rHfc4bHWjB1C_5I5A5297.jpg",
    "v1793015156/aFNkU7NJEFaPYFhR_5I5A2585.jpg",
];

const WEDDING = [
    "v1793188500/qUU6duDGoennmUJ0_5I5A0671-1-.jpg",
    "v1793577497/kbZOZTt3cV00pOxm__I5A9622.jpg",
    "v1793577485/_0IX_aPavFOKDEKO__I5A9732.jpg",
    "v1793575802/Qwk_r4nS3E6TSa9-_5I5A4738.jpg",
    "v1793575809/NPMJeeqQJTp_YDP2_5I5A4881.jpg",
    "v1793188571/hxNyDn5nw_VkFD6j_5I5A4709-1-.jpg",
    "v1793573840/agELnqYofJOwHC4I_5I5A9694.jpg",
    "v1793574588/y5hZaHisUhYgys4-_9C0A8365.jpg",
    "v1793574505/MTE7K5osA10Kihit_7E7A1064-1-.jpg",
    "v1793574524/KbUhaQR8u7Upr0qo_7E7A3067.jpg",
    "v1793574559/38D3DNMnOFfyMfPk_7E7A3378.jpg",
    "v1793574733/AnSqrPBVB_gr5_NX_5I5A8777.jpg",
    "v1793574740/hSuZU7emuljiv9MM_5I5A8726.jpg",
    "v1793574763/TyBquQYeB3-pJ1eR_5I5A7596-2.jpg",
    "v1793574776/lv3D4F8eW1x881F1_5I5A7776.jpg",
    "v1793574793/7EVBbYXSYKFm1JwN_5I5A7692.jpg",
    "v1793574805/exnX5FnkZ1vjflPf_5I5A1133.jpg",
    "v1793574821/gzZ6ZRkNqkgT6CqL_5I5A0973.jpg",
    "v1793574842/lCy73-kGU7_4xmYn_5I5A0887.jpg",
];

const PREWEDDING = [
    "v1793013996/agHssaYofJOwHFPS_5I5A8525.jpg",
    "v1793574060/2AAGhOY-GhoiQb5K_5I5A6330-1-.jpg",
    "v1793188591/AvcLWAH96Vf1U3xO_5I5A1629.jpg",
    "v1793014033/agENvaYofJOwHC4s_5I5A9281.jpg",
    "v1793188059/IJWBoiD3LvZPX5Xh_9C0A9328.jpg",
    "v1793188032/afT4w96C44uNmY4__gesumo.jpg",
    "v1793015392/5I5A2097.jpg",
    "v1793015403/5I5A0005.jpg",
    "v1793014187/aLyCWGGNHVfTOu7Z_WD3.jpg",
    "v1793014277/aIvKOqTt2nPbZn-w_5I5A0180.jpg",
    "v1793014399/aGbVBnfc4bHWjCA0_IMG_9933.jpg",
    "v1793014316/aIvJuaTt2nPbZn-h_5I5A0851.jpg",
    "v1793014850/aGbPCXfc4bHWjB_k_IMG_0584.jpg",
    "v1793014910/aGbKI3fc4bHWjB-c_5I5A0970.jpg",
    "v1793014292/aIvKM6Tt2nPbZn-v_IMG_0718.jpg",
    "v1793014791/aGbUnnfc4bHWjCAw_IMG_9949.jpg",
    "v1793014966/aGai8Hfc4bHWjBaC_5I5A1263.jpg",
    "v1793015038/aGMWw3fc4bHWi4TS_IMG_2369.jpg",
    "v1793188545/ZqkmLRSwDu_5-F_J_5I5A1375-1-.jpg",
];

const MATERNITY = [
    "v1793576247/MxA6Q8tNd9uf1aW8__I5A0755-2.jpg",
    "v1793576253/a4kQCIFrws220Gs2__I5A0656-2.jpg",
    "v1793576281/ezktaGEHMY3WsQqt_5I5A0626.jpg",
    "v1793576294/qlRhqc1twvSd0d3x_5I5A0494.jpg",
    "v1793576322/Qh6i7BcT2nHXOWr5__I5A4239-3-2.jpg",
];

const OUTDOOR = [
    "v1793576176/bPBPCw7IUA7iFf_R_5I5A9259.jpg",
    "v1793015308/750_4360.jpg",
    "v1793575802/Qwk_r4nS3E6TSa9-_5I5A4738.jpg",
    "v1793575809/NPMJeeqQJTp_YDP2_5I5A4881.jpg",
    "v1793575849/H2n6C3Syl-r3Qu-x_5I5A5188.jpg",
    "v1793575856/AKz-RoBvSVwHXQCn_5I5A5105.jpg",
    "v1793575886/XlNQw7aO0fM8tm3M__I5A0060.jpg",
    "v1793575892/RE8m59fprivfEmOX__I5A0428.jpg",
    "v1793575914/_RbcuM3cmzHiRQfg__I5A9880.jpg",
    "v1793575946/Ilpg96eqWSJxZljA__I5A9944-1-.jpg",
    "v1793015403/5I5A0005.jpg",
    "v1793180295/5I5A0072.jpg",
    "v1793180296/5I5A0151.jpg",
    "v1793574025/agHwwKYofJOwHFV5_5I5A8720.jpg",
    "v1793573913/agEOGaYofJOwHC4w_5I5A9007.jpg",
    "v1793573937/agEOb6YofJOwHC4x_5I5A8879.jpg",
    "v1793180296/5I5A0169-2.jpg",
    "v1793188444/3niUzIwezf5KI3oj_5I5A1203.jpg",
    "v1793188500/qUU6duDGoennmUJ0_5I5A0671-1-.jpg",
];

// Cubana event / AY Show
const EVENTS = [
    "v1793187604/mi.jpg",
    "v1793577765/OVqN-lEx9X-Yaexe_5I5A0072.jpg",
    "v1793577769/YG2xm2DnF8WSc3p6_5I5A0056.jpg",
    "v1793577780/XDX9bGTAYXqF8U1b_5I5A0054.jpg",
    "v1793577808/wwAg7645K4kW81mX_5I5A9952-1-.jpg",
    "v1793577812/1_CydkF_k6HKvqZo_5I5A9930.jpg",
    "v1793577833/Nk2FNQYJoKsUZNL9_5I5A9927.jpg",
    "v1793577844/CTDFOcj3bCA7jl7P_5I5A9792.jpg",
    "v1793577854/xz3m8Dzw3RYOEf_J_5I5A9781.jpg",
    "v1793187604/5I5A0010.jpg",
    "v1793575277/p7HMpp4aYuVY1SDR_5I5A0035.jpg",
];

const PROPOSAL = [
    "v1793574255/yeOQ0LGK_EzsEHIj_5I5A7193.jpg",
    "v1793575986/25q1V-xDJfUqDEsW_5I5A6199.jpg",
    "v1793574225/I1MyP6EZV8-dW09i_5I5A7463.jpg",
    "v1793574200/otz9ao9BRKgcbmFX_5I5A7512.jpg",
    "v1793574168/PJ-rdvjZY6wHIUOl_5I5A7215.jpg",
    "v1793574158/XZ_sO77cJ85nI4Gf_5I5A2742.jpg",
    "v1793574134/JDXctoWVUpe-2sbz_5I5A2755.jpg",
    "v1793574119/wYX8xyjbgUIV4zYu_5I5A2775.jpg",
    "v1793574106/Y1VxPMH80HpP866p_5I5A2789.jpg",
    "v1793574087/AW-SnubHDROGUVpj_5I5A2838.jpg",
    "v1793574074/ok2rAEu4lEes_uT9_5I5A2876.jpg",
];

const KASSY = [
    "v1793577042/83UXYrtEXvI5Hihz__I5A0335.jpg",
    "v1793576652/_I5A0257.jpg",
    "v1793577054/0jrMHZKGAutsLUrp__I5A0273.jpg",
    "v1793577073/gI4nXLmi0zKPp3gK__I5A0345.jpg",
    "v1793577088/8cW1QYeWzdTxHsQg__I5A0281.jpg",
];

const HOPE_JAY = [
    "v1793577206/5I5A6704.jpg",
    "v1793577213/_I5A0161.jpg",
    "v1793577203/5I5A6613.jpg",
    "v1793577350/QLXRwF_wajZ4m1hB__I5A0195.jpg",
    "v1793577364/B4Arx-S0JL2XE5Yg__I5A0211.jpg",
    "v1793577373/v5WML4_72nijKLLM_5I5A6652.jpg",
];

const AMOKE_OGE = [
    "v1793577599/U334mug2tx_Mv90E__I5A9636.jpg",
    "v1793577589/95r8X12GFkbFrv_8__I5A9598.jpg",
    "v1793577611/E1VPVul3VkLjGOx8__I5A9142.jpg",
    "v1793577627/0dME-gtGYoPklGq7__I5A9539.jpg",
    "v1793577633/mMtAnFhHqUYiY9ZS__I5A9574.jpg",
    "v1793577642/4XPekyjKbN1iH8Ln_amokeoge.jpg",
];

// ─────────────────────────────────────────────────────────────────────────────
// IMAGES
// ─────────────────────────────────────────────────────────────────────────────
export const IMAGES = {
    // ── Hero slider — UNCHANGED ───────────────────────────────────────────────
    heroSlider: [
        {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793188407/L9uZYnh8ACE-mqt8_9C0A9380.jpg?auto=format,compress",
            alt: "CoffeeShotIt event photography",
        },
        {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793188473/mouTh5g30T7cti4g_9C0A9241.jpg?auto=format,compress",
            alt: "CoffeeShotIt event photography",
        },
        {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793188032/afT4w96C44uNmY4__gesumo.jpg?auto=format,compress",
            alt: "CoffeeShotIt event photography",
        },
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
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793013996/agHssaYofJOwHFPS_5I5A8525.jpg?auto=format,compress",
            alt: "CoffeeShotIt studio session",
        },
        {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793015038/aGMWw3fc4bHWi4TS_IMG_2369.jpg?auto=format,compress",
            alt: "CoffeeShotIt studio session",
        },
        {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793014910/aGbKI3fc4bHWjB-c_5I5A0970.jpg?auto=format,compress",
            alt: "CoffeeShotIt event photography",
        },
        {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793187604/mi.jpg?auto=format,compress",
            alt: "CoffeeShotIt event photography",
        },
        {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793188545/ZqkmLRSwDu_5-F_J_5I5A1375-1-.jpg?auto=format,compress",
            alt: "CoffeeShotIt event photography",
        },
        {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793187604/5I5A0010.jpg?auto=format,compress",
            alt: "CoffeeShotIt event photography",
        },
        {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793188500/qUU6duDGoennmUJ0_5I5A0671-1-.jpg?auto=format,compress",
            alt: "CoffeeShotIt event photography",
        },
        {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793014033/agENvaYofJOwHC4s_5I5A9281.jpg?auto=format,compress",
            alt: "CoffeeShotIt portrait photography",
        },
        {
            url: "https://res.cloudinary.com/wuruxed3/image/upload/v1793014215/aLDzXmGNHVfTObRC_5I5A1026-2.jpg?auto=format,compress",
            alt: "CoffeeShotIt studio session",
        },
    ],

    // ── About page hero ───────────────────────────────────────────────────────
    aboutHero: pic(
        "v1793017822/_J6to0wx10keiQXZ_5I5A0138.jpg",
        "Coffee — Professional Photographer",
        1800
    ),

    // ── Booking page category cards ───────────────────────────────────────────
    bookingCards: {
        wedding: pic(WEDDING[5], "Wedding Photography", 900),
        event: pic(EVENTS[0], "Event Photography", 900),
        studio: pic(PORTRAITS[0], "Studio & Outdoor Sessions", 900),
    },

    // ── TheVoice / Storyteller section (4 images) ─────────────────────────────
    storyteller: [
        pic(PORTRAITS[3], "Portrait photography by Coffee", 900),
        pic(WEDDING[5], "Wedding photography Lagos", 900),
        pic(MATERNITY[0], "Maternity photography", 900),
        pic(PROPOSAL[0], "Proposal photography", 900),
    ] as Img[],

    // ── Stats section ─────────────────────────────────────────────────────────
    stats: {
        // Marquee strip — loops infinitely
        marquee: [
            pic(PORTRAITS[4], "CoffeeShotIt work", 500),
            pic(WEDDING[7], "CoffeeShotIt work", 500),
            pic(PREWEDDING[2], "CoffeeShotIt work", 500),
            pic(MATERNITY[1], "CoffeeShotIt work", 500),
            pic(OUTDOOR[4], "CoffeeShotIt work", 500),
            pic(EVENTS[3], "CoffeeShotIt work", 500),
            pic(PROPOSAL[1], "CoffeeShotIt work", 500),
            pic(PORTRAITS[9], "CoffeeShotIt work", 500),
            pic(WEDDING[12], "CoffeeShotIt work", 500),
            pic(AMOKE_OGE[0], "CoffeeShotIt work", 500),
        ] as Img[],
        // Featured: cycling large image below the numbers
        featured: [
            pic(EVENTS[0], "CoffeeShotIt featured work", 1800),
            pic(WEDDING[0], "CoffeeShotIt featured work", 1800),
            pic(PORTRAITS[0], "CoffeeShotIt featured work", 1800),
            pic(PROPOSAL[0], "CoffeeShotIt featured work", 1800),
        ] as Img[],
    },

    // ── Services section bottom image ─────────────────────────────────────────
    servicesBanner: pic(
        "v1793188545/ZqkmLRSwDu_5-F_J_5I5A1375-1-.jpg",
        "CoffeeShotIt in action",
        1800
    ),

    // ── Portfolio categories (each gallery powers /gallery/[uid]) ─────────────
    portfolioCategories: [
        {
            uid: "wedding",
            label: "Weddings",
            description:
                "Full-day wedding coverage from getting ready to the last dance.",
            ...pic(WEDDING[5], "Wedding Photography", 1200),
            gallery: pics(WEDDING, "Wedding photography"),
        },
        {
            uid: "prewedding",
            label: "Pre-Wedding & Engagement",
            description:
                "Love stories told before the big day — relaxed, romantic and cinematic.",
            ...pic(PREWEDDING[2], "Pre-Wedding Photography", 1200),
            gallery: pics(PREWEDDING, "Pre-wedding photography"),
        },
        {
            uid: "event",
            label: "Events",
            description:
                "Concerts, shows, birthdays, burials and corporate events — every celebration deserves to be remembered.",
            ...pic(EVENTS[0], "Event Photography", 1200),
            gallery: pics(EVENTS, "Event photography"),
        },
        {
            uid: "portrait",
            label: "Portraits",
            description:
                "Studio & outdoor portraits — personal branding, headshots, and creative sessions.",
            ...pic(PORTRAITS[0], "Portrait Photography", 1200),
            gallery: pics(PORTRAITS, "Portrait photography"),
        },
        {
            uid: "maternity",
            label: "Maternity",
            description:
                "Elegant, tender portraits that celebrate this season of life.",
            ...pic(MATERNITY[0], "Maternity Photography", 1200),
            gallery: pics(MATERNITY, "Maternity photography"),
        },
        {
            uid: "outdoor",
            label: "Outdoor",
            description:
                "Natural light, open spaces and real moments — sessions shot on location around Lagos.",
            ...pic(OUTDOOR[0], "Outdoor Photography", 1200),
            gallery: pics(OUTDOOR, "Outdoor photography"),
        },
        {
            uid: "proposal",
            label: "Proposals",
            description:
                "Discreet, professional coverage of your most important question.",
            ...pic(PROPOSAL[0], "Proposal Photography", 1200),
            gallery: pics(PROPOSAL, "Proposal photography"),
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
        image: pic(WEDDING[5], "Wedding Photography", 1200),
    },
    {
        uid: "prewedding",
        title: "Pre-Wedding & Engagement",
        subtitle: "Love Story Sessions",
        description:
            "Relaxed, romantic sessions that capture who you are as a couple before the big day. Perfect for save-the-dates, invitations and wedding-day displays.",
        image: pic(PREWEDDING[3], "Pre-Wedding Photography", 1200),
    },
    {
        uid: "event",
        title: "Event Photography",
        subtitle: "Half Day or Full Day",
        description:
            "Concerts, shows, birthdays, burials, corporate events — every celebration deserves to be remembered. Coffee captures the energy, the people, and the moments that make events unforgettable.",
        image: pic(EVENTS[0], "Event Photography", 1200),
    },
    {
        uid: "portrait",
        title: "Portrait Sessions",
        subtitle: "Studio & Outdoor",
        description:
            "Professional headshots, personal branding, creative portraits — images that tell your story. Whether in the studio or outdoors in Lagos, Coffee creates images with depth, light, and character.",
        image: pic(PORTRAITS[3], "Portrait Sessions", 1200),
    },
    {
        uid: "maternity",
        title: "Maternity Photography",
        subtitle: "Studio or Outdoor",
        description:
            "Elegant, tender portraits that celebrate this season of life. Styled with care, shot with warmth, and delivered as images you'll treasure for years.",
        image: pic(MATERNITY[0], "Maternity Photography", 1200),
    },
    {
        uid: "outdoor",
        title: "Outdoor Sessions",
        subtitle: "On Location",
        description:
            "Natural light, open spaces and real moments. Coffee scouts and shoots on location around Lagos for portraits, couples and creative concepts.",
        image: pic(OUTDOOR[0], "Outdoor Sessions", 1200),
    },
    {
        uid: "proposal",
        title: "Proposal Photography",
        subtitle: "Surprise Coverage",
        description:
            "Capture the moment she says yes. Discreet, professional coverage of your most important question. Coffee stays hidden until the perfect moment, ensuring you have the reaction captured forever.",
        image: pic(PROPOSAL[0], "Proposal Photography", 1200),
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
    { uid: "all", title: "All" },
    { uid: "wedding", title: "Weddings" },
    { uid: "prewedding", title: "Pre-Wedding" },
    { uid: "event", title: "Events" },
    { uid: "portrait", title: "Portraits" },
    { uid: "maternity", title: "Maternity" },
    { uid: "outdoor", title: "Outdoor" },
    { uid: "proposal", title: "Proposals" },
];

// ── Projects ──────────────────────────────────────────────────────────────────
// uid must be unique (used in the URL: /projects/[uid])
// TODO: replace the placeholder dates / locations / client names with real ones.
export const PROJECTS = [
    {
        uid: "prisca-deji-wedding",
        title: "Prisca & Deji Wedding",
        category: "wedding",
        client: "Prisca & Deji",
        location: "Lagos, Nigeria",
        date: "2025-03-15", // TODO: real date
        description:
            "A beautiful wedding celebration filled with joy, elegance, and unforgettable moments. Captured in Coffee's signature cinematic style.",
        coverImage: pic(
            "v1793188571/hxNyDn5nw_VkFD6j_5I5A4709-1-.jpg",
            "Prisca & Deji Wedding",
            1400
        ),
        gallery: [
            pic("v1793188407/L9uZYnh8ACE-mqt8_9C0A9380.jpg", "Wedding ceremony"),
            pic("v1793188473/mouTh5g30T7cti4g_9C0A9241.jpg", "Couple portrait"),
            pic(
                "v1793188545/ZqkmLRSwDu_5-F_J_5I5A1375-1-.jpg",
                "Reception details"
            ),
            pic("v1793188500/qUU6duDGoennmUJ0_5I5A0671-1-.jpg", "First dance"),
            pic("v1793187604/5I5A0010.jpg", "Family portrait"),
            pic("v1793187604/mi.jpg", "Bridal details"),
        ],
    },
    {
        uid: "cubana-ay-show",
        title: "AY Show — Cubana Event",
        category: "event",
        client: "Cubana",
        location: "Lagos, Nigeria", // TODO: real venue
        date: "2025-06-01", // TODO: real date
        description:
            "Energy, laughter and star power. Coverage of the AY Show at the Cubana event — from the stage to the crowd, every standout moment captured.",
        coverImage: pic(EVENTS[0], "AY Show — Cubana Event", 1400),
        gallery: pics(EVENTS, "AY Show — Cubana Event"),
    },
    {
        uid: "amoke-oge-shoot",
        title: "Amoke Oge Shoot",
        category: "portrait",
        client: "Amoke Oge",
        location: "Lagos, Nigeria", // TODO: real location
        date: "2025-05-01", // TODO: real date
        description:
            "A confident, editorial portrait session built around personality, light and style.",
        coverImage: pic(AMOKE_OGE[0], "Amoke Oge Shoot", 1400),
        gallery: pics(AMOKE_OGE, "Amoke Oge Shoot"),
    },
    {
        uid: "kassy-shoot",
        title: "Kassy Shoot",
        category: "portrait",
        client: "Kassy",
        location: "Lagos, Nigeria", // TODO: real location
        date: "2025-04-01", // TODO: real date
        description:
            "A bold creative portrait session with strong styling and cinematic lighting.",
        coverImage: pic(KASSY[0], "Kassy Shoot", 1400),
        gallery: pics(KASSY, "Kassy Shoot"),
    },
    {
        uid: "hope-jay-shoot",
        title: "Hope Jay Shoot",
        category: "portrait",
        client: "Hope Jay",
        location: "Lagos, Nigeria", // TODO: real location
        date: "2025-04-15", // TODO: real date
        description:
            "A polished studio session focused on mood, expression and clean, timeless frames.",
        coverImage: pic(HOPE_JAY[0], "Hope Jay Shoot", 1400),
        gallery: pics(HOPE_JAY, "Hope Jay Shoot"),
    },
    {
        uid: "pre-wedding-engagement",
        title: "Pre-Wedding & Engagement Sessions",
        category: "prewedding",
        client: "Various Couples",
        location: "Lagos, Nigeria",
        date: "2025-02-01", // TODO: real date
        description:
            "A collection of love stories shot before the big day — relaxed, romantic and full of personality.",
        coverImage: pic(PREWEDDING[2], "Pre-Wedding & Engagement Sessions", 1400),
        gallery: pics(PREWEDDING, "Pre-wedding session"),
    },
    {
        uid: "maternity-sessions",
        title: "Maternity Sessions",
        category: "maternity",
        client: "Various Clients",
        location: "Lagos, Nigeria",
        date: "2025-01-15", // TODO: real date
        description:
            "Soft, elegant portraits celebrating motherhood-to-be, styled with care and shot with warmth.",
        coverImage: pic(MATERNITY[0], "Maternity Sessions", 1400),
        gallery: pics(MATERNITY, "Maternity session"),
    },
    {
        uid: "outdoor-sessions",
        title: "Outdoor Sessions",
        category: "outdoor",
        client: "Various Clients",
        location: "Lagos, Nigeria",
        date: "2025-03-01", // TODO: real date
        description:
            "Natural light and open spaces — a collection of outdoor sessions shot on location.",
        coverImage: pic(OUTDOOR[0], "Outdoor Sessions", 1400),
        gallery: pics(OUTDOOR, "Outdoor session"),
    },
    {
        uid: "proposal-stories",
        title: "Proposal Stories",
        category: "proposal",
        client: "Various Couples",
        location: "Lagos, Nigeria",
        date: "2025-02-14", // TODO: real date
        description:
            "The question, the reaction, the yes. Discreet coverage of proposals captured exactly as they unfolded.",
        coverImage: pic(PROPOSAL[0], "Proposal Stories", 1400),
        gallery: pics(PROPOSAL, "Proposal photography"),
    },
];

// Featured projects shown on the homepage (use project UIDs; first = large card)
export const FEATURED_PROJECT_UIDS = [
    "prisca-deji-wedding",
    "cubana-ay-show",
    "amoke-oge-shoot",
    "kassy-shoot",
    "hope-jay-shoot",
    "pre-wedding-engagement",
];

// ── Client Gallery Portal ─────────────────────────────────────────────────────
// Add new clients here after each shoot.
// Format: "CODE": { url: "pixieset_url", name: "Client Name" }
export const CLIENT_GALLERIES: Record<string, { url: string; name: string }> = {
    PRISCA2025: {
        url: "https://coffeeshotit.pixieset.com/priscadeji",
        name: "Prisca & Deji",
    },
    // "CODE123": { url: "https://coffeeshotit.pixieset.com/...", name: "Client Name" },
};