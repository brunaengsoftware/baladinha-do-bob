// CONTAGEM REGRESSIVA DA FESTA
const dataDoEvento = new Date('October 25, 2025 20:00:00').getTime();

const formConfirmacao = document.getElementById('form-confirmacao');
const contagemRegressivaDiv = document.getElementById('contagem-regressiva');
const btnConfirmar = document.getElementById('btn-confirmar');
const nomeConvidadoInput = document.getElementById('nome-convidado');

const diasSpan = document.getElementById('dias');
const horasSpan = document.getElementById('horas');
const minutosSpan = document.getElementById('minutos');
const segundosSpan = document.getElementById('segundos');

function iniciarContador() {
    const agora = new Date().getTime();
    const tempoRestante = dataDoEvento - agora;

    const segundos = Math.floor((tempoRestante % (1000 * 60)) / 1000);
    const minutos = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
    const horas = Math.floor((tempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));

    diasSpan.textContent = dias < 10 ? '0' + dias : dias;
    horasSpan.textContent = horas < 10 ? '0' + horas : horas;
    minutosSpan.textContent = minutos < 10 ? '0' + minutos : minutos;
    segundosSpan.textContent = segundos < 10 ? '0' + segundos : segundos;

    if (tempoRestante < 0) {
        clearInterval(intervalo);
        contagemRegressivaDiv.innerHTML = '<h2>A festa já começou! 🥳</h2>';
    }
}

btnConfirmar.addEventListener('click', () => {
    const nome = nomeConvidadoInput.value.trim();
    if (nome !== '') {
        formConfirmacao.style.display = 'none';

        contagemRegressivaDiv.style.display = 'block';

        iniciarContador();
        const intervalo = setInterval(iniciarContador, 1000);
    } else {
        alert('Por favor, digite seu nome.');
    }
});

// CURIOSIDADES
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('#curiosidades .carousel');
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');

  let index = 0;

  function update() {
    track.style.transform = `translateX(${-index * 100}%)`;
  }

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    update();
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });

  let isDragging = false, startX = 0, currentX = 0;

  track.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    track.style.transition = 'none';
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
    const dx = currentX - startX;
    const percent = (dx / track.clientWidth) * 100;
    track.style.transform = `translateX(${ -index * 100 + percent }%)`;
  });

  track.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.releasePointerCapture(e.pointerId);
    track.style.transition = 'transform .45s ease';
    const dx = currentX - startX;
    const threshold = track.clientWidth * 0.2; // arraste mínimo
    if (dx < -threshold) {
      index = Math.min(index + 1, slides.length - 1);
    } else if (dx > threshold) {
      index = Math.max(index - 1, 0);
    }
    update();
  });

  track.addEventListener('dragstart', e => e.preventDefault());

  update();
});

//BOLHAS DA PÁGINA
const container = document.getElementById("bolhas-container");

function criarBolha() {
  const bolha = document.createElement("div");
  bolha.classList.add("bolha");

  const size = Math.random() * 30 + 10;
  bolha.style.width = `${size}px`;
  bolha.style.height = `${size}px`;

  bolha.style.left = `${Math.random() * 100}%`;

  bolha.style.animationDuration = `${Math.random() * 10 + 5}s`;

  container.appendChild(bolha);

  setTimeout(() => {
    bolha.remove();
  }, (parseFloat(bolha.style.animationDuration) * 1000));
}

setInterval(criarBolha, 500);
