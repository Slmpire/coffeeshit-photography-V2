export default function Signature() {
    return (
        <footer className='w-full flex flex-col items-center py-8 bg-black text-white'>
            <div className='text-4xl font-signature mb-2'>Coffee Shotit</div>
            <div className='text-sm text-white/60'>
                &copy; {new Date().getFullYear()} Coffee Shotit. All rights
                reserved.
            </div>
        </footer>
    );
}
