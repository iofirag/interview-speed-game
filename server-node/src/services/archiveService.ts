import { injectable } from "inversify";

@injectable()
export default class ArchiveService {
    private _db;

    constructor() {
        this._db = {};
    }

    addData(key, val) {
        if (!this._db[key]) {
            this._db[key] = []
        }
        this._db[key].push(val);
    }

    getAllData() {
        return this._db
    }
};
