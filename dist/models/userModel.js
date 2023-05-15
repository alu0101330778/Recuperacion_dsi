import { Schema, model } from 'mongoose';
import validator from 'validator';
const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: (value) => {
            if (!validator.default.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    favGenre: {
        type: String,
        required: true,
        validate: (value) => {
            if (!validator.default.isIn(value, ['accion', 'aventura', 'drama', 'suspense', 'deportivo', 'humor', 'biografia'])) {
                throw new Error('FavGenre is invalid');
            }
        }
    },
});
export const userModel = model('users', userSchema);
