// ** Next
import Link from 'next/link';
import { Metadata } from 'next';

// ** Shadcn ui
import { Button } from '@/components/ui/button';

// ** Components
import { BackButton } from '@/components/common/BackButton';

// ** Lucide Icons
import { SearchX, Home } from 'lucide-react';

export const metadata: Metadata = {
    title: '404 - Không tìm thấy trang này',
    description: 'Trang bạn đang tìm kiếm không tồn tại.',
};

export default function NotFound() {
    return (
        <div className="flex flex-col gap-8 justify-center items-center h-screen -mt-[56px] px-4">
            {/* 404 Number with gradient */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative">
                    <h1 className="text-[120px] sm:text-[180px] font-black leading-none">
                        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                            404
                        </span>
                    </h1>
                </div>
            </div>

            {/* Icon Container */}
            <div className="relative -mt-6">
                <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20">
                    <SearchX className="w-16 h-16 text-purple-500" strokeWidth={1.5} />
                </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-3 -mt-2">
                <h2 className="text-2xl sm:text-3xl font-bold">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Trang không tồn tại
                    </span>
                </h2>
                <p className="text-sm sm:text-base max-w-md text-muted-foreground">
                    Đường dẫn bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại URL hoặc quay về trang chủ.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link href="/">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25 text-sm gap-2 px-6 py-6 rounded-xl group">
                        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Về trang chủ
                    </Button>
                </Link>
                <BackButton />
            </div>
        </div>
    );
}
