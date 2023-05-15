/// <reference types="mongoose/types/aggregate.js" />
/// <reference types="mongoose/types/callback.js" />
/// <reference types="mongoose/types/collection.js" />
/// <reference types="mongoose/types/connection.js" />
/// <reference types="mongoose/types/cursor.js" />
/// <reference types="mongoose/types/document.js" />
/// <reference types="mongoose/types/error.js" />
/// <reference types="mongoose/types/expressions.js" />
/// <reference types="mongoose/types/helpers.js" />
/// <reference types="mongoose/types/middlewares.js" />
/// <reference types="mongoose/types/indexes.js" />
/// <reference types="mongoose/types/models.js" />
/// <reference types="mongoose/types/mongooseoptions.js" />
/// <reference types="mongoose/types/pipelinestage.js" />
/// <reference types="mongoose/types/populate.js" />
/// <reference types="mongoose/types/query.js" />
/// <reference types="mongoose/types/schemaoptions.js" />
/// <reference types="mongoose/types/schematypes.js" />
/// <reference types="mongoose/types/session.js" />
/// <reference types="mongoose/types/types.js" />
/// <reference types="mongoose/types/utility.js" />
/// <reference types="mongoose/types/validation.js" />
/// <reference types="mongoose/types/virtuals.js" />
/// <reference types="mongoose/types/inferschematype.js" />
import { Schema, Document } from 'mongoose';
interface serieDocumentInterface extends Document {
    name: string;
    sinopsis: string;
    year: number;
    lastSeason: number;
    seasons: number;
    duration: number;
    episodes: {
        season: string;
        episodes: number;
    }[];
    cast: string[];
    directors: string[];
    genres: string[];
    users: {
        _id: Schema.Types.ObjectId;
    }[];
}
export declare const serieModel: import("mongoose").Model<serieDocumentInterface, {}, {}, {}, Document<unknown, {}, serieDocumentInterface> & Omit<serieDocumentInterface & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>;
export {};
