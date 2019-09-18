import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { Routes } from "./routes/router"


export class App {

    public app: express.Application;
    public router : Routes

    //Para encapsular mas tarde
    public mongoUrl: string = 'mongodb://localhost:27017/banddatabase';  
    

    constructor() {
        this.router = new Routes();
        this.app = express();
        this.config();
        this.router.setRoutes(this.app);
        this.setUpDbConnection();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private setUpDbConnection(): void {
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });    
    }

    public run(PORT : number): void {
        this.app.listen( PORT , () => {
            console.log('Express server running in:' + ' ' + PORT);
        });
    }


}