import { ChevronRightIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn, getRGBA } from "../lib/utils";

const FlickeringGrid = ({
    squareSize = 3,
    gridGap = 3,
    flickerChance = 0.2,
    color = "#B4B4B4",
    width,
    height,
    className,
    maxOpacity = 0.15,
    text = "",
    fontSize = 140,
    fontWeight = 600,
    ...props
}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    const maskRef = useRef(null);
    const bucketsRef = useRef(new Array(101).fill(null).map(() => []));

    const opacityTable = useMemo(() => {
        const rgba = getRGBA(color);
        const match = rgba.match(/rgba?\((\d+,\s*\d+,\s*\d+)/);
        const base = match ? match[1] : "180, 180, 180";
        return Array.from({ length: 101 }, (_, i) => `rgba(${base}, ${i / 100})`);
    }, [color]);

    const setupMask = useCallback((w, h, cols, rows, dpr) => {
        if (!text) {
            maskRef.current = null;
            return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.fillStyle = "white";
        ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(text.toUpperCase(), (w / dpr) / 2, (h / dpr) / 2);
        ctx.restore();

        const mask = new Uint8Array(cols * rows);
        const data = ctx.getImageData(0, 0, w, h).data;
        const gap = squareSize + gridGap;

        for (let i = 0; i < cols; i++) {
            const x = Math.floor((i * gap + squareSize / 2) * dpr);
            if (x >= w) continue;
            for (let j = 0; j < rows; j++) {
                const y = Math.floor((j * gap + squareSize / 2) * dpr);
                if (y >= h) continue;
                const idx = (y * w + x) * 4;
                if (data[idx + 3] > 120) {
                    mask[i * rows + j] = 1;
                }
            }
        }
        maskRef.current = mask;
    }, [text, fontSize, squareSize, gridGap]);

    const drawGrid = useCallback(
        (ctx, w, h, cols, rows, squares, dpr) => {
            ctx.clearRect(0, 0, w, h);
            const mask = maskRef.current;
            const gap = squareSize + gridGap;
            const size = squareSize * dpr;
            const unit = gap * dpr;
            const bRef = bucketsRef.current;

            for (let b = 0; b <= 100; b++) bRef[b].length = 0;

            for (let i = 0; i < cols; i++) {
                const x = i * unit;
                const colOffset = i * rows;
                for (let j = 0; j < rows; j++) {
                    const opacity = squares[colOffset + j];
                    const hasText = mask ? mask[colOffset + j] : false;
                    const finalOpacity = hasText ? Math.min(1, opacity * 3 + 0.5) : opacity;

                    if (finalOpacity > 0.05) {
                        const idx = Math.floor(finalOpacity * 100);
                        bRef[idx].push(x, j * unit);
                    }
                }
            }

            for (let b = 0; b <= 100; b++) {
                const bucket = bRef[b];
                const count = bucket.length;
                if (count === 0) continue;
                ctx.fillStyle = opacityTable[b];
                for (let k = 0; k < count; k += 2) {
                    ctx.fillRect(bucket[k], bucket[k + 1], size, size);
                }
            }
        },
        [opacityTable, squareSize, gridGap]
    );

    const setupCanvas = useCallback(
        (canvas, width, height) => {
            const dpr = window.devicePixelRatio || 1;
            const w = width * dpr;
            const h = height * dpr;
            canvas.width = w;
            canvas.height = h;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            const cols = Math.ceil(width / (squareSize + gridGap));
            const rows = Math.ceil(height / (squareSize + gridGap));

            const squares = new Float32Array(cols * rows);
            for (let i = 0; i < squares.length; i++) {
                squares[i] = Math.random() * maxOpacity;
            }

            setupMask(w, h, cols, rows, dpr);

            return { cols, rows, squares, dpr };
        },
        [squareSize, gridGap, maxOpacity, setupMask]
    );

    const updateSquares = useCallback(
        (squares, deltaTime) => {
            for (let i = 0; i < squares.length; i++) {
                if (Math.random() < flickerChance * deltaTime) {
                    squares[i] = Math.random() * maxOpacity;
                }
            }
        },
        [flickerChance, maxOpacity]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let animationFrameId;
        let gridParams;

        const updateCanvasSize = () => {
            const newWidth = width || container.clientWidth;
            const newHeight = height || container.clientHeight;
            if (newWidth === 0 || newHeight === 0) return;
            setCanvasSize({ width: newWidth, height: newHeight });
            gridParams = setupCanvas(canvas, newWidth, newHeight);
        };

        updateCanvasSize();

        let lastTime = 0;
        const animate = (time) => {
            if (!isInView || !gridParams) return;

            const deltaTime = (time - lastTime) / 1000;
            lastTime = time;

            updateSquares(gridParams.squares, deltaTime);
            drawGrid(
                ctx,
                canvas.width,
                canvas.height,
                gridParams.cols,
                gridParams.rows,
                gridParams.squares,
                gridParams.dpr
            );
            animationFrameId = requestAnimationFrame(animate);
        };

        const resizeObserver = new ResizeObserver(() => {
            updateCanvasSize();
        });

        resizeObserver.observe(container);

        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        intersectionObserver.observe(canvas);

        if (isInView) {
            animationFrameId = requestAnimationFrame(animate);
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
        };
    }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

    return (
        <div ref={containerRef} className={cn(`h-full w-full ${className}`)} {...props}>
            <canvas
                ref={canvasRef}
                className="pointer-events-none"
                style={{
                    width: canvasSize.width,
                    height: canvasSize.height,
                    backgroundColor: 'transparent'
                }}
            />
        </div>
    );
};

const Icons = {
    logo: ({ className }) => (
        <svg
            width="42"
            height="24"
            viewBox="0 0 42 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("size-4 fill-sky-600", className)}
        >
            <g clipPath="url(#clip0_322_9172)">
                <path
                    d="M22.3546 0.96832C22.9097 0.390834 23.6636 0.0664062 24.4487 0.0664062C27.9806 0.0664062 31.3091 0.066408 34.587 0.0664146C41.1797 0.0664284 44.481 8.35854 39.8193 13.2082L29.6649 23.7718C29.1987 24.2568 28.4016 23.9133 28.4016 23.2274V13.9234L29.5751 12.7025C30.5075 11.7326 29.8472 10.0742 28.5286 10.0742H13.6016L22.3546 0.96832Z"
                    fill="current"
                />
                <path
                    d="M19.6469 23.0305C19.0919 23.608 18.338 23.9324 17.5529 23.9324C14.021 23.9324 10.6925 23.9324 7.41462 23.9324C0.821896 23.9324 -2.47942 15.6403 2.18232 10.7906L12.3367 0.227022C12.8029 -0.257945 13.6 0.0855283 13.6 0.771372L13.6 10.0754L12.4265 11.2963C11.4941 12.2662 12.1544 13.9246 13.473 13.9246L28.4001 13.9246L19.6469 23.0305Z"
                    fill="current"
                />
            </g>
            <defs>
                <clipPath id="clip0_322_9172">
                    <rect width="42" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
};

const footerLinks = [
    {
        title: "For Job Seekers",
        links: [
            { id: 1, title: "Browse Jobs", url: "/jobs" },
            { id: 2, title: "Companies", url: "/companies" },
            { id: 3, title: "Career Resources", url: "#" },
            { id: 4, title: "Job Alerts", url: "#" },
        ],
    },
    {
        title: "For Employers",
        links: [
            { id: 5, title: "Post a Job", url: "/post-job" },
            { id: 6, title: "Pricing", url: "#" },
            { id: 7, title: "Recruiter Tools", url: "#" },
            { id: 8, title: "Success Stories", url: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { id: 9, title: "About Us", url: "#" },
            { id: 10, title: "Contact", url: "#" },
            { id: 11, title: "Blog", url: "#" },
            { id: 12, title: "Privacy Policy", url: "#" },
        ],
    },
];

export default function Footer() {
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const checkTablet = () => {
            setIsTablet(window.innerWidth <= 1024);
        };
        checkTablet();
        window.addEventListener("resize", checkTablet);
        return () => window.removeEventListener("resize", checkTablet);
    }, []);

    return (
        <footer id="footer" className="w-full pb-0 bg-zinc-950 text-zinc-400">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-10">
                <div className="flex flex-col items-start justify-start gap-y-5 max-w-xs mx-0">
                    <Link to="/" className="flex items-center gap-2">
                        <Icons.logo className="size-8 fill-sky-500" />
                        <p className="text-xl font-semibold text-white">JobPortal</p>
                    </Link>
                    <p className="tracking-tight text-zinc-400 font-medium">
                        Your trusted platform for finding the perfect job or the ideal candidate.
                        Connect with opportunities that match your skills and ambitions.
                    </p>
                </div>
                <div className="pt-5 md:w-1/2">
                    <div className="flex flex-col items-start justify-start md:flex-row md:items-center md:justify-between gap-y-5 lg:pl-10">
                        {footerLinks.map((column, columnIndex) => (
                            <ul key={columnIndex} className="flex flex-col gap-y-2">
                                <li className="mb-2 text-sm font-semibold text-zinc-100">
                                    {column.title}
                                </li>
                                {column.links.map((link) => (
                                    <li
                                        key={link.id}
                                        className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug text-zinc-400 hover:text-white transition-colors"
                                    >
                                        <Link to={link.url}>{link.title}</Link>
                                        <div className="flex size-4 items-center justify-center border border-zinc-800 rounded translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100">
                                            <ChevronRightIcon className="h-4 w-4" />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full h-48 md:h-64 relative mt-24 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950 z-10 from-40%" />
                <div className="absolute inset-0 mx-6">
                    <FlickeringGrid
                        text={isTablet ? "JOBS" : "FIND YOUR DREAM JOB"}
                        fontSize={isTablet ? 70 : 90}
                        className="h-full w-full"
                        squareSize={2}
                        gridGap={isTablet ? 2 : 3}
                        color="#ffffff"
                        maxOpacity={0.15}
                        flickerChance={0.1}
                    />
                </div>
            </div>
        </footer>
    );
}
