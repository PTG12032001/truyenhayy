import ModernCarousel from '@/modules/home/ModernCarousel';
import { getListComingSoon } from '@/lib/actions/home';

const ModernComingSoon = async () => {
    const listComingSoon = await getListComingSoon();
    
    return (
        <ModernCarousel 
            data={listComingSoon}
            title="Truyện Sắp Ra Mắt"
            href="/danh-sach/sap-ra-mat"
            icon="clock"
            gradientFrom="from-orange-600"
            gradientTo="to-red-600"
        />
    );
};

export default ModernComingSoon;
