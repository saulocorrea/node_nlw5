let socket_admin_id = null;
let email_user = null;
let socket = null;

document.querySelector("#start_chat").addEventListener("click", (event) => {

    closeChatHome();
    openChatActive();
    const text = document.getElementById("txt_help").value;
    const email = document.getElementById("email").value;
    email_user = email;

    socket = io();
    socket.on("connect", () => {

        const params = {
            email,
            text
        };

        socket.emit("client_firt_access", params, (callback, err) => {
            if (err) {
                console.err(err);
            } else {
                console.log(callback);
            }
        });
    });


    socket.on("client_list_all_messages", messages => {
        var div_messages = document.getElementById('messages');

        var template_client = document.getElementById('message-user-template').innerHTML;
        var template_admin = document.getElementById('admin-template').innerHTML;

        messages.forEach(message => {
            if (message.admin_id === null) {
                const rendered = Mustache.render(template_client, {
                    message: message.text,
                    email: message.user.email
                });

                div_messages.innerHTML += rendered;
            } else {
                const rendered = Mustache.render(template_admin, {
                    message_admin: message.text
                });

                div_messages.innerHTML += rendered;
            }
        });
        
        div_messages.scrollTop = div_messages.scrollHeight + 100;
    });

    socket.on("admin_send_to_client", params => {
        const { text, socket_id } = params;
        socket_admin_id = socket_id;

        var div_messages = document.getElementById('messages');
        var template_admin = document.getElementById('admin-template').innerHTML;
        const rendered = Mustache.render(template_admin, {
            message_admin: text
        });
        div_messages.innerHTML += rendered;

        div_messages.scrollTop = div_messages.scrollHeight + 100;
    });
});

document.querySelector("#send_message_button").addEventListener("click", (event) => {
    const text_field = document.getElementById(`message_user`);
    const text = text_field.value;

    const params = {
        text,
        socket_admin_id
    };
    socket.emit("client_send_to_admin", params);

    text_field.value = '';
    
    var div_messages = document.getElementById('messages');
    var template_user = document.getElementById('message-user-template').innerHTML;
    const rendered = Mustache.render(template_user, {
        message: text,
        email: email_user
    });
    div_messages.innerHTML += rendered;

    div_messages.scrollTop = div_messages.scrollHeight + 100;
});
