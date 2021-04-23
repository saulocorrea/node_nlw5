import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";
import { UsersService } from "../services/UsersService";

interface IParams {
    email: string;
    text: string;
}

io.on("connect", (socket) => {
    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messagesService = new MessagesService();

    socket.on("client_firt_access", async (params) => {
        
        const { email, text } = params as IParams;
        const socket_id = socket.id;

        const user = await usersService.create(email); // cria ou retorna se já existente

        const connection = await connectionsService.findByUserId(user.id);

        if (connection) {
            connection.socket_id = socket_id;
            await connectionsService.create(connection);
        } else {
            await connectionsService.create({
                socket_id,
                user_id: user.id
            });
        }

        await messagesService.create({
            user_id: user.id,
            text
        });
        
    });
});
