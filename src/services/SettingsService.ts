import { getCustomRepository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    private settingsRepository: SettingsRepository;

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create({ chat, username }: ISettingsCreate) {
        
        const userAlreadyExists = await this.settingsRepository.findOne({ 
            username
        });
        
        if (userAlreadyExists) {
            throw new Error("Usuário já existe no banco de dados!");
        }

        const settings = this.settingsRepository.create({
            chat,
            username
        });

        await this.settingsRepository.save(settings);

        return settings;
    }

    async findByUserName(username: string) {
        return await this.settingsRepository.findOne({
            username
        });
    }

    async update(username: string, chat: boolean) {
        await this.settingsRepository.createQueryBuilder()
            .update(Setting)
            .set({ chat })
            .where("username = :username", {
                username
            })
            .execute();
    }

}

export { SettingsService };
