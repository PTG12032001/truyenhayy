import { Metadata } from 'next';
import { Mail, MessageSquare, Phone, MapPin, Send, Clock } from 'lucide-react';
import { FAQSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
    title: 'Liên hệ',
    description: 'Thông tin liên hệ và hỗ trợ',
};

export default function ContactPage() {
    return (
        <>
            {/* FAQ Schema for SEO */}
            <FAQSchema
                questions={[
                    {
                        question: 'Làm sao để báo cáo nội dung vi phạm bản quyền?',
                        answer: 'Vui lòng gửi email cho chúng tôi tại support@truyenhayy.online với thông tin chi tiết về nội dung vi phạm, bao gồm link và bằng chứng sở hữu bản quyền.'
                    },
                    {
                        question: 'Website có thu phí không?',
                        answer: 'Website hoàn toàn miễn phí cho tất cả người dùng. Chúng tôi không thu bất kỳ khoản phí nào.'
                    },
                    {
                        question: 'Làm sao để góp ý cải thiện website?',
                        answer: 'Chúng tôi rất mong nhận được ý kiến đóng góp từ bạn. Hãy gửi email hoặc liên hệ qua số điện thoại +84 123 456 789 để chia sẻ ý tưởng của bạn.'
                    },
                    {
                        question: 'Tại sao một số truyện không tải được?',
                        answer: 'Có thể do nguồn gốc bị lỗi hoặc đã bị gỡ bỏ. Vui lòng báo cáo cho chúng tôi qua email support@truyenhayy.online để kiểm tra và khắc phục.'
                    },
                ]}
            />
            
        <div className="min-h-screen wrapper py-12">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 mb-6">
                    <MessageSquare className="w-10 h-10 text-purple-500" strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl sm:text-5xl font-black mb-4">
                    <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                        Liên hệ với chúng tôi
                    </span>
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Chúng tôi luôn sẵn sàng lắng nghe ý kiến và hỗ trợ bạn
                </p>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Contact Cards Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Email Card */}
                    <div className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/10 hover:border-purple-500/30 transition-all group">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                                <Mail className="w-6 h-6 text-purple-500" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Email
                                </h3>
                                <p className="text-muted-foreground text-sm mb-3">
                                    Gửi email cho chúng tôi về bất kỳ vấn đề gì
                                </p>
                                <a 
                                    href="mailto:support@truyenhayy.online" 
                                    className="text-purple-500 hover:text-purple-600 font-medium text-sm flex items-center gap-2"
                                >
                                    support@truyenhayy.online
                                    <Send className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Phone Card */}
                    <div className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/10 hover:border-purple-500/30 transition-all group">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-pink-500/10 group-hover:bg-pink-500/20 transition-colors">
                                <Phone className="w-6 h-6 text-pink-500" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Điện thoại
                                </h3>
                                <p className="text-muted-foreground text-sm mb-3">
                                    Hotline hỗ trợ khách hàng
                                </p>
                                <a 
                                    href="tel:+84123456789" 
                                    className="text-pink-500 hover:text-pink-600 font-medium text-sm"
                                >
                                    +84 123 456 789
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Address Card */}
                    <div className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/10 hover:border-purple-500/30 transition-all group">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                                <MapPin className="w-6 h-6 text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Địa chỉ
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    Hà Nội, Việt Nam
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Working Hours Card */}
                    <div className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/10 hover:border-purple-500/30 transition-all group">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                                <Clock className="w-6 h-6 text-purple-500" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Giờ làm việc
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    Thứ 2 - Thứ 6: 9:00 - 18:00<br />
                                    Thứ 7 - CN: 9:00 - 17:00
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <section className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/10 mt-8">
                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Câu hỏi thường gặp
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-2">Làm sao để báo cáo nội dung vi phạm bản quyền?</h3>
                            <p className="text-muted-foreground text-sm">
                                Vui lòng gửi email cho chúng tôi với thông tin chi tiết về nội dung vi phạm, bao gồm link và bằng chứng sở hữu bản quyền.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Website có thu phí không?</h3>
                            <p className="text-muted-foreground text-sm">
                                Website hoàn toàn miễn phí cho tất cả người dùng. Chúng tôi không thu bất kỳ khoản phí nào.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Làm sao để góp ý cải thiện website?</h3>
                            <p className="text-muted-foreground text-sm">
                                Chúng tôi rất mong nhận được ý kiến đóng góp từ bạn. Hãy gửi email hoặc liên hệ qua các kênh trên để chia sẻ ý tưởng của bạn.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Tại sao một số truyện không tải được?</h3>
                            <p className="text-muted-foreground text-sm">
                                Có thể do nguồn gốc bị lỗi hoặc đã bị gỡ bỏ. Vui lòng báo cáo cho chúng tôi để kiểm tra và khắc phục.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Support Info */}
                <div className="text-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-500/20">
                    <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Cần hỗ trợ khẩn cấp?
                    </h3>
                    <p className="text-muted-foreground mb-4">
                        Chúng tôi cam kết phản hồi trong vòng 24 giờ
                    </p>
                    <a 
                        href="mailto:support@truyenhayy.online"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-purple-500/25 transition-all"
                    >
                        <Send className="w-5 h-5" />
                        Gửi email ngay
                    </a>
                </div>
            </div>
        </div>
        </>
    );
}
