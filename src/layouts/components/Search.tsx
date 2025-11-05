'use client';

// ** React
import { useEffect, useRef, useState } from 'react';
import { FormEvent } from 'react';

// ** Next
import { useRouter } from 'next/navigation';

// ** Shadcn ui
import { Button } from '@/components/ui/button';

// ** Lucide Icon
import { SearchIcon } from 'lucide-react';

const Search = () => {
    const router = useRouter();
    const [searchClick, setSearchClick] = useState(false);
    const [searchIconClick, setSearchIconClick] = useState(false);

    const searchHeaderRef = useRef<HTMLInputElement | null>(null);
    const searchReponsiveRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const handleClickOutSearch = (e: MouseEvent) => {
            if (
                searchHeaderRef.current &&
                searchReponsiveRef.current &&
                !searchHeaderRef.current.contains(e.target as Node) &&
                !searchReponsiveRef.current.contains(e.target as Node)
            ) {
                setSearchClick(false);
                setSearchIconClick(false);
            }
        };
        document.addEventListener('click', handleClickOutSearch);
        return () => {
            document.removeEventListener('click', handleClickOutSearch);
        };
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const searchQuery = (e.target as HTMLFormElement).elements.namedItem(
            'search'
        ) as HTMLInputElement;
        if (searchQuery?.value) {
            router.push(`/tim-kiem?keyword=${searchQuery.value}`);
        }
    };
    return (
        <>
            <div>
                <div
                    ref={searchHeaderRef}
                    className={`
                        group relative rounded-full overflow-hidden
                        bg-gradient-to-r from-purple-500/10 to-pink-500/10
                        border border-purple-500/20 hover:border-purple-500/40
                        backdrop-blur-sm shadow-lg shadow-purple-500/5
                        transition-all duration-300
                        ${searchIconClick ? 'absolute w-full left-0 h-full top-0 rounded-none border-0' : 'hidden sm:block'} 
                    `}
                    onClick={() => {
                        setSearchClick(true);
                    }}
                >
                    <form
                        action=""
                        onSubmit={handleSubmit}
                        className={`
                            flex items-center h-full
                            ${searchClick ? 'w-[240px]' : 'w-[200px]'} 
                            ${searchIconClick ? 'w-full px-4' : ''} 
                            transition-all duration-300
                        `}
                    >
                        <input
                            type="text"
                            name="search"
                            placeholder="Tìm truyện yêu thích..."
                            className="
                                outline-none w-full bg-transparent 
                                py-2.5 pl-5 pr-2 text-sm
                                placeholder:text-muted-foreground/60
                                focus:placeholder:text-muted-foreground/40
                                transition-all duration-300
                            "
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            className="
                                px-3 h-full flex items-center justify-center
                                text-purple-600 hover:text-pink-600
                                transition-colors duration-300
                            "
                        >
                            <SearchIcon className="size-4" />
                        </button>
                    </form>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-pink-600/0 to-blue-600/0 group-hover:from-purple-600/5 group-hover:via-pink-600/5 group-hover:to-blue-600/5 transition-all duration-500 pointer-events-none" />
                </div>
                <div
                    ref={searchReponsiveRef}
                    className="sm:hidden cursor-pointer"
                    onClick={() => {
                        setSearchIconClick(true);
                    }}
                >
                    <Button 
                        variant="ghost" 
                        shape="squareRounded"
                        className="hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                    >
                        <SearchIcon className="size-4" />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Search;
