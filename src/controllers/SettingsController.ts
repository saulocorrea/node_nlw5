import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";

class SettingsController {
    async create(request: Request, response: Response) {
        const settingsService = new SettingsService();

        const { chat, username } = request.body;

        try {
            
            const settings = await settingsService.create({ chat, username });
            return response.json(settings);

        } catch (err) {
            return response
                .status(400)
                .json({
                    message: err.message
                });
        }
    }

    async findByUserName(request: Request, response: Response) {
        const settingsService = new SettingsService();

        const { username } = request.params;
        
        try {

            const settings = await settingsService.findByUserName(username);
            return response.json(settings);

        } catch (err) {
            return response
                .status(400)
                .json({
                    message: err.message
                });
        }

    }

    async update(request: Request, response: Response) {
        const settingsService = new SettingsService();
        
        const { username } = request.params;
        const { chat } = request.body;

        await settingsService.update(username, chat);

        return response.json();
    }
}

export { SettingsController };
