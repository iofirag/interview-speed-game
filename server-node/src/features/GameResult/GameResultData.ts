import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../containerTypes';

@injectable()
export default class GameResultData {
    @inject(TYPES.ArchiveService) private _archiveService: any;

    addResult(level: number, name: string) {
        try {
            this._archiveService.addData(level, name);
        } catch (error) {
            throw error;
        }
    }

    getAllResults() {
        try {
            return this._archiveService.getAllData();
        } catch (error) {
            throw error;
        }
    }
}
