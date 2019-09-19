import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import InstrumentService from './Instrument.service'
import { Instrument } from './Instrument.interface'


class InstrumentController {

    constructor() { }

    public retrieveAll(req: Request, res: Response): void  {
        InstrumentService.retrieveAll(req.query).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
    }

    public retrieveById(req: Request, res: Response): void  {
        let id: string;
        if(req.params.id){
            id = req.params.id;
        }
        InstrumentService.retrieveById(req.params.id).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
    }

    public create(req: Request, res: Response): void {
        let Instrument = req.body as Instrument;
        InstrumentService.create(Instrument).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
    }

    public delete(req: Request, res: Response): void {
        const id: string = req.params.id;
        InstrumentService.delete(id).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
    }

    public update(req: Request, res: Response): void {
        const id = req.params.id;
        const Instrument = req.body as Instrument
        InstrumentService.update(id,Instrument).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
    }

}

export default new InstrumentController();