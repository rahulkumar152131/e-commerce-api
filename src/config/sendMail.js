import nodemailer from 'nodemailer'
export const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    post: 587,
    secure: false,
    auth: {
        user: "rk152531@gmail.com",
        pass: "psggwrydclqptsjd"
    }
})