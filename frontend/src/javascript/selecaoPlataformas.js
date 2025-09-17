// Seleciona as cartas e o container onde a carta será exibida
const cartas = document.querySelectorAll('.container_cartas_recarga .carta1, .container_cartas_recarga .carta2, .container_cartas_recarga .carta3');
const cartaSelecionada = document.querySelector('.carta_saida_valores .cartaSelecionada');
const calculadora = document.getElementById('titulo_calculadora'); // Seção da calculadora

// Função para rolar até um elemento com base no ID
function rolarParaElemento(id) {
    const elemento = document.getElementById(id);
    if (elemento) {
        // Rolagem suave para o elemento
        window.scrollTo({
            top: elemento.offsetTop - 100, // Ajuste de 100px para não cortar o topo
            behavior: 'smooth'
        });
    }
}

// Adiciona um evento de clique a cada carta
cartas.forEach(carta => {
    carta.addEventListener('click', () => {
        // Limpa a imagem anterior
        cartaSelecionada.style.backgroundImage = ''; 

        // Verifica qual carta foi clicada e atualiza a imagem de fundo
        if (carta.classList.contains('carta1')) {
            cartaSelecionada.style.backgroundImage = "url('imagens/cartas/carta_xbox_Prancheta EBOX.svg')";
        } else if (carta.classList.contains('carta2')) {
            cartaSelecionada.style.backgroundImage = "url('imagens/cartas/carta_xbox_Prancheta PLAYSTATION.svg')";
        } else if (carta.classList.contains('carta3')) {
            cartaSelecionada.style.backgroundImage = "url('imagens/cartas/carta_xbox_Prancheta PC.svg')";
        }

        // Rola até a seção da calculadora
        rolarParaElemento('titulo_calculadora');
    });
});
