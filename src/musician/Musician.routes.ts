import MusicianController from "./Musician.controller"
import * as express from "express";
import { getIdValidate } from "../utils/validators/validators";
const { check } = require('express-validator');
const { body } = require('express-validator');


export class MusicianRoutes {

    private postMusicianValidate() : any[] {
        let validations = [
            check('firstName').exists().withMessage('firstName Required'),
            check('lastName').exists().withMessage('lastName Required'),
            check('phone').exists().withMessage('phone Required'),
            check('instrument').exists().withMessage('instrument Required'),
        ];

        return validations;
    }

    private putMusicianValidate() : any[] {
        let validations = this.postMusicianValidate();
        validations.push(getIdValidate())

        return validations;
    }


    public setRoutes(app : express.Application){
        app.route('/musician')
        .get( MusicianController.retrieveAll.bind(MusicianController.retrieveAll))
        .post(this.postMusicianValidate(),MusicianController.create.bind(MusicianController.create))
        .put(this.putMusicianValidate(), MusicianController.update.bind(MusicianController.update))
        
        app.route('/musician/:id')
        .get(getIdValidate(),MusicianController.retrieveById.bind(MusicianController.retrieveById))
        .delete(getIdValidate(),MusicianController.remove.bind(MusicianController.remove))

    }

}

export default new MusicianRoutes();