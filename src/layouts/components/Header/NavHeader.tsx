'use client';

// ** Next
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ** utils
import removeExtension from '@/utils/removeExtension';

// ** Configs
import { navHeader } from '@/configs/layout';

const NavHeader = () => {
    const path = usePathname();

    const pathGenre = path.startsWith('/the-loai');

    return (
        <ul className="hidden xl:flex items-center gap-2">
            {navHeader.map((nav) => {
                const isActive =
                    pathGenre && nav.title === 'Thể loại'
                        ? true
                        : removeExtension(path, '.html') ===
                          removeExtension(nav.href, '.html');

                const Icon = nav.icon;

                return (
                    <li key={nav.href}>
                        <Link
                            href={nav.href}
                            className={`
                                group relative flex items-center gap-2 px-4 py-2 rounded-full
                                transition-all duration-300 font-medium whitespace-nowrap
                                ${isActive 
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' 
                                    : 'hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 border border-transparent hover:border-purple-500/20'
                                }
                            `}
                        >
                            {Icon && <Icon className="size-4 flex-shrink-0" />}
                            <span className={`
                                ${isActive 
                                    ? '' 
                                    : 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text group-hover:text-transparent transition-all duration-300'
                                }
                            `}>
                                {nav.title}
                            </span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default NavHeader;
