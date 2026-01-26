"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "./ui/carousel";
import { cn } from "../lib/utils";

const defaultLogos = [
    {
        id: "google",
        description: "Google",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        className: "h-8 w-auto opacity-80 hover:opacity-100 transition-opacity",
    },
    {
        id: "microsoft",
        description: "Microsoft",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
        className: "h-8 w-auto opacity-80 hover:opacity-100 transition-opacity",
    },
    {
        id: "amazon",
        description: "Amazon",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg",
        className: "h-8 w-auto opacity-80 hover:opacity-100 transition-opacity pt-1",
    },
    {
        id: "hp",
        description: "HP",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
        className: "h-10 w-auto opacity-80 hover:opacity-100 transition-opacity",
    },
    {
        id: "meta",
        description: "Meta",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
        className: "h-8 w-auto opacity-80 hover:opacity-100 transition-opacity",
    },
    {
        id: "netflix",
        description: "Netflix",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
        className: "h-8 w-auto opacity-80 hover:opacity-100 transition-opacity",
    },
    {
        id: "apple",
        description: "Apple",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
        className: "h-8 w-auto opacity-80 hover:opacity-100 transition-opacity dark:invert",
    },
];

export function LogosMarquee({
    heading = "Trusted by world-class companies",
    logos = defaultLogos,
    className,
}) {
    return (
        <section className={cn("py-20 bg-slate-50 dark:bg-black/50 border-y border-slate-200 dark:border-white/5", className)}>
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-xl font-semibold text-slate-500 dark:text-slate-400 mb-12 tracking-tight">
                    {heading}
                </h2>
                <div className="relative mx-auto max-w-7xl">
                    <Carousel
                        opts={{ loop: true }}
                        plugins={[AutoScroll({ playOnInit: true, speed: 1, stopOnInteraction: false })]}
                        className="w-full"
                    >
                        <CarouselContent className="ml-0 flex items-center">
                            {logos.map((logo) => (
                                <CarouselItem
                                    key={logo.id}
                                    className="flex basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 justify-center pl-0"
                                >
                                    <div className="mx-8 flex items-center justify-center select-none pointer-events-none">
                                        <img
                                            src={logo.image}
                                            alt={logo.description}
                                            className={logo.className}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    {/* Gradient Fades for Smooth Edges */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 dark:from-black via-slate-50/80 dark:via-black/80 to-transparent pointer-events-none z-10"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 dark:from-black via-slate-50/80 dark:via-black/80 to-transparent pointer-events-none z-10"></div>
                </div>
            </div>
        </section>
    );
}
