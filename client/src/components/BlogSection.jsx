import React from 'react';
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
    {
        id: "post-1",
        title: "Revitalizing Workplace Morale: Innovative Tactics For Boosting Employee Engagement In 2026",
        summary:
            "Discover the latest strategies and tools to stand out in a competitive job market. We'll cover workplace dynamics, team building, and best practices for modern offices.",
        label: "News",
        author: "Sarah Chen",
        published: "30 March 2026",
        url: "/blog/post-1",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: "post-2",
        title: "How To Avoid The Top Six Most Common Job Interview Mistakes",
        summary:
            "Explore how to create inclusive web experiences and excel in your next interview. Discover practical tips for answering tough questions and building rapport.",
        label: "Blog",
        author: "Marcus Rodriguez",
        published: "30 March 2026",
        url: "/blog/post-2",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: "post-3",
        title: "The Future of AI in Recruitment: What Candidates Need to Know",
        summary:
            "Dive into creating scalable design systems using AI in HR. Learn how to maintain consistency while building flexible and maintainable career paths.",
        label: "News",
        author: "Emma Thompson",
        published: "30 March 2026",
        url: "/blog/post-3",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    },
];

export function BlogSection({
    tagline = "Latest Updates",
    heading = "News and Blog",
    description = "Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed tristique in dolor",
    buttonText = "View all articles",
    buttonUrl = "/blog",
    posts = BLOG_POSTS,
}) {
    return (
        <section className="py-16 bg-slate-50/50 dark:bg-zinc-950/20">
            <div className="container mx-auto flex flex-col items-center gap-12 lg:px-16">
                <div className="text-center max-w-3xl">
                    <Badge variant="secondary" className="mb-4 px-3 py-1 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 border-none font-bold tracking-wider uppercase text-[10px]">
                        {tagline}
                    </Badge>
                    <h2 className="mb-3 text-pretty text-3xl font-bold md:mb-4 md:text-5xl lg:text-5xl text-slate-900 dark:text-white tracking-tight">
                        {heading}
                    </h2>
                    <p className="mb-6 text-slate-500 dark:text-slate-400 text-base md:text-lg">
                        {description}
                    </p>
                    <Button variant="link" className="text-teal-600 dark:text-teal-400 font-bold text-base hover:no-underline group" asChild>
                        <Link to={buttonUrl}>
                            {buttonText}
                            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
                    {posts.map((post) => (
                        <Card key={post.id} className="grid grid-rows-[auto_auto_1fr_auto] bg-white dark:bg-zinc-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden hover:border-teal-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/10 group">
                            <div className="aspect-[16/9] w-full overflow-hidden">
                                <Link
                                    to={post.url}
                                    className="transition-opacity duration-200"
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    />
                                </Link>
                            </div>
                            <CardHeader className="p-6 pb-2">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2.5 py-0.5 rounded-full bg-teal-600 text-white text-[9px] font-black uppercase tracking-widest">{post.label}</span>
                                    <span className="text-slate-400 text-[11px] font-bold">{post.published}</span>
                                </div>
                                <h3 className="text-lg font-bold group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug">
                                    <Link to={post.url}>
                                        {post.title}
                                    </Link>
                                </h3>
                            </CardHeader>
                            <CardContent className="p-6 pt-0">
                                <p className="text-slate-500 dark:text-slate-400 line-clamp-2 text-xs leading-relaxed">{post.summary}</p>
                            </CardContent>
                            <CardFooter className="p-6 pt-0 mt-auto border-t border-slate-100 dark:border-white/5 pt-4 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-teal-600/10 flex items-center justify-center text-teal-600 font-bold text-[10px]">
                                        {post.author.charAt(0)}
                                    </div>
                                    <span className="text-slate-700 dark:text-slate-300 font-bold text-xs">{post.author}</span>
                                </div>
                                <Link
                                    to={post.url}
                                    className="flex items-center text-teal-600 dark:text-teal-400 font-bold text-xs hover:gap-1.5 transition-all"
                                >
                                    Read more
                                    <ArrowRight className="ml-1 size-3" />
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
