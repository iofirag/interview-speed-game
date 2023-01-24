import * as config from 'config'
import { Container } from "inversify";
import path from 'path';
import { TYPES } from "./containerTypes";
import GameResultData from "./features/example1/GameResultData";
import GameResultLogic from "./features/example1/GameResultLogic";
import GameResultService from "./features/example1/GameResultService";
import ArchiveService from './services/archiveService';

console.log(config.type)
export const container: Container = new Container();
container.bind<ArchiveService>(TYPES.ArchiveService).to(ArchiveService).inSingletonScope();
container.bind<GameResultService>(TYPES.GameResultService).to(GameResultService).inSingletonScope();
container.bind<GameResultLogic>(TYPES.GameResultLogic).to(GameResultLogic).inSingletonScope();
container.bind<GameResultData>(TYPES.GameResultData).to(GameResultData).inSingletonScope();
// Values
config.api.middleware.router.controllers = path.join(__dirname, config.api.middleware.router.controllers) // fix controller path
container.bind<any>(TYPES.ApiConfig).toConstantValue(config.api);