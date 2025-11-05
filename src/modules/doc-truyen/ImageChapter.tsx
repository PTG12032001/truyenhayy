'use client';

// ** React
import { useEffect, useRef, useState } from 'react';

// ** Next
import Image from 'next/image';
import Link from 'next/link';

// ** Modules
import Settings from '@/modules/doc-truyen/Settings';

// ** Components
import Overlay from '@/modules/doc-truyen/Overlay';

// ** Hooks
import useTailwindBreakpoints from '@/hooks/useTailwindBreakpoints';

// ** utils
import getIdFromUrl from '@/utils/getIdFromUrl';
import { getChapterName } from '@/utils/getChapterName';

// ** Lucide Icon
import { SettingsIcon } from 'lucide-react';

const ImgsChapter = ({
    chapters,
    chapterName,
    url,
    urlPath,
    listChapter,
    currentUrl,
    numberOfChapters,
    slugChapter,
}: {
    chapters: IChapterImg[];
    chapterName: string;
    url: string;
    urlPath: string;
    listChapter: IChapter[];
    currentUrl: string;
    numberOfChapters: string;
    slugChapter: string;
}) => {
    const skipFirstImage = true; // Mặc định bỏ ảnh đầu
    const totalImages = chapters?.length - (skipFirstImage ? 1 : 0); // Trừ 1 nếu bỏ ảnh đầu

    const { isLg } = useTailwindBreakpoints();
    const [imgWidth, setImgWidth] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showGuide, setShowGuide] = useState(false);

    const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

    const indexCurrentChapter = listChapter.findIndex(
        (chapter) =>
            getIdFromUrl(chapter.chapter_api_data, '/') ===
            getIdFromUrl(currentUrl, '-')
    );

    // Next chapter
    const nextChapter = listChapter[indexCurrentChapter + 1];

    useEffect(() => {
        const hasSeenGuide = localStorage.getItem('truyenhayy-hasSeenGuide');
        if (!hasSeenGuide) {
            setShowGuide(true);
            localStorage.setItem('truyenhayy-hasSeenGuide', 'true');
        }
    }, []);

    useEffect(() => {
        if (isLg) {
            setImgWidth(50);
        } else {
            setImgWidth(100);
        }
    }, [isLg]);

    const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isLg) {
            e.preventDefault();
            setIsModalOpen(!isModalOpen);
            setIsDropdownOpen(false);
        }
    };

    const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsModalOpen(!isModalOpen);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('modal-scrollbar-hidden');
        } else {
            document.body.classList.remove('modal-scrollbar-hidden');
        }

        return () => {
            document.body.classList.remove('modal-scrollbar-hidden');
        };
    }, [isModalOpen]);

    return (
        <>
            <div
                className="flex flex-col items-center pt-20"
                onContextMenu={handleRightClick}
                onClick={handleOnClick}
            >
                {chapters && chapters.length > 0
                    ? chapters.map((item, index) => {
                          // Bỏ qua ảnh đầu tiên nếu skipFirstImage = true
                          if (skipFirstImage && index === 0) {
                              return null;
                          }
                          
                          const isFirstFew = skipFirstImage ? index <= 3 : index <= 2;
                          
                          return (
                              <Image
                                  ref={(el) => {
                                      imgRefs.current[index] = el;
                                  }}
                                  key={index}
                                  src={`${url}/${urlPath}/${item?.image_file}`}
                                  alt={`${chapterName} - Trang ${skipFirstImage ? index : index + 1}`}
                                  width={925}
                                  height={1387}
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 925px"
                                  quality={isFirstFew ? 75 : 60}
                                  priority={index === 0 || (skipFirstImage && index === 1)}
                                  loading={isFirstFew ? 'eager' : 'lazy'}
                                  placeholder="blur"
                                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWUiLz48L3N2Zz4="
                                  fetchPriority={isFirstFew ? 'high' : 'auto'}
                                  decoding={isFirstFew ? 'sync' : 'async'}
                                  className="bg-black dark:bg-white"
                                  style={{ width: `${imgWidth}%` }}
                                  onLoad={() => {
                                      // Preload next 2 images when current image loads
                                      if (index < chapters.length - 3) {
                                          const nextIndex = index + 1;
                                          const nextNextIndex = index + 2;
                                          if (chapters[nextIndex]) {
                                              const link = document.createElement('link');
                                              link.rel = 'prefetch';
                                              link.as = 'image';
                                              link.href = `${url}/${urlPath}/${chapters[nextIndex]?.image_file}`;
                                              document.head.appendChild(link);
                                          }
                                          if (chapters[nextNextIndex]) {
                                              const link = document.createElement('link');
                                              link.rel = 'prefetch';
                                              link.as = 'image';
                                              link.href = `${url}/${urlPath}/${chapters[nextNextIndex]?.image_file}`;
                                              document.head.appendChild(link);
                                          }
                                      }
                                  }}
                              ></Image>
                          );
                      })
                    : 'Không có ảnh nào ....'}
                {
                    <Overlay isModalOpen={isModalOpen}>
                        <Settings
                            imgWidth={imgWidth}
                            totalImages={totalImages}
                            setImgWidth={setImgWidth}
                            listChapter={listChapter}
                            currentUrl={currentUrl}
                            imgRefs={imgRefs}
                            currentImageIndex={currentImageIndex}
                            setCurrentImageIndex={setCurrentImageIndex}
                            indexCurrentChapter={indexCurrentChapter}
                            isDropdownOpen={isDropdownOpen}
                            setIsDropdownOpen={setIsDropdownOpen}
                            slugChapter={slugChapter}
                        />
                    </Overlay>
                }

                {/* Modern Page Counter */}
                <div className="hidden xl:flex fixed bottom-6 left-8 group">
                    <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
                        {/* Animated gradient border */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-pink-600/20 to-blue-600/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        
                        <div className="relative flex items-center gap-4">
                            {/* Current page indicator */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 blur-xl opacity-50 rounded-full" />
                                <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-3 shadow-lg">
                                    <div className="flex flex-col items-center justify-center min-w-[40px]">
                                        <span className="text-2xl font-bold text-white">
                                            {currentImageIndex + 1}
                                        </span>
                                        <span className="text-[10px] text-white/80 font-medium">
                                            PAGE
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Info section */}
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-4 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full" />
                                    <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        Chương {numberOfChapters}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                                    <span>Tổng số:</span>
                                    <span className="font-medium">{totalImages} trang</span>
                                </div>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-3 h-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-300"
                                style={{ width: `${((currentImageIndex + 1) / totalImages) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Modern Settings Toggle */}
                <div
                    className="fixed bottom-6 right-8 cursor-pointer hidden lg:block group"
                    onClick={() => setIsModalOpen((prevState) => !prevState)}
                >
                    <div className={`
                        relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 
                        backdrop-blur-xl border rounded-2xl p-4 shadow-2xl 
                        transition-all duration-300 hover:scale-105
                        ${isModalOpen 
                            ? 'border-purple-500/40 shadow-purple-500/20' 
                            : 'border-purple-500/20 shadow-purple-500/10 hover:shadow-purple-500/20'
                        }
                    `}>
                        {/* Glow effect */}
                        <div className={`
                            absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 
                            rounded-2xl transition-opacity duration-300
                            ${isModalOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
                        `} />

                        <div className="relative flex items-center gap-3">
                            <div className={`
                                p-2 rounded-xl transition-all duration-300
                                ${isModalOpen 
                                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50' 
                                    : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30'
                                }
                            `}>
                                <SettingsIcon className={`size-5 transition-colors duration-300 ${
                                    isModalOpen ? 'text-white' : 'text-purple-600'
                                }`} />
                            </div>
                            <div className="hidden xl:block">
                                <div className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    {isModalOpen ? 'Ẩn công cụ' : 'Hiện công cụ'}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {isModalOpen ? 'Click để ẩn' : 'Click để mở'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {nextChapter && (
                <div className="flex justify-center py-12">
                    <Link
                        href={`/doc-truyen/${getChapterName(currentUrl)}-chuong-${nextChapter?.chapter_name}-${getIdFromUrl(nextChapter?.chapter_api_data, '/')}.html`}
                        className="group relative"
                    >
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-75 transition-opacity duration-500" />
                        
                        {/* Main button */}
                        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-[2px] shadow-2xl">
                            <div className="relative bg-background rounded-2xl px-8 py-5 hover:bg-transparent transition-all duration-300">
                                {/* Text content */}
                                <div className="relative flex items-center gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text group-hover:text-white transition-all duration-300">
                                            Chương tiếp theo
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <div className="h-px w-8 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-12 transition-all duration-300" />
                                            <span className="text-sm text-muted-foreground group-hover:text-white/80 transition-all duration-300">
                                                Chương {nextChapter?.chapter_name}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Arrow with animation */}
                                    <div className="ml-auto transform group-hover:translate-x-1 transition-transform duration-300">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <svg className="relative w-6 h-6 text-purple-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
            {showGuide && !isLg && chapters && (
                <div className="fixed top-1/4 left-1/2 -translate-x-1/2 pointer-events-none">
                    <div
                        className="z-50 bg-primaryColor text-white
                 text-xs sm:text-sm w-fit text-center
                 px-4 py-2 rounded-md shadow-lg
                 animate-fadeInOut"
                    >
                        Nhấp vào ảnh để hiển thị thanh công cụ nhé ~ (≧▽≦)
                    </div>
                </div>
            )}
        </>
    );
};

export default ImgsChapter;
