import { Request, Response } from "express";
import MusicianController from '../musician/Musician.controller'

export class Routes {  

    
    constructor() { }

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
        .get(MusicianController.retrieveAll.bind(MusicianController.retrieveAll))
        //POST Student
        .post();
        app.route('/musician/:id')
        .get(MusicianController.retrieveById.bind(MusicianController.retrieveById))
        

    }
}