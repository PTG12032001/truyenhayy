'use client';

// ** Next
import Link from 'next/link';

// ** Shadcn ui
import { Button } from '@/components/ui/button';

// ** utils
import { historyService } from '@/utils/localStorage/historyService';

interface IReadNowBtnProps {
    href: string;
    chapter: string;
    slug: string;
}

const ReadNowBtn = ({ chapter, href, slug }: IReadNowBtnProps) => {
    const isComicHistory = historyService.getBySlug(slug);

    if (!isComicHistory)
        return (
            <Button
                className="mt-[21px] w-full"
                asChild={true}
                variant="primary"
            >
                <Link href={href}>
                    ✨ Bắt đầu đọc chương {chapter} thôi nào!
                </Link>
            </Button>
        );

    return (
        <Button
            className="mt-[21px] w-full"
            asChild={true}
            variant="primary"

        >
            <Link href={isComicHistory.path}>
                🔖 Tiếp tục đọc chương {isComicHistory.chapter} nè!
            </Link>
        </Button>
    );
};

export default ReadNowBtn;
