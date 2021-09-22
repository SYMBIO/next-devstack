export default function formatTime(time: number): string {
    const abs = Math.abs(time);
    return (
        (time < 0 ? '-' : '') +
        String(Math.floor(abs / 60)).padStart(2, '0') +
        ':' +
        String(Math.round(abs) % 60).padStart(2, '0')
    );
}
