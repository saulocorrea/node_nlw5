const socket = io();
var connectionsPendding = [];

socket.on("admin_list_all_users", (allConnectionsPendding) => {
    connectionsPendding = allConnectionsPendding;

    const div_users = document.getElementById("list_users");
    const template_pending_user = document.getElementById("template").innerHTML;

    div_users.innerHTML = "";

    allConnectionsPendding.forEach(connection => {
        const rendered = Mustache.render(template_pending_user, {
            email: connection.user.email,
            id: connection.socket_id
        });

        div_users.innerHTML += rendered;
    });

});

function call(id) {
    const connectionActual = connectionsPendding.find(con => con.socket_id === id);

    const div_chat = document.getElementById("supports");
    const template_admin_template = document.getElementById("admin_template").innerHTML;

    const rendered = Mustache.render(template_admin_template, {
        email: connectionActual.user.email,
        id: connectionActual.user_id
    });


    if (document.getElementById('admin' + connectionActual.user_id)) {
        div_chat.removeChild(document.getElementById(`admin${connectionActual.user_id}`));
    }
    div_chat.innerHTML += rendered;


    const params = {
        user_id: connectionActual.user_id
    };
    socket.emit("admin_list_messages_by_user", params, callbackMessages => {
        var div_messages = document.getElementById(`allMessages${connectionActual.user_id}`);

        callbackMessages.forEach(message => {
            var div_actual_message = document.createElement('div');

            if (message.admin_id === null) {
                div_actual_message.className = "admin_message_client";
                div_actual_message.innerHTML = `<span>${message.user.email}</span>`;
            } else {
                div_actual_message.className = "admin_message_admin";
                div_actual_message.innerHTML = `<span>Atendente: </span>`;
            }

            div_actual_message.innerHTML += `<span>${message.text}</span>`;
            div_actual_message.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>`;
            div_messages.appendChild(div_actual_message);

            div_messages.scrollTop = div_messages.scrollHeight;
        });

    });
}

function sendMessage(user_id) {
    const text_field = document.getElementById(`send_message_${user_id}`);
    const params = {
        text: text_field.value,
        user_id
    };
    socket.emit("admin_send_message", params);

    var div_messages = document.getElementById(`allMessages${user_id}`);
    var div_actual_message = document.createElement('div');
    div_actual_message.className = "admin_message_admin";
    div_actual_message.innerHTML = `<span>Atendente: </span>`;
    div_actual_message.innerHTML += `<span>${params.text}</span>`;
    div_actual_message.innerHTML += `<span class="admin_date">${dayjs().format("DD/MM/YYYY HH:mm:ss")}</span>`;
    div_messages.appendChild(div_actual_message);

    div_messages.scrollTop = div_messages.scrollHeight;

    text_field.value = "";
}


socket.on("admin_receive_message", params => {
    const { message, socket_id } = params;
    const connectionActual = connectionsPendding.find(con => con.socket_id === socket_id);

    var div_messages = document.getElementById(`allMessages${message.user_id}`);
    var div_actual_message = document.createElement('div');

    div_actual_message.className = "admin_message_client";
    div_actual_message.innerHTML = `<span>${connectionActual.user.email}</span>`;
    div_actual_message.innerHTML += `<span>${message.text}</span>`;
    div_actual_message.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>`;
    div_messages.appendChild(div_actual_message);

    div_messages.scrollTop = div_messages.scrollHeight;
});

