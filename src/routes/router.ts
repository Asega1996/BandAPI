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
        //GET Musicians
        .get(MusicianController.retrieveAll.bind(MusicianController.retrieveAll))
        //POST Create a new musician
        .post(MusicianController.create.bind(MusicianController.retrieveById));

        
        app.route('/musician/:id')
        //GET Musician by ObjectId
        .get(MusicianController.retrieveById.bind(MusicianController.retrieveById))
        .post(MusicianController.delete.bind(MusicianController.delete))
        .put(MusicianController.update.bind(MusicianController.update))

        

    }
}