export default function Loading() {
    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-white/10 border-t-amber-400 rounded-full animate-spin" />
                <span className="text-[10px] text-white/20 uppercase tracking-[0.5em]">Loading</span>
            </div>
        </div>
    );
}
