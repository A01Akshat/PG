import dotenv from 'dotenv';
dotenv.config();

export default {
  DB: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  REQUEST_TIMEOUT: parseInt(process.env.REQUEST_TIMEOUT || '5000', 10), // Default to 5000 if not provided
  PORT: parseInt(process.env.PORT || '3000', 10),
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10), // Default to 587 if not provided
};
