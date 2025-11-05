import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ButtonProps } from '@/components/ui/button';
import Link from 'next/link';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn('mx-auto flex w-full justify-center', className)}
        {...props}
    />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn('flex flex-row items-center gap-1', className)}
        {...props}
    />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<ButtonProps, 'shape'> &
    React.ComponentProps<typeof Link>;

const PaginationLink = ({
    className,
    isActive,
    ...props
}: PaginationLinkProps) => (
    <Link
        aria-current={isActive ? 'page' : undefined}
        className={cn(
            'min-w-[40px] h-10 flex items-center justify-center rounded-full font-medium transition-all duration-300',
            isActive 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-110' 
                : 'hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 border border-transparent hover:border-purple-500/30 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text hover:text-transparent',
            className
        )}
        {...props}
    />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to previous page"
        shape="default"
        className={cn(
            'gap-2 px-4 rounded-full hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300',
            className
        )}
        {...props}
    >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Trước</span>
    </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to next page"
        shape="default"
        className={cn(
            'gap-2 px-4 rounded-full hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300',
            className
        )}
        {...props}
    >
        <span className="hidden sm:inline">Sau</span>
        <ChevronRight className="h-4 w-4" />
    </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<'span'>) => (
    <span
        aria-hidden
        className={cn('flex h-9 w-9 items-center justify-center', className)}
        {...props}
    >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">More pages</span>
    </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
};
