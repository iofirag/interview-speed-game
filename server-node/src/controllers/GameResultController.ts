import { container } from "../containerConfig";
import { TYPES } from '../containerTypes';

const gameResultController: any = container.get(TYPES.GameResultService);

export const addResult = gameResultController.addResult.bind(gameResultController)
export const getAllResults = gameResultController.getAllResults.bind(gameResultController)