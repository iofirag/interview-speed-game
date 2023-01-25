import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../containerTypes";

@injectable()
export default class GameResultService {
    @inject(TYPES.GameResultLogic) private _handler: any;

    addResult(req, res) {
        const logObj = {
            isError: false,
            msg: 'success',
        };
        try {
            const resultData = req.body;
            this._handler.addResult(resultData);
        } catch (error) {
            logObj.isError = true;
            logObj.msg = error.message;
        } finally {
            res.statusCode = logObj.isError ? 500 : 200;
            res.setHeader('Content-Type', 'application/json');
            res.end();
        }
    }

    getAllResults(req, res) {
        let result;
        const logObj = {
            isError: false,
            msg: 'success',
        };
        try {
            result = this._handler.getAllResults();
        } catch (error) {
            logObj.isError = true;
            logObj.msg = error.message;
        } finally {
            res.statusCode = logObj.isError ? 500 : 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(result ? JSON.stringify(result) : '');
        }
    }
};