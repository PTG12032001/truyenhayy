'use server';

// ** actions
import { fetchAPI } from '@/lib/actions/api';

// ** configs
import { CONFIG_API_OUT_SIDE } from '@/configs/api';

export async function getSearchComic(keyword: string, pageQuery: number) {
    return fetchAPI<IApiResponse<ISearchData>>(`${CONFIG_API_OUT_SIDE.SEARCH.INDEX}?keyword=${keyword}&page=${pageQuery}`, {}, 60);
}