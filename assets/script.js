//Variaveis
const moedaInput = document.querySelector("#coin");

const nameValue = document.querySelector("#cash")

const brlInput = document.querySelector("#brl");
const coinInput = document.querySelector("#moeda");
const sect = document.querySelector("#sect");
const enviar = document.querySelector("#enviar")

let coin;
//Pegar API
const getApi = async () => {
  let api = `https://economia.awesomeapi.com.br/last/${coinInput.value}-BRL`;
  const res = await fetch(api);
  const data = await res.json();
  console.log(data)
  return data;
};
const modify = async () => {
  const data = await getApi();
  
  coin = parseFloat(data[`${coinInput.value}BRL`].high);
  console.log(coin)
};
function change() {
  sect.classList.remove("hide");
}
enviar.addEventListener("click", () => {
   nameValue.innerText = coinInput.value
  change();
  modify()
});

//Digitação
//BRL
brlInput.addEventListener("keyup", () => {
  convert(`brl-to-${nameValue.innerText}`);
});
//
moedaInput.addEventListener("keyup", () => {
  convert(`${nameValue.innerText}-to-brl`);
});

//Formatar
brlInput.addEventListener("blur", () => {
  brlInput.value = formatCurrency(brlInput.value);
});
moedaInput.addEventListener("blur", () => {
  brlInput.value = formatCurrency(brlInput.value);
});

function formatCurrency(value) {
  let fixedValue = fixValue(value);
  let options = {
    useGrouping: false,
    minimumFractionDigits: 2,
  };
  let formatter = new Intl.NumberFormat("pt-BR", options);
  return formatter.format(fixedValue);
}
function fixValue(value) {
  let fixedValue = value.replace(",", ".");
  let floatValue = fixedValue;
  if (isNaN(floatValue)) {
  floatValue = 0
}
  return floatValue;
}
//Converter
function convert(type) {
  localStorage.setItem("0", coinInput.value);
  console.log(coin);
 
  //BRL
  if (type == `brl-to-${nameValue.innerText}`) {
    let fixedValue = fixValue(brlInput.value);
    let result = fixedValue / coin;
    result = result.toFixed(2);
    moedaInput.value = formatCurrency(result);
  }
  //
  if (type == `${nameValue.innerText}-to-brl`) {
    let fixedValue = fixValue(moedaInput.value);
    let result = fixedValue * coin;
    result = result.toFixed(2);
    brlInput.value = formatCurrency(result);
  }
}