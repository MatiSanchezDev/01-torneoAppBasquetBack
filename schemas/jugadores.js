import {z} from 'zod'

const jugadorSchema = z.object({
    jugador: z.string(),
    nacimiento: z.string(),
    dni: z.number().int().positive(),
    email: z.string().email(),
    contacto: z.number().int().positive(),
    posicionP:z.string(),
    posicionS:z.string(),
    puntaje: z.number().int().positive().min(1).max(75),
    imagen:z.string().nullable(),
    equipoBoolean:z.boolean(),
    equipo:z.string().nullable(),
    equipoActual:z.string().nullable()
})

export function validarJugador (object) {
    return jugadorSchema.safeParse(object) 
} 

const v1 = 2
const v2 = 2