import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {
    // Konfigurasi transport untuk pengiriman email
    const transporter = nodemailer.createTransport({
      service: "gmail", // Bisa disesuaikan dengan layanan email lain
      auth: {
        user: process.env.ADMIN_EMAIL, // Email pengirim (set di .env)
        pass: process.env.ADMIN_PASSWORD, // Password atau App Password (set di .env)
      },
      tls: {
        rejectUnauthorized: false, // Ini untuk memastikan server menerima koneksi meski ada masalah sertifikat SSL
      },
    });

    // Opsi email
    const mailOptions = {
      from: process.env.ADMIN_EMAIL, // Alamat pengirim
      to, // Alamat penerima
      subject, // Subjek email
      text, // Isi email
    };

    // Kirim email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;
