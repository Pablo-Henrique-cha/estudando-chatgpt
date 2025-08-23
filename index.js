let imagemAtualNumero = 0;
let tarefaInputElemento = document.getElementById('tarefainput');
let valorInicial = document.getElementById('valorInicial');
let valorFinal = document.getElementById('valorFinal');
let moedaInicial = document.getElementById('moedaInicial').value;
let moedaFinal = document.getElementById('moedaFinal').value;
let valorConvertido = '';
let cotacao = {

    //Real              //dolar             //Euro               //Iene               //Metical
    'BRLUSD' : 0.18,    'USDBRL' : 5.42,    'EURBRL' : 6.36,     'JPYBRL' : 0.037,    'MZNBRL' : 0.085,
    'BRLEUR' : 0.16,    'USDEUR' : 0.85,    'EURUSD' : 1.17,     'JPYUSD' : 0.0068,   'MZNUSD' : 0.016,
    'BRLJPY' : 27.11,   'USDJPY' : 146.87,  'EURJPY' : 172.30,   'JPYEUR' : 0.0058,   'MZNEUR' : 0.013,
    'BRLMZN' : 11.78,   'USDMZN' : 63.89,   'EURMZN' : 74.19,    'JPYMZN' : 0.44,     'MZNJPY' : 2.30,
    'BRLBRL' : 1,       'USDUSD' : 1,       'EUREUR' : 1,        'JPYJPY' : 1,        'MZNMZN' : 1,

};
   
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

function teste() {
    document.body.style.backgroundColor = corAletoria();
}

function adicionar() {
    let contador = document.getElementById('Contador');
    contador.innerText = parseInt(contador.innerText) + 1;
}

function remover() {
    let contador = document.getElementById('Contador');
    contador.innerText = parseInt(contador.innerText) - 1;
}

function adicionarTarefa() {
    let tarefaInput = document.getElementById('tarefainput').value.trim();
    let tarefaInputElemento = document.getElementById('tarefainput');
    let listaTarefas = document.getElementById('verificador');
    if (tarefaInput === '') {
        tarefaInputElemento.placeholder = "Por favor, Digite uma nova terefa!'";
        tarefaInputElemento.style.width = '225px';
        return;
    } else if (listaTarefas.textContent == 'Sem tarefas no momento!') {
        listaTarefas.textContent = tarefaInput;
        tarefaInputElemento.value = '';
    }  else {
        let novaTarefa = document.createElement('li');
        novaTarefa.textContent = tarefaInput;
        listaTarefas.appendChild(novaTarefa);
        tarefaInputElemento.value = '';
    }
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
}