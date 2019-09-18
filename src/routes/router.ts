import { Request, Response } from "express";
import MusicianController from '../musician/Musician.controller'

export class Routes {  

    private ms : MusicianController;

    constructor() {
        this.ms = new MusicianController(); 
    }

    public setRoutes(app): void {          
        app.route('/')
        //GET Main-Route
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'NODE_REST API'
            })
        });
        app.route('/musician')
        //GET Student
        .get(this.ms.retrieveAll.bind(this.ms.retrieveAll))
        //POST Student
        .post();
        

    }
}