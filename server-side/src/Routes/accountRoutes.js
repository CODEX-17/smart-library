const express = require('express')
const router = express.Router()
const db = require('../db')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const passwordHash = require('password-hash')


const storageImage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storageImage });

//CreateAccounts
router.post('/createAccount', upload.single('file'), async (req, res) => {

    const { email , password, imageID, acctype } = req.body
    const query = 'INSERT INTO accounts(email, password, acctype, imageID) VALUES(?,?,?,?)'

    try {
        const hashedPassword = passwordHash.generate(password);

        db.query(query,[email, hashedPassword, acctype, imageID], (error, data, field) => {
            if (error) {
                console.log(error)
                return res.status(400).send(error)
            }

            //If theirs an image file
            if (req.file) {

                const queryImage = 'INSERT INTO image(filename, path, imageID) VALUES(?,?,?)'
                const { filename, path } = req.file

             
                    db.query(queryImage, [filename, path, imageID], (error, data, field) => {
                        if (error) {
                            console.log(error)
                            return res.status(400).send(error)
                        }

                        return res.status(200).json({
                            message: 'Successfull created account.'
                        })
                    })
        
            }else {
                res.status(200).json({
                    message: 'Successfull created account.'
                })
            }

            

        })

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

})


//Check Hash
router.post('/checkHash', async (req, res) => {

    const {email, password} = req.body
    const query = 'SELECT * FROM accounts WHERE email=?'

    try {
        const [user] = await new Promise((resolve, reject) => {
            db.query(query, [email], (error, data, field) => {
                if (error) return reject(error)
                resolve(data)
            })
        })
        
        if (user) {
           const hashPassword = user.password 

            if (hashPassword) {
                if (passwordHash.verify(password, hashPassword)) {
                    console.log(true)
                } else {
                    console.log(false)
                }
            }
            
        }

    } catch (error) {
        console.log(error)
    }

})

module.exports = router