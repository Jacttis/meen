const express = require('express')
const { insertItem,  getPelis, getPelisHard } = require('./db')

const router = express.Router()

router.get('/public',(req,res) => {
  res.sendFile(__dirname + "/public");
})

// Obtener las peliculas solicitadas
router.get('/peliculas', (req, res) => {
  getPelis(req.query.input)
    .then((items) => {
      items = items.map((item) => ({
        title: item.title,
        year:item.year,
        imdb:item.imdb.rating || '-',
        tomatoes:item.tomatoes?.critic?.rating || '-',
        metacritic:item.metacritic || '-'
      }))
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

router.get('/pelicula-especifica', (req, res) => {
  getPelisHard()
    .then((items) => {
      items = items.map((item) => ({
        title: item.title,
        year:item.year,
        imdb:item.imdb.rating || '-',
        tomatoes:item.tomatoes?.critic?.rating || '-',
        metacritic:item.metacritic || '-'
      }))
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

// Postear una pelicula
router.post('/peliculas', (req, res) => {
  const item = req.body
  console.log(req.body)
  const result = itemSchema.validate(item)
  if (result.error) {
    console.log(result.error)
    res.status(400).end()
    return
  }
  insertItem(item)
    .then(() => {
      res.status(200).end()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})


module.exports = router
