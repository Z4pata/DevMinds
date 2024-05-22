// Call DOM elements
const btnLower = document.querySelector("#btnLower")
const btnHigher = document.querySelector("#btnHigher")


// Event listeners
btnHigher.addEventListener("click",(event)=>{
    event.preventDefault();
    plus18()
})
btnLower.addEventListener("click",(event)=>{
    event.preventDefault();
    minus18()
})


// Functions
function plus18(){
    localStorage.setItem("edad","+18");
    window.location.href = "adults/html/indexAdults.html";
}

function minus18(){
    localStorage.setItem("edad","-18");
    window.location.href = "Minors/html/indexMinors.html";
}