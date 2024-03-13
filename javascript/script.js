const dropList = document.querySelectorAll(".drop-list select");
const getButton = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");

const apiKey = "0d22d7c67b114d2ca6744bfe";
for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "INR" ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}

function loadFlag(element){
    for(code in country_list){
        if(code==element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_list[code]}/flat/64.png`
        }
    }
}

window.addEventListener("load",(e)=>{
    getExchangeRate();
})

getButton.addEventListener("click",(e)=>{
    e.preventDefault();
    getExchangeRate();
})

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click",()=>{
    let tempCode=  fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})

function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    const exchangeRateTxt  = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if(amountVal=="" || amountVal=="0"){
        amount.value = "1";
        amountVal=1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate....";
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`
    fetch(url).then(response=>response.json()).then(result=>{
          let exchangeRate = result.conversion_rates[toCurrency.value];
          let totalExchangeRate = (amountVal*exchangeRate).toFixed(2);
          exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;

    }).catch(()=>{
        exchangeRateTxt.innerText = "Something went wrong";
    })
}

