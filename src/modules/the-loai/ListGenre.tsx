'use client'

// ** React
import { useLayoutEffect, useRef } from 'react';

// ** Hooks
import useTailwindBreakpoints from '@/hooks/useTailwindBreakpoints';

// ** Next
import Link from 'next/link';

interface IListGenreProps {
    data: IGenres[],
    slug: string
}

const ListGenre = ({data, slug}: IListGenreProps) => {

    const activeRef = useRef<HTMLAnchorElement | null>(null);
    const { isSm } = useTailwindBreakpoints();

    useLayoutEffect(() => {
        if (!isSm && activeRef.current) {
            const parent = activeRef.current.closest("ul");
            if (parent) {
                const parentRect = parent.getBoundingClientRect();
                const itemRect = activeRef.current.getBoundingClientRect();

                parent.scrollTop += itemRect.top - parentRect.top + 4;
            }
        }
    }, [slug, isSm]);

    return (
        <ul className="flex gap-2 flex-wrap text-sm h-[140px] sm:h-auto overflow-y-auto sm:overflow-visible custom-scroll">
            {data.map((item, index) => (
                <li key={index}>
                    {item.slug === slug ? (
                        <h1>
                            <Link
                                ref={activeRef}
                                href={`/the-loai/${item.slug}.html`}
                                className="inline-block px-4 py-2 rounded-full font-medium whitespace-nowrap bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 transition-all duration-300"
                            >
                                {item.name}
                            </Link>
                        </h1>
                    ) : (
                        <h2>
                            <Link
                                href={`/the-loai/${item.slug}.html`}
                                className="inline-block px-4 py-2 rounded-full font-medium whitespace-nowrap bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text hover:text-transparent"
                            >
                                {item.name}
                            </Link>
                        </h2>
                    )}
                </li>
            ))}
            <li>
                {'tat-ca' === slug ? (
                    <h1>
                        <Link
                            ref={activeRef}
                            href={`/the-loai/tat-ca.html`}
                            className="inline-block px-4 py-2 rounded-full font-medium whitespace-nowrap bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 transition-all duration-300"
                        >
                            Tất cả
                        </Link>
                    </h1>
                ) : (
                    <h2>
                        <Link
                            href={`/the-loai/tat-ca.html`}
                            className="inline-block px-4 py-2 rounded-full font-medium whitespace-nowrap bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text hover:text-transparent"
                        >
                            Tất cả
                        </Link>
                    </h2>
                )}
            </li>
        </ul>
    )
}

export default ListGenre