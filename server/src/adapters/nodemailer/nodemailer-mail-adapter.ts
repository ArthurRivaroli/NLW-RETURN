import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "ba4dc720e723f4",
        pass: "e7c49340e0b135"
    }
});



export class NodemailerMailAdapater implements MailAdapter{

    async sendMail({subject, body}: SendMailData) {
         await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Arthur Cezar Rivaroli <arthur.rivaroli21@gmail.com>',
        subject,
        html:body,
    });
    }; 
}