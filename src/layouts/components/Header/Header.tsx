// ** React
import { ReactNode } from 'react';

// ** Layouts
import { ModeToggle } from '@/components/common/ModeToggle';
import Search from '@/layouts/components/Search';
import NavHeader from '@/layouts/components/Header/NavHeader';
import NavHeaderMobile from '@/layouts/components/Header/NavHeaderMobile';

// ** Components
import Logo from '@/components/common/Logo';

// ** Shadcn ui
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

// ** Modules
import ReadingHistoryBtn from '@/modules/home/ReadingHistoryBtn';

// ** Lucide Icon
import { Menu } from 'lucide-react';

const Header = ({
    asChild = false,
    children,
}: {
    asChild?: boolean;
    children?: ReactNode;
}) => {
    return (
        <header className="z-40 fixed left-0 top-0 right-0 backdrop-blur-xl bg-background/80 border-b border-purple-500/20 shadow-lg shadow-purple-500/5">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 pointer-events-none" />
            <nav className="wrapper flex justify-between items-center py-4 text-sm font-medium relative">
                <div className="flex items-center gap-8">
                    <Logo />
                    {!asChild && <NavHeader />}
                </div>
                {children}
                <div className="flex items-center gap-3">
                    {!asChild && <Search />}
                    <div className="flex items-center gap-3 text-xs lg:text-sm">
                        {/*<div>Đăng nhập</div>*/}
                        <ReadingHistoryBtn />
                    </div>
                    <div className="hidden xl:block">
                        <ModeToggle/>
                    </div>
                    <div className="xl:hidden">
                        <Sheet>
                            <SheetTrigger asChild className="cursor-pointer">
                                <Button 
                                    variant="ghost" 
                                    shape="squareRounded"
                                    className="hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                                >
                                    <Menu className="size-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="w-[280px] border-r border-purple-500/20 bg-background/95 backdrop-blur-xl"
                                hideCloseButton={true}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 pointer-events-none" />
                                <ul className="text-sm flex flex-col gap-2 relative">
                                    <SheetTitle asChild={true}>
                                        <li className="mb-4 flex justify-between items-center pb-4 border-b border-purple-500/20">
                                            <SheetClose asChild>
                                                <Logo />
                                            </SheetClose>
                                            <ModeToggle></ModeToggle>
                                        </li>
                                    </SheetTitle>
                                    <NavHeaderMobile />
                                </ul>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
