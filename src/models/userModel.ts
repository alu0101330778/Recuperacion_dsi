import { Schema, Document, model } from 'mongoose'
import validator from 'validator'
interface userDocumentInterface extends Document {
    id: string;
    name: string;
    email: string;
    favGenre: string;
}

const userSchema = new Schema<userDocumentInterface>({
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
        validate: (value: string) => {
            if( !validator.default.isEmail(value) ) {
                throw new Error('Email is invalid')
            }
        }
    },
    favGenre: {
        type: String,
        required: true,
        validate: (value: string) => {
            if( !validator.default.isIn(value, ['accion', 'aventura', 'drama', 'suspense', 'deportivo', 'humor', 'biografia']) ) {
                throw new Error('FavGenre is invalid')
            }
        }
    },
  });

  export const userModel = model<userDocumentInterface>('users', userSchema);