//Pré-Tudo
const texto = document.querySelector("#texto")
const entrada = document.querySelector("#entrada")
const reiniciar = document.querySelector("#reiniciar")
const resultado = document.querySelector("#resultado")
const historico = document.querySelector("#historico")
const alternarTemaBtn = document.querySelector("#alternarTema")
//Textos
const textos = [
  "Exemplo de texto para digitar.",
  "Outro exemplo de texto para digitar.",
  "PNEUMOULTRAMICROSCOPICOSSILICOVULCANOCONIOSE.",
  "Digite isso.",
  "1 2 3 4 5 6 7 8 9.",
  "Ser ou não ser, eis a questão.",
  "Penso, logo existo.",
  "A imaginação é mais importante que o conhecimento.",
  "Duas coisas são infinitas: o universo e a estupidez humana.",
  "Ninguém faz o mal voluntariamente.",
 "Tente mover o mundo, mas comece movendo a si mesmo.",
 "Ogros são como cebolas. As cebolas têm camadas. Os ogros têm camadas."
];
//Colocar Texto
  function novoTexto() {
    const index = Math.floor(Math.random() * textos.length)
    texto.textContent = textos[index]
  }
//Atualizar
  function atualizarTeste() {
  iniciar()
   if(entrada.value === texto.textContent) {
    verificar()
   }
  }
  //Iniciar
  function iniciar() {
    const statusDoTeste = JSON.parse(localStorage.getItem("testeEmAndamento"))
    if(!statusDoTeste) {
        localStorage.setItem("tempoInicial", new Date().getTime())
    localStorage.setItem("testeEmAndamento", true)
    }
  }
  //Verificar
  function verificar() {
    const tempoFinal = new Date().getTime()
    const tempoInicial = parseInt(localStorage.getItem("tempoInicial"))
    const tempoGasto = (tempoFinal - tempoInicial) / 1000

    resultado.textContent = "Parabéms você copiou o texto em:" +(tempoGasto )+ "segundos!"

   adicionarAoHistorico(texto.textContent, tempoGasto)

    localStorage.setItem("testeEmAndamento", false)
    entrada.value = ""
    novoTexto();
  }
  //Historico
   function adicionarAoHistorico(textoDigitado, tempoGasto) {
      const itemHistorico = document.createElement("p")
 
      itemHistorico.textContent = 'Texto:' + (textoDigitado) + "Tempo:" + (tempoGasto)
      historico.appendChild(itemHistorico)
    }
    //Reiniciar
   function reiniciarTexto() {
    entrada.value = ""
    resultado.textContent = ""
    novoTexto()
    localStorage.setItem("testeEmAndamento", false)
    historico.innerHTML = ""
   }
   //Trocar Tema
   function alternarTema() {
    const body = document.body
    body.classList.toggle("claro")
    body.classList.toggle("escuro")
   }
  //Inputs
   entrada.addEventListener("keyup", atualizarTeste)
   reiniciar.addEventListener("click", reiniciarTexto)
  alternarTemaBtn.addEventListener("click", alternarTema)
  novoTexto()