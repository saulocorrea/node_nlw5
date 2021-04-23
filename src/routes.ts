import { Router } from "express";
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

routes.post("/settings", settingsController.create);
routes.post("/users", usersController.create);

export { routes };
