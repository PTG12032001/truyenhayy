import { Skeleton } from '@/components/ui/skeleton';

const NewComicSkeleton = () => {
    return (
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
            {/* Match ModernNewComic transparent style */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
            </div>
            
            <div className="wrapper relative z-10">
                <div className="mb-10 sm:mb-12">
                    <Skeleton className="w-[300px] sm:w-[400px] md:w-[500px] h-12 rounded-xl mb-4"/>
                    <Skeleton className="w-[200px] h-5 rounded-lg"/>
                </div>
                
                <figure
                    className="rounded-3xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm border border-white/10 p-6 flex flex-col justify-between relative h-[300px]">
                    <div className="z-10 w-[49%]">
                        <Skeleton className="w-[270px] sm:w-[310px] md:w-[320px] lg:w-[323px] h-6"/>

                        <ul className="flex gap-1 sm:gap-2 md:gap-2.5 lg:gap-3 items-center lg:overflow-hidden scroll-sub mt-5">
                            {[...Array(4)].map((_, index) => (
                                <li
                                    key={index}
                                    className="rounded-sm text-white text-xs h-[20px] py-[1px] px-1.5 flex-shrink-0"
                                >
                                    <Skeleton className="h-4 w-[40px] lg:w-[49px]" />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="h-[1px] bg-gray-500 w-[49%] z-10"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end z-10">
                        <div className="grid grid-flow-col auto-cols-[calc(100%/5-12px)] sm:auto-cols-[calc(100%/7-12px)] gap-3 overflow-hidden">
                            {[...Array(7)].map((_, index) => (
                                <div
                                    key={index}
                                    className="aspect-[3/4] rounded-[5px] overflow-hidden cursor-pointer"
                                >
                                    <Skeleton className="object-cover size-full" />
                                </div>
                            ))}
                        </div>

                        <div className="hidden sm:block rounded-2xl overflow-hidden aspect-video absolute right-6 -top-8 w-[45%]">
                            <Skeleton className="object-cover size-full" />
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-[#1b2022f2] rounded-2xl"></div>
                </figure>
            </div>
        </section>
    )
}

export default NewComicSkeleton;