import { Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className, iconClassName }) {
    return (
        <div className={cn("flex items-center gap-2 font-bold text-xl tracking-tighter", className)}>
            <div className="bg-blue-600 p-2 rounded-full shadow-lg shadow-blue-600/20">
                <Briefcase className={cn("h-4.5 w-4.5 text-white", iconClassName)} />
            </div>
            <span className="text-slate-900 dark:text-white">JobPortal</span>
        </div>
    );
}

