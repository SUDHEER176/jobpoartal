import { cn } from "@/lib/utils"

export function TestimonialCard({ author, text, href, className, ...props }) {
    return (
        <div
            className={cn(
                "flex w-[320px] shrink-0 flex-col justify-between gap-4 rounded-xl p-6",
                "bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-sm transition-all hover:bg-slate-800/80 hover:shadow-md",
                className
            )}
            {...props}
        >
            <div className="flex flex-col gap-4">
                {/* User Info */}
                <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-800">
                        <img
                            src={author.avatar}
                            alt={author.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white leading-none">
                            {author.name}
                        </span>
                        <span className="text-xs text-slate-400 mt-1">
                            {author.role || author.handle}
                        </span>
                    </div>
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-300 leading-relaxed">
                    "{text}"
                </p>
            </div>
        </div>
    )
}
