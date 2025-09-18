let dadosDoJSON;

$(document).ready(function(){
  $(window).scroll(function(){
    var nav = $(".header-dinamico .container");
    var scroll = $(window).scrollTop();
    if(scroll == 0){
      nav.fadeIn();
    } else {
      nav.fadeOut();
    }
  });
})
let audio;
preloadAudio()

let lantanideosArr     = [58,59,60,61,62,63,64,65,66,67,68,69,70,71]
let actnideosArr       = [90,91,92,93,94,95,96,97,98,99,100,101,102,103]
let alcalinoArr        = [3,11,19,37,55,87]
let alcalinoTerrosoArr = [4,12,20,38,56,88]
let metaisDeTransicaoArr = [21,22,23,24,25,26,27,28,29,30,39,40,41,42,43,44,45,46,47,48,57,72,73,74,75,76,77,78,79,80,89,104,105,106,107,108,112]
let metaisRepresentativosArr = [13,31,49,50,81,82,83,84]
let semiMetaisArr = [5,14,32,33,34,51,52]
let naoMetaisArr = [6,7,8,15,16]
let halogeniosArr = [9,17,35,53,85]
let gasesNobresArr = [2,10,18,36,54,86]
let desconhecidosArr = [109,110,111,113,114,115,116,117,118]
let hidrogeneoArr = [1]
let extremosSuperior = [1,4,21,22,23,24,25,26,27,28,29,30,5,6,7,8,9,2]
let extremosInferior = [87,88,89,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118]



let lantanideos = document.querySelector('#lantanideos')
let actinedeos = document.querySelector('#actinedeos')
let myElements = ""

//const uri = '../elementos.json'
const uri = 'elementos.json'

let req = new Request(uri, {
  method: 'GET',
  mode: 'cors'
});

fetch(req,
  {headers:{'Content-Type':'application/json','Accept': 'application/json'} })
.then((response) => {
  return(response.json())
})
.then(response => {

  dadosDoJSON = response;
  
  lantanideos.appendChild(criaElementoHTML(0,"He","vazio",""))
  lantanideos.appendChild(criaElementoHTML(0,"He","vazio",""))
  lantanideos.appendChild(criaElementoHTML(0,"He","vazio",""))
  actinedeos.appendChild(criaElementoHTML(0,"He","vazio",""))
  actinedeos.appendChild(criaElementoHTML(0,"He","vazio",""))
  actinedeos.appendChild(criaElementoHTML(0,"He","vazio",""))
  response.forEach(element => {

    // Criando os elementos na tabela passando os argumentos vindos do Json
    let elemento = criaElementoHTML(element.AtomicNumber, element.Symbol, /*retornaFamilia(element.AtomicNumber)*/element.classHTML, element.timeInterval, element.Name, element.audio, element.icone)
    let coluna = document.querySelector('#col-' + element.Group)
    
    if (lantanideosArr.includes(element.AtomicNumber)) {
      lantanideos.appendChild(elemento)
    }
    else if(actnideosArr.includes(element.AtomicNumber)){
      actinedeos.appendChild(elemento)
    }
    else{
      coluna.appendChild(elemento)
    }
  });
  lantanideos.appendChild(criaElementoHTML(0,"He","vazio",""))
  actinedeos.appendChild(criaElementoHTML(0,"He","vazio",""))
  myElements = document.querySelectorAll('.elemento');
  iconeElemento = document.querySelectorAll('.icone-elemento');

  myElements.forEach(elemento => {
    elemento.addEventListener('focus', () => {
      audio.currentTime = 0
      audio.pause();
      elemento.classList.add('focus');
      let src = 'assets/audios/' + elemento.dataset.audio + '.wav'
      audio = new Audio(src);
      audio.play();
      //tabelaTroca(elemento);

      $('.tabelaDetalhe').css('display', 'block');
      
     //Removendo conteudo da tabela anteriormente criada
      $('.tabelaDetalheContent').remove();

      //Criando tabela de detalhes dos elementos
      let tabelaDetalhe = $(".tabelaDetalhe");
      let idElemento = parseInt($(elemento).attr('id').substring(14)) - 1;

      let renderizaTabelaDetalhe = criaTabelaDetalhe(
          dadosDoJSON[idElemento].Name,
          dadosDoJSON[idElemento].classHTML,
          dadosDoJSON[idElemento].Name,
          dadosDoJSON[idElemento].Symbol,
          dadosDoJSON[idElemento].AtomicNumber,
          dadosDoJSON[idElemento].AtomicMass.toLocaleString('fr-FR'),
          dadosDoJSON[idElemento].Tipo
        );

        tabelaDetalhe.append(renderizaTabelaDetalhe);
    
    });
    elemento.addEventListener('blur', () => {
      elemento.classList.remove('focus');

      $('.tabelaDetalhe').css('display', 'none');
    });
  });

  
})

// Troca o elemento com as setas do teclado
document.addEventListener('keydown', (event) => {
  for (let index = 0; index < myElements.length; index++) {
    let elemento = myElements[index];
    if (elemento.classList.contains('focus') && event.key === 'ArrowRight') {
      direita(elemento);
      break
    }
    else if (elemento.classList.contains('focus') && event.key === 'ArrowLeft') {
      esquerda(elemento);
      break
    }
    else if (elemento.classList.contains('focus') && event.key === 'ArrowUp') {
      cima(elemento);
      break
    }
    else if (elemento.classList.contains('focus') && event.key === 'ArrowDown') {
      baixo(elemento);
      break
    }
    else if (elemento.classList.contains('focus') && event.key === 'f') {
      pulaFamilia(elemento);
      break
    }
    else if (elemento.classList.contains('focus') && event.key === 'Enter') {
      fBotaoEnter(elemento)
      break
    }
  }
});

// Função que executa o audio da descriçãos dos elmentos quando Enter é pressionado
let fBotaoEnter = function(elemento){
  // let time = elemento.dataset.time
  // let time2 = time.split('-')
  // let inicio = time2[0]
  // let fim    = time2[1]
  // let inicio2 = inicio.split(':')
  // let inicioMinutos = inicio2[0]
  // let inicioSegundos = inicio2[1]
  // let fim2 = fim.split(':')
  // let fimMinutos = fim2[0]
  // let fimSegundos = fim2[1]
  // let inicioSegundos2 = parseInt(inicioSegundos) + 60*parseInt(inicioMinutos)
  // let fimSegundos2 = parseInt(fimSegundos) + 60*parseInt(fimMinutos) + 1
  let src = 'assets/audios/' + elemento.dataset.audio + '1.wav'
  audio = new Audio(src);
  audio.play()
  //playAudioWithTime(inicioSegundos2, fimSegundos2, elemento.dataset.numeroAtomico)
}

// Função que troca para o elemento da direita com a seta do teclado
function direita(elemento) {
  let AtomicNumber = parseInt(elemento.dataset.numeroAtomico)
  let query;
  AtomicNumber = AtomicNumber == 118 ? 0 : AtomicNumber
  if(AtomicNumber == 57 || AtomicNumber == 89){
      query = '#numero-atomico' + (AtomicNumber + 15)
    } else {
      query = '#numero-atomico' + (AtomicNumber + 1)
    }
    let proximo = document.querySelector(query)
  proximo.focus({preventScroll: true})
}

// Função que troca para o elemento da esquerda com a seta do teclado
function esquerda(elemento) {
  let AtomicNumber = parseInt(elemento.dataset.numeroAtomico)
  let query;
  // AtomicNumber = AtomicNumber == 1 ? 119 : AtomicNumber
  if(AtomicNumber == 72 || AtomicNumber == 104){
      query = '#numero-atomico' + (AtomicNumber - 15)
    } else {
      query = '#numero-atomico' + (AtomicNumber - 1)
    }
  let proximo = document.querySelector(query)
  proximo.focus({preventScroll: true})

}

function pulaFamilia(elemento) {
  let AtomicNumber = parseInt(elemento.dataset.numeroAtomico)
  let query = '#numero-atomico' + getNumeroAtomicoPulaFamilia(AtomicNumber)
  let proximo = document.querySelector(query)
  proximo.focus({preventScroll: true})
}

// Função que troca para o elemento de cima com a seta do teclado
function cima(elemento) {
  let AtomicNumber = parseInt(elemento.dataset.numeroAtomico)
  let queryAtomicNumber = 0
  queryAtomicNumber = getNumeroAtomicoAcima(AtomicNumber)
  let query = '#numero-atomico' + queryAtomicNumber
  let anterior = document.querySelector(query)
  anterior.focus({preventScroll: true})
  anterior.scrollIntoView({
    behavior: 'auto',
    block: 'center',
    inline: 'center'
  });
}

// Função que troca para o elemento de baixo com a seta do teclado
function baixo(elemento) {
  let AtomicNumber = parseInt(elemento.dataset.numeroAtomico)
  let queryAtomicNumber = 0
  queryAtomicNumber = getNumeroAtomicoBaixo(AtomicNumber)
  let query = '#numero-atomico' + queryAtomicNumber
  let proximo = document.querySelector(query)
  proximo.focus({preventScroll: true})
  proximo.scrollIntoView({
    behavior: 'auto',
    block: 'center',
    inline: 'center'
  });
}

let getNumeroAtomicoAcima = function(numeroAtomico){
  let queryAtomicNumber = cimaPos["num" + numeroAtomico]
  return queryAtomicNumber
} 

let getNumeroAtomicoBaixo = function(numeroAtomico){
  let queryAtomicNumber = baixoPos["num" + numeroAtomico]
  return queryAtomicNumber
} 

let getNumeroAtomicoPulaFamilia = function(numeroAtomico){

  let number = 0

  if(lantanideosArr.includes(numeroAtomico)){
    number = 72
  }
  if(actnideosArr.includes(numeroAtomico)){
    number = 90 
  }
  if(alcalinoArr.includes(numeroAtomico)){
    number = 4 
  }
  if(alcalinoTerrosoArr.includes(numeroAtomico)){
    number = 21 
  }
  if(metaisDeTransicaoArr.includes(numeroAtomico)){
    number = 13 
  }
  if(metaisRepresentativosArr.includes(numeroAtomico)){
    number = 5 
  }
  if(semiMetaisArr.includes(numeroAtomico)){
    number = 6 
  }
  if(naoMetaisArr.includes(numeroAtomico)){
    number = 9 
  }
  if(halogeniosArr.includes(numeroAtomico)){
    number = 2 
  }
  if(gasesNobresArr.includes(numeroAtomico)){
    number = 109 
  }
  if(desconhecidosArr.includes(numeroAtomico)){
    number = 1 
  }
  if(hidrogeneoArr.includes(numeroAtomico)){
    number = 3 
  }
  return number
}

function preloadAudio() {
    audio = new Audio('assets/audio.wav');
    audio.preload = 'auto'; // Configuração para pré-carregar o áudio
}

function playAudioWithTime(startTime, endTime, AtomicNumber) {
  // if (!audio) {
  //   preloadAudio(); // Pré-carrega o áudio se ainda não estiver carregado
  // }
  let url = ""
  url = AtomicNumber == 27 ? 'https://apps.univesp.br/tabela-periodica-acessivel/assets/Cobalto.mp3' : 'https://apps.univesp.br/tabela-periodica-acessivel/assets/audio.mp3' 
  startTime = AtomicNumber == 27 ? 0 : startTime
  audio = new Audio(url);
  audio.preload = 'auto'; // Configuração para pré-carregar o áudio
  // Remove o ouvinte de eventos existente
  // audio.removeEventListener('timeupdate', timeUpdateListener);

  // Adiciona um novo ouvinte de eventos
  audio.addEventListener('timeupdate', timeUpdateListener);

  // Define o tempo inicial
  audio.currentTime = startTime;

  // Inicia a reprodução
  audio.play();

  // Função para verificar o tempo atual e pausar se necessário
  function timeUpdateListener() {
      if (audio.currentTime >= endTime) {
          audio.pause();
          // Remove o ouvinte de eventos após pausar
          audio.removeEventListener('timeupdate', timeUpdateListener);
      }
  }
}


//funcao do botao de troca de cor
  function adicionarFolhaDeEstilo() {
    // Verifica se a folha de estilo já está presente
    if (!document.querySelector('link[href="stylesheets/secao-sem-cor.css"]')) {
      // Cria um novo elemento <link> para a folha de estilo
      var novaFolhaDeEstilo = document.createElement('link');
      novaFolhaDeEstilo.rel = 'stylesheet';
      novaFolhaDeEstilo.href = 'stylesheets/secao-sem-cor.css';
      
      // Adiciona o novo elemento <link> ao <head> do documento
      document.head.appendChild(novaFolhaDeEstilo);
    }
  }

  function removerFolhaDeEstilo() {
    // Obtém o elemento <link> da folha de estilo
    var folhaDeEstilo = document.querySelector('link[href="stylesheets/secao-sem-cor.css"]');
    
    // Se a folha de estilo estiver presente, remove-a
    if (folhaDeEstilo) {
      folhaDeEstilo.remove();
    }
  }


  /*
// função da tabela com as informações do elemento
function tabelaTroca(elemento){
  // variaveis para ver a Tabela com as informações
  let idDoElemento = elemento.id;
  let pegaIdElemento = (idDoElemento.substring(14)-1);
  let tabelaId = document.getElementsByClassName("tabelaDetalheLi");
  let pegaTituloElemento = document.getElementsByClassName("tabelaDetalheP");


  // Manipula o paragrafo da tabela
  pegaTituloElemento[0].innerHTML = dadosDoJSON[pegaIdElemento].Name;
  
  // Muda as informações da Tabela de acordo com o Foco
  tabelaId[1].innerHTML = dadosDoJSON[pegaIdElemento].Name;
  tabelaId[3].innerHTML = dadosDoJSON[pegaIdElemento].Symbol;
  tabelaId[5].innerHTML = dadosDoJSON[pegaIdElemento].AtomicNumber;
  tabelaId[7].innerHTML = dadosDoJSON[pegaIdElemento].AtomicMass + " u";
  tabelaId[9].innerHTML = dadosDoJSON[pegaIdElemento].Tipo;

  
  // Logica para remover a classe de acordo com a cor do elemento
  if(elemento.classList[1] != pegaTituloElemento[0].classList[1]){
    pegaTituloElemento[0].classList.add(elemento.classList[1]);
    pegaTituloElemento[0].classList.remove(pegaTituloElemento[0].classList[1]);
  }
  
}
*/





