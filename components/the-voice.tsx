import Image from "next/image";
import { StoryTellerDocument } from "@/prismicio-types";

interface TheVoiceProps {
    storyTellerImages: StoryTellerDocument[];
}

const images = [
    "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
    "https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress",
    "https://images.prismic.io/coffeeshotit/aFWAGnfc4bHWilBg_5I5A0292-2.jpg?auto=format,compress",
    "/placeholder.jpg",
    "/placeholder.jpg",
];

export default function TheVoice({ storyTellerImages }: TheVoiceProps) {
    return (
        <section className='w-full bg-black text-white min-h-screen flex flex-col items-center px-2 md:px-0 py-16'>
            {/* Top Row */}
            <div className='w-full max-w-5xl grid grid-cols-3 items-center mb-2 text-xs font-semibold tracking-widest'>
                <div className='text-white/60'>05</div>
                <div className='text-center text-white/80'>//STORYTELLER</div>
                <div className='text-right text-white/60'>SINCE 2020</div>
            </div>
            {/* Heading */}
            <h1 className='text-2xl md:text-4xl font-extrabold text-center mt-8 mb-4 tracking-tight leading-tight uppercase max-w-3xl mx-auto'>
                Through my eyes, light becomes poetry, love leaves its trace,
                and time stands still. Every shot holds a heartbeat, each image,
                a tale waiting to be told.
            </h1>
            {/* Signature/Initials */}
            <div className='text-center mb-10'>
                <span className='text-3xl md:text-4xl font-signature'>DM</span>
            </div>
            {/* Image Grid */}
            <div className='w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8'>
                {/* <div className='flex  flex-col gap-8'> */}
                {storyTellerImages.length > 0 &&
                    storyTellerImages[0]?.data.images.map((image, index) => (
                        <Image
                            key={index}
                            src={image.image.url ?? ""}
                            alt={image.image.alt as string}
                            width={500}
                            height={350}
                            className='rounded-xl object-cover w-full h-64'
                            sizes='(max-width: 768px) 100vw, 50vw'
                        />
                    ))}
                {/* </div> */}
            </div>
        </section>
    );
}
