/* Ativando o menu mobile */
function mostramenu() {
    $('header nav .menu_princinal').addClass('active'); // Adiciona a classe "active" para mostrar o menu
    $('header nav .menu_princinal').addClass('animate__animated animate__fadeInRight animate__slow'); // Animação de entrada
    $('header nav .icone-menu .menu').css('display', 'none'); // Esconde o ícone de hambúrguer
    $('header nav .icone-menu .menuX').css('display', 'flex'); // Mostra o ícone "X"
}

function escondermenu() {
    $('header nav .menu_princinal').removeClass('active'); // Remove a classe "active" para esconder o menu
    $('header nav .icone-menu .menu').css('display', 'flex'); // Mostra o ícone de hambúrguer
    $('header nav .icone-menu .menuX').css('display', 'none'); // Esconde o ícone "X"
}

let controle = true;
$('header nav .icone-menu').click(function () {
    if (controle == true) {
        mostramenu(); // Chama a função para mostrar o menu
        controle = false; // Menu aberto, controla a alternância
    } else {
        escondermenu(); // Chama a função para esconder o menu
        controle = true; // Menu fechado
    }
});
