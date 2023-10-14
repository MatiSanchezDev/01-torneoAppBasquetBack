import {z} from 'zod'


const jugadorSchema = z.object({
    jugador: z.string(),
    nacimiento: z.date().min(new Date("1900-01-01"), {message: "Too Old"}).max(new Date("2010-01-01"), {message: "Too Young"}),
    dni: z.number().int().positive(),
    email: z.string().email(),
    contacto: z.number().int().positive(),
    posicionP:z.string(),
    posicionS:z.string(),
    puntaje: z.number().int().positive().min(1).max(75),
    imagen:z.string(),
    equipo:z.string(),
    equipoBoolean:z.boolean(),
    equipoNombre:z.string()
})

export function validarJugador (objet) {
    return jugadorSchema.safeParse(objet) 
} 