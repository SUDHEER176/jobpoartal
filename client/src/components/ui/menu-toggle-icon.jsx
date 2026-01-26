import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function MenuToggleIcon({ open, className }) {
    return (
        <div className={cn("relative flex items-center justify-center", className)}>
            {open ? <X className="h-full w-full" /> : <Menu className="h-full w-full" />}
        </div>
    )
}
