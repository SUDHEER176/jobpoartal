import { cn } from "@/lib/utils"
import { TestimonialCard } from "@/components/ui/testimonial-card"

const defaultTestimonials = [
    {
        author: {
            name: "Sarah Johnson",
            role: "Senior Developer",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
        },
        text: "JobPortal helped me find my dream job in less than a week. The process was incredibly smooth and the filters made it easy to find exactly what I was looking for."
    },
    {
        author: {
            name: "Michael Chen",
            role: "Product Manager",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
        },
        text: "As a recruiter, I've never used a platform that delivers such high-quality candidates. The dashboard is intuitive and powerful."
    },
    {
        author: {
            name: "Emily Davis",
            role: "UX Designer",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
        },
        text: "The simplified application process is a game changer. I love how I can track all my applications in one place."
    },
    {
        author: {
            name: "David Wilson",
            role: "Frontend Engineer",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
        },
        text: "The job alerts are spot on. I got notified about my current role just 2 hours after it was posted. Highly recommended!"
    }
];

export function TestimonialsSection({
    title = "What Our Users Say",
    description = "Join thousands of professionals who found their dream job through our platform.",
    testimonials = defaultTestimonials,
    className
}) {
    return (
        <section className={cn(
            "bg-white dark:bg-black text-slate-900 dark:text-slate-200",
            "py-12 sm:py-24 md:py-32 px-0 transition-colors duration-300",
            className
        )}>
            <div className="mx-auto flex w-full flex-col items-center gap-4 text-center sm:gap-16">
                <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
                    <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight text-slate-900 dark:text-white">
                        {title}
                    </h2>
                    <p className="text-md max-w-[600px] font-medium text-slate-600 dark:text-slate-400 sm:text-xl">
                        {description}
                    </p>
                </div>

                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                    <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:60s]">
                        <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
                            {/* Render testimonials multiple times to ensure smooth scrolling */}
                            {[...Array(4)].map((_, setIndex) => (
                                testimonials.map((testimonial, i) => (
                                    <TestimonialCard
                                        key={`${setIndex}-${i}`}
                                        {...testimonial}
                                    />
                                ))
                            ))}
                        </div>
                        {/* Duplicate the same content for seamless loop */}
                        <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]" aria-hidden="true">
                            {[...Array(4)].map((_, setIndex) => (
                                testimonials.map((testimonial, i) => (
                                    <TestimonialCard
                                        key={`duplicate-${setIndex}-${i}`}
                                        {...testimonial}
                                    />
                                ))
                            ))}
                        </div>
                    </div>

                    <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-white dark:from-black to-transparent sm:block" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-white dark:from-black to-transparent sm:block" />
                </div>
            </div>
        </section>
    )
}
