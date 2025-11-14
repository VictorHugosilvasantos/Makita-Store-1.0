document.addEventListener('DOMContentLoaded', () => {
    const campoBusca = document.getElementById('campo-busca');
    const produtosContainer = document.getElementById('produtos-container');

    if (!produtosContainer) {
        console.error("Container #produtos-container não encontrado.");
        return;
    }

    const filtrarProdutos = () => {
        const termo = campoBusca.value.toLowerCase().trim();
        const cards = produtosContainer.getElementsByClassName('card-produto');

        produtosContainer.scrollLeft = 0;

        if (cards.length === 0) {
            console.warn('Filtro: Nenhum card de produto encontrado.');
            return; 
        }

        for (let card of cards) {
            const tituloEl = card.querySelector('.card-produto__titulo');
            if (tituloEl) {
                const nome = tituloEl.textContent.toLowerCase();
                const deveExibir = nome.includes(termo);
                card.style.display = deveExibir ? 'flex' : 'none';
            }
        }
    };

    //  Atualiza a pesquisa em tempo real enquanto digita
    if(campoBusca) {
        campoBusca.addEventListener('input', filtrarProdutos);
    }
});
