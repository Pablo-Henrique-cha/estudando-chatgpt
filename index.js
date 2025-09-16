let imagemAtualNumero = 0;
let temaAtual = localStorage.getItem('temaAtual') ? parseInt(localStorage.getItem('temaAtual')) : 2;
let tarefaInputElemento = document.getElementById('tarefainput');
let valorInicial = document.getElementById('valorInicial');
let valorFinal = document.getElementById('valorFinal');
let moedaInicial = document.getElementById('moedaInicial').value;
let moedaFinal = document.getElementById('moedaFinal').value;
let valorConvertido = '';
let numeroPergunta = 1;
let pontos = 0;
let usuarios = JSON.parse(localStorage.getItem('usuarios')) ? JSON.parse(localStorage.getItem('usuarios')) : {};
let ligado = false;
let cronometro;
let jogadorAtualJogoDaVelha = 'X';
let jogodavelhaGanhou = false;
let cotacao = {

    //Real              //dolar             //Euro               //Iene               //Metical
    'BRLUSD' : 0.18,    'USDBRL' : 5.42,    'EURBRL' : 6.36,     'JPYBRL' : 0.037,    'MZNBRL' : 0.085,
    'BRLEUR' : 0.16,    'USDEUR' : 0.85,    'EURUSD' : 1.17,     'JPYUSD' : 0.0068,   'MZNUSD' : 0.016,
    'BRLJPY' : 27.11,   'USDJPY' : 146.87,  'EURJPY' : 172.30,   'JPYEUR' : 0.0058,   'MZNEUR' : 0.013,
    'BRLMZN' : 11.78,   'USDMZN' : 63.89,   'EURMZN' : 74.19,    'JPYMZN' : 0.44,     'MZNJPY' : 2.30,
    'BRLBRL' : 1,       'USDUSD' : 1,       'EUREUR' : 1,        'JPYJPY' : 1,        'MZNMZN' : 1,

};
let perguntas = {
    2 : 'Em que ano o Brasil foi descoberto pelos portugueses?',
    3: 'Quem escreveu “Dom Casmurro”?',
    4: 'Qual é o maior oceano do mundo?',
    5: 'Qual é a capital do Japão?' 
}
let respostas = {
    2 : ['1500', '1600', '1700', '1400'],
    3 : ['Machado de Assis', 'José de Alencar', 'Carlos Drummond de Andrade', 'Cecília Meireles'],
    4 : ['Oceano Atlântico', 'Oceano Pacífico', 'Oceano Índico', 'Oceano Ártico'],
    5 : ['Pequim', 'Seul','Tóquio', 'Bangkok']
}
let respostaCerta = {
    1 : 'c', 2: 'a', 3: 'a', 4 : 'b' , 5: 'c'
}
   
tarefaInputElemento.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        adicionarTarefa();  }});

valorInicial.addEventListener('keyup', function() {
    valorInicial = document.getElementById('valorInicial');
    moedaInicial = document.getElementById('moedaInicial').value;
    moedaFinal = document.getElementById('moedaFinal').value;
    comverterMoeda(moedaInicial, moedaFinal, parseFloat(valorInicial.value));
    valorFinal.value = valorConvertido.toFixed(2);
});

valorFinal.addEventListener('keyup', function() {
    moedaFinal = document.getElementById('moedaFinal').value;
    moedaInicial = document.getElementById('moedaInicial').value;
    valorInicial = document.getElementById('valorInicial');
    comverterMoeda(moedaFinal, moedaInicial, parseFloat(valorFinal.value));
    valorInicial.value = valorConvertido.toFixed(2);
});

function comverterMoeda(moeda1, moeda2, valor) {

    let chave = moeda1 + moeda2;
    let taxa = cotacao[chave];
    valorConvertido = valor * taxa;
    return valorConvertido;
}


function corAletoria() {
    let cor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + cor.padStart(6, 0);
}

if (localStorage.getItem('botaoPadrao')) {
    document.getElementById('botaoCor').style.display = localStorage.getItem('botaoPadrao');
}

function alterandoCor() {
    document.documentElement.style.setProperty('--cor-primaria', corAletoria());
    document.documentElement.style.setProperty('--cor-secundaria', corAletoria());
    document.getElementById('botaoCor').style.display = 'block';
    salvandoElementos();
}

function corPadrao() {
   if (temaAtual == 2){
    document.documentElement.style.setProperty('--cor-primaria', '#2a2a2a');
    document.documentElement.style.setProperty('--cor-secundaria', '#4b4b4b'); 
   } else {
    document.documentElement.style.setProperty('--cor-primaria', '#ffffffff');
    document.documentElement.style.setProperty('--cor-secundaria', '#fed635ff');
   }
    document.getElementById('botaoCor').style.display = 'none';
    salvandoElementos();
}

if (localStorage.getItem('contador')) {
    document.getElementById('Contador').innerText = localStorage.getItem('contador');
}

function adicionar() {
    let contador = document.getElementById('Contador');
    contador.innerText = parseInt(contador.innerText) + 1;
    salvandoElementos();
}

function remover() {
    let contador = document.getElementById('Contador');
    contador.innerText = parseInt(contador.innerText) - 1;
    salvandoElementos();
}

if (localStorage.getItem('tarefas')) {
    document.getElementById('listatarefas').innerHTML = localStorage.getItem('tarefas');
} else {
    document.getElementById('verificador').innerText = 'Sem tarefas no momento!';
}


function adicionarTarefa() {
    let tarefaInput = document.getElementById('tarefainput').value.trim();
    let tarefaInputElemento = document.getElementById('tarefainput');
    let verificador = document.getElementById('verificador');
    let listaTarefas = document.getElementById('listatarefas');
    if (tarefaInput === '') {
        tarefaInputElemento.placeholder = "Por favor, Digite uma nova terefa!'";
        tarefaInputElemento.style.width = '225px';
        return;
    } else if (verificador.textContent == 'Sem tarefas no momento!') {
        verificador.textContent = tarefaInput;
        tarefaInputElemento.value = '';
    }  else {
        let novaTarefa = document.createElement('li');
        novaTarefa.textContent = tarefaInput;
        listaTarefas.appendChild(novaTarefa);
        tarefaInputElemento.value = '';
    }
    salvandoElementos();
}

function removerTarefas() {
    let listaTarefas = document.getElementById('listatarefas');
    if (listaTarefas.children.length >1) {
        listaTarefas.lastElementChild.remove();
    } else{
        listaTarefas.innerHTML = '<li id="verificador">Sem tarefas no momento!</li>';
    }
    salvandoElementos();
}

if (localStorage.getItem('imagemAtual')) {
    document.getElementById('imagem').src = localStorage.getItem('imagemAtual');
}

function proximaImagem() {
    let imagemAtual = document.getElementById('imagem');
    if (imagemAtualNumero >= 15) {
        imagemAtualNumero = 1;
        imagemAtual.src = `imgs/img${imagemAtualNumero}.jpg`;
    } else {
    imagemAtualNumero++;
    imagemAtual.src = `imgs/img${imagemAtualNumero}.jpg`;
}
 salvandoElementos();
}

function imagemAnterior() {
    let imagemAtual = document.getElementById('imagem');
    if (imagemAtualNumero <= 1) {
        imagemAtualNumero = 15;
        imagemAtual.src = `imgs/img${imagemAtualNumero}.jpg`;
    } else {
    imagemAtualNumero--;
    imagemAtual.src = `imgs/img${imagemAtualNumero}.jpg`;
}
    salvandoElementos();
}

if (localStorage.getItem('temaAtual')) {
    document.getElementById('tema').src = localStorage.getItem('iconAtual');
    document.documentElement.style.setProperty('--cor-primaria', localStorage.getItem('corPrimaria'));
    document.documentElement.style.setProperty('--cor-secundaria', localStorage.getItem('corSecundaria'));
    document.documentElement.style.setProperty('--cor-terciaria', localStorage.getItem('corTerciaria'));
    document.documentElement.style.setProperty('--cor-quaternaria', localStorage.getItem('corQuaternaria'));
}

function mudarTema() {
    let iconAtual = document.getElementById('tema');
    if (temaAtual == 2){
        temaAtual--;
       iconAtual.src = "imgs/cor1.png";
        document.documentElement.style.setProperty('--cor-primaria', '#ffffffff');
        document.documentElement.style.setProperty('--cor-secundaria', '#fed635ff');
        document.documentElement.style.setProperty('--cor-terciaria', '#000000ff');
        document.documentElement.style.setProperty('--cor-quaternaria', '#0b3b82ff');

    } else{
        temaAtual++;
        iconAtual.src = "imgs/cor2.png";
        document.documentElement.style.setProperty('--cor-primaria', '#2a2a2a');
        document.documentElement.style.setProperty('--cor-secundaria', '#4b4b4b');    
        document.documentElement.style.setProperty('--cor-terciaria', '#f5f5f5');
        document.documentElement.style.setProperty('--cor-quaternaria', '#000000');
    }
    salvandoElementos();
}

function conteinerPerguntas() {
    let comecar = document.getElementById('botaoPerguntas');
    comecar.remove();
    document.getElementById('perguntasResposta').style.display = 'flex';
}

function respondendo(tag) {
     let respostaDada = document.getElementById(tag);
    if (tag === respostaCerta[numeroPergunta]) {
        pontos++;
        respostaDada.style.borderColor = '#00ff08ff';
    } else {
        respostaDada.style.borderColor = '#ff0000ff';
        document.getElementById(respostaCerta[numeroPergunta]).style.borderColor = '#00ff08ff';
    }
    setTimeout(() => {
        respostaDada.style.borderColor = '';
        document.getElementById(respostaCerta[numeroPergunta]).style.borderColor = '';
        respostaDada.style.transform = 'scale(1)';
        respostaDada.style.borderRadius = '5px';
        numeroPergunta++;
        proximaPergunta();
    }, 1000);
}

function proximaPergunta() {
    if (numeroPergunta > Object.keys(perguntas).length) {
        document.getElementById('perguntasResposta').style.display = 'none';
        let resultado = document.getElementById('resultado');
        resultado.style.display = 'flex';
        resultado.innerHTML = `<h2>Você acertou ${pontos} de ${Object.keys(perguntas).length} perguntas!</h2>`;
    } else {
        let perguntaAmostra = document.getElementById('PerguntaAtual');
        perguntaAmostra.innerText = perguntas[numeroPergunta];
        document.getElementById('a').innerText = respostas[numeroPergunta][0];
        document.getElementById('b').innerText = respostas[numeroPergunta][1];
        document.getElementById('c').innerText = respostas[numeroPergunta][2];
        document.getElementById('d').innerText = respostas[numeroPergunta][3];   

    }

}

document.getElementById('formulario').addEventListener("submit", function(event) {
    event.preventDefault(); 

    let dados = new FormData(this);
    if (!ValidarFormulario()) {
        return;
    }

    criarUsuario(dados); 
});

document.getElementById('acessar').addEventListener('submit', function(event) {
    event.preventDefault();

    let dados = new FormData(this);
    if (!validarSenha(dados)) {
        return;
    } else {

    let mostarInfo = document.createElement('p');
    let conteinerInfo = document.getElementById('conteinerInfo');

    mostarInfo.innerHTML = `Nome de exibição: ${dados.get('acessarNomeUsuario').trim()} <br>
    Nome Completo: ${usuarios[dados.get('acessarNomeUsuario').trim()+ 'nome']} <br>
    Email: ${usuarios[dados.get('acessarNomeUsuario').trim() + 'email']} <br>
    Senha: ${usuarios[dados.get('acessarNomeUsuario').trim()]} <br>`;
    conteinerInfo.appendChild(mostarInfo);
    }
});

function criarUsuario(tag) {

    usuarios[tag.get('nomeUsuario').trim()] = tag.get('senha').trim();
    usuarios[tag.get('nomeUsuario').trim() + 'email'] = tag.get('email').trim();
    usuarios[tag.get('nomeUsuario').trim() + 'nome'] = tag.get('nomeCompletoUsuario').trim();
    alert('Usuario criado com sucesso!')
    salvandoElementos();

}

function validarSenha() {
    let nomeDigitado = document.getElementById('acessarNomeUsuario');
    let senhaDigitada = document.getElementById('acessarSenha'); 

    if (nomeDigitado.value.trim() in usuarios) {
        if (senhaDigitada.value.trim() == usuarios[nomeDigitado.value.trim()]) {
            senhaDigitada.style.borderColor = '';
            nomeDigitado.style.borderColor = '';
            nomeDigitado.value = '';
            senhaDigitada.value = '';
            return true;
        } else {
            senhaDigitada.style.borderColor = '#ff0000ff';
            alert('Senha invalida!');
            return false;
        }
    } else {
        nomeDigitado.style.borderColor = '#ff0000ff';
        alert('Usuario invalido!');
        return false;
    }
}

function ValidarFormulario() {
    let senha = document.getElementById('senha');
    let comfirmarSenha = document.getElementById('confirmarSenha');
    let nomeUsuario = document.getElementById('nomeUsuario');
    let nomeCompletoUsuario = document.getElementById('nomeCompletoUsuario');
    let emailUsuario = document.getElementById('email');
    let comfirmarEmail = document.getElementById('comfirmarEmail');

    if (emailUsuario.value.trim() != comfirmarEmail.value.trim()) {
        emailUsuario.style.borderColor = '#ff0000ff';
        comfirmarEmail.style.borderColor = '#ff0000ff';
        return false;
    }
    else if (nomeUsuario.value.trim() in usuarios) {
        alert('Nome de usuario invalido');
        nomeUsuario.borderColor = '#ff0000ff';
        return false;
    } else if (senha.value.trim() != comfirmarSenha.value.trim()) {
            senha.style.borderColor = '#ff0000ff';
            comfirmarSenha.style.borderColor = '#ff0000ff';
            return false;
    } else {
            nomeUsuario.value = '';
            emailUsuario.value ='';
            senha.value = '';
            comfirmarSenha.value = '';
            comfirmarEmail.value = '';
            nomeCompletoUsuario.value = '';
            senha.style.borderColor = '';
            comfirmarSenha.style.borderColor = '';
            emailUsuario.style.borderColor = '';
            comfirmarEmail.style.borderColor = '';
       return true;
    }
}

function comecarConometro() {
    let cronometroSegundo = document.getElementById('cronometroSegundo');
    let cronometroMinuto = document.getElementById('cronometroMinuto');
    let cronometroHora = document.getElementById('cronometroHora');
    ligado = !ligado

    if (ligado == true) {
    cronometro = setInterval (() => {
            cronometroSegundo.textContent = parseInt(cronometroSegundo.textContent) +1;
        if (cronometroSegundo.textContent == 60) {
            cronometroSegundo.textContent = 0;
            cronometroMinuto.textContent = parseInt(cronometroMinuto.textContent) +1;
        }
        if (cronometroMinuto.textContent == 60) {
            cronometroMinuto.textContent = 0;
            cronometroHora.textContent = parseInt(cronometroHora.textContent) +1;
        }
    },1000);
    } else {
        clearInterval(cronometro);
    }
}

function reiniciarCronometro() {
    document.getElementById('cronometroSegundo').textContent = '00';
    document.getElementById('cronometroMinuto').textContent = '00';
    document.getElementById('cronometroHora').textContent = '00';
    clearInterval(cronometro);
    ligado = false;
    document.getElementById('marcacaoCronometroDiv').style.display = 'none';
    document.getElementById('marcacaoCronometroUl').innerHTML = '';
}

function marcacaoCronometro(){
    document.getElementById('marcacaoCronometroDiv').style.display = 'flex';
    let criarli = document.createElement('li');
    criarli.textContent = '🚩' + document.getElementById('cronometroHora').textContent + ':' + document.getElementById('cronometroMinuto').textContent + ':' + document.getElementById('cronometroSegundo').textContent;
    document.getElementById('marcacaoCronometroUl').appendChild(criarli);
}

function marcarJogoDaVelha(elementoClicado) {

    if (jogodavelhaGanhou){
        return;
    }
    if (jogadorAtualJogoDaVelha == 'X'){
        elementoClicado.style.color = '#fc3f3f';
    } else {
        elementoClicado.style.color = '#3f78fcff';
    }

    if (elementoClicado.textContent != ''){
        alert('Casa já selecionada!');
    } else {
        elementoClicado.textContent = jogadorAtualJogoDaVelha;
        alterandoJogadorJogoDaVelha();
    }

    verificarGanhadorJogoDaVelha();
}

function alterandoJogadorJogoDaVelha() {

    let jogadorAtualExibicao = document.getElementById('jogadorAtualExibicao');

    if (jogadorAtualJogoDaVelha == 'X'){
        jogadorAtualJogoDaVelha = 'O';
        jogadorAtualExibicao.textContent = jogadorAtualJogoDaVelha;
        jogadorAtualExibicao.style.color = '#3f78fcff';
    } else {
        jogadorAtualJogoDaVelha = 'X';
        jogadorAtualExibicao.textContent = jogadorAtualJogoDaVelha;
        jogadorAtualExibicao.style.color = '#fc3f3f';
    }
}

function verificarGanhadorJogoDaVelha() {
    let caixa1 = document.getElementById('jogoDaVelhaN1').textContent;
    let caixa2 = document.getElementById('jogoDaVelhaN2').textContent;
    let caixa3 = document.getElementById('jogoDaVelhaN3').textContent;
    let caixa4 = document.getElementById('jogoDaVelhaN4').textContent;
    let caixa5 = document.getElementById('jogoDaVelhaN5').textContent;
    let caixa6 = document.getElementById('jogoDaVelhaN6').textContent;
    let caixa7 = document.getElementById('jogoDaVelhaN7').textContent;
    let caixa8 = document.getElementById('jogoDaVelhaN8').textContent;
    let caixa9 = document.getElementById('jogoDaVelhaN9').textContent;

    if (caixa1 == caixa2 && caixa2 == caixa3 && caixa1 != ''){
        alert('O jogador ' + caixa1 + ' ganhou!');
        jogodavelhaGanhou = true;
        setTimeout(() => {reiniciarJogoDaVelha();}, 1000);
    } else if (caixa4 == caixa5 && caixa5 == caixa6 && caixa4 != ''){
        alert('O jogador ' + caixa4 + ' ganhou!');
        jogodavelhaGanhou = true;
        setTimeout(() => {reiniciarJogoDaVelha();}, 1000);
    } else if (caixa7 == caixa8 && caixa8 == caixa9 && caixa7 != ''){
        alert('O jogador ' + caixa7 + ' ganhou!');
        jogodavelhaGanhou = true;
        setTimeout(() => {reiniciarJogoDaVelha();}, 1000);
    } else if (caixa1 == caixa4 && caixa4 == caixa7 && caixa1 != ''){
        alert('O jogador ' + caixa1 + ' ganhou!');
        jogodavelhaGanhou = true;
        setTimeout(() => {reiniciarJogoDaVelha();}, 1000);
    } else if (caixa2 == caixa5 && caixa5 == caixa8 && caixa2 != ''){
        alert('O jogador ' + caixa2 + ' ganhou!');
        jogodavelhaGanhou = true;
        setTimeout(() => {reiniciarJogoDaVelha();}, 1000);
    } else if (caixa3 == caixa6 && caixa6 == caixa9 && caixa3 != ''){
        alert('O jogador ' + caixa3 + ' ganhou!');
        jogodavelhaGanhou = true;
        setTimeout(() => {reiniciarJogoDaVelha();}, 1000);
    } else if (caixa1 == caixa5 && caixa5 == caixa9 && caixa1 != ''){
        alert('O jogador ' + caixa1 + ' ganhou!');
        jogodavelhaGanhou = true;
        setTimeout(() => {reiniciarJogoDaVelha();}, 1000);
    } else if (caixa3 == caixa5 && caixa5 == caixa7 && caixa3 != ''){
        alert('O jogador ' + caixa3 + ' ganhou!');
        jogodavelhaGanhou = true;
        setTimeout(() => {reiniciarJogoDaVelha();}, 1000);
    } else if (caixa1 != '' && caixa2 != '' && caixa3 != '' && caixa4 != '' && caixa5 != '' && caixa6 != '' && caixa7 != '' && caixa8 != '' && caixa9 != '' ){
        alert('Deu velha.');
        jogodavelhaGanhou = true;
        setTimeout(() => {reiniciarJogoDaVelha();}, 1000);
    }}

    function reiniciarJogoDaVelha() {
        document.getElementById('jogoDaVelhaN1').textContent = '';
        document.getElementById('jogoDaVelhaN2').textContent = '';
        document.getElementById('jogoDaVelhaN3').textContent = '';
        document.getElementById('jogoDaVelhaN4').textContent = '';
        document.getElementById('jogoDaVelhaN5').textContent = '';
        document.getElementById('jogoDaVelhaN6').textContent = '';
        document.getElementById('jogoDaVelhaN7').textContent = '';
        document.getElementById('jogoDaVelhaN8').textContent = '';
        document.getElementById('jogoDaVelhaN9').textContent = '';
        jogadorAtualJogoDaVelha = 'X';
        jogodavelhaGanhou = false;
        document.getElementById('jogadorAtualExibicao').textContent = 'X';
        document.getElementById('jogadorAtualExibicao').style.color = '#fc3f3f';
    }

function salvandoElementos() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('botaoPadrao', document.getElementById('botaoCor').style.display);
    localStorage.setItem('contador', document.getElementById('Contador').innerText);
    localStorage.setItem('tarefas', document.getElementById('listatarefas').innerHTML);
    localStorage.setItem('imagemAtual', document.getElementById('imagem').src);
    localStorage.setItem('temaAtual', temaAtual);
    localStorage.setItem('iconAtual', document.getElementById('tema').src);
    localStorage.setItem('corPrimaria', getComputedStyle(document.documentElement).getPropertyValue('--cor-primaria'));
    localStorage.setItem('corSecundaria', getComputedStyle(document.documentElement).getPropertyValue('--cor-secundaria'));
    localStorage.setItem('corTerciaria', getComputedStyle(document.documentElement).getPropertyValue('--cor-terciaria'));
    localStorage.setItem('corQuaternaria', getComputedStyle(document.documentElement).getPropertyValue('--cor-quaternaria'));
}