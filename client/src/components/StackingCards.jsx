'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll } from 'motion/react';
import { useRef } from 'react';

const projects = [
    {
        title: "Leadership & Strategy",
        description: "Guide teams to success with executive-level opportunities.",
        link: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        color: "#60a5fa" // Light Blue
    },
    {
        title: "Global Networks",
        description: "Connect with professionals across 50+ countries.",
        link: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
        color: "#3b82f6" // Blue
    },
    {
        title: "Tech Innovation",
        description: "Work with cutting-edge technologies and startups.",
        link: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
        color: "#4f46e5" // Indigo
    },
    {
        title: "Creative Studios",
        description: "Join award-winning design and creative agencies.",
        link: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
        color: "#e879f9" // Pink
    },
    {
        title: "High Growth",
        description: "Accelerate your career in fast-growing sectors.",
        link: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        color: "#f97316" // Orange
    }
];

const Card = ({
    i,
    title,
    description,
    url,
    color,
    progress,
    range,
    targetScale,
}) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start'],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div
            ref={container}
            className='h-screen flex items-start justify-center sticky top-0'
        >
            <motion.div
                style={{
                    backgroundColor: color,
                    scale,
                    top: `calc(10vh + ${i * 25}px)`, // Start from 10vh down, increment by 25px
                }}
                className={`flex flex-col relative h-[450px] w-[90%] md:w-[70%] rounded-[2rem] border border-white/10 p-10 origin-top shadow-2xl overflow-hidden`}
            >
                <h2 className='text-3xl text-center font-bold text-white mb-6 tracking-tight'>{title}</h2>
                <div className={`flex flex-col md:flex-row h-full gap-8`}>
                    <div className={`w-full md:w-[40%] relative md:top-[5%]`}>
                        <p className='text-xl text-white/90 leading-relaxed font-medium'>{description}</p>
                        <span className='flex items-center gap-3 pt-6 group cursor-pointer'>
                            <span className='text-white font-bold text-lg group-hover:underline decoration-2 underline-offset-4'>
                                See more
                            </span>
                            <svg
                                width='22'
                                height='12'
                                viewBox='0 0 22 12'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='transition-transform group-hover:translate-x-1'
                            >
                                <path
                                    d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                                    fill='white'
                                />
                            </svg>
                        </span>
                    </div>

                    <div
                        className={`relative w-full md:w-[60%] h-full rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-black/20`}
                    >
                        <motion.div
                            className={`w-full h-full`}
                            style={{ scale: imageScale }}
                        >
                            <img src={url} alt={title} className='absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity' />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export function StackingCards() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    return (
        <ReactLenis root>
            <div className='bg-black' ref={container}>
                <section className='text-white h-[40vh] w-full bg-black grid place-content-center sticky top-0 z-10'>
                    <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

                    <div className="relative z-10 text-center space-y-4 px-4">
                        <h2 className='text-5xl md:text-7xl font-bold tracking-tight'>
                            Your Career <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Journey</span>
                        </h2>
                        <p className="text-xl text-slate-400">Scroll down to explore 👇</p>
                    </div>
                </section>

                <section className='text-white w-full bg-black relative z-20 pb-20'>
                    {projects.map((project, i) => {
                        const targetScale = 1 - (projects.length - i) * 0.05;
                        return (
                            <Card
                                key={`p_${i}`}
                                i={i}
                                url={project.link}
                                title={project.title}
                                color={project.color}
                                description={project.description}
                                progress={scrollYProgress}
                                range={[i * 0.25, 1]}
                                targetScale={targetScale}
                            />
                        );
                    })}
                </section>
            </div>
        </ReactLenis>
    );
}
