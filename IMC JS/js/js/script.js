//Dados IMC
const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];
  //Variaveis
 const imcTable = document.querySelector("#imc-table")

 const heightInput = document.querySelector("#height")
 const weightInput = document.querySelector("#weight")
 const calcBtn = document.querySelector("#calc-btn")
 const clearBtn = document.querySelector("#clear-btn")

 const calcContainer = document.querySelector("#calc-container")
 const resultContainer = document.querySelector("#result-container")

 const imcNumber = document.querySelector("#imc-number span")
 const imcInfo = document.querySelector("#imc-info span")

 const backBtn = document.querySelector("#back-btn")
//Criar Itens
 function createTable(data) {

     data.forEach((item) => {
     //div
        const div = document.createElement("div")
        div.classList.add("table-data")
     //Classificações
        const classification = document.createElement("p")
        classification.innerText = item.classification
     //Informação
        const info = document.createElement("p")
        info.innerText = item.info
     //Nivel de Obesidade
        const obesity = document.createElement("p")
        obesity.innerText = item.obesity
     
        div.appendChild(classification)
        div.appendChild(info)
        div.appendChild(obesity)
        
        imcTable.appendChild(div)
     })
 }
 //Limpar Inputs
function cleanInputs() {
   heightInput.value = ""
   weightInput.value = ""
   imcNumber.classList = ""
   imcInfo.classList = ""
}
//Validar Digitos
function validDigits(text){
     return text.replace(/[^0-9,]/g, "");
}
//Calcular IMC
function calcImc(weight, height) {
    const imc = (weight / (height * height)).toFixed(1);
    return imc;
}
//Mostrar ou Esconder
function showOrHideReults() {
     calcContainer.classList.toggle("hide")
     resultContainer.classList.toggle("hide")
}
//Ajustar
 createTable(data);

 [heightInput, weightInput].forEach((e1) => {
    e1.addEventListener("input", (e) => {
        const updateValue = validDigits(e.target.value);

        e.target.value = updateValue;
    } );
 });
 //Botão de Calcular
calcBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const weight = +weightInput.value.replace(",", ".")
    const height = +heightInput.value.replace(",", ".")

    if (!weight || !height) return

   const imc = calcImc(weight, height)
   let info 
   
   data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
        info = item.info;
    }
   });
   if (!info) return;

   imcNumber.innerText = imc
   imcInfo.innerText = info
    //Niveis de Obesidade
   switch(info) {
    case "Magreza":
        imcNumber.classList.add("low")
        imcInfo.classList.add("low")
        break;
        case "Normal":
        imcNumber.classList.add("good")
        imcInfo.classList.add("good")
        break;
        case "Sobrepeso":
        imcNumber.classList.add("low")
        imcInfo.classList.add("low")
        break;
        case "Obesidade":
        imcNumber.classList.add("medium")
        imcInfo.classList.add("medium")
        break;
        case "Obesidade Alta":
        imcNumber.classList.add("high")
        imcInfo.classList.add("high")
            break;
   }
 
  showOrHideReults()
});
//Botão Limpar
 clearBtn.addEventListener("click",(e) => {
     e.preventDefault()

    cleanInputs()
 })
//Botão Voltar
 backBtn.addEventListener("click", () => {
    cleanInputs()
    showOrHideReults()
 })