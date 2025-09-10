const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    state: { type: String, trim: true },
    city: { type: String, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, trim: true },
    intrest:[ { type: String, trim: true }],
  },
  { timestamps: true }
);

const ContactModal = mongoose.model("contact", ContactSchema);
module.exports = ContactModal;
