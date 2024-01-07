import Mailjet from "node-mailjet";
import dotenv from "dotenv";
dotenv.config();
const publicKey = process.env.APIKEY;
const privateKey = process.env.APISECRET;
const mj = Mailjet.connect(publicKey, privateKey);

export default async function sendEmail(mail) {
  const toEmail = mail.captainMail;
  const toName = mail.captainName;
  const request = await mj.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "theneymarxx@gmail.com",
          Name: "MIT-WPU SUMMIT'24",
        },
        To: [
          {
            Email: toEmail,
            Name: toName,
          },
        ],
        Subject: "Thank You for Registering for MIT-WPU SUMMIT24",
        TextPart: "Thankyou",
        HTMLPart: `
                    <p>Dear Participant,</p>
                    <p>We hope this email finds you well. On behalf of the team, we want to express our sincere gratitude for registering for our upcoming event, MIT-WPU SUMMIT’24
                    </p>
                    <p>We look forward to seeing you at SUMMIT’24 and sharing an enriching and memorable experience together. Thank you once again for being a part of this exciting journey.
                    </p>
                    <p>Best regards,<br>MIT World Peace University<br>Pune
                    </p>
                  `,
      },
    ],
  });
  const success = request.body.Messages.every(
    (message) => message.Status === "success"
  );
  console.log(success);
  return success;
}
