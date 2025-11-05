'use client';

// ** React
import React, { useEffect, useRef, useState } from 'react';

// ** Hooks
import useTailwindBreakpoints from '@/hooks/useTailwindBreakpoints';

// ** Next
import Link from 'next/link';

// ** Shadcn ui
import { Slider } from '@/components/ui/slider';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// ** lucide icon
import {
    BookOpenText,
    ChevronLeft,
    ChevronRight,
    Expand,
    Menu,
    Minus,
    Plus,
    Shrink,
} from 'lucide-react';

// ** utils
import { getChapterName } from '@/utils/getChapterName';
import getIdFromUrl from '@/utils/getIdFromUrl';

const Settings = ({
    imgWidth = 50,
    totalImages,
    setImgWidth,
    listChapter,
    indexCurrentChapter,
    currentUrl,
    imgRefs,
    currentImageIndex,
    setCurrentImageIndex,
    isDropdownOpen,
    setIsDropdownOpen,
    slugChapter,
}: {
    imgWidth?: number;
    totalImages: number;
    setImgWidth: (width: number) => void;
    listChapter: IChapter[];
    indexCurrentChapter: number;
    currentUrl: string;
    imgRefs: React.RefObject<(HTMLImageElement | null)[]>;
    currentImageIndex: number;
    setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
    isDropdownOpen: boolean;
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    slugChapter: string
}) => {
    const { isMd } = useTailwindBreakpoints();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const listRef = useRef<HTMLUListElement | null>(null);

    const scrollToActive = () => {
        if (!listRef.current) return;
        const activeEl = listRef.current.querySelector('.active-chapter');
        if (activeEl) {
            (activeEl as HTMLElement).scrollIntoView({
                block: 'center',
            });
        }
    };

    // Next chapter
    const nextChapter = listChapter[indexCurrentChapter + 1];

    // Prev chapter
    const prevChapter = listChapter[indexCurrentChapter - 1];

    // Slider
    const scrollToImage = (index: number) => {
        // Điều chỉnh index vì ảnh đầu tiên (index 0) bị bỏ
        // Khi muốn đến trang 1 (index 0), cần scroll đến ảnh thứ 2 (index 1)
        const actualIndex = index + 1;
        if (imgRefs.current[actualIndex]) {
            imgRefs.current[actualIndex]?.scrollIntoView();
        }
    };

    const handleSliderChange = (e: { target: { value: number } }) => {
        const newIndex = e.target.value - 1;
        setCurrentImageIndex(newIndex);
        scrollToImage(newIndex);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (imgRefs.current && imgRefs.current.length > 0) {
                let closestIndex = 0;
                let minDistance = Number.MAX_VALUE;

                imgRefs.current.forEach((img, index) => {
                    if (img) {
                        const rect = img.getBoundingClientRect();
                        const distance = Math.abs(rect.top);
                        if (distance < minDistance) {
                            minDistance = distance;
                            closestIndex = index;
                        }
                    }
                });

                // Điều chỉnh index nếu bỏ ảnh đầu tiên (index 0 = null)
                // Nếu ảnh gần nhất là index 1, hiển thị là trang 1
                const displayIndex = closestIndex > 0 ? closestIndex - 1 : 0;
                setCurrentImageIndex(displayIndex);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [imgRefs, setCurrentImageIndex]);

    // zoom out zoom in
    const handlePlusChange = () => {
        if (imgWidth < 100) {
            setImgWidth(imgWidth + 10);
        }
    };

    const handleMinusChange = () => {
        if (imgWidth > 10) {
            setImgWidth(imgWidth - 10);
        }
    };

    // Full Screen
    const toggleFullScreen = () => {
        if (!isFullScreen) {
            const element = document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                // Firefox
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                // Chrome, Safari ,Opera
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                // IE/Edge
                element.msRequestFullscreen();
            }
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                // Chrome, Safari, Opera
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                // IE/Edge
                document.msExitFullscreen();
            }
            setIsFullScreen(false);
        }
    };

    // Handle fullscreen change event (when user presses ESC)
    useEffect(() => {
        const handleFullScreenChange = () => {
            if (
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement
            ) {
                setIsFullScreen(true);
            } else {
                setIsFullScreen(false);
            }
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);
        document.addEventListener(
            'webkitfullscreenchange',
            handleFullScreenChange
        );
        document.addEventListener(
            'mozfullscreenchange',
            handleFullScreenChange
        );
        document.addEventListener('MSFullscreenChange', handleFullScreenChange);

        // Cleanup the event listeners on unmount
        return () => {
            document.removeEventListener(
                'fullscreenchange',
                handleFullScreenChange
            );
            document.removeEventListener(
                'webkitfullscreenchange',
                handleFullScreenChange
            );
            document.removeEventListener(
                'mozfullscreenchange',
                handleFullScreenChange
            );
            document.removeEventListener(
                'MSFullscreenChange',
                handleFullScreenChange
            );
        };
    }, []);

    return (
        <div
            className={`w-full absolute bottom-0 flex flex-col items-center left-1/2 -translate-x-1/2 transition-opacity duration-500 ease-in-out`}
        >
            {/* Modern Top Action Bar */}
            <div className="relative bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl shadow-2xl shadow-purple-500/10 px-2 py-2 mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-blue-600/5 rounded-3xl pointer-events-none" />
                
                <div className="relative flex items-center gap-2">
                    {!isMd && (
                        <Link
                            href={`/truyen-tranh/${slugChapter}`}
                            className="group flex flex-col items-center gap-1 px-4 py-2 rounded-2xl hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300"
                        >
                            <BookOpenText className="size-5 text-purple-600 group-hover:text-pink-600 transition-colors duration-300" />
                            <span className="text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text group-hover:text-transparent transition-all duration-300">
                                Chi tiết
                            </span>
                        </Link>
                    )}

                    {/* Menu Dropdown */}
                    <DropdownMenu
                        open={isDropdownOpen}
                        onOpenChange={(open) => {
                            setIsDropdownOpen(open);
                            if (open) {
                                requestAnimationFrame(() => scrollToActive());
                            }
                        }}
                    >
                        <DropdownMenuTrigger asChild>
                            <div className="group flex flex-col items-center gap-1 px-4 py-2 rounded-2xl cursor-pointer hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300">
                                <Menu className="size-5 text-purple-600 group-hover:text-pink-600 transition-colors duration-300" />
                                <span className="text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text group-hover:text-transparent transition-all duration-300">
                                    Mục lục
                                </span>
                            </div>
                        </DropdownMenuTrigger>
                    <DropdownMenuContent asChild>
                        <div className="p-4 rounded-2xl w-[240px] sm:w-[280px] !bg-[#272727e6] border-none text-white mb-2">
                            <div className="text-sm sm:text-base mb-4 ml-3">{`Tất cả các chương (${listChapter.length})`}</div>
                            <ul
                                ref={listRef}
                                className="bg-[#121212] rounded-2xl overflow-auto max-h-[320px] sm:max-h-[400px] scroll-hidden"
                            >
                                {listChapter?.map((item, index) => {
                                    const activeChapter =
                                        getIdFromUrl(
                                            item?.chapter_api_data,
                                            '/'
                                        ) === getIdFromUrl(currentUrl, '-');
                                    return (
                                        <li
                                            key={index}
                                            onClick={() =>
                                                setIsDropdownOpen(false)
                                            }
                                        >
                                            <Link
                                                href={`/doc-truyen/${getChapterName(currentUrl)}-chuong-${item.chapter_name}-${getIdFromUrl(item?.chapter_api_data, '/')}.html`}
                                                className={`px-5 sm:px-10 py-3 block text-xs sm:text-sm text-center hover:bg-black ${activeChapter ? 'active-chapter  text-primaryColor' : ''}`}
                                            >
                                                {`Chương ${item.chapter_name} ${item.chapter_title ? `- ${item.chapter_title}` : ''}`}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                    {/*Full Screen*/}
                    {isMd && (
                        <div
                            className="group flex flex-col items-center gap-1 px-4 py-2 rounded-2xl cursor-pointer hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300"
                            onClick={toggleFullScreen}
                        >
                            {isFullScreen ? (
                                <>
                                    <Shrink className="size-5 text-purple-600 group-hover:text-pink-600 transition-colors duration-300" />
                                    <span className="text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text group-hover:text-transparent transition-all duration-300">
                                        Thoát
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Expand className="size-5 text-purple-600 group-hover:text-pink-600 transition-colors duration-300" />
                                    <span className="text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text group-hover:text-transparent transition-all duration-300">
                                        Toàn màn
                                    </span>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Modern Navigation Slider */}
            <div className="relative w-full md:w-[700px] lg:w-[800px]">
                {/* Zoom controls - Left side */}
                <div className="absolute -left-4 lg:-left-36 top-1/2 -translate-y-1/2 hidden lg:block">
                    <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-2xl shadow-purple-500/10 p-2">
                        <div className="flex items-center gap-2">
                            <button
                                className="p-2 rounded-xl hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 group"
                                onClick={handlePlusChange}
                            >
                                <Plus className="size-4 text-purple-600 group-hover:text-pink-600 transition-colors duration-300" />
                            </button>
                            <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent min-w-[45px] text-center">
                                {imgWidth}%
                            </span>
                            <button
                                className="p-2 rounded-xl hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 group"
                                onClick={handleMinusChange}
                            >
                                <Minus className="size-4 text-purple-600 group-hover:text-pink-600 transition-colors duration-300" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main slider bar */}
                <div className="relative bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl shadow-2xl shadow-purple-500/10 p-4 md:p-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-blue-600/5 rounded-3xl pointer-events-none" />
                    
                    <div className="relative flex items-center gap-4">
                        {/* Previous chapter */}
                        {prevChapter ? (
                            <Link
                                href={`/doc-truyen/${getChapterName(currentUrl)}-chuong-${prevChapter?.chapter_name}-${getIdFromUrl(prevChapter?.chapter_api_data, '/')}.html`}
                                className="p-2 rounded-xl hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 group"
                            >
                                <ChevronLeft className="size-6 text-purple-600 group-hover:text-pink-600 transition-colors duration-300" />
                            </Link>
                        ) : (
                            <span className="p-2 opacity-30">
                                <ChevronLeft className="size-6" />
                            </span>
                        )}

                        {/* Page counter */}
                        <div className="flex-shrink-0 px-3 py-1 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                            <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {currentImageIndex + 1} / {totalImages}
                            </span>
                        </div>

                        {/* Slider */}
                        <div className="flex-1">
                            <Slider
                                min={1}
                                max={totalImages}
                                step={1}
                                value={[currentImageIndex + 1]}
                                onValueChange={(value) =>
                                    handleSliderChange({ target: { value: value[0] } })
                                }
                                className="cursor-pointer"
                            />
                        </div>

                        {/* Next chapter */}
                        {nextChapter ? (
                            <Link
                                href={`/doc-truyen/${getChapterName(currentUrl)}-chuong-${nextChapter?.chapter_name}-${getIdFromUrl(nextChapter?.chapter_api_data, '/')}.html`}
                                className="p-2 rounded-xl hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 group"
                            >
                                <ChevronRight className="size-6 text-purple-600 group-hover:text-pink-600 transition-colors duration-300" />
                            </Link>
                        ) : (
                            <span className="p-2 opacity-30">
                                <ChevronRight className="size-6" />
                            </span>
                        )}
                    </div>

                    {/* Progress percentage */}
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Tiến độ đọc</span>
                        <span className="font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {Math.round(((currentImageIndex + 1) / totalImages) * 100)}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
