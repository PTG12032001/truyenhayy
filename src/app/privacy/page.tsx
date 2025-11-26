import { Metadata } from 'next';
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Chính sách bảo mật',
    description: 'Chính sách bảo mật và quyền riêng tư của người dùng',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen wrapper py-12">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 mb-6">
                    <Shield className="w-10 h-10 text-purple-500" strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl sm:text-5xl font-black mb-4">
                    <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                        Chính sách bảo mật
                    </span>
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn
                </p>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Section 1 */}
                <section className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/10">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-purple-500/10">
                            <Database className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Thu thập thông tin
                            </h2>
                            <div className="text-muted-foreground space-y-3">
                                <p>
                                    Chúng tôi chỉ thu thập thông tin cần thiết để cung cấp dịch vụ tốt nhất cho bạn:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Lịch sử đọc truyện được lưu trữ trên thiết bị của bạn (Local Storage)</li>
                                    <li>Thông tin về trình duyệt và thiết bị để tối ưu hiển thị</li>
                                    <li>Cookie để ghi nhớ cài đặt giao diện và ngôn ngữ</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/10">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-pink-500/10">
                            <Lock className="w-6 h-6 text-pink-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Bảo mật thông tin
                            </h2>
                            <div className="text-muted-foreground space-y-3">
                                <p>
                                    Chúng tôi áp dụng các biện pháp bảo mật để bảo vệ thông tin của bạn:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Sử dụng HTTPS để mã hóa kết nối</li>
                                    <li>Không chia sẻ thông tin cá nhân với bên thứ ba</li>
                                    <li>Không yêu cầu đăng ký tài khoản hoặc thông tin nhạy cảm</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3 */}
                <section className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/10">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <Eye className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Sử dụng thông tin
                            </h2>
                            <div className="text-muted-foreground space-y-3">
                                <p>
                                    Thông tin thu thập được sử dụng để:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Cải thiện trải nghiệm đọc truyện của bạn</li>
                                    <li>Lưu trữ lịch sử đọc và tiến độ</li>
                                    <li>Tối ưu hiệu suất và giao diện website</li>
                                    <li>Phân tích xu hướng sử dụng để cải thiện dịch vụ</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4 */}
                <section className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/10">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-purple-500/10">
                            <UserCheck className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Quyền của bạn
                            </h2>
                            <div className="text-muted-foreground space-y-3">
                                <p>
                                    Bạn có quyền:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Xóa lịch sử đọc truyện bất cứ lúc nào</li>
                                    <li>Xóa cookie và dữ liệu trình duyệt</li>
                                    <li>Từ chối việc thu thập dữ liệu phân tích (nếu có)</li>
                                    <li>Yêu cầu thông tin về dữ liệu được thu thập</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5 */}
                <section className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/10">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-pink-500/10">
                            <Mail className="w-6 h-6 text-pink-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Liên hệ
                            </h2>
                            <div className="text-muted-foreground space-y-3">
                                <p>
                                    Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật, vui lòng liên hệ với chúng tôi qua trang <a href="/contact" className="text-purple-500 hover:text-purple-600 underline">Liên hệ</a>.
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
