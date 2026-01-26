import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "relative inline-flex h-9 w-9 items-center justify-center rounded-lg",
                "transition-all duration-300 ease-in-out",
                "hover:bg-white/10 dark:hover:bg-white/10",
                "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
                "dark:focus:ring-offset-black",
                "group",
                className
            )}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <div className="relative h-5 w-5">
                <Sun
                    className={cn(
                        "absolute inset-0 h-5 w-5 text-slate-700 dark:text-slate-200",
                        "transition-all duration-300",
                        theme === 'dark'
                            ? "rotate-90 scale-0 opacity-0"
                            : "rotate-0 scale-100 opacity-100"
                    )}
                />
                <Moon
                    className={cn(
                        "absolute inset-0 h-5 w-5 text-slate-700 dark:text-slate-200",
                        "transition-all duration-300",
                        theme === 'dark'
                            ? "rotate-0 scale-100 opacity-100"
                            : "-rotate-90 scale-0 opacity-0"
                    )}
                />
            </div>
        </button>
    );
}
