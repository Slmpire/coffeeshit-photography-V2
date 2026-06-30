import Image from "next/image";
import Link from "next/link";

export default function ContactCTA() {
    return (
        <section className='w-full bg-black text-white min-h-screen flex flex-col items-center px-2 md:px-0 py-16 relative'>
            {/* Top Heading */}
            <h1 className='text-4xl md:text-7xl font-extrabold text-center mt-4 mb-6 leading-tight uppercase'>
                LET'S CREATE
                <br />
                SOMETHING
                <br />
                AMAZING
            </h1>
            {/* Reach Me Button */}
            <div className='flex flex-col items-center mb-8'>
                <Link
                    href='/contact'
                    className='bg-white text-black px-6 py-2 rounded-md font-semibold mb-2 hover:bg-gray-200 transition'
                >
                    Reach me today
                </Link>
            </div>
            {/* Info Row */}
            <div className='w-full max-w-4xl flex lg:flex-row flex-col justify-between items-center mb-6'>
                <div className='text-xs md:text-sm font-bold uppercase text-white/80 text-left'>
                    BASED IN LAGOS,
                    <br />
                    NIGERIA
                </div>
                <div className='flex-1 flex justify-center'>
                    <div className='rounded-2xl overflow-hidden shadow-2xl max-w-xs'>
                        <Image
                            src='https://images.prismic.io/coffeeshotit/aFS4vnfc4bHWijt6_Coffee.jpg?auto=format,compress'
                            alt='Coffee Shotit'
                            width={350}
                            height={450}
                            className='object-cover rounded-xl w-full h-[420px]'
                        />
                    </div>
                </div>
                <div className='text-xs md:text-sm font-bold uppercase text-white/80 text-right'>
                    PROFESSIONAL
                    <br />
                    PHOTOGRAPHER •<br />
                    CREATIVE DIRECTOR
                </div>
            </div>
            {/* Intro Text */}
            <div className='w-full flex justify-center mb-8'>
                <p className='text-base md:text-lg font-bold text-center uppercase max-w-2xl'>
                    I'M COFFEE SHOTIT, A PHOTOGRAPHER WHO SEES STORIES IN EVERY
                    MOMENT. WITH A PASSION FOR EMOTION AND DETAIL, I CAPTURE
                    LOVE, LIGHT, AND MEMORIES THAT LAST FOREVER.
                </p>
            </div>
            {/* Social Links */}
            <div className='w-full flex justify-center gap-8 mt-2'>
                <Link
                    href='https://instagram.com/coffeeshotit'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-bold uppercase underline underline-offset-4'
                >
                    Instagram ↗
                </Link>
                <Link
                    href='https://twitter.com/coffeeshotit'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-bold uppercase underline underline-offset-4'
                >
                    Twitter ↗
                </Link>
            </div>
        </section>
    );
}
