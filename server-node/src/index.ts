import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as oasTools from '@oas-tools/core';
import { container } from './containerConfig';
import { TYPES } from './containerTypes';

const app: express.Application = express();

(async () => {
    const apiConfig = container.get<any>(TYPES.ApiConfig);
    const apiSpec = yaml.load(fs.readFileSync(apiConfig.oasFile, 'utf8'));

    try {
        app.use(cors());
        app.use(cookieParser());
        app.use(morgan('combined'));
        app.use(express.json({ limit: '50mb' }));
        app.use(express.urlencoded({ extended: true }));

        // Serve file
        app.get('/api-doc', (req: any, res: any) => res.json(apiSpec));

        // serve api + ui
        await oasTools.initialize(app, apiConfig);
        
        // Start the server
        app.listen(3001, () => {
            console.log('server listening on http://localhost:3001');
        });
    } catch (error) {
        console.error(error);
    }
})();
