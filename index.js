import express, {json} from "express"
import { randomUUID } from 'node:crypto'
import {readJSON} from "./utilities/readJson.js"


const jugadoresJSON = readJSON('../json/jugadores.json')

const app = express()

app.disable('x-powered-by')
app.use(json())

// Ruta main
app.get('/', (req, res) => {
    res.json({
        jugadoresAll:'http://localhost:1234/jugadores',
        jugadoresConEquipo:'http://localhost:1234/con-equipo',
        jugadoresSinEquipo:'http://localhost:1234/sin-equipo'
    })
})

// Ruta para TODOS los jugadores
app.get('/jugadores', (req, res) => {
    res.json(jugadoresJSON)
})

app.post('/jugadores', (req, res)=> {
  const {
    jugador,
    nacimiento,
    dni,
    email,
    contacto,
    posicionP,
    posicionS,
    puntaje,
    imagen,
    equipo,
    equipoActual,
    equipoNombre
  } = req.body

  const newJugador = {
    id: randomUUID(),
    jugador,
    nacimiento,
    dni,
    email,
    contacto,
    posicionP,
    posicionS,
    puntaje,
    imagen: imagen ?? null,
    equipo: equipo ?? null,
    equipoNombre: equipoNombre ?? null,
    equipoActual
  }
  jugadoresJSON.push(newJugador)
  res.status(201).json(newJugador)
})

// Ruta para jugadores SIN equipo
app.get('/jugadores/sin-equipo', (req, res) => {
    const jugadoresSinEquipo = jugadoresJSON.filter(jugador => !jugador.equipoActual);
    res.json(jugadoresSinEquipo);
  });
  
// Ruta para jugadores CON equipo
app.get('/jugadores/con-equipo', (req, res) => {
    const jugadoresConEquipo = jugadoresJSON.filter(jugador => jugador.equipoActual);
    res.json(jugadoresConEquipo);
 });

// Ruta para los jugadores dentro de un equipo
app.get('/jugadores/equipo/:nombreEquipo', (req, res) => {
    const {nombreEquipo} = req.params;
    const jugadoresEnEquipo = jugadoresJSON.filter(jugador => jugador.equipoActual && jugador.equipo === nombreEquipo);
  
    if (jugadoresEnEquipo.length > 0) {
      res.json(jugadoresEnEquipo);
    } else {
      res.status(404).json({ error: 'Equipo no encontrado' });
    }
  });

const PORT = process.env.PORT ?? 1234

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto -> http://localhost:${PORT}`)
})

