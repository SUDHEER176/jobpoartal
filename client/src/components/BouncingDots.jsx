"use client"

import React from "react"
import { cva } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const bouncingDotsVariant = cva("flex gap-2 items-center justify-center", {
    variants: {
        messagePlacement: {
            bottom: "flex-col",
            right: "flex-row",
            left: "flex-row-reverse",
        },
    },
    defaultVariants: {
        messagePlacement: "bottom",
    },
})

export function BouncingDots({
    dots = 3,
    message,
    messagePlacement = "bottom",
    className,
    ...props
}) {
    return (
        <div className={cn(bouncingDotsVariant({ messagePlacement }))}>
            <div className={cn("flex gap-2 items-center justify-center")}>
                {Array(dots)
                    .fill(undefined)
                    .map((_, index) => (
                        <motion.div
                            key={index}
                            className={cn("w-3 h-3 bg-white rounded-full", className)}
                            animate={{ y: [0, -20, 0] }}
                            transition={{
                                duration: 0.6,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: index * 0.2,
                                ease: "easeInOut",
                            }}
                            {...props}
                        />
                    ))}
            </div>
            {message && <div className="text-white/70 text-sm font-medium animate-pulse mt-4">{message}</div>}
        </div>
    )
}
