const express = require('express')
const router = express.Router()
const db = require('../db')
const { getDueDate, formatDate } = require('../Utils/date')
const nodemailer = require('nodemailer')

const rateLimit = require("express-rate-limit"); 


const limiter = rateLimit({
    windowMs: 5000, // 5 seconds
    max: 1, // Limit each user to 1 request per window
    message: "Too many requests. Please try again later.",
})


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'librarysmart69@gmail.com',
      pass: 'sokb hpyq oevl gmkl',
    }
})
   

//API add borrow books
router.post('/addBorrowBooks', limiter, (req, res) => {

    const { 
        book_id,
        title,
        author_name,
        acct_id,
        acct_name,
        date,time,
        status,
        branch,
        email,
    } =  req.body

    const { dueDate, dueTime } = getDueDate()

    const insertQuery = `INSERT INTO borrow_books(
        book_id, title, author_name, email, acct_id, 
        acct_name, date, time, dueDate, 
        dueTime, status, branch
        ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`

    const insertDatas = [
        book_id,
        title,
        author_name,
        email,
        acct_id,
        acct_name,
        date, 
        time,
        dueDate,
        dueTime,
        status,
        branch,
    ]

    try {
        
        db.query(insertQuery, insertDatas, (error, data) => {
            if (error) {
                console.log('Error in adding borrow book:', error)
                res.status(400).send(error)
            }
        })

        const mailOptions = {
            to: email,
            from: 'librarysmart69@gmail.com',
            subject: 'Book Borrowing Request Received',
            text: `
              Dear ${acct_name},

              Thank you for submitting your book borrowing request. We have received your request and it is currently under review. Our admin team will review your submission and approve it shortly.

              You will receive a follow-up email once your request has been approved.

              In the meantime, please feel free to reach out if you have any questions or need further information.

              Thank you for your patience!


              Best regards,
              Smart Library Team
            `
          }

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(`Error sending Approved to ${email}:`, error)
            } else {

                console.log('Successfully in adding borrow book.')
                res.status(200).json({
                    message: 'Successfully Added borrow books.'
                })
                
              console.log(`Approved email sent to ${email}`)
            }
          })

        console.log('Successfully in adding borrow book.')
        res.status(200).json({
            message: 'Successfully Added borrow books.'
        })

    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }

})

//API add borrow books
router.post('/updateReq', async (req, res) => {

    const { response, id, book_id, name, branch, title, email, quantity } = req.body

    const queryUpdateBorrow = 'UPDATE borrow_books SET status = ? WHERE id=?'
    const transactionQuery = `INSERT INTO transaction_history(
    book_id, title, transaction, name, branch, date, time) VALUES(?,?,?,?,?, CURDATE(), CURTIME())`
    
    let queryUpdateBook;
    switch (response) {
        case 'approved':
            queryUpdateBook = `UPDATE books SET quantity = quantity - 1 WHERE book_id=?`;
            break;
        case 'returned':
            queryUpdateBook = `UPDATE books SET quantity = quantity + 1 WHERE book_id=?`;
            break;
        default:
            queryUpdateBook = `UPDATE books SET quantity = ${quantity} WHERE book_id=?`;
            break;
    }


    //Functions
    const sendingEmail = async (email, name) => {
        const mailOptions = {
            to: email,
            from: 'librarysmart69@gmail.com',
            subject: 'Book Borrowing Request Approval and Important Reminders',
            text: `
              Dear ${name},

              We are happy to inform you that your book borrowing request has been approved by the admin. You may now proceed with the borrowing process.

              Please remember the following important rules:

              Borrowing Period: You are required to return the books within 5 days from the borrowing date.
              Late Payment Penalty: A penalty of 10 pesos will be charged for each day the books are overdue.
              Return of Books: Please ensure that the books are returned in the same condition as when borrowed.
              If you have any questions or need assistance, feel free to contact us.

              Thank you for following these guidelines, and we hope you enjoy the books!

              Best regards,
              Smart Library Team
            `
        }

        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(`Error sending Approved to ${email}:`, error)
        } else {

            console.log('Successfully in adding borrow book.')
            res.status(200).json({
                message: 'Successfully Added borrow books.'
            })
            
            console.log(`Approved email sent to ${email}`)
        }
        })
    }
    
    const executeQuery = (query, value) => {
        return new Promise((resolve, reject) => {
            db.query(query, value, (error, data, field) => {
                if (error) {
                    console.log('Error in updating the table:', error)
                    reject(error)
                }
                
                const message = 
                    query === queryUpdateBorrow && 'Successfully update borrow_book.' ||
                    query === transactionQuery && 'Successfully add transaction history.' ||
                    query === queryUpdateBook && 'Successfully update book info.'

                resolve(message)                
                
            })
        })
    }

    try {

        const updateBorrowBooks = executeQuery(queryUpdateBorrow, [response, id])

        const addTransactionHistory = executeQuery(transactionQuery, [book_id, title, response, name, branch, title])
        
 
        const updateBook = executeQuery(queryUpdateBook, [book_id])
        

        await Promise.all([
            updateBorrowBooks, 
            addTransactionHistory, 
            updateBook,
            sendingEmail(email, name)])

        res.status(200).json({
            message: `Successfully ${response} book.`
        })

    } catch (error) {
        console.log('Error in updating the request:', error)
        res.status(500).send(error)
    }

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