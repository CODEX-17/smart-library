const express = require('express')
const router = express.Router()
const db = require('../db')

//API get branch
router.get('/getBooks', (req, res) => {

    const query = 'SELECT * FROM books'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

router.post('/addBook', (req, res) => {
    
    const { title,author_name,publication,genre,branch,total_copies } = req.body
    const query = 'INSERT INTO books(title,author_name,publication,genre,branch,total_copies) VALUES(?,?,?,?,?,?)'

    
    db.query(query,[title,author_name,publication,genre,branch,total_copies], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully add book.')
            res.status(200).json('Successfully add book.')
        }
    })
})

module.exports = router