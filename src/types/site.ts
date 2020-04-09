export interface Site {
    globalSeo: GlobalSeo;
    favicon: Favicon;
}

export interface GlobalSeo {
    siteName: string;
    facebookPageUrl: string;
    titleSuffix: string;
    twitterAccount: string;
    fallbackSeo: {
        title: string;
        description: string;
        image: {
            url: string;
        };
    };
}

export interface Favicon {
    url: string;
}
