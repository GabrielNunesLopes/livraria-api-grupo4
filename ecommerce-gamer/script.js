// Carrossel do banner: setas, pontinhos e troca automática a cada 4,5s.
// A rolagem usa scroll-snap do CSS; o script só diz para qual banner ir.
(function () {
    const carrossel = document.querySelector('.carrossel');
    if (!carrossel) return;

    const trilho = carrossel.querySelector('.carrossel__trilho');
    const slides = trilho.querySelectorAll('.slide');
    const pontos = carrossel.querySelectorAll('.carrossel__pontos button');
    const TEMPO = 4500;
    let atual = 0;
    let timer;

    function irPara(i) {
        atual = (i + slides.length) % slides.length;
        trilho.scrollTo({ left: slides[atual].offsetLeft, behavior: 'smooth' });
        pontos.forEach((p, n) => p.classList.toggle('ativo', n === atual));
    }

    function iniciar() {
        clearInterval(timer);
        timer = setInterval(() => irPara(atual + 1), TEMPO);
    }

    carrossel.querySelector('.carrossel__seta--esq').addEventListener('click', () => { irPara(atual - 1); iniciar(); });
    carrossel.querySelector('.carrossel__seta--dir').addEventListener('click', () => { irPara(atual + 1); iniciar(); });
    pontos.forEach((p, n) => p.addEventListener('click', () => { irPara(n); iniciar(); }));

    // se a pessoa arrastar o banner com o dedo, os pontinhos acompanham
    let espera;
    trilho.addEventListener('scroll', () => {
        clearTimeout(espera);
        espera = setTimeout(() => {
            const i = Math.round(trilho.scrollLeft / trilho.clientWidth);
            if (i !== atual) { atual = i; pontos.forEach((p, n) => p.classList.toggle('ativo', n === atual)); iniciar(); }
        }, 120);
    });

    carrossel.addEventListener('mouseenter', () => clearInterval(timer));
    carrossel.addEventListener('mouseleave', iniciar);

    iniciar();
})();
