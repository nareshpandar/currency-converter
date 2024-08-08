const Base_URL= "https://latest.currency-api.pages.dev/v1/currencies/"
const dropdowns= document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr= document.querySelector(".from select");
const tocurr= document.querySelector(".to select");
const msg= document.querySelector(".msg");

for(let select of dropdowns )
    {for (currCode in countryList){
        let newOption= document.createElement("option");
        newOption.innerText= currCode;
        newOption.value = currCode;
   select.append(newOption);

   if(select.name === "from" && currCode === "USD"){
    newOption.selected="selected";
   }
    else if(select.name === "to" && currCode === "INR"){
    newOption.selected="selected";
}
   select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updatefalg(evt.target);
    });
}
const updatefalg = (element)=>
{
let currCode = element.value;
let countrycode = countryList[currCode];
console.log(countrycode)
let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
let img =  element.parentElement.querySelector("img");
img.src= newsrc;

};
btn.addEventListener("click", async (event) => {
 event.preventDefault();
 let  amount =  document.querySelector(".amount input");
 let  amtVal= amount.value;
 console.log(amtVal);
 if(amtVal=== "" || amtVal<1){
    amtVal=1;
    amount.value= "1";
 }
//  console.log(fromcurr.value,tocurr.value);
 const  URL= `${Base_URL}/${fromcurr.value.toLowerCase()}.json`
 let data = await fetch(URL);
let rate = await data.json();
let realRate = rate[`${fromcurr.value.toLowerCase()}`][`${tocurr.value.toLowerCase()}`]
const finalAmount = amtVal*realRate;
console.log(finalAmount)
msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;

}); 