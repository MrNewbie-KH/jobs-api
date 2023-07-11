const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Pleade provide a company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Pleade provide a position "],
      Array: ["intern", "rejected", "pending", "interview"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Jobs", jobSchema);
