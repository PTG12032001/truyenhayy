import Link from 'next/link';
import { getListGenre } from '@/lib/actions/home';

const NavbarGenre = async () => {

    const listGenre: IGenres[] = await getListGenre();

    return (
        <nav className="flex justify-center py-6 sm:py-8 relative border-y border-white/5 dark:border-white/5">
            {/* Subtle background tint */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/3 to-transparent"></div>
            
            <ul className="flex sm:gap-6 gap-4 text-sm lg:text-base container justify-center wrapper flex-wrap relative z-10">
                {listGenre.slice(0, 8).map((item, index) => (
                    <li
                        key={index}
                        className={`${
                            index + 1 === 7 || index + 1 === 8
                                ? 'hidden lg:block'
                                : index + 1 === 5 || index + 1 === 6
                                  ? 'hidden sm:block'
                                  : 'block'
                        }`}
                    >
                        <Link 
                            href={`/the-loai/${item.slug}.html`}
                            className="group relative px-4 py-2 rounded-full border border-border/40 bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                        >
                            <span className="relative z-10">{item.name}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                    </li>
                ))}
                <li>
                    <Link 
                        href={`/the-loai/tat-ca.html`}
                        className="modern-button text-sm px-6 py-2 rounded-full font-semibold"
                    >
                        Tất cả thể loại
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavbarGenre;
