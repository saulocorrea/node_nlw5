import { Router } from "express";
import { MessagesController } from "./controllers/MessagesController";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";

/**
 * TIPOS DE PARÂMETROS
 * Routes Params    -> http://localhost:3333/settings/1
 * Query Params     -> http://localhost:3333/settings?search=textoqualquer&outroparametro=qualquer valor
 * Body Params      -> http://localhost:3333/settings -> Body da requisição { name: "x", type: "y"}
 */

const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

routes.post("/settings", settingsController.create);
routes.get("/settings/:username", settingsController.findByUserName);

routes.post("/users", usersController.create);

routes.post("/messages", messagesController.create);
routes.get("/messages/:id", messagesController.showByUser);

export { routes };
