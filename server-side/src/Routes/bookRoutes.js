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

//delete
router.post('/deleteBooks', (req, res) => {

    const { book_id } = req.body

    const query = 'DELETE FROM books WHERE book_id=?'

    db.query(query,[book_id],  (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully deleted book.')
            res.status(200).json({
                message: 'Successfully deleted book.'
            })
        }
    })
})

router.post('/addBook', (req, res) => {
    
    const { item_no, title, ISBN, author_name, access_no, genre, branch, quantity, amount, call_no, total_value, date_acquired, publication } = req.body
    const query = 'INSERT INTO books(item_no, title, ISBN, author_name, access_no, genre, branch, quantity, amount, call_no, total_value, date_acquired, publication) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)'

    db.query(query,[ item_no, title, ISBN, author_name, access_no, genre, branch, quantity, amount, call_no, total_value, date_acquired, publication], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully added book.')
            res.status(200).json({
                message: 'Successfully added book.',
            })
        }
    })
})

router.post('/updateBooks', (req, res) => {

    const { 
        book_id, 
        item_no,
        ISBN, 
        title, 
        author, 
        access_no, 
        genre, 
        branch, 
        quantity, 
        amount, 
        call_no, 
        total_value, 
        date_acquired,
        publication,
    } = req.body

    const query = `
  UPDATE books 
  SET 
    item_no=?, 
    title=?, 
    ISBN=?,
    author_name=?, 
    access_no=?, 
    genre=?, 
    branch=?, 
    quantity=?, 
    amount=?, 
    call_no=?, 
    total_value=?, 
    date_acquired=?,
    publication=?
  WHERE 
    book_id=?
`;

    console.log(req.body)

    db.query(query,[ item_no, title, ISBN, author, access_no, genre, branch, quantity, amount, call_no, total_value, date_acquired, publication, book_id], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully updated book.')
            res.status(200).json({
                message: 'Successfully updated book.',
            })
        }
    })
})

module.exports = router