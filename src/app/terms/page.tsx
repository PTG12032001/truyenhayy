import { Metadata } from 'next';
import { FileText, AlertCircle, CheckCircle, XCircle, Scale, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Điều khoản sử dụng',
    description: 'Điều khoản và điều kiện sử dụng dịch vụ',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen wrapper py-12">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 mb-6">
                    <FileText className="w-10 h-10 text-purple-500" strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl sm:text-5xl font-black mb-4">
                    <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                        Điều khoản sử dụng
                    </span>
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Vui lòng đọc kỹ các điều khoản trước khi sử dụng dịch vụ
                </p>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Section 1 */}
                <section className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/10">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-purple-500/10">
                            <CheckCircle className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Chấp nhận điều khoản
                            </h2>
                            <div className="text-muted-foreground space-y-3">
                                <p>
                                    Bằng việc truy cập và sử dụng website này, bạn đồng ý tuân theo các điều khoản và điều kiện sau:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Tuân thủ mọi quy định pháp luật hiện hành</li>
                                    <li>Sử dụng dịch vụ cho mục đích cá nhân, phi thương mại</li>
                                    <li>Không sao chép, phân phối nội dung trái phép</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/10">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-pink-500/10">
                            <Scale className="w-6 h-6 text-pink-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Bản quyền nội dung
                            </h2>
                            <div className="text-muted-foreground space-y-3">
                                <p>
                                    Tất cả nội dung trên website thuộc quyền sở hữu của các tác giả và nhà xuất bản tương ứng:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Website là nền tảng chia sẻ và đọc truyện tranh</li>
                                    <li>Nội dung được thu thập từ nhiều nguồn công khai</li>
                                    <li>Chúng tôi tôn trọng bản quyền và sẵn sàng gỡ nội dung vi phạm</li>
                                    <li>Liên hệ qua trang <a href="/contact" className="text-purple-500 hover:text-purple-600 underline">Liên hệ</a> nếu phát hiện vi phạm</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3 */}
                <section className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/10">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <XCircle className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Hành vi bị cấm
                            </h2>
                            <div className="text-muted-foreground space-y-3">
                                <p>
                                    Khi sử dụng dịch vụ, bạn không được phép:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Sử dụng bot, script tự động để tải nội dung hàng loạt</li>
                                    <li>Tấn công, phá hoại hệ thống website</li>
                                    <li>Tải lên nội dung vi phạm pháp luật, khiêu dâm, bạo lực</li>
                                    <li>Mạo danh, giả mạo thông tin</li>
                                    <li>Spam, quảng cáo trái phép</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4 */}
                <section className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/10">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-purple-500/10">
                            <AlertCircle className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Giới hạn trách nhiệm
                            </h2>
                            <div className="text-muted-foreground space-y-3">
                                <p>
                                    Chúng tôi không chịu trách nhiệm về:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Độ chính xác, đầy đủ của nội dung</li>
                                    <li>Gián đoạn dịch vụ, lỗi kỹ thuật</li>
                                    <li>Thiệt hại phát sinh từ việc sử dụng website</li>
                                    <li>Nội dung từ nguồn bên thứ ba</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5 */}
                <section className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/10">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-pink-500/10">
                            <RefreshCw className="w-6 h-6 text-pink-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Thay đổi điều khoản
                            </h2>
                            <div className="text-muted-foreground space-y-3">
                                <p>
                                    Chúng tôi có quyền cập nhật, thay đổi điều khoản sử dụng bất cứ lúc nào. Việc tiếp tục sử dụng dịch vụ sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Last updated */}
                <div className="text-center text-sm text-muted-foreground pt-8">
                    <p>Cập nhật lần cuối: Tháng 11, 2025</p>
                </div>
            </div>
        </div>
    );
}
