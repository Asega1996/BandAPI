import ConcertController from "./Concert.controller"
import { getIdValidate } from "../utils/validators/validators";
const { check } = require('express-validator');

export class ConcertRoutes{

    private postConcertValidate() : any[] {
        let validations = [
            check('name').exists().withMessage('name Required'),
            check('dateStart').exists().withMessage('type Required'),
            check('dateEnd').exists().withMessage('type Required'),
        ];

        return validations;
    }

    private putConcertValidate() : any[] {
        let validations = this.postConcertValidate();
        validations.push(getIdValidate())

        return validations;
    }

    public setRoutes(app){
        app.route('/concert')
        .get(ConcertController.retrieveAll.bind(ConcertController.retrieveAll))
        .post(this.postConcertValidate(),ConcertController.create.bind(ConcertController.create))
        .put(this.putConcertValidate(),ConcertController.update.bind(ConcertController.update))
        app.route('/concert/:id')
        .get(ConcertController.retrieveById.bind(ConcertController.retrieveById))
        .put(ConcertController.update.bind(ConcertController.update))
        .post(ConcertController.delete.bind(ConcertController.delete))
        .delete(ConcertController.remove.bind(ConcertController.remove))

    }
}

export default new ConcertRoutes()