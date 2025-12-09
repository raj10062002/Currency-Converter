const BASE_URL ="https://api.frankfurter.dev/v1/latest?";
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(select of dropdown){
    for(codes in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=codes;
        newOption.value=codes;
        if(select.name==="from" && codes==="USD"){
          newOption.selected="selected";
        }else if(select.name==="to" && codes==="INR"){
          newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

window.addEventListener("load",()=>{
    updateExchange();
})

const updateFlag=(element) =>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    console.log(countryCode);
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchange();
})

const updateExchange=async()=>{
    let amount=document.querySelector(".amount input");
    let amtValue=amount.value;
    if(amtValue==="" || amtValue<1){
        amtValue=1;
        amount.value="1";
    }
    
    const URL=`${BASE_URL}base=${fromCurr.value}&symbols=${toCurr.value}`;
    let response=await fetch(URL);
    let data=await response.json();
    
    let rate=data.rates[toCurr.value];
    let finalAmount=amtValue*rate;

    msg.innerText=`${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}