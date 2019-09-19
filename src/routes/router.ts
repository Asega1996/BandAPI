import { Request, Response } from "express";
import MusicianController from '../musician/Musician.controller';
import InstrumentController from '../instruments/Instrument.controller';

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

        //MUSICIAN
        app.route('/musician')
        //GET Musicians
        .get(MusicianController.retrieveAll.bind(MusicianController.retrieveAll))
        //POST Create a new musician
        .post(MusicianController.create.bind(MusicianController.retrieveById));

        
        app.route('/musician/:id')
        //GET Musician by ObjectId
        .get(MusicianController.retrieveById.bind(MusicianController.retrieveById))


        //INSTRUMENTS
        app.route('/instrument')
        //GET Instrument
        .get(InstrumentController.retrieveAll.bind(InstrumentController.retrieveAll))
        .post(InstrumentController.create.bind(InstrumentController.create))
        app.route('/instrument/:id')
        .get(InstrumentController.retrieveById.bind(InstrumentController.retrieveById))
        .put(InstrumentController.update.bind(InstrumentController.update))
        .post(InstrumentController.delete.bind(InstrumentController.delete))

    }
}