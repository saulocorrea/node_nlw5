import express from "express"

import "./database"
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log("Server está rodando na porta 3333"));

/*
app.get("/", (request, response) => {

    //return response.send("Olá projeto NLW");
    
    return response.json({
        message:"Olá projeto NLW"
    });
});

app.post("/", (request, response) => {
    return response.json({
        message:"Usuário inserido com sucesso."
    });
});

app.listen(3333, () => console.log("Server está rodando na porta 3333"));
*/