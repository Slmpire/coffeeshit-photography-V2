import Image from "next/image";

export default function FeaturedPhoto() {
    return (
        <section className='w-full flex flex-col items-center py-16 bg-black'>
            <Image
                src='/placeholder.jpg'
                alt='Featured'
                width={500}
                height={500}
                className='rounded-lg object-cover grayscale shadow-lg'
            />
            <figcaption className='text-white text-lg mt-4 italic'>
                Capturing moments that last a lifetime.
            </figcaption>
        </section>
    );
}
