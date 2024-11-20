const express = require('express')
const router = express.Router()
const db = require('../db')

//API add borrow books
router.post('/addBorrowBooks', async (req, res) => {

    const { 
        book_id,
        title,
        author_name,
        acct_id,
        acct_name,
        date,time,
        status,
        book_quantity
    } =  req.body

    const insertQuery = 'INSERT INTO borrow_books(book_id,title,author_name,acct_id,acct_name,date,time,status) VALUES(?,?,?,?,?,?,?,?)'
    const updateQuery = 'UPDATE books SET quantity=? WHERE book_id=?'

    const insertDatas = [
        book_id,
        title,
        author_name,
        acct_id,
        acct_name,
        date,time,
        status,
    ]


    try {
        
        const updatedQuantity = parseInt(book_quantity, 10) - 1

        await db.query(insertQuery, insertDatas)
        await db.query(updateQuery,[updatedQuantity, book_id])

        res.status(200).json({
            message: 'Successfully Added borrow books.'
        })

    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }

})

//API add borrow books
router.post('/updateReq', (req, res) => {

    const { response, id, book_id } =  req.body
    console.log(req.body)
    const query = 'UPDATE borrow_books SET status = ? WHERE id=?'

    db.query(query,[response, id], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {

            if (response !== 'rejected') {

                const queryBook = response === 'approved' ? 
                    'UPDATE books SET total_copies = total_copies - 1 WHERE book_id=?' 
                    :
                    'UPDATE books SET total_copies = total_copies + 1 WHERE book_id=?'

                console.log(queryBook)

                db.query(queryBook,[book_id], (error, data, field) => {
                    if (error) {
                        console.error(error)
                        res.status(404).send(error)
                    } else {
                        console.log('Successfully update borrow status.')
                        res.status(200).json({
                            message: 'Successfully update borrow status.'
                        })
                    }
                })   
            }
                
        }
    })
})

//API add borrow books
router.post('/deleteReq', (req, res) => {

    const { id } =  req.body
    const query = 'DELETE FROM borrow_books WHERE id=?'

    db.query(query,[id], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully deleted request.')
            res.status(200).json({
                message: 'Successfully deleted request.'
            })
        }
    })
})

router.get('/getBorrow', (req, res) => {

    const query = 'SELECT * FROM borrow_books'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully get all borrow list.')
            res.status(200).json(data)
        }
    })
})

router.get('/getBorrowByAcctID/:acct_id', (req, res) => {

    const { acct_id } = req.params
    const query = 'SELECT * FROM borrow_books WHERE acct_id = ?'

    db.query(query,[acct_id], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully get all borrow list.')
            res.status(200).json(data)
        }
    })
})

module.exports = router