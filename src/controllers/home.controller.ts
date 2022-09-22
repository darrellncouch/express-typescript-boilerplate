import {Controller, Get} from "couch-routes/decorators"
import { Request, Response } from "express";

@Controller()
export class HomeController {

    constructor() {

    }

    @Get()
    public home(req: Request, res: Response): void {
        res.sendFile(`${__dirname}../public/index.html`);
    }


}