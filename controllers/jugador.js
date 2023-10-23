import { JugadorModel } from '../models/jugador.js'
import { validarJugador, validarParcialJugador } from "../schemas/jugadores.js"
import {readJSON} from '../utilities/readJson.js'
const jugadoresJSON = readJSON('../jugadores.json')

export class JugadorController {
    static jugadores (req, res) {
        res.json(jugadoresJSON)
    }

    static async getSinEquipo (req, res) {
        const jugadoresSinEquipo = await JugadorModel.getSinEquipo()
        res.json(jugadoresSinEquipo)
    }

    static async getConEquipo (req, res) {
        const jugadoresConEquipo = await JugadorModel.getConEquipo()
        res.json(jugadoresConEquipo);
    }

    static async getNombreEquipo (req, res) {
        const {nombreEquipo} = req.params;
        
        const jugadoresEnEquipo = await JugadorModel.getNombreEquipo(nombreEquipo)
      
        if (jugadoresEnEquipo.length > 0) {
          return res.json({jugadoresEnEquipo});
        } 
        
        res.status(404).json({ error: 'Equipo no encontrado' });
    }

    static async postJugador (req, res) {
        const result = validarJugador(req.body)
      
        if(!result.success) {
          return res.status(400).json({message: JSON.parse(result.message.error)})
        }
      
        const newJugador = await JugadorModel.postJugador({input: result.data})
        res.status(201).json(newJugador)
    }

    static async patchJugador (req,res) {
        const result = validarParcialJugador(req.body)
        
        if(!result.success) {
          return res.status(400).json({message: "Error al validar los campos"})
        }
        
        const { id } = req.params;
        const actualizarJugador = await JugadorModel.patchJugador({id, input: result.data})
      
        if (actualizarJugador === false) {
          return res.status(404).json({message: "Jugador No encontrado"})
        }
      
        return res.status(200).json(actualizarJugador)
    }

    static async deleteJugador (req, res) {
        const {id} = req.params
      
        const jugadorFind = await JugadorModel.deleteJugador({id})
      
        if (jugadorFind === false) return res.status(400).json({message: "Jugador No encontrado"})
      
        res.status(200).json({message: `jugador eliminado`})
    }
}