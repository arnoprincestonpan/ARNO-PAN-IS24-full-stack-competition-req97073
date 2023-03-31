import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import productsRoute from "./routes/productsRoute"

// initialize express
const app = express()
// set default PORT
const PORT = 5000

// initialize bodyParser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// initialize cors
app.use(cors())

// use routes
app.use('/', productsRoute)

// main route, to make sure it runs
app.get('/', (req, res) => {
    console.log(`Serving Node and Express.`)
    res.send(`You are now connected. Serving Node Express.`)
})

// catch every other route that doesn't exist
app.get('*', (req, res) => res.send("This route doesn't exist."))

// listening to PORT
app.listen(PORT, () => {
    console.log(`Serving on PORT: ${PORT}`)
})