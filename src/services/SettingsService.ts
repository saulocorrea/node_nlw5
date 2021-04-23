import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {

    async create({ chat, username }: ISettingsCreate) {
        const settingsRepository = getCustomRepository(SettingsRepository);

        const userAlreadyExists = await settingsRepository.findOne({ 
            username
        });
        
        if (userAlreadyExists) {
            throw new Error("Usuário já existe no banco de dados!");
        }

        const settings = settingsRepository.create({
            chat,
            username
        });

        await settingsRepository.save(settings);

        return settings;
    }

}

export { SettingsService };
