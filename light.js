document.addEventListener('DOMContentLoaded', () => {

    let btn = document.querySelector('.btn');
    let image = document.getElementById('bulb_img');
    let audio = document.querySelector('#audio');
    let lighthum = document.querySelector('#light_hum');
    let body = document.body;

    btn.addEventListener('click', () => {
        body.classList.toggle('on');
        lightChange();

        // Check if audio is currently playing
        if (audio.paused) {
            audio.currentTime = 0; // Reset to the beginning
            audio.play(); // Play the audio
        }
    });

    function lightChange() {
        if (image.src.includes('Imahe/bulboff')) {
            image.src = "Imahe/bulbstart.jpg";
            lighthum.play();
            setTimeout(() => {
                image.src = "Imahe/bulbon.jpg";
            }, 1200);
        } else {
            image.src = "Imahe/bulboff.jpg";
        }
    }

});