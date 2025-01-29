const express = require('express')
const router = express.Router()
const db = require('../db')

//API get branch
router.get('/getBranch', (req, res) => {

    const query = 'SELECT * FROM branch'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

//API update branch
router.post('/updateBranch', (req, res) => {

    const { id, branch_name } = req.body
    const query = 'UPDATE branch SET branch_name=? WHERE id=?'

    db.query(query,[branch_name, id], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully update branch.')
            res.status(200).json({
                message: 'Successfully update branch.'
            })
        }
    })
})

//API delete branch
router.post('/deleteBranch', (req, res) => {
    
    const { id } = req.body
    const query = 'DELETE FROM branch WHERE id=?'

    db.query(query,[id], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully delete branch.')
            res.status(200).json({
                message: 'Successfully delete branch.'
            })
        }
    })
})

//API add branch
router.post('/addBranch', (req, res) => {
    
    const { branch_name } = req.body
    const query = 'INSERT INTO branch(branch_name) VALUES(?)'

    db.query(query,[branch_name], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully add branch.')
            res.status(200).json({
                message: 'Successfully add branch.'
            })
        }
    })
})

module.exports = router