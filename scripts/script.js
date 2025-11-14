// script.js - CÓDIGO ATUALIZADO
// ----------------------------------------------------------------------
// 1. A URL do seu backend para buscar todos os produtos
const API_URL = 'http://localhost:3000/produtos'; 

// Função para buscar e exibir os produtos
function carregarProdutos() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro de rede ou servidor: ${response.status}`);
            }
            return response.json();
        })
        .then(produtos => {
            renderizarProdutos(produtos);
        })
        .catch(error => {
            console.error('Falha ao carregar os produtos:', error);
            
            const container = document.getElementById('produtos-container');
            if(container) {
                container.innerHTML = '<p style="color: red; padding: 20px;">Não foi possível carregar os produtos. Verifique se o backend (index.js) está rodando na porta 3000.</p>';
            }
        });
}

// Função para criar o HTML com a nova estrutura e inserir no DOM
function renderizarProdutos(produtos) {
    const container = document.getElementById('produtos-container');
    
    if (!container) {
        console.error('Elemento #produtos-container não encontrado no HTML.');
        return;
    }

    container.innerHTML = ''; // Limpa o container
    
    // Itera sobre a lista de produtos e cria o novo card HTML
    produtos.forEach(produto => {
        const produtoDiv = document.createElement('div');
        
        // Classe principal para o novo estilo
        produtoDiv.classList.add('card-produto'); 

        // Nova estrutura HTML mais organizada para estilização (usando as classes que criamos o CSS)
        produtoDiv.innerHTML = `
            <div class="card-produto__media">
                <img src="${produto.imagem}" alt="${produto.nome}" class="card-produto__imagem">
            </div>
            <div class="card-produto__info">
                <h3 class="card-produto__titulo">${produto.nome}</h3>
                <p class="card-produto__descricao">${produto.descricao}</p>
            </div>
            <div class="card-produto__rodape">
                <span class="card-produto__preco">R$ ${produto.preco.toFixed(2)}</span>
                <button data-id="${produto.id}" class="card-produto__botao">
                    Ver Detalhes
                </button>
            </div>
        `;
        
        container.appendChild(produtoDiv);
    });
}


// Aguarda o carregamento completo do conteúdo da página
document.addEventListener('DOMContentLoaded', () => {
    
    // Seu código existente para o chat de suporte (homerBtn)
    const homerButton = document.getElementById('homerBtn');
    const chatContainer = document.querySelector('.homer-chat-container');

    if (homerButton && chatContainer) {
        homerButton.addEventListener('click', () => {
            chatContainer.classList.toggle('active');
        });
    } else {
        console.error("Elemento do botão de suporte não encontrado.");
    }
    
    // ------------------------------------
    // CHAMA A FUNÇÃO PARA CARREGAR OS PRODUTOS
    // ------------------------------------
    carregarProdutos();
});

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('produtos-container');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    // Quantidade de pixels para rolar ao clicar (aproximadamente o tamanho de um card + gap)
    const scrollAmount = 300; 

    if(btnPrev && btnNext && container) {
        btnNext.addEventListener('click', () => {
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        btnPrev.addEventListener('click', () => {
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
    }
});
