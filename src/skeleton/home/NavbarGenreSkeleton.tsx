import { Skeleton } from '@/components/ui/skeleton';

const NavbarGenreSkeleton = () => {
    return (
        <nav className="flex justify-center py-6 sm:py-8 relative border-y border-white/5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/3 to-transparent"></div>
            <ul className="flex sm:gap-6 gap-4 text-sm lg:text-base container justify-center wrapper relative z-10">
                {[...Array(9)].map((_, index) => (
                    <li
                        key={index}
                        className={`
                            block
                            ${index > 4 ? 'hidden md:block' : ''}  
                            ${index > 6 ? 'hidden lg:block' : ''} 
                        `}
                    >
                        <Skeleton className="h-4 w-[40px] lg:w-[49px]" />
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavbarGenreSkeleton;
