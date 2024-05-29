const anchorLogo = document.querySelector(".anchor-logo");

anchorLogo.addEventListener("click",()=> {
    anchorLogoClick();
})



function anchorLogoClick(){
    const age = localStorage.getItem("edad") 
    if (age == "+18"){
        anchorLogo.href = "/adults/html/infoAdults.html";
    }
    if (age == "-18"){
        anchorLogo.href = "/Minors/html/infoMinors.html";
    }
}