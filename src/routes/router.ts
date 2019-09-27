import { Request, Response } from "express";
import MusicianRoutes from '../musician/Musician.routes';
import InstrumentRoutes from '../instruments/Instrument.routes';
import ConcertRoutes from "../concert/Concert.routes";

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

        MusicianRoutes.setRoutes(app);
        InstrumentRoutes.setRoutes(app);
        ConcertRoutes.setRoutes(app);

    }
}