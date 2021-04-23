document.querySelector("#start_chat").addEventListener("click", (event) => {

    closeChatHome();
    openChatActive();
    const text = document.getElementById("txt_help").value;
    const email = document.getElementById("email").value;


    const socket = io();
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

});
