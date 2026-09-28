const mailer = require("nodemailer")
require("dotenv").config()
const mailSend=async(to,subject,text)=>{

    console.log("email from env",process.env.GMAIL_USER)

    const transport = mailer.createTransport({
        //pre define
        service:"gmail",
        //pd
        auth:{
            //pd
            user:process.env.GMAIL_USER,
            //pd
            pass:process.env.GMAIL_PASS
        }
    })

    //user define..
    const mailOptions={
        from:process.env.GMAIL_USER,
        to:to,
        subject:subject,
        text:text
    }

    const mailResponse = await transport.sendMail(mailOptions)
    console.log(mailResponse)

}
module.exports = mailSend