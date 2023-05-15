import { Request, Response } from 'express';
export declare const getSeries: (req: Request, res: Response) => Promise<void>;
export declare const getSerieById: (req: Request, res: Response) => Promise<void>;
export declare const createSerie: (req: Request, res: Response) => Promise<void>;
export declare const updateSerie: (req: Request, res: Response) => Promise<void>;
export declare const deleteSerie: (req: Request, res: Response) => Promise<void>;
export declare const addUserToWatcher: (req: Request, res: Response) => Promise<void>;
