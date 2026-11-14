document.addEventListener('DOMContentLoaded', () => {
    const body  = document.body;
    const btn   = document.getElementById('btn');
    const click = document.getElementById('audio');
    const hum   = document.getElementById('light_hum');
    const off   = document.getElementById('l-off');
    const start = document.getElementById('l-start');
    const on    = document.getElementById('l-on');

    let isOn = false, timer = null, timer2 = null, fade = null, z = 1, hideT = null;

    const show = el => {
        el.style.zIndex = ++z; el.classList.add('show');
        clearTimeout(hideT);
        hideT = setTimeout(() => [off, start, on].forEach(i => { if (i !== el) i.classList.remove('show'); }), 950);
    };
    const play = a => { const p = a.play(); if (p && p.catch) p.catch(() => {}); };

    function turnOn() {
        isOn = true;
        show(start);                         // flicker frame
        clearInterval(fade);
        hum.volume = 0.6; hum.currentTime = 0; play(hum);
        timer  = setTimeout(() => show(on), 1100);                    // bulb crossfades to fully lit
        timer2 = setTimeout(() => body.classList.add('on'), 1500);    // photo slowly appears
    }

    function turnOff() {
        isOn = false;
        clearTimeout(timer); clearTimeout(timer2);
        show(off);
        body.classList.remove('on');
        fade = setInterval(() => {           // fade the hum out
            if (hum.volume > 0.08) hum.volume = Math.max(0, hum.volume - 0.08);
            else { clearInterval(fade); hum.pause(); }
        }, 40);
    }

    function toggle() {
        body.classList.add('touched');
        click.currentTime = 0; play(click);
        isOn ? turnOff() : turnOn();
        body.classList.toggle('lit', isOn);
    }

    btn.addEventListener('click', e => { e.stopPropagation(); toggle(); });

    // click the bulb itself (image is cover-fit, anchored top-left; bulb is near 225,290 in a 1672x941 image)
    const overBulb = (x, y) => {
        const s = Math.max(innerWidth / 1672, innerHeight / 941);
        return Math.hypot(x - 225 * s, y - 290 * s) < 130 * s;
    };
    document.addEventListener('mousemove', e => body.classList.toggle('hot', overBulb(e.clientX, e.clientY)));
    document.addEventListener('click', e => { if (overBulb(e.clientX, e.clientY)) toggle(); });
});
