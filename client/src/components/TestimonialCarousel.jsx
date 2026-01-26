import * as React from "react";
import { cn } from "@/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "./ui/carousel";

export const TestimonialCarousel = React.forwardRef(
    ({ className, testimonials, companyLogoPath = "", avatarPath = "", ...props }, ref) => {
        const [api, setApi] = React.useState();
        const [current, setCurrent] = React.useState(0);

        React.useEffect(() => {
            if (!api) return;
            api.on("select", () => {
                setCurrent(api.selectedScrollSnap());
            });
        }, [api]);

        return (
            <div ref={ref} className={cn("py-16", className)} {...props}>
                <Carousel
                    setApi={setApi}
                    className="max-w-screen-xl mx-auto px-4 lg:px-8"
                >
                    <CarouselContent>
                        {testimonials.map((testimonial) => (
                            <CarouselItem
                                key={testimonial.company}
                                className="flex flex-col items-center cursor-grab"
                            >
                                <div className="mb-7 relative h-8 w-32 flex items-center justify-center">
                                    {/* Placeholder for company logo if no path provided */}
                                    {testimonial.logo ? (
                                        <img
                                            src={testimonial.logo}
                                            alt={`${testimonial.company} logo`}
                                            className="object-contain h-full w-full"
                                            draggable={false}
                                        />
                                    ) : (
                                        <span className="text-xl font-bold text-slate-400">{testimonial.company}</span>
                                    )}

                                </div>
                                <p className="max-w-xl text-balance text-center text-xl sm:text-2xl text-slate-800 font-medium">
                                    "{testimonial.review}"
                                </p>
                                <h5 className="mt-5 font-medium text-slate-600">
                                    {testimonial.name}
                                </h5>
                                <h5 className="mt-1.5 font-medium text-slate-400">
                                    {testimonial.role}
                                </h5>
                                <div className="mt-5 relative size-12 rounded-full overflow-hidden bg-slate-100">
                                    {testimonial.avatar ? (
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="object-cover h-full w-full"
                                        />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold bg-slate-200">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className="mt-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "size-1.5 rounded-full transition-all",
                                    index === current ? "bg-brand-600 w-4" : "bg-brand-200"
                                )}
                                onClick={() => api?.scrollTo(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
);

TestimonialCarousel.displayName = "TestimonialCarousel";
