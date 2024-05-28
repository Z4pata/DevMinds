const btn = document.getElementById('button');
const from_name = document.getElementById("from_name");
const message = document.getElementById("message");
const email_id = document.getElementById("email_id");

document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();


        btn.value = 'Sending...';

        const serviceID = 'default_service';
        const templateID = 'template_4x9u9xa';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Send Email';
                alert('Sent!');
            }, (err) => {
                btn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
            from_name.value = "";
            message.value = "";
            email_id.value = "";
    });