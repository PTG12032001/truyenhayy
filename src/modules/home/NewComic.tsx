import { getListNew } from '@/lib/actions/home';
import Link from 'next/link';
import InteractiveThumbnail from '@/modules/home/InteractiveThumbnail';

const NewComic = async () => {

    const listNewComic: IComic[] = await getListNew();

    return (
        <section className="bg-gradient-to-b from-background to-background/50 dark:from-secondary dark:to-secondary/50">
            <div className="wrapper pb-12 sm:pb-16 md:pb-20 lg:pb-24">
                <header className="pt-8 pb-6 sm:pt-12 sm:pb-8 md:pt-16 md:pb-10 lg:pt-20 lg:pb-12">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                            <Link 
                                href="danh-sach/truyen-moi"
                                className="gradient-text hover:scale-105 transition-transform duration-200 inline-flex items-center gap-3"
                            >
                                <div className="w-1 h-8 sm:h-10 md:h-12 lg:h-14 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
                                Truyện Mới Cập Nhật
                            </Link>
                        </h1>
                        <Link 
                            href="danh-sach/truyen-moi"
                            className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                        >
                            Xem tất cả →
                        </Link>
                    </div>
                </header>
                <InteractiveThumbnail listNewComic={listNewComic} />
            </div>
        </section>
    );
};

export default NewComic;