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

// Carrinho: atualiza subtotais, total e cupom (apenas demonstração)
(function () {
    const tabela = document.querySelector('.tabela-carrinho');
    if (!tabela) return;

    const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let desconto = 0;

    function recalcular() {
        let soma = 0;
        tabela.querySelectorAll('tbody tr').forEach((tr) => {
            const qtd = Math.max(1, parseInt(tr.querySelector('input').value, 10) || 1);
            const sub = parseFloat(tr.dataset.preco) * qtd;
            tr.querySelector('.carrinho__sub').textContent = brl(sub);
            soma += sub;
        });
        const total = soma * (1 - desconto);
        document.querySelector('.js-parcial').textContent = brl(soma);
        document.querySelector('.js-subtotal').textContent = brl(soma);
        document.querySelector('.js-desconto').textContent = '— ' + brl(soma * desconto);
        document.querySelector('.js-total').textContent = brl(total);
        document.querySelector('.js-pix').textContent = brl(total * 0.9);
        const n = tabela.querySelectorAll('tbody tr').length;
        tabela.querySelector('caption small').textContent = `(${n} ${n === 1 ? 'produto' : 'produtos'})`;
    }

    tabela.addEventListener('input', recalcular);
    tabela.addEventListener('click', (e) => {
        const btn = e.target.closest('.carrinho__remover');
        if (btn) { btn.closest('tr').remove(); recalcular(); }
    });

    const cupom = document.querySelector('.cupom');
    cupom.addEventListener('submit', (e) => {
        e.preventDefault();
        const codigo = cupom.querySelector('input').value.trim().toUpperCase();
        desconto = codigo === 'FORGE10' ? 0.1 : 0;
        cupom.classList.toggle('cupom--ok', desconto > 0);
        cupom.classList.toggle('cupom--erro', codigo !== '' && desconto === 0);
        recalcular();
    });
})();

// Cadastro: depois da validação nativa do navegador, mostra a confirmação
(function () {
    const form = document.getElementById('form-cadastro');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const ok = form.querySelector('.formulario__ok');
        ok.hidden = false;
        ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
})();
