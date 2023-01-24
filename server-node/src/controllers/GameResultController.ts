import { container } from "../containerConfig";
import { TYPES } from '../containerTypes';

const gameResultService: any = container.get(TYPES.GameResultService);

export const addResult = gameResultService.addResult.bind(gameResultService)
export const getAllResults = gameResultService.getAllResults.bind(gameResultService)