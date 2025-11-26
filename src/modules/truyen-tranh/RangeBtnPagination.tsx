"use client";

// ** React
import { useState, useMemo, useEffect } from 'react';

// ** Hooks
import useTailwindBreakpoints from '@/hooks/useTailwindBreakpoints';

// ** Next
import Link from "next/link";

// ** Shadcn ui
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// ** Skeleton
import ChapterListSkeleton from '@/skeleton/truyen-tranh/ChapterListSkeleton';

// ** utils
import getIdFromUrl from "@/utils/getIdFromUrl";

interface Props {
    chapters: IChapter[];
    slug: string;
}

const RangeBtnPagination = ({ chapters, slug }: Props) => {

    const { isSm } = useTailwindBreakpoints();
    const [currentRange, setCurrentRange] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Sort chapters by decimal number (e.g. 10.1, 10.2, 11)
    const sortedChapters = useMemo(() => {
        return [...chapters].sort((a, b) => {
            const pa = a.chapter_name.split(".").map(Number);
            const pb = b.chapter_name.split(".").map(Number);
            for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
                const na = pa[i] ?? 0;
                const nb = pb[i] ?? 0;
                if (na !== nb) return na - nb;
            }
            return 0;
        });
    }, [chapters]);

    if (!mounted) return <ChapterListSkeleton/>;
    const rangeSize = isSm ? 50 : 20;

    // Find the maximum chapter number (used to calculate total ranges)
    const maxChapter = Math.max(...sortedChapters.map(ch => parseFloat(ch.chapter_name)));
    const totalRanges = Math.ceil(maxChapter / rangeSize);

    // Calculate current range
    const start = currentRange * rangeSize + 1;
    const end = Math.min((currentRange + 1) * rangeSize, maxChapter);

    // Filter chapters that belong to the current range [start, end]
    const currentChapters = sortedChapters.filter(ch => {
        const num = parseFloat(ch.chapter_name);
        return num >= start && num <= end;
    });

    return (
        <div className="flex flex-col gap-6">
            {/* Pagination buttons - Modern Pills */}
            <div className="flex sm:grid sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3 overflow-x-auto scrollbar-hide pb-2">
                {Array.from({ length: totalRanges }).map((_, idx) => {
                    const rangeStart = idx * rangeSize + 1;
                    const rangeEnd = Math.min((idx + 1) * rangeSize, maxChapter);

                    return (
                        <button
                            key={idx}
                            onClick={() => setCurrentRange(idx)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 min-w-max sm:min-w-0 whitespace-nowrap ${
                                idx === currentRange
                                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-105"
                                    : "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 text-slate-700 dark:text-slate-300 hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-700 dark:hover:to-slate-800 hover:scale-105 border border-slate-200 dark:border-slate-700"
                            }`}
                        >
                            {rangeStart} - {rangeEnd}
                        </button>
                    );
                })}
            </div>

            {/* Chapter list - Modern Grid Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {currentChapters.map((item, index) => {
                    const isNew = index === currentChapters.length - 1;
                    
                    return (
                        <div key={index}>
                            {item.chapter_title ? (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={`/doc-truyen/${slug}-chuong-${item?.chapter_name}-${getIdFromUrl(item?.chapter_api_data, '/')}.html`}
                                                className="group block"
                                            >
                                                <div className="relative px-4 py-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                                    {isNew && (
                                                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                                                            NEW
                                                        </span>
                                                    )}
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-semibold text-sm group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all line-clamp-1">
                                                            Chương {item.chapter_name}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                                        {item.chapter_title}
                                                    </p>
                                                </div>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent className="max-w-[300px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl">
                                            <p className="text-foreground/80 text-sm font-medium">
                                                {item.chapter_title}
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ) : (
                                <Link
                                    href={`/doc-truyen/${slug}-chuong-${item?.chapter_name}-${getIdFromUrl(item?.chapter_api_data, '/')}.html`}
                                    className="group block"
                                >
                                    <div className="relative px-4 py-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                        {isNew && (
                                            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                                                NEW
                                            </span>
                                        )}
                                        <span className="font-semibold text-sm group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all block text-center">
                                            Chương {item.chapter_name}
                                        </span>
                                    </div>
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default RangeBtnPagination;
