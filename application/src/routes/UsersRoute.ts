import { Express, Router } from "express";
import { UserController } from "../controller/UserController";
import { bodyControl, userSchema } from "../middlewares/bodyControl";
import { checkSchema, param} from "express-validator";

export class UsersRoute {
    
    static init(app: Express): void {

        var router = Router();
        var user = new UserController();

        //Get all users
        router.get('/', user.getAllUsers);

        //Get a User by id
        router.get('/:id', param('id').isInt(), user.getUser);

        //Post a user from JSON
        router.post('/', checkSchema(userSchema), bodyControl, user.initUser);

        //Delete a User
        router.delete('/:id', param('id').isInt(), user.deleteUser);

        app.use('/users', router);
    }
}