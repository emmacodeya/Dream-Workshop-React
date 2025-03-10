// import express from "express";
// import nodemailer from "nodemailer";
// import cors from "cors";
// import bodyParser from "body-parser";

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// let verificationCodes = {}; // 暫存驗證碼

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "your-email@gmail.com",
//     pass: "your-email-password",
//   },
// });

// 發送驗證碼
// app.post("/send-code", async (req, res) => {
//   const { email } = req.body;
//   const code = Math.floor(100000 + Math.random() * 900000);
//   verificationCodes[email] = code;

//   const mailOptions = {
//     from: "your-email@gmail.com",
//     to: email,
//     subject: "Your Verification Code",
//     text: `Your verification code is: ${code}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.send({ message: "Verification code sent successfully" });
//   } catch (error) {
//     res.status(500).send(error.toString());
//   }
// });

// 驗證驗證碼
// app.post("/verify-code", (req, res) => {
//   const { email, code } = req.body;
//   if (verificationCodes[email] && verificationCodes[email] == code) {
//     delete verificationCodes[email];
//     res.send({ message: "Verification successful" });
//   } else {
//     res.status(400).send({ message: "Invalid code" });
//   }
// });

// app.listen(4000, () => {
//   console.log("Email server is running on port 4000");
// });
