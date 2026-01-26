'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
    GlobeIcon,
    UserPlusIcon,
    Users,
    Star,
    FileText,
    Shield,
    HelpCircle,
    BarChart,
    PlugIcon,
    Search,
    Briefcase,
    Building2,
    User,
    LogOut,
    LayoutDashboard
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
    const [open, setOpen] = React.useState(false);
    const scrolled = useScroll(10);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, dbUser, signOut } = useAuth();
    const isHome = location.pathname === '/';

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const isTopHome = isHome && !scrolled;

    const headerClass = cn(
        'fixed top-0 z-50 w-full transition-all duration-300 border-b font-sans',
        {
            'bg-transparent border-transparent': isTopHome,
            'bg-white/70 dark:bg-black/70 backdrop-blur-md border-slate-200/50 dark:border-white/10 shadow-sm supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-black/60': !isTopHome,
        }
    );

    const textClass = isTopHome ? 'text-white' : 'text-slate-900 dark:text-white';
    const linkHoverClass = isTopHome ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-slate-100 dark:hover:bg-white/10';
    const signInClass = cn(textClass, isTopHome ? "hover:bg-white/10 hover:text-white" : "hover:bg-slate-100 dark:hover:bg-white/10");
    const getStartedClass = cn("shadow-lg shadow-brand-500/20", "bg-brand-600 text-white hover:bg-brand-700");

    return (
        <header className={headerClass}>
            <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-5">
                    <Link to="/" className={cn("rounded-md p-2 transition-colors", textClass, linkHoverClass)}>
                        <Logo />
                    </Link>
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            {!user ? (
                                <>
                                    {/* Unauthenticated users see Product/Company dropdowns */}
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className={cn("bg-transparent", textClass, isTopHome ? "hover:text-white hover:bg-white/10 focus:text-white focus:bg-white/10" : "hover:bg-slate-100/50")}>
                                            Product
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 shadow-2xl">
                                            <ul className="grid w-[500px] grid-cols-2 gap-2 rounded-md p-2">
                                                {productLinks.map((item, i) => (
                                                    <li key={i}>
                                                        <ListItem {...item} />
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="p-2 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5">
                                                <p className="text-slate-600 dark:text-slate-500 text-sm">
                                                    Interested?{' '}
                                                    <a href="#" className="text-brand-600 font-medium hover:underline">
                                                        Schedule a demo
                                                    </a>
                                                </p>
                                            </div>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className={cn("bg-transparent", textClass, isTopHome ? "hover:text-white hover:bg-white/10 focus:text-white focus:bg-white/10" : "hover:bg-slate-100/50")}>
                                            Company
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 shadow-2xl">
                                            <div className="grid w-[600px] grid-cols-2 gap-2">
                                                <ul className="space-y-2 rounded-md p-2">
                                                    {companyLinks.map((item, i) => (
                                                        <li key={i}>
                                                            <ListItem {...item} />
                                                        </li>
                                                    ))}
                                                </ul>
                                                <ul className="space-y-2 p-3 bg-slate-50 dark:bg-white/5 rounded-r-md">
                                                    {companyLinks2.map((item, i) => (
                                                        <li key={i}>
                                                            <NavigationMenuLink
                                                                href={item.href}
                                                                className="flex p-2 hover:bg-slate-100 dark:hover:bg-white/10 flex-row rounded-md items-center gap-x-2 text-slate-600 dark:text-slate-400"
                                                            >
                                                                <item.icon className="size-4" />
                                                                <span className="font-medium">{item.title}</span>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuLink className="px-4" asChild>
                                        <Link to="/jobs" className={cn("rounded-md p-2 font-medium text-sm transition-colors", textClass, linkHoverClass)}>
                                            Find Jobs
                                        </Link>
                                    </NavigationMenuLink>
                                </>
                            ) : dbUser?.role === 'seeker' ? (
                                <>
                                    {/* Job Seeker Navigation */}
                                    <NavigationMenuLink className="px-4" asChild>
                                        <Link to="/" className={cn("rounded-md p-2 font-medium text-sm transition-colors", textClass, linkHoverClass)}>
                                            Home
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink className="px-4" asChild>
                                        <Link to="/jobs" className={cn("rounded-md p-2 font-medium text-sm transition-colors", textClass, linkHoverClass)}>
                                            Find Jobs
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink className="px-4" asChild>
                                        <Link to="/my-applications" className={cn("rounded-md p-2 font-medium text-sm transition-colors", textClass, linkHoverClass)}>
                                            My Applications
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink className="px-4" asChild>
                                        <Link to="/onboarding" className={cn("rounded-md p-2 font-medium text-sm transition-colors", textClass, linkHoverClass)}>
                                            Profile
                                        </Link>
                                    </NavigationMenuLink>
                                </>
                            ) : dbUser?.role === 'recruiter' ? (
                                <>
                                    {/* Recruiter Navigation */}
                                    <NavigationMenuLink className="px-4" asChild>
                                        <Link to="/" className={cn("rounded-md p-2 font-medium text-sm transition-colors", textClass, linkHoverClass)}>
                                            Home
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink className="px-4" asChild>
                                        <Link to="/post-job" className={cn("rounded-md p-2 font-medium text-sm transition-colors", textClass, linkHoverClass)}>
                                            Post Job
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink className="px-4" asChild>
                                        <Link to="/my-jobs" className={cn("rounded-md p-2 font-medium text-sm transition-colors", textClass, linkHoverClass)}>
                                            Manage Jobs
                                        </Link>
                                    </NavigationMenuLink>
                                </>
                            ) : null}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="hidden items-center gap-4 md:flex">
                    <div className={cn("h-6 w-px", isTopHome ? "bg-white/20" : "bg-slate-200")}></div>

                    <ThemeToggle />

                    {user ? (
                        <>
                            <Link to="/dashboard">
                                <Button variant="ghost" className={signInClass}>
                                    <LayoutDashboard className="h-4 w-4 mr-2" />
                                    Dashboard
                                </Button>
                            </Link>

                            <div className="flex items-center gap-2 pl-2">
                                <Avatar className="h-8 w-8 ring-2 ring-white/20 transition-transform hover:scale-105">
                                    <AvatarImage src={dbUser?.profile?.avatar || null} alt={dbUser?.profile?.name || "User"} />
                                    <AvatarFallback className="bg-brand-600 text-white font-bold text-xs">
                                        {dbUser?.profile?.name?.[0] || user.email?.[0]?.toUpperCase() || <User className="h-4 w-4" />}
                                    </AvatarFallback>
                                </Avatar>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleSignOut}
                                    className={cn(textClass, "h-8 w-8 p-0 hover:bg-white/10 hover:text-red-400 rounded-full")}
                                >
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/auth?mode=login">
                                <Button variant="ghost" className={signInClass}>Sign In</Button>
                            </Link>
                            <Link to="/auth?mode=signup">
                                <Button className={getStartedClass}>
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setOpen(!open)}
                    className={cn("md:hidden", textClass, isTopHome ? "hover:bg-white/10 hover:text-white" : "")}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label="Toggle menu"
                >
                    <MenuToggleIcon open={open} className="size-5" />
                </Button>
            </nav>
            <MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto">
                <NavigationMenu className="max-w-full">
                    <div className="flex w-full flex-col gap-y-2 p-4">
                        {!user ? (
                            <>
                                <span className="text-sm font-semibold text-slate-600 dark:text-slate-500 mb-2">Product</span>
                                <Link to="/for-jobseekers" onClick={() => setOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg font-medium text-slate-700 dark:text-slate-300">For Job Seekers</Link>
                                <Link to="/for-recruiters" onClick={() => setOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg font-medium text-slate-700 dark:text-slate-300">For Recruiters</Link>
                                <Link to="/jobs" onClick={() => setOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg font-medium text-slate-700 dark:text-slate-300">Find Jobs</Link>
                                <span className="text-sm font-semibold text-slate-600 dark:text-slate-500 mt-4 mb-2">Company</span>
                                {companyLinks.map((link) => (
                                    <ListItem key={link.title} {...link} />
                                ))}
                                {companyLinks2.map((link) => (
                                    <ListItem key={link.title} {...link} />
                                ))}
                            </>
                        ) : dbUser?.role === 'seeker' ? (
                            <>
                                <Link to="/" onClick={() => setOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg font-medium text-slate-700 dark:text-slate-300">Home</Link>
                                <Link to="/jobs" onClick={() => setOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg font-medium text-slate-700 dark:text-slate-300">Find Jobs</Link>
                                <Link to="/my-applications" onClick={() => setOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg font-medium text-slate-700 dark:text-slate-300">My Applications</Link>
                                <Link to="/onboarding" onClick={() => setOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg font-medium text-slate-700 dark:text-slate-300">Profile</Link>
                            </>
                        ) : dbUser?.role === 'recruiter' ? (
                            <>
                                <Link to="/" onClick={() => setOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg font-medium text-slate-700 dark:text-slate-300">Home</Link>
                                <Link to="/post-job" onClick={() => setOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg font-medium text-slate-700 dark:text-slate-300">Post Job</Link>
                                <Link to="/my-jobs" onClick={() => setOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg font-medium text-slate-700 dark:text-slate-300">Manage Jobs</Link>
                            </>
                        ) : null}
                    </div>
                </NavigationMenu>
                <div className="flex flex-col gap-2 p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-2 px-2">
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Theme</span>
                        <ThemeToggle />
                    </div>
                    {user ? (
                        <>
                            <Link to="/dashboard" onClick={() => setOpen(false)}><Button className="w-full bg-brand-600">Dashboard</Button></Link>
                            <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => { handleSignOut(); setOpen(false); }}>Sign Out</Button>
                        </>
                    ) : (
                        <>
                            <Link to="/auth?mode=login"><Button variant="outline" className="w-full">Sign In</Button></Link>
                            <Link to="/auth?mode=signup"><Button className="w-full bg-brand-600">Get Started</Button></Link>
                        </>
                    )}
                </div>
            </MobileMenu>
        </header>
    );
}

function MobileMenu({ open, children, className, ...props }) {
    if (!open || typeof window === 'undefined') return null;

    return createPortal(
        <div
            id="mobile-menu"
            className={cn(
                'bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg',
                'fixed top-[64px] right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t border-slate-200 dark:border-white/10 md:hidden animate-in slide-in-from-top-5',
            )}
        >
            <div
                className={cn(
                    'size-full',
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
}

function ListItem({
    title,
    description,
    icon: Icon,
    className,
    href,
    ...props
}) {
    return (
        <NavigationMenuLink className={cn('block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 dark:hover:bg-white/10 focus:bg-slate-100 dark:focus:bg-white/10', className)} {...props} asChild>
            <a href={href} className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-lg bg-brand-500/10 p-2">
                    <Icon className="size-5 text-brand-400" />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium leading-none text-slate-900 dark:text-white">{title}</span>
                    <span className="text-xs leading-snug text-slate-600 dark:text-slate-400 line-clamp-1">{description}</span>
                </div>
            </a>
        </NavigationMenuLink>
    );
}

const productLinks = [
    {
        title: 'For Job Seekers',
        href: '/for-jobseekers',
        description: 'Find your dream career with top companies',
        icon: Briefcase,
    },
    {
        title: 'For Recruiters',
        href: '/for-recruiters',
        description: 'Hire the right talent, faster and easier',
        icon: Building2,
    },
    {
        title: 'Analytics',
        href: '#',
        description: 'Track your application performance',
        icon: BarChart,
    },
    {
        title: 'Integrations',
        href: '#',
        description: 'Connect with your favorite tools',
        icon: PlugIcon,
    },
];

const companyLinks = [
    {
        title: 'About Us',
        href: '#',
        description: 'Learn more about our mission',
        icon: Users,
    },
    {
        title: 'Success Stories',
        href: '#',
        description: 'See how others found success',
        icon: Star,
    },
];

const companyLinks2 = [
    {
        title: 'Terms of Service',
        href: '#',
        icon: FileText,
    },
    {
        title: 'Privacy Policy',
        href: '#',
        icon: Shield,
    },
    {
        title: 'Help Center',
        href: '#',
        icon: HelpCircle,
    },
];


function useScroll(threshold) {
    const [scrolled, setScrolled] = React.useState(false);

    const onScroll = React.useCallback(() => {
        setScrolled(window.scrollY > threshold);
    }, [threshold]);

    React.useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    React.useEffect(() => {
        onScroll();
    }, [onScroll]);

    return scrolled;
}
