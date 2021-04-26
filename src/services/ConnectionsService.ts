import { getCustomRepository } from "typeorm";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}

class ConnectionsService {

    async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
        const connectionsRepository = getCustomRepository(ConnectionsRepository);

        const connection = connectionsRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        });

        await connectionsRepository.save(connection);

        return connection;
    }

    async findByUserId(user_id: string) {
        const connectionsRepository = getCustomRepository(ConnectionsRepository);
        return await connectionsRepository.findOne({
            user_id
        });
    }

    async findAllWithoutAdmin() {
        const connectionsRepository = getCustomRepository(ConnectionsRepository);
        return await connectionsRepository.find({
            where: { admin_id: null },
            relations: ["user"]
        });
    }

    async findBySocketId(socket_id: string) {
        const connectionsRepository = getCustomRepository(ConnectionsRepository);
        return await connectionsRepository.findOne({
            socket_id
        });
    }
}

export { ConnectionsService };
