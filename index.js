import express, {json} from "express"
import { jugadoresRouter } from "./routes/jugadores.js"

import cors from "cors"

const app = express()

app.use(cors())
app.use(json())
app.disable('x-powered-by')


// Rutas Jugadores
app.use('/jugadores', jugadoresRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto -> http://localhost:${PORT}`)
})

