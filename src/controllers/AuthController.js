const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Config = require("../config/vars");
const { User, Contact, PartnerRequest } = require("../models");
const saltRounds = 10;

const { secret, tokenExpiryLimit } = require("../config/vars");
const {
  IsExists,
  Insert,
  FindOne,
  Find,
  CompressImageAndUpload,
  FindAndUpdate,
  Delete,
  HandleSuccess,
  HandleError,
  HandleServerError,
  Aggregate,
  ValidateEmail,
  PasswordStrength,
  ValidateAlphanumeric,
  ValidateLength,
  ValidateMobile,
  GeneratePassword,
  IsExistsOne,
} = require("./BaseController");

module.exports = {
  Register: async (req, res, next) => {
    console.log("renter");
    try {
      const { name, phone, email, password, confirmPassword } = req.body;
      if (password == "")
        return HandleError(res, "Please enter the password !");

      if (password !== confirmPassword)
        return HandleError(res, "Password do not match !");

      if (!ValidateEmail(email.trim()))
        return HandleError(
          res,
          "Please enter a valid email id i.e abc@gmail.com"
        );

      let isUserExists = await IsExistsOne({
        model: User,
        where: { email: email },
      });
      if (isUserExists) {
        return HandleError(res, "Email already exists!");
      }
      isUserExists = await IsExistsOne({
        model: User,
        where: { phone },
      });
      if (isUserExists) {
        return HandleError(res, "phone already exists!");
      }
      const password_hash = await bcrypt.hash(password, saltRounds);

      const createUser = await Insert({
        model: User,
        data: { name, email, phone, password: password_hash, role: "Customer" },
      });
      if (!createUser) {
        return HandleError(res, "Failed to Register !");
      }

      return HandleSuccess(res, createUser);
    } catch (error) {
      console.log(error);
      return HandleServerError(res, req, error);
    }
  },
  Login: async (req, res, next) => {
    try {
      const { email = "", password = "" } = req.body;
      if (password == "")
        return HandleError(res, "Please enter the password !");

      let whereClause = {};
      if (ValidateEmail(email.trim())) {
        whereClause = { email: email };
      } else if (ValidateMobile(email.trim())) {
        whereClause = { phone: email };
      } else {
        return HandleError(
          res,
          "Please enter a valid email id or phone number!"
        );
      }

      let isUserExists = await IsExistsOne({
        model: User,
        where: whereClause,
      });

      if (!isUserExists) {
        return HandleError(res, "User doesn't exists!");
      }
      const isPasswordCorrect = await bcrypt.compare(
        password,
        isUserExists.password
      );

      if (!isPasswordCorrect) return HandleError(res, "Incorrect Password!");

      const active_session_refresh_token = GeneratePassword();
      const access_token = jwt.sign(
        {
          id: isUserExists._id,
          email: isUserExists.email,
        },
        secret,
        { expiresIn: tokenExpiryLimit }
      );

      const updateData = await FindAndUpdate({
        model: User,
        where: { _id: isUserExists._id },
        update: {
          $set: {
            access_token,
            active_session_refresh_token,
          },
        },
      });

      if (!updateData) {
        return HandleError(res, "Failed to generate token.");
      }
      const useInfo = {
        id: updateData._id,
        name: updateData.name,
        email: updateData.email,
        role: updateData.role,
        access_token: updateData.access_token,
        active_session_refresh_token: updateData.active_session_refresh_token,
      };
      return HandleSuccess(res, useInfo);
    } catch (error) {
      return HandleServerError(res, req, error);
    }
  },
  ContactUs: async (req, res, next) => {
    try {
      const { name, phone, email, state, city, subject, message, interest } =
        req.body;
      if (!ValidateAlphanumeric(name.trim()))
        return HandleError(res, "Please enter a valid name!");
      if (!ValidateMobile(phone.trim()))
        return HandleError(res, "Please enter a valid phone number!");
      if (!ValidateEmail(email.trim()))
        return HandleError(
          res,
          "Please enter a valid email id i.e abc@gmail.com"
        );
      if (!ValidateLength(name, 2, 50))
        return HandleError(res, "Name should be between 2 and 50 characters!");
      if (!ValidateLength(phone, 10, 15))
        return HandleError(
          res,
          "Phone number should be between 10 and 15 digits!"
        );

      const createContact = await Insert({
        model: Contact,
        data: { name, phone, email, state, city, subject, message, intrest: interest },
      });
      if (!createContact) {
        return HandleError(res, "Failed to send message!");
      }
      return HandleSuccess(res, createContact);
    } catch (error) {
      return HandleServerError(res, req, error);
    }
  },
  // create one for inserting partner request fileds are fullname email phone address adhar pan and intrsested in
  PartnerRequest: async (req, res, next) => {
    try {
      const { fullname, email, phone, adhar, pan, intrestedIn, address } =
        req.body;

      if (!ValidateMobile(phone.trim()))
        return HandleError(res, "Please enter a valid phone number!");
      if (!ValidateEmail(email.trim()))
        return HandleError(
          res,
          "Please enter a valid email id i.e abc@gmail.com"
        );

      const createPartnerRequest = await Insert({
        model: PartnerRequest,
        data: {
          name: fullname,
          email,
          phone,
          adhar,
          pan,
          intrestedIn,
          address,
        },
      });
      if (!createPartnerRequest) {
        return HandleError(res, "Failed to send message!");
      }
      return HandleSuccess(res, createPartnerRequest);
    } catch (error) {
      return HandleServerError(res, req, error);
    }
  },
};
