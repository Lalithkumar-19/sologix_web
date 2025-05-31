
require("dotenv").config();



module.exports = {
  port: process.env.PORT||3000,
  mongodb: process.env.MONGO_CONNECTION_STRING,
  secret: process.env.JWT_SECRET,
  env: process.env.NODE_ENV,
  public_file_url: process.env.PUBLIC_URL + "/files/",
  tokenExpiryLimit: 86400,
  otpExpiryLimit: 1,
  isAppSocketIOEnable: false,
  host_url: process.env.HOST_URL,
  frontend_host_url: process.env.FRONTEND_HOST_URL,
  mail: {
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: process.env.MAIL_USERNAME,
      password: process.env.MAIL_PASSWORD,
    },
  },
};
