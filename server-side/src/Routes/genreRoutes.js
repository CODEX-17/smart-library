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


module.exports = router