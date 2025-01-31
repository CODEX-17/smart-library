const express = require('express')
const router = express.Router()
const db = require('../db')

//API get branch
router.get('/getTransactionHistory', (req, res) => {

    const query = 'SELECT * FROM transaction_history'

    db.query(query, (error, data, field) => {
        if (error) {
            console.log('Failed get all transactions:', error)
            res.status(404).send(error)
        } else {
            console.log('Successfully get all transactions.')
            res.status(200).json(data)
        }
    })
})

module.exports = router