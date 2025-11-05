export {};

declare global {
    interface IGenres {
        _id: string;
        slug: string;
        name: string;
    }

    interface IComic {
        _id: string;
        name: string;
        slug: string;
        origin_name: string[];
        status: string;
        thumb_url: string;
        sub_docquyen: boolean;
        author: string[];
        category: ICategory[];
        updatedAt: string;
        chaptersLatest: null | IChapter[];
    }

    interface ICategory {
        _id: string;
        name: string;
        slug: string;
    }

    interface IDetail {
        _id: string;
        name: string;
        slug: string;
        origin_name: string[];
        content: string;
        status: string;
        thumb_url: string;
        sub_docquyen: boolean;
        author: string[];
        category: ICategory[];
        chapters: IChapters[];
        updatedAt: string;
    }

    interface IChapter {
        filename: string;
        chapter_name: string;
        chapter_title: string;
        chapter_api_data: string;
    }

    interface IReader {
        _id: string;
        comic_name: string;
        chapter_name: string;
        chapter_title: string;
        chapter_path: string;
        chapter_image: IChapterImg[];
    }

    interface IChapterImg {
        image_page: number;
        image_file: string;
    }

    interface IHistory {
        _id: string;
        image: string;
        slug: string;
        chapter: string;
        name: string;
        path: string;
        position: number;
    }

    // API Response Types
    interface IApiResponse<T> {
        status: string;
        message?: string;
        data: T;
    }

    interface IComicDetailData {
        seoOnPage: {
            seoSchema: {
                name: string;
            };
        };
        item: IDetail;
        APP_DOMAIN_CDN_IMAGE: string;
    }

    interface IGenreListData {
        items: IGenres[];
    }

    interface IGenreDetailData {
        item: IGenres;
        titlePage?: string;
        params?: {
            pagination: {
                totalItems: number;
                totalItemsPerPage: number;
                currentPage: number;
                totalPages: number;
            };
        };
    }

    interface IComicListData {
        items: IComic[];
        params: {
            pagination: {
                totalItems: number;
                totalItemsPerPage: number;
                currentPage: number;
                totalPages: number;
            };
        };
        titlePage: string;
        APP_DOMAIN_CDN_IMAGE: string;
    }

    interface IChapterData {
        item: IReader;
        domain_cdn: string;
    }

    interface ISearchData {
        items: IComic[];
        params: {
            pagination: {
                totalItems: number;
                totalItemsPerPage: number;
                currentPage: number;
                totalPages: number;
            };
        };
        APP_DOMAIN_CDN_IMAGE: string;
    }
}
