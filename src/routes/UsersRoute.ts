import { Express, Router } from "express";
import { UserController } from "../controller/UserController";
import { bodyControl, userSchema } from "../middlewares/bodyControl";
import { checkSchema, param} from "express-validator";
import { catchError } from "../middlewares/errorHandlers";

export class UsersRoute {
    
    static init(app: Express): void {

        const router = Router();
        const user = new UserController();

        //Get all users
        router.get('/', catchError(user.getAllUsers));

        //Get a User by id
        router.get('/:id', param('id').isInt(), catchError(user.getUser));

        //Post a user from JSON
        router.post('/', checkSchema(userSchema), bodyControl, catchError(user.initUser));

        //Delete a User
        router.delete('/:id', param('id').isInt(), catchError(user.deleteUser));

        app.use('/api/users', router);
    }
}