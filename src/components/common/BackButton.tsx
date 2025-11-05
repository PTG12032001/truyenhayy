'use client';

// ** Shadcn ui
import { Button } from '@/components/ui/button';

// ** Lucide Icons
import { ArrowLeft } from 'lucide-react';

export const BackButton = () => {
    return (
        <Button 
            onClick={() => window.history.back()}
            className="bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/50 hover:border-gray-500/70 text-foreground text-sm gap-2 px-6 py-6 rounded-xl group"
        >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Quay lại
        </Button>
    );
};
