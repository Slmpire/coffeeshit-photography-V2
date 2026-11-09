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
 * ║  (f_auto, q_auto, width limit) and NEVER cropped (c_limit),      ║
 * ║  so portraits stay portrait and landscapes stay landscape.       ║
 * ║  Duplicate paths in a list are removed automatically.            ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

// ─── Cloudinary helpers ───────────────────────────────────────────────────────
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "wuruxed3";

export const cld = (publicId: string, transforms = "f_auto,q_auto"): string =>
    `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms}/${publicId}`;

type Img = { url: string; alt: string };

// Resize-limited + auto format/quality. c_limit = shrink only, never crop/upscale.
const px = (w: number) => `f_auto,q_auto,c_limit,w_${w}`;
const pic = (path: string, alt: string, w = 1600): Img => ({
    url: cld(path, px(w)),
    alt,
});
const uniq = (paths: string[]): string[] => Array.from(new Set(paths));
const pics = (paths: string[], alt: string, w = 1600): Img[] =>
    uniq(paths).map((p, i) => pic(p, `${alt} ${i + 1}`, w));

// ─────────────────────────────────────────────────────────────────────────────
// PHOTO LISTS — one list per category. Paste new paths here.
// ─────────────────────────────────────────────────────────────────────────────
const PORTRAITS = uniq([
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
]);

const WEDDING = uniq([
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
]);

// Opeyemi's wedding
const OPEYEMI_WEDDING = uniq([
    "v1794175746/K1_NJSTgTcWspPkS_5I5A4894.jpg",
    "v1794176124/kMk7B71akbqyekMf_5I5A4881.jpg",
    "v1794176142/TBgT0wnjsW2CvPhu_5I5A4837.jpg",
    "v1794176166/kn1w6tWaiLvXmuLU_5I5A4786.jpg",
    "v1794176178/If0sbXoDyreMSfYH_5I5A4738.jpg",
    "v1794176205/G7BlY4AYgDSz7XvJ_5I5A4709.jpg",
    "v1794176233/-Xeg07BcUgTBnlqF_5I5A4699.jpg",
    "v1794176276/WEpWWsu3rhysEw8e_5I5A4679.jpg",
    "v1794176293/INkkXIJ0VyEWORhV_5I5A4597.jpg",
    "v1794176359/qCE8OzZeo7k3AGzz_5I5A4568.jpg",
]);

// Ruka's wedding
const RUKA_WEDDING = uniq([
    "v1794176601/4y7zMVmW3_OArSw4_9C0A9380.jpg",
    "v1794176658/QAmDZXMO0TPsI7x0_9C0A9328.jpg",
    "v1794176721/0i215eaxunE8oJbh_9C0A9241.jpg",
    "v1794176736/sKJIgJROMjgekztu_9C0A9149.jpg",
    "v1794176767/Wu0KQLZO6xfpTcLf_9C0A9180.jpg",
    "v1794176775/4FsfVVu90oCJ6ifP_9C0A9006.jpg",
    "v1794176791/FVaj3IdYFZLan3Li_9C0A9000.jpg",
    "v1794176819/MnqR_MzkCJSVHoq9_9C0A8856.jpg",
    "v1794176831/2jM09-QzT2nr2mbD_9C0A8828.jpg",
]);

const PREWEDDING = uniq([
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
]);

const ENGAGEMENT = uniq([
    "v1793734883/2fEpuu-j2JzhKH8k_5I5A0005.jpg",
    "v1793734892/JF1KtTaU7uApj72y_5I5A0176.jpg",
    "v1793734899/4PhcE8f4EE5vGVhy_5I5A2056.jpg",
    "v1793734910/eCjw1lenU-hURYsi_5I5A2486.jpg",
    "v1793734921/pK8ez6VVBk9XDZ1n_5I5A1730.jpg",
    "v1793734927/dwYvHAqXSlYe0tKI_5I5A0413.jpg",
    "v1793734953/ohptbf7edyIQrIsH_5I5A5872.jpg",
    "v1793734966/mTX56JMAt42HcakZ_5I5A1930.jpg",
    "v1793734978/9TEj1gkk1nbXpvuX_5I5A1808.jpg",
]);

const MATERNITY = uniq([
    "v1793576247/MxA6Q8tNd9uf1aW8__I5A0755-2.jpg",
    "v1793576253/a4kQCIFrws220Gs2__I5A0656-2.jpg",
    "v1793576281/ezktaGEHMY3WsQqt_5I5A0626.jpg",
    "v1793576294/qlRhqc1twvSd0d3x_5I5A0494.jpg",
    "v1793576322/Qh6i7BcT2nHXOWr5__I5A4239-3-2.jpg",
]);

// New maternity set (added)
const MATERNITY_2 = uniq([
    "v1793627397/B-eFBU41yIUY22UX__I5A2959.jpg",
    "v1793627390/EiVtwEyI7bJbileu__I5A2889.jpg",
    "v1793627409/JHTvBLu6ExL0Njke__I5A2799.jpg",
    "v1793627352/MyEvNBxI2zSRks5p__I5A2626.jpg",
    "v1793627368/i0yYquEiIP-_0o9-__I5A2365-1-.jpg",
    "v1793970782/pbRvw2d_Q02ZkKqb__I5A2871-.jpg",
    "v1793970797/Bsp505KC3OTihJzq__I5A2348.jpgg.jpg",
    "v1793970807/eTjSY1x9zlDY74rv__I5A2871.jpg",
    "v1793970817/IKXd7_PRAMaCYhjd__I5A2783.jpg",
    "v1793970830/1YSKFES498ASFBUB__I5A2421.jpg",
]);

const OUTDOOR = uniq([
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
]);

// Cubana event / AY Show
const EVENTS = uniq([
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
]);

const PROPOSAL = uniq([
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
]);

const KASSY = uniq([
    "v1793577042/83UXYrtEXvI5Hihz__I5A0335.jpg",
    "v1793576652/_I5A0257.jpg",
    "v1793577054/0jrMHZKGAutsLUrp__I5A0273.jpg",
    "v1793577073/gI4nXLmi0zKPp3gK__I5A0345.jpg",
    "v1793577088/8cW1QYeWzdTxHsQg__I5A0281.jpg",
]);

// Studio creative session (Hope Jay)
const HOPE_JAY = uniq([
    "v1793577206/5I5A6704.jpg",
    "v1793577213/_I5A0161.jpg",
    "v1793577203/5I5A6613.jpg",
    "v1793577350/QLXRwF_wajZ4m1hB__I5A0195.jpg",
    "v1793577364/B4Arx-S0JL2XE5Yg__I5A0211.jpg",
    "v1793577373/v5WML4_72nijKLLM_5I5A6652.jpg",
]);

// Studio creative session (second set)
const STUDIO_CREATIVE = uniq([
    "v1793626596/WWh4HcrOotXeIcXx_vs.jpg",
    "v1793626611/yoqdwxF7YM1mOrgL__I5A0211.jpg",
    "v1793626627/ruBCMib6VzclCdYb__I5A9774.jpg",
    "v1793626719/EBKGX29PJ3wyTMVV__I5A9795.jpg",
    "v1793626737/JAxSy4KqqzkOciT1__I5A9760.jpg",
    "v1793626838/pUMLFxe-TJHGbLs0__I5A9679.jpg",
    "v1793626850/Z-rjNpBinF6bdjuK__I5A9622.jpg",
    "v1793626894/NOwbKuTdNRtJBIG0__I5A9424.jpg",
    "v1793627258/tnrbiOocMOUJn0MS__I5A0456.jpg",
    "v1793627276/zVSChQDOmTbSrpJe__I5A0368.jpg",
    "v1793627284/fO4Reom4rxL3OBs4__I5A0578.jpg",
    "v1793627293/S6ucSEeRIvSH6_Yp__I5A0524.jpg",
    "v1793627303/4Gx9M2XCyWTt070f__I5A0627.jpg",
    "v1793627315/15YK-KYVmOvt-ZQs__I5A0645.jpg",
    "v1793627329/3vqTmJrSCboLa9df__I5A9439.jpg",
    "v1793627337/_4xm-S6pm3dT9ttm__I5A3197.jpg",
]);

const AMOKE_OGE = uniq([
    "v1793577599/U334mug2tx_Mv90E__I5A9636.jpg",
    "v1793577589/95r8X12GFkbFrv_8__I5A9598.jpg",
    "v1793577611/E1VPVul3VkLjGOx8__I5A9142.jpg",
    "v1793577627/0dME-gtGYoPklGq7__I5A9539.jpg",
    "v1793577633/mMtAnFhHqUYiY9ZS__I5A9574.jpg",
    "v1793577642/4XPekyjKbN1iH8Ln_amokeoge.jpg",
]);

const ART = uniq([
    "v1793618154/7tH7fd-rWQ-gOmY6__I5A2036.jpg",
    "v1793618161/YFp-EkqqTmXqS-H6_5I5A9579.jpg",
    "v1793618171/axLo5A5gbg34Jq8M_5I5A9590.jpg",
    "v1793618178/oIY8AvxcYELGpukL_750_4363.jpg",
    "v1793618191/OcAcmv8cKicOrFOk_750_4379.jpg",
    "v1793618201/_yR8yRMYsm_IlN66_5I5A9707.jpg",
    "v1793618212/t3kWT_CoXY6TkTfm_5I5A9678.jpg",
    "v1793618221/R9tqBpSPxRZafwUd_5I5A9612.jpg",
    "v1793618239/NVdgiE4jKkOcieZL_5I5A9453.jpg",
    "v1793618250/cVevgyKUl-RUqwwK_5I5A9506.jpg",
]);

const BOLU = uniq([
    "v1793618607/6h3mgf9UA3kB0i96__I5A9878.jpg",
    "v1793618616/lFZOKjB1bSyDwgOQ__I5A9740.jpg",
    "v1793618624/HhmbeuNM0tYDAQ_m__I5A9952.jpg",
    "v1793618631/O4XFnU6fYAMRWsoo__I5A9976.jpg",
    "v1793618642/XHE7ev-KO8biUQod__I5A9865.jpg",
    "v1793618647/4fcLy9GGl_3Ee9_h__I5A9757.jpg",
    "v1793618656/6enXFhF5lJddvpBZ__I5A9792.jpg",
    "v1793618667/YwnlbF2lq3Pnrdaj__I5A9741.jpg",
]);

const CHARLES = uniq([
    "v1793619237/II1ObkFoBHPYP2kG_5I5A9824.jpg",
    "v1793619253/PjlWWW90U15DYxYY_5I5A0020.jpg",
    "v1793619263/rMr4R42aYzjdh_4H_5I5A9803.jpg",
    "v1793619272/EmwtwdiC6nsqjlEs_5I5A9830.jpg",
    "v1793619294/g9uPDEGCicvtCWc7_5I5A9915.jpg",
    "v1793619306/qwY4dka5lM4AmCdE_5I5A9925.jpg",
    "v1793619317/CJEWR0tuSu0wVA-o_5I5A9929.jpg",
    "v1793619328/Vol9gY8V0SXmLy3Q_5I5A9958.jpg",
    "v1793619338/6Ju9vXAQ2yAxy1Gu_5I5A9975.jpg",
    "v1793619349/UOot19tmLElyroio_5I5A9971.jpg",
]);

const GRADUATION = uniq([
    "v1793619645/Jsd5vSaFDFg5FsOs_5I5A5349.jpg",
    "v1793619669/C2iSTxoeEqvnygCA_5I5A5294.jpg",
    "v1793619683/c8O5afjlfJHop8_r_5I5A5275.jpg",
    "v1793619692/Y8N2cEy1J7Lr6JmD_5I5A4419.jpg",
    "v1793619703/wOgMn5vNsrxUGE0n_5I5A4363.jpg",
    "v1793619714/ynPyv6vtKXoDZX7k_5I5A4398.jpg",
    "v1793619723/DODY_lOFZv62p_lv_5I5A4487.jpg",
]);

const MIDE = uniq([
    "v1793734369/0KMdJnGmS5b5FqPD_5I5A8719c.jpg",
    "v1793734382/F1osdJqAh0BL2CVf_5I5A8644.jpg",
    "v1793734389/COy9_Vy12OdaUjZd_5I5A8421-Edit.jpg",
    "v1793734397/IYZCAWChCP0RFtfa_5I5A8583.jpg",
    "v1793734404/Q8KknAfqpy58vgLj_5I5A8502.jpg",
    "v1793734434/NsKyjwxFZKLNjGem_5I5A8457.jpg",
]);

// A Summer for Fountain — landscape group pictures first, then portraits
const FOUNTAIN_GROUP = uniq([
    "v1793970852/m1q08iaWcRQ4vSLI_IMG_0850.jpg",
    "v1793970874/kqsrUQReKv0xCyMQ_IMG_0857.jpg",
    "v1793970896/OBjURp2oe1yEgtHX_IMG_0860.jpg",
    "v1793970924/5AXcPb9mgMis-jGz_IMG_0888.jpg",
    "v1793970934/gH2slHxGfcNhU0a0_IMG_0879-2.jpg",
]);

const FOUNTAIN_PORTRAITS = uniq([
    "v1793970957/qUGXopRT1Oj1n5lp_0S4A5887.jpg",
    "v1793970969/TIFxjjbQPnLKAaSe_0S4A5952.jpg",
    "v1793970998/PBCEyutFDXtDD1ft_5I5A3253.jpg",
    "v1793971023/8XCVArGgfWRD8iKo_5I5A3282.jpg",
    "v1793971054/wruJd5kLmTV38-0N_5I5A4338.jpg",
    "v1793971090/219EopZrIjy0JLKx_IMG_3424.jpg",
    "v1793971110/7R_M8NOZbfjf2PRC_IMG_3450.jpg",
    "v1793971131/8aLkWmFPaMp-zNhC_5I5A5959.jpg",
    "v1793971151/MSC8mB4TbPd3hzjN_5I5A6559.jpg",
    "v1793971671/c1TWLqovoQSdEVB1_DSC_0014.jpg",
    "v1793971681/7VUeg1smxtHprmzL_DSC_0089.jpg",
    "v1793971691/hRvvmb53AwLkeuIn_5I5A6608.jpg",
    "v1793971706/7Wbo05AKgbwZy3xb_5I5A6796.jpg",
    "v1793971725/FrGIiZtrWp8P83QC_5I5A7108.jpg",
    "v1793971746/J1o334MSbujlRZpd_5I5A7130.jpg",
    "v1793971767/GdV_S4BKOkaTzQsA_5I5A7173.jpg",
    "v1793971808/eySidVHfZN-VWUro_5I5A7196.jpg",
    "v1793971832/Doo9nkEKu4tZHqN-_5I5A7328.jpg",
    "v1793971844/_S7roUkDvZH-_JP-_5I5A7377.jpg",
    "v1793971859/Pm7tGNI9TS0KpiLj_0S4A5887.jpg",
]);

// ── HERO SLIDER ──────────────────────────────────────────────────────────────
// DESKTOP uses this grouped order exactly as written (3 photos per group).
// MOBILE + TABLET use HERO_SCATTERED below, so photos from the same group
// never appear next to each other.
const HERO_SLIDES: string[][] = [
    // 1
    [
        "v1794173681/9peMYHvbhEZXM2JX_5I5A6290.jpg",
        "v1794173821/zebLTkhJJaFk1CUT_5I5A6341.jpg",
        "v1794173693/8BrKS6RoDY0GUAhB_5I5A6302.jpg",
    ],
    // 2
    [
        "v1794173057/HjfhJyKUK_fAbM-K_9C0A0011.jpg",
        "v1794173045/DU_K15_Xs6znvMfs_9C0A0180.jpg",
        "v1794173031/rByJhVDES0GRfIJu_9C0A0202.jpg",
    ],
    // 3
    [
        "v1794173082/7JsW3en7XTuRUM8n_5I5A9177.jpg",
        "v1794173118/G1iO8IDLdYVRqqx2_5I5A9259.jpg",
        "v1794173105/mPNIDYJUtrlNjW5e_5I5A9201.jpg",
    ],
    // 4
    [
        "v1794173198/kxqNgygKAhjBryyt_D51A1854.jpg",
        "v1793619317/CJEWR0tuSu0wVA-o_5I5A9929.jpg",
        "v1794173210/29ivF3QGsjCpoOjQ_D51A1901.jpg",
    ],
    // 5
    [
        "v1794173225/H0DuQnBlbz5w33jM__I5A9880.jpg",
        "v1794173259/5t-24fE3bEDvgdl3__I5A0112.jpg",
        "v1794173247/NKtpoOLkwPu_JIcX__I5A0060.jpg",
    ],
    // 6
    [
        "v1794173281/CN8HpSrDu-HWNJTz_5I5A4709.jpg",
        "v1794173427/4k3HdpbQOIpKLsfi_5I5A0769.jpg",
        "v1794173317/CJXloVI1ulTOzRlE_5I5A4699.jpg",
    ],
    // 7
    [
        "v1793188407/L9uZYnh8ACE-mqt8_9C0A9380.jpg",
        "v1793188473/mouTh5g30T7cti4g_9C0A9241.jpg",
        "v1793188032/afT4w96C44uNmY4__gesumo.jpg",
    ],
    // 8
    [
        "v1794173526/6ISNSoRerF09gVlG_5I5A6419.jpg",
        "v1794173579/93vfsnqOgVlAqAvw_5I5A6467.jpg",
        "v1794173565/1VIPgNIeDynVcZYD_5I5A6446.jpg",
    ],
    // 9
    [
        "v1794173665/jK8p7GnZuw5_JDrC_IMG_0525.jpg",
        "v1794173509/LcTBO7wx4E_x1rBE_IMG_0614.jpg",
        "v1794173643/8eT7yrKgqCo9bkH9_IMG_0520.jpg",
    ],
    // 10
    [
        "v1794172995/GEusdS-5LA4w0-OM_9C0A0637_-2-.jpg",
        "v1794172789/wO0o6wv5UUNFLU5V_D51A1084.jpg",
        "v1794172966/da_Uphq2Hv6qdsS9_9C0A0640_-2-.jpg",
    ],
    // 11
    [
        "v1794173337/b4sqt2wFEcx5pk03_7E7A1091.jpg",
        "v1794173073/whoTPSBcSeqNl2-M_D51A3150.jpg",
        "v1794173463/Hek-nYQ_gfPcCjVK_5I5A2199.jpg",
    ],
    // 12
    [
        "v1793013874/agIlTKYofJOwHGKx_5I5A2870.jpg",
        "v1793014086/agEL06YofJOwHC4J_5I5A6759.jpg",
        "v1793014850/aGbPCXfc4bHWjB_k_IMG_0584.jpg",
    ],
    // 13
    [
        "v1793015011/aGaidnfc4bHWjBYf_5I5A1224.jpg",
        "v1793014187/aLyCWGGNHVfTOu7Z_WD3.jpg",
        "v1793014966/aGai8Hfc4bHWjBaC_5I5A1263.jpg",
    ],
    // 14
    [
        "v1793627276/zVSChQDOmTbSrpJe__I5A0368.jpg",
        "v1793619692/Y8N2cEy1J7Lr6JmD_5I5A4419.jpg",
        "v1793619645/Jsd5vSaFDFg5FsOs_5I5A5349.jpg",
    ],
].map(uniq);

// Mobile/tablet order: take photo #1 of every group, then #2 of every group,
// then #3 — so photos that were grouped together are never next to each other.
const interleave = (groups: string[][]): string[] => {
    const max = Math.max(...groups.map((g) => g.length));
    const out: string[] = [];
    for (let i = 0; i < max; i++) {
        for (const g of groups) if (g[i]) out.push(g[i]);
    }
    return uniq(out);
};

const HERO_SCATTERED = interleave(HERO_SLIDES);

// ─────────────────────────────────────────────────────────────────────────────
// IMAGES
// ─────────────────────────────────────────────────────────────────────────────
export const IMAGES = {
    // ── Hero slider — DESKTOP (grouped order, exactly as in HERO_SLIDES) ──────
    heroSlider: HERO_SLIDES.flat().map((p, i) =>
        pic(p, `CoffeeShotIt photography ${i + 1}`, 2000)
    ),

    // ── Hero slider — MOBILE + TABLET (scattered order, smaller files) ────────
    heroSliderMobile: HERO_SCATTERED.map((p, i) =>
        pic(p, `CoffeeShotIt photography ${i + 1}`, 1200)
    ),

    // ── Hero slider — grouped by slide (use if a slide shows 3 photos) ────────
    heroSlides: HERO_SLIDES.map((group, s) =>
        group.map((p, i) =>
            pic(p, `CoffeeShotIt photography slide ${s + 1} photo ${i + 1}`, 2000)
        )
    ),

    // ── About page hero ───────────────────────────────────────────────────────
    aboutHero: pic(
        "v1793017822/_J6to0wx10keiQXZ_5I5A0138.jpg",
        "Coffee — Professional Photographer",
        1800
    ),

    // ── Booking page category cards ───────────────────────────────────────────
    bookingCards: {
        wedding: pic(WEDDING[2], "Wedding Photography", 900),
        event: pic(EVENTS[0], "Event Photography", 900),
        studio: pic(PORTRAITS[0], "Studio & Outdoor Sessions", 900),
    },

    // ── TheVoice / Storyteller section (4 images) ─────────────────────────────
    storyteller: [
        pic(PORTRAITS[3], "Portrait photography by Coffee", 900),
        pic(RUKA_WEDDING[0], "Wedding photography Lagos", 900),
        pic(MATERNITY[0], "Maternity photography", 900),
        pic(PROPOSAL[0], "Proposal photography", 900),
    ] as Img[],

    // ── Stats section ─────────────────────────────────────────────────────────
    stats: {
        marquee: [
            pic(FOUNTAIN_PORTRAITS[0], "CoffeeShotIt work", 500),
            pic(RUKA_WEDDING[1], "CoffeeShotIt work", 500),
            pic(PORTRAITS[4], "CoffeeShotIt work", 500),
            pic(WEDDING[7], "CoffeeShotIt work", 500),
            pic(PREWEDDING[2], "CoffeeShotIt work", 500),
            pic(MATERNITY[1], "CoffeeShotIt work", 500),
            pic(OUTDOOR[4], "CoffeeShotIt work", 500),
            pic(EVENTS[3], "CoffeeShotIt work", 500),
            pic(PROPOSAL[1], "CoffeeShotIt work", 500),
            pic(AMOKE_OGE[0], "CoffeeShotIt work", 500),
        ] as Img[],
        featured: [
            pic(FOUNTAIN_GROUP[0], "CoffeeShotIt featured work", 1800),
            pic(RUKA_WEDDING[0], "CoffeeShotIt featured work", 1800),
            pic(EVENTS[0], "CoffeeShotIt featured work", 1800),
            pic(PORTRAITS[0], "CoffeeShotIt featured work", 1800),
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
            gallery: pics(
                [...RUKA_WEDDING, ...OPEYEMI_WEDDING, ...WEDDING],
                "Wedding photography"
            ),
        },
        {
            uid: "prewedding",
            label: "Pre-Wedding & Engagement",
            description:
                "Love stories told before the big day — relaxed, romantic and cinematic.",
            ...pic(PREWEDDING[2], "Pre-Wedding Photography", 1200),
            gallery: pics([...ENGAGEMENT, ...PREWEDDING], "Pre-wedding photography"),
        },
        {
            uid: "event",
            label: "Events",
            description:
                "Concerts, shows, birthdays, burials and corporate events — every celebration deserves to be remembered.",
            ...pic(EVENTS[0], "Event Photography", 1200),
            gallery: pics([ ...EVENTS], "Event photography"),
        },
        {
            uid: "portrait",
            label: "Portraits",
            description:
                "Studio & outdoor portraits — personal branding, headshots, and creative sessions.",
            ...pic(PORTRAITS[0], "Portrait Photography", 1200),
            gallery: pics(
                [...FOUNTAIN_PORTRAITS, ...PORTRAITS, ...STUDIO_CREATIVE, ...ART],
                "Portrait photography"
            ),
        },
        {
            uid: "maternity",
            label: "Maternity",
            description:
                "Elegant, tender portraits that celebrate this season of life.",
            ...pic(MATERNITY[0], "Maternity Photography", 1200),
            gallery: pics([...MATERNITY, ...MATERNITY_2], "Maternity photography"),
        },
        {
            uid: "graduation",
            label: "Graduation",
            description:
                "Cap, gown and the proud moment — graduation portraits worth framing.",
            ...pic(GRADUATION[0], "Graduation Photography", 1200),
            gallery: pics(GRADUATION, "Graduation photography"),
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
        image: pic(WEDDING[2], "Wedding Photography", 1200),
    },
    {
        uid: "prewedding",
        title: "Pre-Wedding & Engagement",
        subtitle: "Love Story Sessions",
        description:
            "Relaxed, romantic sessions that capture who you are as a couple before the big day. Perfect for save-the-dates, invitations and wedding-day displays.",
        image: pic(WEDDING[0], "Pre-Wedding Photography", 1200),
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
    { uid: "graduation", title: "Graduation" },
    { uid: "outdoor", title: "Outdoor" },
    { uid: "proposal", title: "Proposals" },
];

// ── Projects ──────────────────────────────────────────────────────────────────
// ORDER MATTERS: newest / most important first.
// uid must be unique (used in the URL: /projects/[uid])
// TODO: replace the placeholder dates / locations / client names with real ones.
export const PROJECTS = [
    {
        uid: "summer-for-fountain",
        title: "A Summer for Fountain",
        category: "event",
        client: "Fountain", // TODO: real client / organiser
        location: "Lagos, Nigeria", // TODO: real location
        date: "2026-11-01", // TODO: real date
        description:
            "A summer to remember — wide group frames full of energy, plus individual portraits that capture every personality.",
        coverImage: pic(FOUNTAIN_GROUP[0], "A Summer for Fountain", 1800),
        gallery: pics(
            [...FOUNTAIN_GROUP, ...FOUNTAIN_PORTRAITS],
            "A Summer for Fountain"
        ),
    },
    {
        uid: "ruka-wedding",
        title: "Ruka's Wedding",
        category: "wedding",
        client: "Ruka", // TODO: couple's full names
        location: "Lagos, Nigeria", // TODO: real venue
        date: "2026-10-20", // TODO: real date
        description:
            "A beautiful wedding celebration filled with joy, elegance, and unforgettable moments. Captured in Coffee's signature cinematic style.",
        coverImage: pic(RUKA_WEDDING[0], "Ruka's Wedding", 1800),
        gallery: pics(RUKA_WEDDING, "Ruka's Wedding"),
    },
    {
        uid: "opeyemi-wedding",
        title: "Opeyemi's Wedding",
        category: "wedding",
        client: "Opeyemi", // TODO: couple's full names
        location: "Lagos, Nigeria", // TODO: real venue
        date: "2026-10-10", // TODO: real date
        description:
            "Timeless frames from a day of love, laughter and family — every detail told as a story.",
        coverImage: pic(OPEYEMI_WEDDING[0], "Opeyemi's Wedding", 1800),
        gallery: pics(OPEYEMI_WEDDING, "Opeyemi's Wedding"),
    },
    {
        uid: "cubana-event",
        title: "Cubana Event",
        category: "event",
        client: "Cubana",
        location: "Lagos, Nigeria", // TODO: real venue
        date: "2026-09-15", // TODO: real date
        description:
            "Energy, laughter and star power. Coverage of the AY Show at the Cubana event — from the stage to the crowd, every standout moment captured.",
        coverImage: pic(EVENTS[0], "Cubana Event — AY Show", 1800),
        gallery: pics(EVENTS, "Cubana Event — AY Show"),
    },
    {
        uid: "amoke-oge-shoot",
        title: "Amoke Oge Shoot",
        category: "portrait",
        client: "Amoke Oge",
        location: "Lagos, Nigeria", // TODO
        date: "2026-09-01", // TODO
        description:
            "A confident, editorial portrait session built around personality, light and style.",
        coverImage: pic(AMOKE_OGE[0], "Amoke Oge Shoot", 1400),
        gallery: pics(AMOKE_OGE, "Amoke Oge Shoot"),
    },
    {
        uid: "bolu-shoot",
        title: "Bolu's Shoot",
        category: "portrait",
        client: "Bolu",
        location: "Lagos, Nigeria", // TODO
        date: "2026-08-25", // TODO
        description:
            "A confident portrait session with strong styling, mood and clean, cinematic frames.",
        coverImage: pic(BOLU[0], "Bolu's Shoot", 1400),
        gallery: pics(BOLU, "Bolu's Shoot"),
    },
    {
        uid: "charles-born",
        title: "Charles Born",
        category: "portrait",
        client: "Charles",
        location: "Lagos, Nigeria", // TODO
        date: "2026-08-20", // TODO
        description:
            "A sharp, stylish portrait session built around presence and personality.",
        coverImage: pic(CHARLES[0], "Charles Born", 1400),
        gallery: pics(CHARLES, "Charles Born"),
    },
    {
        uid: "graduation-sessions",
        title: "Graduation Sessions",
        category: "graduation",
        client: "Various Clients",
        location: "Lagos, Nigeria", // TODO
        date: "2026-08-10", // TODO
        description:
            "Cap, gown and the proud moment — graduation portraits full of joy and achievement.",
        coverImage: pic(GRADUATION[2], "Graduation Sessions", 1400),
        gallery: pics(GRADUATION, "Graduation Sessions"),
    },
    {
        uid: "mide-to-the-world",
        title: "Mide to the World",
        category: "portrait",
        client: "Mide",
        location: "Lagos, Nigeria", // TODO
        date: "2026-08-05", // TODO
        description:
            "A bold, expressive session introducing Mide to the world.",
        coverImage: pic(MIDE[0], "Mide to the World", 1400),
        gallery: pics(MIDE, "Mide to the World"),
    },
    {
        uid: "engagement-stories",
        title: "Engagement Stories",
        category: "prewedding",
        client: "Various Couples",
        location: "Lagos, Nigeria", // TODO
        date: "2026-07-25", // TODO
        description:
            "Relaxed, romantic engagement sessions full of chemistry and personality.",
        coverImage: pic(ENGAGEMENT[0], "Engagement Stories", 1400),
        gallery: pics(ENGAGEMENT, "Engagement Stories"),
    },
    {
        uid: "studio-creative-session",
        title: "Studio Creative Session",
        category: "portrait",
        client: "Various Clients",
        location: "Lagos, Nigeria", // TODO
        date: "2026-07-15", // TODO
        description:
            "Creative studio concepts shaped by light, colour and attitude.",
        coverImage: pic(STUDIO_CREATIVE[0], "Studio Creative Session", 1400),
        gallery: pics(STUDIO_CREATIVE, "Studio Creative Session"),
    },
    {
        uid: "art-shoot",
        title: "Art",
        category: "portrait",
        client: "Various Clients",
        location: "Lagos, Nigeria", // TODO
        date: "2026-07-10", // TODO
        description:
            "Art-driven portraits where styling and light do the storytelling.",
        coverImage: pic(ART[0], "Art", 1400),
        gallery: pics(ART, "Art"),
    },
    {
        uid: "kassy-shoot",
        title: "Kassy Shoot",
        category: "portrait",
        client: "Kassy",
        location: "Lagos, Nigeria", // TODO
        date: "2026-07-01", // TODO
        description:
            "A bold creative portrait session with strong styling and cinematic lighting.",
        coverImage: pic(KASSY[0], "Kassy Shoot", 1400),
        gallery: pics(KASSY, "Kassy Shoot"),
    },
    {
        uid: "hope-jay-shoot",
        title: "Studio Sessions",
        category: "portrait",
        client: "Hope Jay",
        location: "Lagos, Nigeria", // TODO
        date: "2026-06-20", // TODO
        description:
            "A polished studio creative session focused on mood, expression and clean, timeless frames.",
        coverImage: pic(HOPE_JAY[0], "Hope Jay Shoot", 1400),
        gallery: pics(HOPE_JAY, "Hope Jay Shoot"),
    },
    {
        uid: "maternity-sessions",
        title: "Maternity Sessions",
        category: "maternity",
        client: "Various Clients",
        location: "Lagos, Nigeria",
        date: "2026-06-10", // TODO
        description:
            "Soft, elegant portraits celebrating motherhood-to-be, styled with care and shot with warmth.",
        coverImage: pic(MATERNITY[0], "Maternity Sessions", 1400),
        gallery: pics([...MATERNITY, ...MATERNITY_2], "Maternity session"),
    },
    {
        uid: "pre-wedding-engagement",
        title: "Pre-Wedding & Engagement Sessions",
        category: "prewedding",
        client: "Various Couples",
        location: "Lagos, Nigeria",
        date: "2026-02-01", // TODO: real date
        description:
            "A collection of love stories shot before the big day — relaxed, romantic and full of personality.",
        coverImage: pic(PREWEDDING[2], "Pre-Wedding & Engagement Sessions", 1400),
        gallery: pics(PREWEDDING, "Pre-wedding session"),
    },
    {
        uid: "outdoor-sessions",
        title: "Outdoor Sessions",
        category: "outdoor",
        client: "Various Clients",
        location: "Lagos, Nigeria",
        date: "2026-03-01", // TODO: real date
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
        date: "2026-02-14", // TODO: real date
        description:
            "The question, the reaction, the yes. Discreet coverage of proposals captured exactly as they unfolded.",
        coverImage: pic(PROPOSAL[0], "Proposal Stories", 1400),
        gallery: pics(PROPOSAL, "Proposal photography"),
    },
];

// Featured projects shown on the homepage (use project UIDs; first = large card)
export const FEATURED_PROJECT_UIDS = [
    "summer-for-fountain",
    "ruka-wedding",
    "opeyemi-wedding",
    "cubana-event",
    "amoke-oge-shoot",
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