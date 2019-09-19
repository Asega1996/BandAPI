import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { Routes } from "./routes/router"
import { env } from "./config/config"


export class App {

    public app: express.Application;
    public router : Routes

    //Para encapsular mas tarde
    public mongoUrl: string = '';  
    

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
        mongoose.connect(env.MONGO_CONNNECTION_STRING, { useNewUrlParser: true });    
    }

    public run(PORT : number): void {
        this.app.listen( PORT , () => {
            console.log('Express server running in:' + ' ' + PORT);
        });
    }


}