import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../containerTypes';

@injectable()
export default class GameResultLogic {
    @inject(TYPES.GameResultData) private _archive: any;

    addResult(data) {
        try {
            const {level, name} = data;
            this._archive.addResult(level, name);
        } catch (error) {
            throw error;
        }
    }

    getAllResults() {
        try {
            const result = []
            const allData = this._archive.getAllResults();
            console.log(allData)
            for(const [key, nameList] of Object.entries(allData)) {
                result.unshift(...nameList as any)
            }
            return result
        } catch (error) {
            throw error;
        }
    }
}
