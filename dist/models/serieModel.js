import { Schema, model } from 'mongoose';
import validator from 'validator';
const serieSchema = new Schema({
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
        validate: (value) => {
            if (!validator.default.isInt(value.toString())) {
                throw new Error('Year is invalid');
            }
        }
    },
    lastSeason: {
        type: Number,
        validate: (value) => {
            if (!validator.default.isInt(value.toString())) {
                throw new Error('Last season is invalid');
            }
        }
    },
    seasons: {
        type: Number,
        validate: (value) => {
            if (!validator.default.isInt(value.toString())) {
                throw new Error('Seasons is invalid');
            }
        }
    },
    duration: {
        type: Number,
        validate: (value) => {
            if (!validator.default.isInt(value.toString())) {
                throw new Error('Duration is invalid');
            }
        }
    },
    episodes: {
        type: [{ season: String, episodes: Number }],
        validate: (value) => {
            value.forEach(element => {
                if (!validator.default.isInt(element.episodes.toString())) {
                    throw new Error('Episodes is invalid');
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
        validate: (value) => {
            value.forEach(element => {
                if (!validator.default.isIn(element, ['accion', 'aventura', 'drama', 'suspense', 'deportivo', 'humor', 'biografia'])) {
                    throw new Error('Genres is invalid');
                }
            });
        }
    },
    users: {
        type: [{ _id: Schema.Types.ObjectId }],
        ref: "users"
    },
});
export const serieModel = model('series', serieSchema);
