import ModernCarousel from '@/modules/home/ModernCarousel';
import { getListPublishing } from '@/lib/actions/home';

const ModernPublishing = async () => {
    const listPublishing = await getListPublishing();
    
    return (
        <ModernCarousel 
            data={listPublishing}
            title="Truyện Đang Phát Hành"
            href="/danh-sach/dang-phat-hanh"
            icon="trending"
            gradientFrom="from-blue-600"
            gradientTo="to-cyan-600"
        />
    );
};

export default ModernPublishing;
