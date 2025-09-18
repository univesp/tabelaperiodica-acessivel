// Função que cria os elementos da Tabela Periodica

let criaElementoHTML = function(indiceArg, siglaArg, familia, timeAudio, nome, audio, icone){
    let elemento = document.createElement('div')
    let indice   = document.createElement('div')
    let sigla    = document.createElement('div')
    elemento.dataset.familia = familia
    elemento.classList.add('elemento')
    if(indiceArg == 0){
        elemento.tabIndex="-1"
    }else{
        elemento.tabIndex="0"
    }
    elemento.setAttribute('alt', nome)
    elemento.id = "numero-atomico" + indiceArg
    elemento.dataset.numeroAtomico = indiceArg
    elemento.dataset.time = timeAudio
    elemento.dataset.audio = audio
    if(familia != ""){
      elemento.classList.add(familia)
    }
    indice.classList.add('indice')
    sigla.classList.add('sigla')
    indice.innerHTML = `<span>${indiceArg}</span> <span><img class="icone-elemento" src="https://apps.univesp.br/tabela-periodica-acessivel/icones/${icone}.svg" alt=""></span>`;
    sigla.innerHTML = siglaArg
    elemento.appendChild(indice)
    elemento.appendChild(sigla)
    return(elemento)
  }


  // Função que cria Tabela Detalhe
  let criaTabelaDetalhe = function(titulo, classElemento, nomeElemento, simbolo, numAtomico, massaAtomica, classificacao){
    let tabelaDetalhe = document.createElement('div');
    tabelaDetalhe.classList.add('tabelaDetalheContent');

    tabelaDetalhe.innerHTML = `
      <p style="font-weight: bold;" class="tabelaDetalheP ${classElemento}">${titulo}</p>
      <ul class="tabelaDetalheUl">
          <li class="tabelaDetalheLi bold">Elemento:</li>
          <li class="tabelaDetalheLi">${nomeElemento}</li>
      </ul>
      <ul class="tabelaDetalheUl">
          <li class="tabelaDetalheLi bold">Símbolo:</li>
          <li class="tabelaDetalheLi">${simbolo}</li>
      </ul>
      <ul class="tabelaDetalheUl">
          <li class="tabelaDetalheLi bold">Número atômico:</li>
          <li class="tabelaDetalheLi">${numAtomico}</li>
      </ul>
      
      <ul class="tabelaDetalheUl">
          <li class="tabelaDetalheLi bold">Massa atômica:</li>
          <li class="tabelaDetalheLi">${massaAtomica} u</li>
      </ul>
      <ul class="tabelaDetalheUl">
          <li class="tabelaDetalheLi bold">Classificação:</li>
          <li class="tabelaDetalheLi">${classificacao}</li>
      </ul>
    `;

    return tabelaDetalhe;
  }
  
  
  // Função que determina a classe do elemento de acordo com a posição da coluna
  /*
  let retornaFamilia = function(AtomicNumber){
    let familia = ""
    if(alcalinoArr.includes(AtomicNumber)){
      familia = "metal-alcalino"
    }
    else if(alcalinoTerrosoArr.includes(AtomicNumber)){
      familia = "metal-alcalino-terroso"
    }
    else if(actnideosArr.includes(AtomicNumber)){
      familia = 'actinideos'
    }
    else if(lantanideosArr.includes(AtomicNumber)){
      familia = 'lantanideos'
    }
    else if(metaisDeTransicaoArr.includes(AtomicNumber)){
      familia = 'metais-de-transicao'
    }
    else if(metaisRepresentativosArr.includes(AtomicNumber)){
      familia = 'metais-representativos'
    }
    else if(semiMetaisArr.includes(AtomicNumber)){
      familia = 'semi-metais'
    }
    else if(naoMetaisArr.includes(AtomicNumber)){
      familia = 'nao-metais'
    }
    else if(halogeniosArr.includes(AtomicNumber)){
      familia = 'halogenios'
    }
    else if(gasesNobresArr.includes(AtomicNumber)){
      familia = 'gases-nobres'
    }
    else if(desconhecidosArr.includes(AtomicNumber)){
      familia = 'desconhecidos'
    }
    else if(hidrogeneoArr.includes(AtomicNumber)){
      familia = 'hidrogeneo'
    }
    return(familia)
  }
  */