// cadastro.js - LÓGICA DE CADASTRO
const API_URL_CADASTRO = 'http://localhost:3000/produtos';
const form = document.getElementById('formCadastro');
const mensagemDiv = document.getElementById('mensagem');

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita o recarregamento da página

        mensagemDiv.textContent = 'Enviando...';
        mensagemDiv.className = ''; // Limpa as classes de sucesso/erro

        // 1. Coleta os dados do formulário
        const produto = {
            titulo: document.getElementById('titulo').value,
            imagem: document.getElementById('imagem').value,
            descricao: document.getElementById('descricao').value,
            valor: document.getElementById('valor').value, // Envia como string, o backend converte
            quantidade: document.getElementById('quantidade').value // Envia como string, o backend converte
        };

        try {
            // 2. Faz a requisição POST
            const resposta = await fetch(API_URL_CADASTRO, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto)
            });

            if (resposta.status === 201) {
                // Sucesso
                const produtoCadastrado = await resposta.json();
                mensagemDiv.textContent = `Produto "${produtoCadastrado.nome || produto.titulo}" cadastrado com sucesso! ID: ${produtoCadastrado.id}`;
                mensagemDiv.className = 'sucesso';
                form.reset(); // Limpa o formulário

            } else {
                // Erro do servidor (400, 500, etc.)
                const erroData = await resposta.json().catch(() => ({ mensagem: `Erro ${resposta.status}: Resposta inesperada do servidor.` }));
                throw new Error(erroData.mensagem || `Falha ao cadastrar. Status: ${resposta.status}`);
            }

        } catch (error) {
            // Erro de rede (servidor desligado, CORS, etc.)
            mensagemDiv.textContent = `❌ Erro no cadastro: ${error.message}. Verifique se o servidor Node.js está rodando (node index.js).`;
            mensagemDiv.className = 'erro';
            console.error('Erro de requisição:', error);
        }
    });
}