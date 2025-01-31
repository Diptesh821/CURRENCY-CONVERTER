let baseUrl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let dropdowns=document.querySelectorAll(".select-container select");
const button=document.querySelector("button");
let input=document.querySelector(".amount input");
let mes=document.querySelector(".msg");
let from=document.querySelector(".from .select-container select");
let to=document.querySelector(".to .select-container select");

for(let dropdown of dropdowns){
    for(let currCode in countryList){

        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
       

        if(dropdown.name==="from"&&currCode==="USD"){
            newOption.selected="selected";
        }
        else if(dropdown.name==="to"&&currCode==="INR"){
            newOption.selected="selected";
        }
        dropdown.append(newOption);
       
     
        
    }
    dropdown.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag=(element)=>{
    let currCode=element.value;


    let img=element.parentElement.querySelector("img");
    let newSrc=`https://flagsapi.com/${countryList[currCode]}/flat/64.png`;
    img.src=newSrc;
}

const updateExchangeRate=async ()=>{
    let amount=input.value;
    if(amount===""||amount<1){
        amount=1;
        input.value="1";
    }

    let fromCurr=from.value;
    let tocurr=to.value;
    console.log(fromCurr);
    const URL=`${baseUrl}/${fromCurr.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    console.log(fromCurr.toLowerCase());
    let fromValue=data[fromCurr.toLowerCase()];
    let toValue=tocurr.toLowerCase();
    console.log(fromValue[toValue]);
    let rate=fromValue[toValue];
    let finalamt=amount*rate;
    mes.innerText=`${amount} ${fromCurr} = ${finalamt} ${tocurr}`;


    
}
window.addEventListener("load",()=>{
    updateExchangeRate();
});
button.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});
//event listeners always lie below the fucntion.