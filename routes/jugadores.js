import { Router } from 'express'
import { JugadorController } from '../controllers/jugador.js'

export const jugadoresRouter = Router()

jugadoresRouter.get('/', JugadorController.jugadores) 

jugadoresRouter.get('/sin-equipo', JugadorController.getSinEquipo)

jugadoresRouter.get('/con-equipo', JugadorController.getConEquipo)

jugadoresRouter.get('/equipo/:nombreEquipo', JugadorController.getNombreEquipo)

jugadoresRouter.post('/', JugadorController.postJugador)

jugadoresRouter.patch('/:id', JugadorController.patchJugador)

jugadoresRouter.delete('/:id', JugadorController.deleteJugador)