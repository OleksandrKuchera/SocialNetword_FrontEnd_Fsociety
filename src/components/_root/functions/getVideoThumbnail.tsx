export const getVideoThumbnail = (videoUrl: string) => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.src = videoUrl;
        video.crossOrigin = 'anonymous';
        video.muted = true;
        video.play();

        video.addEventListener('loadeddata', () => {
            video.currentTime = Math.min(0.5, video.duration - 0.5);
        });

        video.addEventListener('seeked', () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const thumbnail = canvas.toDataURL('image/png');
                resolve(thumbnail);
            } else {
                reject(new Error('Failed to get 2D context'));
            }

            video.pause();
        });

        video.addEventListener('error', (e) => {
            reject(e);
        });
    });
};
