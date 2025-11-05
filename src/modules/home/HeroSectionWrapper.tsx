import HeroSection from '@/modules/home/HeroSection';
import { getListHome } from '@/lib/actions/home';

const HeroSectionWrapper = async () => {
    const listHome = await getListHome();
    return <HeroSection data={listHome} />;
};

export default HeroSectionWrapper;
