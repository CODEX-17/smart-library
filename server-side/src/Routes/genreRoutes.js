const express = require('express')
const router = express.Router()
const db = require('../db')

//API get branch
router.get('/getGenre', (req, res) => {

    const query = 'SELECT * FROM genre'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

//API update genre
router.post('/updateGenre', (req, res) => {

    const { id, genre_name } = req.body
    const query = 'UPDATE genre SET genre_name=? WHERE id=?'

    db.query(query,[genre_name, id], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully update genre.')
            res.status(200).json({
                message: 'Successfully update genre.'
            })
        }
    })
})

//API delete genre
router.post('/deleteGenre', (req, res) => {

    const { id } = req.body
    const query = 'DELETE FROM genre WHERE id=?'

    db.query(query,[id], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully delete genre.')
            res.status(200).json({
                message: 'Successfully delete genre.'
            })
        }
    })
})

//API add genre
router.post('/addGenre', (req, res) => {
    
    const { genre_name } = req.body
    const query = 'INSERT INTO genre(genre_name) VALUES(?)'

    db.query(query,[genre_name], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully add genre.')
            res.status(200).json({
                message: 'Successfully add genre.'
            })
        }
    })
})


module.exports = router