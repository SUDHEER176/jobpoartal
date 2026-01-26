import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function Button({ className, variant = 'primary', size = 'md', ...props }) {
    const variants = {
        primary: 'bg-gradient-to-r from-brand-600 to-brand-700 text-white hover:from-brand-700 hover:to-brand-800 shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/30 border-transparent',
        secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm',
        outline: 'bg-transparent border-2 border-brand-600 text-brand-600 hover:bg-brand-50',
        ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/20'
    }

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5',
        lg: 'px-8 py-3.5 text-lg font-semibold'
    }

    return (
        <button
            className={cn(
                'rounded-xl font-medium transition-all duration-200 active:scale-95 focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    )
}
