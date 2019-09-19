import { App } from './app';
import { env } from "./config/config";

const APP = new App();

APP.run(env.PORT);