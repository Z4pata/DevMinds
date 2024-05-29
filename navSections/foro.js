// URLS del json-server
const URL = "http://localhost:3000/";
const URLComments = "http://localhost:3000/comments";
const URLReplies = "http://localhost:3000/replies";

// elementos del DOM
const form = document.querySelector("#comment_form");
const textarea = document.querySelector("#textarea");
const button = document.querySelector("#button_submit");
const idUser = document.querySelector("#idUser");
const comments = document.querySelector("#comments");
const commentsRight = document.querySelector("#commentsRight");
const div_hide = document.querySelector("#div_hide");
const replyForm = document.querySelector("#replyForm");
const reply_input = document.querySelector("#reply_input");



// Event Listeners

    // cargo los comentarios a la pagina
document.addEventListener("DOMContentLoaded", (event) =>{
    getComment()
})

        // formulario para comentarios
form.addEventListener("submit",(event)=>{
    event.preventDefault()
    event.stopPropagation()
    addComment()
})

    // delego la funcion addReply al lugar de comments en el que le de click
comments.addEventListener("click", (event)=>{
    addReply(event)
})

// Functions

// funcion para agregar comentarios al json
async function addComment(){
    // objeto con el input de textarea
    const newComment = {
        comment: textarea.value
    }
    // agrego el objeto a json en la propiedad comments
    await fetch(URLComments,{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(newComment)
    });
}

// funcion para agregar los comentarios que hay en el json al HTML
async function getComment(){
    // hago la peticion al json-server con la propiedad "comments"
    const response = await fetch(URLComments);
    // convierto lo que extraje de la peticion a lenguaje que lea js
    const data = await response.json();
    console.log(data);

    // cada elemento en data se va a agregar al div llamado comments
    data.forEach(comment => {
        comments.innerHTML += `
        <div class="commentANDreply">
            <div class="cardComment">
                <div class="headerCard">
                    <div class="happyFace"><i class="fa-regular fa-face-smile fa-4x"></i></div>
                    <span>Traveller#${comment.id}</span>
                    <button class="replyButton">reply</button>
                </div>
                <div class="sectionContent">
                    <div class="commentContent">${comment.comment}</div>
                </div>
            </div>
        </div>
        `;
    });
    
}

async function addReply(event){
    // declaro el HTML de lo que clickeo como una variable
    const clickEvent = event.target;

    // Verifico si lo que clickee contiene la clase "replyButton"
    if (clickEvent.classList.contains("replyButton")){
        // Muestro el formulario para hacer una respuesta
        div_hide.classList.remove("hide");

            // Cuando el formulario para la respuesta se envia
        replyForm.addEventListener("submit", async (event)=>{
            // evita el comportamiento natural del formulario al enviarse
            event.preventDefault()

            // Se oculta el formulario
            div_hide.classList.add("hide");

//---------------------- Reply to JSON server -----------------------------

                // Saco el input de la respuesta
            const reply_inputValue = reply_input.value;

            // guardo lo que hay en el input como un objeto
            // esto para poder agregarlo al json
            const newReply = {
                reply: reply_inputValue
            }

            // hago la conexion con el json en la propiedad "replies"
            // genero el POST para agregar el objeto con la respuesta
            await fetch(URLReplies, {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(newReply)
            })

// ------------------------------------ mostrar respuestas con json  ------------------------------------
            // conecto con el json en la seccion replies
            const response2 = await fetch(URLReplies);
            // convierto de json a un lenguaje que pueda leer js
            const data2 = await response2.json();

            // saco la longitud de lo que hay en el json y le resto 1
            const dataLength = data2.length-1;
            console.log(data2[dataLength])

            // creo un codigo HTML para mostrar la respuesta
            // y lo agrego a una variable
            const cardReply = `
            <div class="cardReply">
            <h3>Reply from Traveller#${data2[dataLength].id}</h3>
                <div class="headerReply">
                    <div><i class="fa-regular fa-face-smile fa-4x"></i></div>
                </div>
                <span>${data2[dataLength].reply}</span>
            </div>`;

            // saco el padre y el abuelo de la card a la que le di click
            const father = clickEvent.parentNode;
            const grandPa = father.parentNode;
            // agrego el codigo HTML al bisabuelo de lo que toqué
            grandPa.parentNode.innerHTML += cardReply;

            // reinicio el valor del input del formulario de respuesta
            reply_input.value = "";
        })
    }
}
