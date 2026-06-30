import Image from "next/image";

const images = Array(6).fill("/placeholder.jpg");

export default function GalleryGrid() {
    return (
        <section className='w-full py-16 bg-black'>
            <h2 className='text-3xl font-bold text-white mb-8 text-center'>
                THROUGH MY LENS
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
                {images.map((src, i) => (
                    <div
                        key={i}
                        className='overflow-hidden rounded-lg shadow-lg'
                    >
                        <Image
                            src={src}
                            alt={`Gallery image ${i + 1}`}
                            width={400}
                            height={300}
                            className='object-cover w-full h-64 hover:scale-105 transition-transform duration-300'
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
