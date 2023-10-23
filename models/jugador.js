import { randomUUID } from 'node:crypto'
import {readJSON} from '../utilities/readJson.js'

const jugadoresJSON = readJSON('../jugadores.json')

export class JugadorModel {
    
    static async getSinEquipo () {
        const jugadoresSinEquipo = jugadoresJSON.filter(jugador => !jugador.equipoBoolean);
        return jugadoresSinEquipo
    }

    static async getConEquipo () {
        const jugadoresConEquipo = jugadoresJSON.filter(jugador => jugador.equipoBoolean);
        return jugadoresConEquipo
    }

    static async getNombreEquipo (input) {
        const jugadoresEnEquipo = jugadoresJSON.filter(jugador => jugador.equipoBoolean && jugador.equipo === input);

        return jugadoresEnEquipo
    }

    static async postJugador ({input}) {
        const newJugador = {
            id: randomUUID(),
            ...input,
            imagen: input.imagen ?? "https://i.pinimg.com/236x/d9/df/5e/d9df5e944edbfec00b4c0ae854227b39.jpg"
          }
        
          jugadoresJSON.push(newJugador)

          return newJugador
    }

    static async patchJugador ({id, input}) {
        const jugadorFind = jugadoresJSON.findIndex(jugador => jugador.id === id)

        if (jugadorFind === -1) return false

        const actualizarJugador = {
            ...jugadoresJSON[jugadorFind],
            ...input
          }
        
        
        return jugadoresJSON[jugadorFind] = actualizarJugador
    }

    static async deleteJugador ({id}) {
        const jugadorFind = jugadoresJSON.findIndex(jugador => jugador.id === id)

        if (jugadorFind === -1) return false

        jugadoresJSON.splice(jugadorFind, 1)
    }
}