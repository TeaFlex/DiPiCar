import { Express, Router } from "express";
import { UserController } from "../controller/UserController";

export class UsersRoute {
    
    static init(app: Express): void {

        var router = Router();
        var user = new UserController();

        //Get all users
        router.get('/', user.getAllUsers);

        //Get a User by id
        router.get('/:id', user.getUser);

        //Post a user from JSON
        router.post('/', user.initUser);

        //Delete a User
        router.delete('/:id', user.deleteUser);

        app.use('/users', router);
    }
}