import { userModel } from '../models/userModel.js';
import { serieModel } from '../models/serieModel.js';
// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
        console.log('Usuarios obtenidos correctamente');
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error al obtener los usuarios');
    }
};
// Obtener un usuario por su ID o por nombre
export const getUserById = async (req, res) => {
    try {
        const query = req.query;
        if (query && query.id) {
            const user = await userModel.findOne({ id: query.id });
            if (!user) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
            else {
                /*const Groups = await groupModel.find().populate('participants.user', ['id','name'])
                const activeGroups = getGroupForUser(Groups, user.id)
                const stats = historyFunction(user.historicTracks);
                const favTracks = favoriteRoutes(user.historicTracks);
                const challenges = await challengeModel.find();
                const activChallenges = activeChallenges(challenges, user._id.toString());*/
                res.status(200).json({ user: user });
            }
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        const user = new userModel(req.body);
        await user.save();
        res.status(200).json({ message: 'Usuario creado correctamente', user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Actualizar un usuario existente
export const updateUser = async (req, res) => {
    try {
        const query = req.query;
        if (query && query.id) {
            const user = await userModel.findOneAndUpdate({ id: query.id }, req.body, { new: true });
            if (!user) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
            else {
                res.status(200).json({ message: 'Usuario actualizado correctamente' });
            }
        }
        else {
            res.status(404).json({ message: 'Usuario mal especificado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Eliminar un usuario existente
export const deleteUser = async (req, res) => {
    try {
        const query = req.query;
        if (query && query.id) {
            //Borrar el usuario de todas las series
            const usuario = await userModel.findOne({ id: query.id });
            const series = await serieModel.find();
            if (!usuario) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
            else {
                series.forEach(async (serie) => {
                    serie.users.forEach(async (user) => {
                        if (user._id.toString() == usuario._id.toString()) {
                            await serieModel.findOneAndUpdate({ name: serie.name }, { $pull: { users: { _id: usuario._id } } }, { new: true });
                            console.log('Usuario borrado de la serie ' + serie.name + usuario._id.toString());
                        }
                    });
                });
            }
            const user = await userModel.findOneAndDelete({ id: query.id });
            if (!user) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
            else {
                res.status(200).json({ message: 'Usuario borrado correctamente' });
            }
        }
        else {
            res.status(404).json({ message: 'Usuario mal especificado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
