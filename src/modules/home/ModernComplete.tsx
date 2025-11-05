import ModernCarousel from '@/modules/home/ModernCarousel';
import { getListComplete } from '@/lib/actions/home';

const ModernComplete = async () => {
    const listComplete = await getListComplete();
    
    return (
        <ModernCarousel 
            data={listComplete}
            title="Truyện Hoàn Thành"
            href="/danh-sach/hoan-thanh"
            icon="star"
            gradientFrom="from-green-600"
            gradientTo="to-emerald-600"
        />
    );
};

export default ModernComplete;
