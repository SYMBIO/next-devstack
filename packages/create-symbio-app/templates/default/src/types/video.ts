export interface VideoProps {
    readonly embeddedVideo?: {
        readonly height: number | null;
        readonly provider: string | null;
        readonly providerUid: string | null;
        readonly thumbnailUrl: string | null;
        readonly title: string | null;
        readonly width: number | null;
    } | null;
    readonly uploadedVideo?: {
        readonly id: string;
        readonly width: number | null;
        readonly height: number | null;
        readonly video: {
            readonly streamingUrl: string;
            readonly thumbnailUrl: string;
        } | null;
    } | null;
}
