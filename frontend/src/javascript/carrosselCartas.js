document.addEventListener('DOMContentLoaded', () => {
    const cartas = document.querySelectorAll('.base_carrossel div');
    let isDragging = false;
    let startX = 0;
    let currentCarta = null;
    const container = document.querySelector('.cartas_container');
    const baseCarrossel = document.querySelector('.base_carrossel');
  
    // Inicializa as posições das cartas
    const initialPositions = [
      { top: '-15rem', left: '-5rem', zIndex: 1 },
      { top: '0', left: '4.5rem', zIndex: 3 },
      { top: '-15rem', left: '15rem', zIndex: 2 }
    ];
  
    function applyPositions() {
      cartas.forEach((carta, index) => {
        const pos = initialPositions[index];
        carta.style.top = pos.top;
        carta.style.left = pos.left;
        carta.style.zIndex = pos.zIndex;
      });
    }
  
    applyPositions();
  
    cartas.forEach((carta) => {
      carta.addEventListener('mousedown', (event) => {
        if (!container.contains(event.target)) return;
        event.preventDefault();
        isDragging = true;
        startX = event.clientX;
        currentCarta = carta;
        carta.style.cursor = 'grabbing';
      });
    });
  
    document.addEventListener('mousemove', (event) => {
      if (!isDragging || !currentCarta) return;
  
      const deltaX = event.clientX - startX;
  
      // Limite máximo de movimento para as cartas
      const maxMovement = 150; // Valor máximo de movimento lateral (em px)
      const minMovement = -150; // Valor mínimo de movimento lateral (em px)
  
      // Limita o deltaX para que ele não ultrapasse os limites definidos
      const limitedDeltaX = Math.min(Math.max(deltaX, minMovement), maxMovement);
  
      if (Math.abs(limitedDeltaX) < 20) return; // Ignora movimentos pequenos
  
      const progress = Math.min(Math.max(limitedDeltaX / 200, -1), 1); // Normaliza o valor do progresso
  
      // Atualiza a posição das cartas com base no progresso
      cartas.forEach((carta, index) => {
        const basePos = initialPositions[index];
  
        if (index === 0) {
          // Carta da esquerda
          carta.style.left = `${parseFloat(basePos.left) + progress * 10}rem`;
          carta.style.top = `${-15 + progress * 10}rem`; // Ajusta a profundidade
        } else if (index === 1) {
          // Carta do meio
          carta.style.left = `${parseFloat(basePos.left) + progress * 10}rem`;
          carta.style.top = `${-15 + progress * 5}rem`; // Ajusta a profundidade
        } else if (index === 2) {
          // Carta da direita
          carta.style.left = `${parseFloat(basePos.left) + progress * 10}rem`;
          carta.style.top = `${-15 - progress * 10}rem`; // Ajusta a profundidade
        }
      });
    });
  
    document.addEventListener('mouseup', (event) => {
      if (!isDragging || !currentCarta) return;
      isDragging = false;
      currentCarta.style.cursor = 'grab';
  
      // Se o movimento foi grande o suficiente, faz a rotação das cartas
      if (Math.abs(event.clientX - startX) > 100) {
        // Para a direita, move as cartas para frente
        if (event.clientX > startX) {
          initialPositions.push(initialPositions.shift()); // Rotaciona as cartas para a direita
        } 
        // Para a esquerda, move as cartas para trás
        else {
          initialPositions.unshift(initialPositions.pop()); // Rotaciona as cartas para a esquerda
        }
  
        cartas.forEach(carta => carta.style.transition = 'all 0.5s ease');
        applyPositions();
      } else {
        applyPositions(); // Restaura as posições
      }
  
      currentCarta = null;
    });
  });
  