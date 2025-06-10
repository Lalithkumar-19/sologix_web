const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Config = require("../config/vars");
const {
  User,
  ProfilePicture,
  Customer,
  Employee,
  OTPModel,
  Purches,
} = require("../models");
const saltRounds = 10;
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
  Purchage: async (req, res, next) => {
    try {
      const {
        productData,
        user,
        instamentOne,
        instamentTwo,
        instamentThree,
        instamentFour,
      } = req.body;

      if (!user) {
        return HandleError(res, "Please enter the user !");
      }

      if (!productData) {
        return HandleError(res, "product Data missing!");
      }

      const order = await Insert({
        model: Purches,
        data: {
          productData,
          user,
          instamentOne,
          instamentTwo,
          instamentThree,
          instamentFour,
        },
      });

      if (!order) {
        return HandleError(res, "Failed to Register !");
      }

      return HandleSuccess(res, order);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  GetRecentPurchases: async (req, res, next) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return HandleError(res, "Please enter the user ID!");
      }
      const recentPurchases = await Find({
        model: Purches,
        where: { user: userId },
        sort: { createdAt: -1 },
        limit: 1,
      });
      if (!recentPurchases) {
        return HandleError(res, "No recent purchases found!");
      }
      return HandleSuccess(res, recentPurchases);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
};

