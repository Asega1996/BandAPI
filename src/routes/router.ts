import { Request, Response } from "express";
import MusicianController from '../musician/Musician.controller';
import InstrumentController from '../instruments/Instrument.controller';
import ConcertController from '../concert/Concert.controller'

var cors = require('cors')

export class Routes {  

    
    constructor() { }

    public setRoutes(app): void {   
        app.use(cors());       
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
        .post(MusicianController.create.bind(MusicianController.create))
        .put(MusicianController.update.bind(MusicianController.update))


        
        app.route('/musician/:id')
        //GET Musician by ObjectId
        .get(MusicianController.retrieveById.bind(MusicianController.retrieveById))
        .put(MusicianController.update.bind(MusicianController.update))
        .post(MusicianController.delete.bind(MusicianController.delete))
        .delete(MusicianController.remove.bind(MusicianController.remove))


        //INSTRUMENTS
        app.route('/instrument')
        //GET Instrument
        .get(InstrumentController.retrieveAll.bind(InstrumentController.retrieveAll))
        .post(InstrumentController.create.bind(InstrumentController.create))
        .put(InstrumentController.update.bind(InstrumentController.update))
        app.route('/instrument/:id')
        .get(InstrumentController.retrieveById.bind(InstrumentController.retrieveById))
        .put(InstrumentController.update.bind(InstrumentController.update))
        .post(InstrumentController.delete.bind(InstrumentController.delete))
        .delete(InstrumentController.remove.bind(InstrumentController.remove))


        //CONCERTS
        app.route('/concert')
        //GET Instrument
        .get(ConcertController.retrieveAll.bind(ConcertController.retrieveAll))
        .post(ConcertController.create.bind(ConcertController.create))
        .put(ConcertController.update.bind(ConcertController.update))
        app.route('/concert/:id')
        .get(ConcertController.retrieveById.bind(ConcertController.retrieveById))
        .put(ConcertController.update.bind(ConcertController.update))
        .post(ConcertController.delete.bind(ConcertController.delete))
        .delete(ConcertController.remove.bind(ConcertController.remove))


        app.route('/oauth')
        .get((req: Request, res: Response) => {            
            res.send();
        })
        .post((req: Request, res: Response) => {            
            res.send();
        });
    }
}