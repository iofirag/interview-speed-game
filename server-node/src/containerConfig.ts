import * as config from 'config'
import { Container } from "inversify";
import path from 'path';
import { TYPES } from "./containerTypes";
import GameResultData from "./features/GameResult/GameResultData";
import GameResultLogic from "./features/GameResult/GameResultLogic";
import GameResultService from "./features/GameResult/GameResultService";
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