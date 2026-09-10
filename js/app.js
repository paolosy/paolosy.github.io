function buildChars(el, text) {
    el.innerHTML = '';
    [...text].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'char' + (ch === ' ' ? ' space' : '');
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.animationDelay = (i * 0.035) + 's';
      el.appendChild(span);
    });
}

// Give the hero headline its text via data-text too, so it can be re-triggered like the others
document.getElementById('hero-headline').dataset.text = 'Pao';

function playSection(section) {
    const headline = section.querySelector('.headline');
    const copy = section.querySelector('.body-copy');
    const list = section.querySelector('.social-list');

    // reset "in" state first so the fade/rise can replay
    if (copy) copy.classList.remove('in');
    if (list) list.classList.remove('in');

    const text = headline.dataset.text;
    buildChars(headline, text);
    const dur = text.length * 35 + 700;

    clearTimeout(section._animTimeout);
    section._animTimeout = setTimeout(() => {
        if (copy) copy.classList.add('in');
        if (list) list.classList.add('in');
    }, dur - 200);
}

// Trigger on scroll into view, every time, for all three sections
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    playSection(entry.target);
    }
});
}, { threshold: 0.4 });

document.querySelectorAll('#hero, #about, #gamer-tags, #socials').forEach(sec => observer.observe(sec));