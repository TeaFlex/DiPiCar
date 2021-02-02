import { Request, Response } from "express";
import { AppDB } from "../model/database/AppDB";
import { User } from "../model/database/Entities/User";

export class UserController {

    async initUser(req: Request, res: Response) {
        try {
            const db = await AppDB.getInstance()
            var u: User = req.body;
            var id = await db.userDAO.saveUser(u);
            await db.userStatsDAO.initStats(id);
            res.status(200).send();
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const db = await AppDB.getInstance()
            var id = parseInt(req.params["id"], 10);
            var json = await db.userDAO.getUserById(id);
            res.status(200).json(json);
        } catch (error) {
            console.error(error);
            res.status(404).send(error.message);
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const db = await AppDB.getInstance()
            var json = await db.userDAO.getAllUsers();
            res.status(200).json(json);
        } catch (error) {
            console.error(error);
            res.status(404).send(error.message);
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            //TODO: Token needed
            const db = await AppDB.getInstance()
            var id = parseInt(req.params["id"], 10);
            await db.userDAO.deleteUser(id);
            res.status(200).send();
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    }
}