import Hls from 'hls.js';

export default function getHLSVideo(url: string | undefined, id: string) {
    if (url) {
        const target = document.getElementById(id) as HTMLVideoElement;
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(target);
        } else if (target.canPlayType('application/vnd.apple.mpegurl')) {
            target.src = url;
        }
    }
}
