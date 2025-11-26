'use client';

// ** Next
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ** Shadcn ui
import { SheetClose, SheetTitle } from '@/components/ui/sheet';

// ** utils
import removeExtension from '@/utils/removeExtension';

// ** Configs
import { navHeader } from '@/configs/layout';

const NavHeaderMobile = () => {
    const path = usePathname();

    const pathGenre = path.startsWith('/the-loai');

    return (
        <>
            {navHeader.map((nav) => {
                const isActive =
                    pathGenre && nav.title === 'Thể loại'
                        ? true
                        : removeExtension(path, '.html') ===
                          removeExtension(nav.href, '.html');

                const Icon = nav.icon;

                return (
                    <SheetTitle asChild={true} key={nav.href}>
                        <li className="rounded-xl overflow-hidden">
                            <SheetClose asChild>
                                <Link
                                    href={nav.href}
                                    className={`
                                        group relative flex items-center gap-3 py-3 px-4
                                        rounded-xl transition-all duration-300 whitespace-nowrap
                                        ${isActive 
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20' 
                                            : 'hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 border border-transparent hover:border-purple-500/20'
                                        }
                                    `}
                                >
                                    {Icon && (
                                        <Icon className={`
                                            size-5 flex-shrink-0 transition-all duration-300
                                            ${isActive 
                                                ? 'text-white' 
                                                : 'text-purple-600 group-hover:text-pink-600'
                                            }
                                        `} />
                                    )}
                                    <span className={`
                                        font-medium transition-all duration-300
                                        ${isActive 
                                            ? 'text-white' 
                                            : 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text group-hover:text-transparent'
                                        }
                                    `}>
                                        {nav.title}
                                    </span>
                                    {!isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/5 group-hover:to-pink-600/5 rounded-xl transition-all duration-300 pointer-events-none" />
                                    )}
                                </Link>
                            </SheetClose>
                        </li>
                    </SheetTitle>
                );
            })}
        </>
    );
};

export default NavHeaderMobile;
