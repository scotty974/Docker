import express from 'express'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = 3000



app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})