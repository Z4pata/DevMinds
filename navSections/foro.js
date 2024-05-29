const URL = "http://localhost:3000/";
const URLComments = "http://localhost:3000/comments";
const URLReplies = "http://localhost:3000/replies";

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
document.addEventListener("DOMContentLoaded", (event) =>{
    getComment()
})

form.addEventListener("submit",(event)=>{
    event.preventDefault()
    event.stopPropagation()
    addComment()
})

comments.addEventListener("click", (event)=>{
    addReply(event)
})

// Functions
async function addComment(){
    const newComment = {
        comment: textarea.value
    }
    await fetch(URLComments,{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(newComment)
    });
}

async function getComment(){
    const response = await fetch(URLComments);
    const data = await response.json();
    console.log(data);
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
    // I decare what i click as a variable
    const evento = event.target;

    // I check if what i clicked on has the replyButton class
    if (evento.classList.contains("replyButton")){
        // show de form of reply
        div_hide.classList.remove("hide");

            // when the form is submitted
        replyForm.addEventListener("submit", async (event)=>{
            event.preventDefault()

            // Hide the form of reply
            div_hide.classList.add("hide");

            // Reply to JSON server
            const reply_inputValue = reply_input.value;
            console.log(reply_inputValue)

            const newReply = {
                reply: reply_inputValue
            }

            await fetch(URLReplies, {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(newReply)
            })

            const response2 = await fetch(URLReplies);
            const data2 = await response2.json();
            const dataLength = data2.length-1;
            console.log(data2[dataLength])

            const father = evento.parentNode;
            const grandPa = father.parentNode;
            const cardReply = `
            <div class="cardReply">
            <h3>Reply from Traveller#${data2[dataLength].id}</h3>
                <div class="headerReply">
                    <div><i class="fa-regular fa-face-smile fa-4x"></i></div>
                </div>
                <span>${data2[dataLength].reply}</span>
            </div>`;
            grandPa.parentNode.innerHTML += cardReply;
            reply_input.value = "";
        })
    }
}
