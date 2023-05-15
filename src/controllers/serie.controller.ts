import { Request, Response } from 'express';
import { userModel } from '../models/userModel.js';
import { serieModel } from '../models/serieModel.js';
// Obtener todos los series
export const getSeries = async (req: Request, res: Response) => {
  try {
      const series = await serieModel.find();
      res.status(200).json(series);
      console.log('Series obtenidos correctamente');
    } catch (error : any) {
    res.status(500).json({ message: error.message });
    console.log('Error al obtener los series');
  }
};

// Obtener un serie por su ID o por nombre
export const getSerieById = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.name) {
      const serie = await serieModel.findOne({ name: query.name });
      if (!serie) {
        res.status(404).json({ message: 'Serie no encontrado' });
      } else {
        /*const Groups = await groupModel.find().populate('participants.serie', ['id','name'])
        const activeGroups = getGroupForSerie(Groups, serie.id)
        const stats = historyFunction(serie.historicTracks);
        const favTracks = favoriteRoutes(serie.historicTracks);
        const challenges = await challengeModel.find();
        const activChallenges = activeChallenges(challenges, serie._id.toString());*/
        res.status(200).json({serie: serie});
      }
    } else {
        res.status(404).json({ message: 'Serie no encontrado' });
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo serie
export const createSerie = async (req: Request, res: Response) => {
  try {
    const serie = new serieModel(req.body);
    await serie.save();
    res.status(200).json({ message: 'Serie creado correctamente', serie });
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un serie existente
export const updateSerie = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.name) {
      const serie = await serieModel.findOneAndUpdate({ name: query.name }, req.body, { new: true });
      if (!serie) {
        res.status(404).json({ message: 'Serie no encontrado' });
      } else {
        res.status(200).json({ message: 'Serie actualizado correctamente' });
      }
    } else {
        res.status(404).json({ message: 'Serie mal especificado' });
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un serie existente
export const deleteSerie = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.name) {
      const serie = await serieModel.findOneAndDelete({ name: query.name });
      if (!serie) {
        res.status(404).json({ message: 'Serie no encontrado' });
      } else {
        res.status(200).json({ message: 'Serie borrado correctamente' });
      }
    } else {
        res.status(404).json({ message: 'Serie mal especificado' });
    }
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

export const addUserToWatcher = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    if (query && query.name) {
      //Comprobar que el usuario existe
      const user = await userModel.findById(req.body.user);
      
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
      const serie = await serieModel.findOneAndUpdate({ name: query.name }, { $push: {users: {_id: req.body.user}} }, { new: true });
      console.log(serie);
      if (!serie) {
        res.status(404).json({ message: 'Serie no encontrado' });
      } else {
        res.status(200).json({ message: 'Usuario añadido a la serie correctamente' });
      }
    }
     } else {
        res.status(404).json({ message: 'Serie mal especificado' });
    }
  

  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};


