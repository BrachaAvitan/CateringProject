using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using Entity.DTO;

namespace CateringEFCore.Classes
{
    public class SendMail
    {
        //פונקציה לשליחת מייל
        public static bool SendEmail(EmailMsg emailMsg)
        {
            //פרטי השולח
            string emailAdmin = "catering.my.service@gmail.com";
            string passwordEmailAdmin = "catering2022";
            var loginInfo = new NetworkCredential(emailAdmin, passwordEmailAdmin);

            var msg = new MailMessage();
            var smtpClient = new SmtpClient("smtp.gmail.com", 587);

            msg.From = new MailAddress(emailAdmin, "Catering Service");
            //פרטי יעד
            msg.To.Add(new MailAddress(emailMsg.Adress));
            //נושא ותוכן ההודעה
            msg.Subject = emailMsg.Subject;
            msg.Body = emailMsg.Body;
            msg.IsBodyHtml = true;

            smtpClient.EnableSsl = true;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = loginInfo;
            try
            {
                smtpClient.Send(msg);//שליחת המייל
                return true;
            }
            catch
            {
                return false;
            }
        }

    }
}
