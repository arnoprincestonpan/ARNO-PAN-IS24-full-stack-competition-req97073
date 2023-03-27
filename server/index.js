import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import productsRoute from "./routes/productsRoute"

const app = express()
const PORT = 5000

// initialize bodyParser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// initialize cors
app.use(cors())

// use routes
app.use('/', productsRoute)

app.get('/', (req, res) => {
    console.log(`Serving Node and Express.`)
    res.send(`You are now connected. Serving Node Express.`)
})

app.get('*', (req, res) => res.send("This route doesn't exist."))

app.listen(PORT, () => {
    console.log(`Serving on PORT: ${PORT}`)
})