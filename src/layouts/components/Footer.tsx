// ** Components
import { Tag } from '@/components/common/Tag';
import Logo from '@/components/common/Logo';

// ** Lucide Icons
import { BookOpen, Sparkles, Heart, Zap } from 'lucide-react';

// ** Configs
import { tagsFooter } from '@/configs/layout';

const Footer = () => {
    return (
        <footer className="w-full relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
            </div>

            <div className="relative pt-16 pb-8">
                <div className="wrapper">
                    {/* Main Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        {/* Brand Section */}
                        <div className="space-y-4">
                            <Logo size='lg'/>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Khám phá thế giới truyện tranh đa dạng với hàng ngàn đầu truyện được cập nhật liên tục mỗi ngày.
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                <div className="flex items-center gap-2 text-purple-400">
                                    <BookOpen className="w-4 h-4" />
                                    <span className="text-xs font-medium">Miễn phí 100%</span>
                                </div>
                                <div className="flex items-center gap-2 text-pink-400">
                                    <Zap className="w-4 h-4" />
                                    <span className="text-xs font-medium">Cập nhật mỗi ngày</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-purple-400" />
                                Khám phá
                            </h3>
                            <ul className="flex flex-wrap gap-2">
                                {tagsFooter.map((tag) => (
                                    <Tag
                                        key={tag?.title}
                                        href={tag?.href}
                                        theme="dark"
                                    >
                                        {tag?.title}
                                    </Tag>
                                ))}
                            </ul>
                        </div>

                        {/* Info Section */}
                        <div className="space-y-4">
                            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                <Heart className="w-5 h-5 text-pink-400" />
                                Hỗ trợ
                            </h3>
                            <div className="space-y-3">
                                <a href="/privacy" className="block text-white/60 hover:text-purple-400 transition-colors text-sm">
                                    Chính sách bảo mật
                                </a>
                                <a href="/terms" className="block text-white/60 hover:text-purple-400 transition-colors text-sm">
                                    Điều khoản sử dụng
                                </a>
                                <a href="/contact" className="block text-white/60 hover:text-purple-400 transition-colors text-sm">
                                    Liên hệ & Báo lỗi
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                            Thông tin quan trọng
                        </h4>
                        <p className="text-white/50 text-xs leading-relaxed">
                            Website cung cấp nền tảng đọc truyện tranh trực tuyến miễn phí. Tất cả nội dung đều thuộc bản quyền của tác giả và nhà xuất bản. Chúng tôi tôn trọng quyền sở hữu trí tuệ và sẵn sàng gỡ bỏ nội dung vi phạm khi nhận được yêu cầu hợp lệ.
                        </p>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-white/10">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-white/40 text-xs md:text-sm">
                                © {new Date().getFullYear()} <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Truyenhayy</span> - Được tạo với <Heart className="w-3 h-3 inline text-pink-400" /> tại Việt Nam
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                <span className="text-white/40 text-xs">Hoạt động bình thường</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
