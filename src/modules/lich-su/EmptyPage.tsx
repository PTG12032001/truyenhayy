// ** Next
import Link from 'next/link';

// ** Shadcn ui
import { Button } from '@/components/ui/button';

// ** Lucide Icons
import { BookOpen, Sparkles } from 'lucide-react';

const EmptyPage = () => {
    return (
        <div className="flex flex-col gap-6 justify-center items-center mt-20 mb-20 px-4">
            {/* Icon Container */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/20">
                    <BookOpen className="w-24 h-24 text-purple-500" strokeWidth={1.5} />
                </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-center">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                    Lịch sử đọc trống
                </span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base max-w-md text-center text-muted-foreground leading-relaxed">
                Bạn chưa có lịch sử đọc truyện nào. Hãy bắt đầu khám phá thế giới truyện tranh đầy màu sắc và tạo nên hành trình đọc của riêng bạn.
            </p>

            {/* Action Button */}
            <Link href="/">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25 text-sm sm:text-base gap-2 px-8 py-6 rounded-xl group">
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Khám phá ngay
                </Button>
            </Link>
        </div>
    );
};

export default EmptyPage;