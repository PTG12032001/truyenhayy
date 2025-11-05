import ModernNewComic from '@/modules/home/ModernNewComic';
import { getListNew } from '@/lib/actions/home';

const ModernNewComicWrapper = async () => {
    const listNewComic = await getListNew();
    return <ModernNewComic listNewComic={listNewComic} />;
};

export default ModernNewComicWrapper;
