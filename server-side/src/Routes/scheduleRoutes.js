const express = require('express')
const router = express.Router()
const db = require('../db')
const schedule = require('node-schedule')
const nodemailer = require('nodemailer')
const dateUtil = require('../Utils/date')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'librarysmart69@gmail.com',
      pass: 'sokb hpyq oevl gmkl',
    }
})

//Check Schedule
router.get('/checkSchedule', async (req, res) => {
  try {
    const queryGettingAllDueDates = `
      SELECT 
        borrow_books.dueDate, borrow_books.dueTime,
        borrow_books.title, borrow_books.branch,
        accounts.firstname, accounts.lastname,
        accounts.email
      FROM borrow_books 
      INNER JOIN accounts ON borrow_books.acct_id = accounts.id 
      WHERE borrow_books.status = 'approved'
    `;

    const userData = await new Promise((resolve, reject) => {
      db.query(queryGettingAllDueDates, (error, data) => {
        if (error) reject(error);
        else resolve(data);
      });
    });

    if (userData.length > 0) {
      let due = 0;
      let reminders = 0;
      let overDue = 0;

      userData.forEach((user) => {
        const currentDate = new Date();
        const dueDate = new Date(user.dueDate);
        const remindDate = new Date(dueDate);
        remindDate.setDate(remindDate.getDate() - 1);

        console.log('remindDate',remindDate)

        const email = user.email;
        const firstname = user.firstname;
        const lastname = user.lastname;
        const formattedDueDate = dateUtil.formatDate(dueDate);

        // Reminder Email (Day Before Due Date)
        if (currentDate.toDateString() === remindDate.toDateString()) {
          schedule.scheduleJob(remindDate, () => {
            const mailOptions = {
              to: email,
              from: 'librarysmart69@gmail.com',
              subject: 'Friendly Reminder: Book Return Due Date Approaching',
              text: `
                Dear ${firstname} ${lastname},

                This is a friendly reminder that the book(s) you borrowed from our library are due on ${formattedDueDate}.
                Please return them on or before this date to avoid penalties.

                Best regards,
                Smart Library Team
              `
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error(`Error sending reminder to ${email}:`, error);
              } else {
                console.log(`Reminder email sent to ${email}`);
                reminders++;
              }
            });
          });
        }

        // Due Date Email
        if (currentDate.toDateString() === dueDate.toDateString()) {
          schedule.scheduleJob(dueDate, () => {
            const mailOptions = {
              to: email,
              from: 'librarysmart69@gmail.com',
              subject: 'Reminder: Book Return Due Today',
              text: `
                Dear ${firstname} ${lastname},

                Please return the book(s) you borrowed from our library today, ${formattedDueDate}, to avoid penalties.

                Best regards,
                Smart Library Team
              `
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error(`Error sending due date reminder to ${email}:`, error);
              } else {
                console.log(`Due date email sent to ${email}`);
                due++;
              }
            });
          });
        }

        // Overdue Email
        if (currentDate > dueDate) {
          schedule.scheduleJob(new Date(), () => {
            const mailOptions = {
              to: email,
              from: 'librarysmart69@gmail.com',
              subject: 'Overdue Notice: Book Return Required',
              text: `
                Dear ${firstname} ${lastname},

                The book(s) you borrowed are overdue. Please return them as soon as possible to minimize further penalties.

                Best regards,
                Smart Library Team
              `
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error(`Error sending overdue email to ${email}:`, error);
              } else {
                console.log(`Overdue email sent to ${email}`);
                overDue++;
              }
            });
          });
        }
      })

      res.status(200).json({
        message: `Emails scheduled: Due (${due}), Reminders (${reminders}), Overdue (${overDue})`,
      })
    } else {
      res.status(200).json({ message: 'No schedules found.' })
    }
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message })
  }
})



module.exports = router