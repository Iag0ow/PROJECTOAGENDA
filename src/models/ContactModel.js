const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    nameContact: String,
    lastName: String,
    email: String,
    telephone: String,
  },
  {
    timestamps: true,
  }
);

const ContactModel = mongoose.model("Contact", ContactSchema);

const searchById = async (id) => {
  if (typeof id !== "string") return;
  const user = await ContactModel.findById(id);
  return user;
};

const deleteId = async (id) => {
  if (typeof id !== "string") return;
  const user = await ContactModel.findOneAndDelete({_id:id});
  return user;
};


module.exports = { ContactModel, searchById, deleteId };
