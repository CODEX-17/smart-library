const express = require('express')
const router = express.Router()
const db = require('../db')

//API get branch
router.post('/addFeedback', (req, res) => {

    const { username, message, date, time } = req.body
    const query = 'INSERT INTO feedback(username, message, date, time) VALUES(?,?,?,?)'

    db.query(query,[username, message, date, time], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully submitted feedback.')
            res.status(200).json({ message: 'Successfully submitted feedback.' })
        }
    })
})

//API get branch
router.get('/getFeedBack', (req, res) => {

    const query = 'SELECT * FROM feedback'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully getting feedbacks.')
            res.status(200).json(data)
        }
    })
})

//API delete feedback
router.post('/deleteFeedback', (req, res) => {
    
    const { id } = req.body
    console.log(id)
    const query = 'DELETE FROM feedback WHERE id=?'

    db.query(query,[id], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully delete feedback.')
            res.status(200).json({
                message: 'Successfully delete feedback.'
            })
        }
    })
})


module.exports = router