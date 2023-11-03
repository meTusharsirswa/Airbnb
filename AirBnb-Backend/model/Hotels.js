const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: { type: String },
  distance_from_you: { type: Number },
  unavlable: [{}],
  images: [{ type: String }], // Array of image URLs
    rent: { type: Number },
  description: { type: String },
  check_in: { type: Date },
  check_out: { type: Date },
  guests: { type: Number },
  hotel_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel-Category",
  },
}, { timestamps: true });

module.exports = mongoose.model('Hotels', HotelSchema);
