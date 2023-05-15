import { Schema, Document, model } from 'mongoose'
import validator from 'validator'

interface serieDocumentInterface extends Document {
    name : string,
    sinopsis: string,
    year: number,
    lastSeason: number,
    seasons: number,
    duration: number,
    episodes: {season: string, episodes: number}[],
    cast: string[],
    directors: string[],
    genres: string[],
    users: {_id: Schema.Types.ObjectId} [],
}

const serieSchema = new Schema<serieDocumentInterface>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    sinopsis: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        validate: (value: number) => {
            if( !validator.default.isInt(value.toString()) ) {
                throw new Error('Year is invalid')
            }
        }
    },
    lastSeason: {
        type: Number,
        validate: (value: number) => {
            if( !validator.default.isInt(value.toString()) ) {
                throw new Error('Last season is invalid')
            }
        }
    },
    seasons: {
        type: Number,
        validate: (value: number) => {
            if( !validator.default.isInt(value.toString()) ) {
                throw new Error('Seasons is invalid')
            }
        }
    },
    duration: {
        type: Number,
        validate: (value: number) => {
            if( !validator.default.isInt(value.toString()) ) {
                throw new Error('Duration is invalid')
            }
        }
    },
    episodes: {
        type: [{season: String, episodes: Number}],
        validate: (value: {season: string, episodes: number}[]) => {
            value.forEach(element => {
                if (!validator.default.isInt(element.episodes.toString())) {
                    throw new Error('Episodes is invalid')
                }
            });
        }
    },
    cast: {
        type: [String],
    },
    directors: {
        type: [String],
    },
    genres: {
        type: [String],
        validate: (value: string[]) => {
            value.forEach(element => {
                if (!validator.default.isIn(element, ['accion', 'aventura', 'drama', 'suspense', 'deportivo', 'humor', 'biografia'])) {
                    throw new Error('Genres is invalid')
                }
            });
        }
    },
    users: {
        type: [{_id: Schema.Types.ObjectId}],
        ref: "users"
    },

  });

  export const serieModel = model<serieDocumentInterface>('series', serieSchema);