const rates = {};//Из большого обьема данных нам надо только 2
const elementUAH = document.querySelector('[data-value="UAH"]'); //подставляем значение доллара
const elementEUR = document.querySelector('[data-value="EUR"]'); //подставляем значение евро

const input = document.querySelector('#input'); //читаем инпут
const result = document.querySelector('#result'); //для второго инпута с результатом
const select = document.querySelector('#select'); //читаем селектор

getCurrencies(); //вызов ф-ции для работы с валютами

setInterval(getCurrencies, 10000); //обновление раз в 10000млсек данных


async function getCurrencies(){
  const response = await fetch('https://cdn.cur.su/api/cbr.json'); //валюты через АПИ
  const data = await response.json(); //преорбразование в JSON
  const result = await data; //для чтение js 
  console.log(result); //тест
  console.log(result.rates.UAH); //тест
  console.log(result.rates.EUR); //тест

  rates.UAH = result.rates.UAH; //USD UAH
  rates.EUR = result.rates.EUR * result.rates.UAH; //EUR UAH

  console.log(rates); //тест

  elementUAH.textContent = rates.UAH.toFixed(2); //Оставляем по 2 цифры после запятой
  elementEUR.textContent = rates.EUR.toFixed(2); //Оставляем по 2 цифры после запятой
}

input.oninput = function(){
  result.value = (parseFloat(input.value) / rates[select.value]).toFixed(2); //считаем сразу в второй инпут
}

select.oninput = function(){
  result.value = (parseFloat(input.value) / rates[select.value]).toFixed(2); //после выбора другого селектора, меняем сумму в втором инпуте
}



