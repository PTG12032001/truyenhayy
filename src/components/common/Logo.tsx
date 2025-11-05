// ** React
import * as React from 'react';

// ** Next
import Link from 'next/link';
import Image from 'next/image';

// ** class variance authority
import { cva, type VariantProps } from 'class-variance-authority';

// ** utils
import { cn } from '@/lib/utils';

const logoVariants = cva(
    'font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all duration-300',
    {
        variants: {
            size: {
                default: 'text-lg',
                lg: 'text-xl md:text-3xl',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    }
);

export interface LogoProps
    extends React.HTMLAttributes<HTMLParagraphElement>,
        VariantProps<typeof logoVariants> {}

const Logo = React.forwardRef<HTMLParagraphElement, LogoProps>(
    ({ className, size = 'default', ...props }, ref) => {
        const safeSize = (size ?? 'default') as 'default' | 'lg';
        return (
            <Link href="/" className="inline-flex items-center gap-2 group">
                <div className="relative">
                    {/* Custom Logo */}
                    <div className={cn(
                        "rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-110",
                        safeSize === 'lg' ? 'w-12 h-12' : 'w-10 h-10'
                    )}>
                        <Image
                            src="/logothayy.png"
                            alt="Truyenhayy Logo"
                            width={safeSize === 'lg' ? 48 : 40}
                            height={safeSize === 'lg' ? 48 : 40}
                            className="w-full h-full object-contain"
                            priority
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <p
                        ref={ref}
                        className={cn(logoVariants({ size }), className)}
                        {...props}
                    >
                        Truyenhayy
                    </p>
                    {safeSize === 'lg' && (
                        <span className="text-xs text-muted-foreground -mt-1">
                            .online
                        </span>
                    )}
                </div>
            </Link>
        );
    }
);

Logo.displayName = 'Logo';

export default Logo;
