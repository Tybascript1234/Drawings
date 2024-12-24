let images = [];
let imageElements = [];
let texts = [];

document.getElementById('image-upload').addEventListener('change', handleImageUpload);
document.getElementById('generate-video').addEventListener('click', generateVideo);
document.getElementById('download-video').addEventListener('click', downloadVideo);
document.getElementById('add-text').addEventListener('click', addText);

function handleImageUpload(event) {
    const files = event.target.files;
    images = [];
    imageElements = [];
    const previewContainer = document.getElementById('images-preview');
    previewContainer.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const imageSrc = e.target.result;
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');
            imageItem.innerHTML = `
                <img src="${imageSrc}" />
                <input type="number" class="time-input" placeholder="ثانية" value="1">
            `;
            previewContainer.appendChild(imageItem);
            images.push({ src: imageSrc, time: 1000 }); // default 1 second
        };

        reader.readAsDataURL(file);
    }
}

function addText() {
    const textInput = document.querySelector('.text-input');
    const timeInput = document.querySelector('.time-input-text');
    const positionInput = document.querySelector('.position-input');

    const text = textInput.value;
    const time = parseInt(timeInput.value) * 1000; // تحويل إلى ميلي ثانية
    const position = positionInput.value;

    if (text) {
        texts.push({ text, time, position });
        textInput.value = '';
        timeInput.value = 1;
    }
}

function generateVideo() {
    const video = document.getElementById('output-video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const fps = 30;

    const frames = [];
    let totalTime = 0;

    const imageItems = document.querySelectorAll('.image-item');
    imageItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const time = parseInt(item.querySelector('.time-input').value) * 1000;
        images[index].time = time;

        const frame = {
            image: img,
            time: time
        };
        frames.push(frame);
        totalTime += time;
    });

    canvas.width = 640;
    canvas.height = 480;

    const stream = canvas.captureStream(fps);
    const recorder = new MediaRecorder(stream);
    const videoChunks = [];

    recorder.ondataavailable = function(e) {
        videoChunks.push(e.data);
    };

    recorder.onstop = function() {
        const videoBlob = new Blob(videoChunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(videoBlob);
        video.src = videoUrl;
    };

    recorder.start();

    let currentTime = 0;
    frames.forEach((frame, index) => {
        const img = frame.image;
        const time = frame.time;

        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // إضافة النصوص في الوقت المحدد
            texts.forEach((textObj) => {
                if (currentTime >= textObj.time) {
                    ctx.font = '20px Arial';
                    ctx.fillStyle = 'white';
                    const x = textObj.position.includes('left') ? 10 : canvas.width - 10 - ctx.measureText(textObj.text).width;
                    const y = textObj.position.includes('top') ? 30 : canvas.height - 30;

                    ctx.fillText(textObj.text, x, y);
                }
            });

        }, currentTime);

        currentTime += time;
    });

    setTimeout(() => {
        recorder.stop();
    }, totalTime);
}

function downloadVideo() {
    const video = document.getElementById('output-video');
    const link = document.createElement('a');
    link.href = video.src;
    link.download = 'converted_video.webm';
    link.click();
}