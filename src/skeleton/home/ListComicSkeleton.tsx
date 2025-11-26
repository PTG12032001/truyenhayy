import { Skeleton } from '@/components/ui/skeleton';

const ListComicSkeleton = () => {
    return (
        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
            {/* Match ModernCarousel transparent style */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-600 to-blue-600 rounded-full blur-3xl"></div>
            </div>
            
            <div className="wrapper relative z-10">
                <div className="mb-8 sm:mb-10 md:mb-12">
                    <Skeleton className="w-[270px] sm:w-[310px] md:w-[400px] h-10 rounded-xl" />
                </div>
                <div className="flex gap-4 md:gap-6 overflow-hidden">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px]">
                            <figure className="flex flex-col gap-3">
                                <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
                                <Skeleton className="h-5 w-[85%] rounded-lg" />
                                <Skeleton className="h-4 w-[60%] rounded-lg" />
                            </figure>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ListComicSkeleton;
