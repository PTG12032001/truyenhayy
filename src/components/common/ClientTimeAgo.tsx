'use client';

import { useEffect, useState } from 'react';
import formatRelativeTime from '@/utils/formatRelativeTime';

interface ClientTimeAgoProps {
    date: string | Date;
    className?: string;
}

/**
 * Client-only time ago component to prevent hydration mismatch
 * Server renders a placeholder, client renders the actual time
 */
export default function ClientTimeAgo({ date, className }: ClientTimeAgoProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return a placeholder during SSR that matches approximate length
        return <span className={className}>Mới cập nhật</span>;
    }

    return <span className={className}>{formatRelativeTime(date)}</span>;
}
