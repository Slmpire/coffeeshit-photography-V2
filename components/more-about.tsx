import Image from "next/image";
import Link from "next/link";

export default function MoreAbout() {
    return (
        <section className='w-full bg-black text-white min-h-screen flex flex-col items-center px-4 md:px-0 py-16'>
            {/* Top Row */}
            <div className='w-full max-w-5xl grid grid-cols-3 gap-4 items-center mb-2 text-xs font-semibold tracking-widest'>
                <div className='text-white/60'>03</div>
                <div className='text-center text-white/80'>//WHO AM I</div>
                <div className='text-right text-white/60'>
                    BEYOND PHOTOGRAPHY
                </div>
            </div>
            {/* Heading */}
            <h1 className='text-4xl md:text-5xl font-extrabold text-center mt-8 mb-8 drop-shadow-lg tracking-tight'>
                MORE ABOUT
                <br />
                COFFEE SHOTIT
            </h1>
            {/* Portrait Image */}
            <div className='w-full flex justify-center mb-8'>
                <div className='rounded-2xl overflow-hidden shadow-2xl max-w-xs'>
                    <Image
                        src='https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress'
                        alt='Coffee Shotit'
                        width={350}
                        height={450}
                        className='object-cover w-full h-[420px]'
                    />
                </div>
            </div>
            {/* Bold Subheading */}
            <div className='w-full flex justify-center mb-4'>
                <h2 className='text-base md:text-lg font-extrabold text-center uppercase max-w-2xl leading-tight'>
                    WITH AN EYE FOR DETAIL AND A LOVE FOR STORYTELLING, I
                    SPECIALIZE IN WEDDING, PORTRAIT, AND ENGAGEMENT PHOTOGRAPHY,
                    TURNING EMOTIONS INTO TIMELESS IMAGES.
                </h2>
            </div>
            {/* Paragraph */}
            <div className='w-full flex justify-center mb-8'>
                <p className='text-sm md:text-base text-center max-w-2xl text-white/90'>
                    With every click of the shutter, I seek to capture beauty in
                    its truest form raw, radiant, and real. From the joy of "I
                    do" to the quiet confidence of a portrait, and the tender
                    moments of an engagement, my lens tells stories that speak.
                    My style is honest yet artful, blending light, emotion, and
                    thoughtful composition to craft timeless visuals that linger
                    in the heart.
                </p>
            </div>
            {/* Button */}
            <div className='w-full flex justify-center'>
                <Link
                    href='/contact'
                    className=' text-white px-6 py-2  max-w-md font-semibold relative transition'
                >
                    Reach me
                    <span className='absolute  bg-white backdrop-blur-sm w-full h-[1px] bottom-0 left-0'></span>
                </Link>
            </div>
        </section>
    );
}
