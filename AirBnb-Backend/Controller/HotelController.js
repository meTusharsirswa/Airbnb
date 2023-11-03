const express = require("express");
const Hotel = require("../model/Hotels");
const HotelCategory = require("../model/HotelCategory");

const PostHotels = async (req, res) => {
  const {
    name,
    distance_from_you,
    availablity,
    images,
    rent,
    description,
    check_in,
    check_out,
    guests,
    hotel_category,
  } = req.body;
  const Hotels = await Hotel({
    name: name,
    distance_from_you: distance_from_you,
    availablity: availablity,
    images: images,
    rent: rent,
    description: description,
    check_in: check_in,
    check_out: check_out,
    guests: guests,
    hotel_category: hotel_category,
  });
  await Hotels.save();

  await HotelCategory.findByIdAndUpdate(
    hotel_category,
    { $push: { hotels: Hotels._id } },
    { new: true }
  );

  res.status(200).json({
    status: true,
    message: "Hotel Added Successfully !!!",
    data: Hotels,
  });
};

const GetHotels = async (req, res) => {
  const Hotels = await Hotel.find({}).populate("hotel_category");
  res.status(200).json({
    status: true,
    message: "Hotel List Fetched !!!",
    data: Hotels,
  });
};

const GetHotelsById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    res.status(200).json({
      status: true,
      message: "Find By Hotel Id ",
      data: hotel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateHotels = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      distance_from_you: req.body.distance_from_you,
      availablity: req.body.availablity,
      images: req.body.images,
      rent: req.body.rent,
      description: req.body.description,
      check_in: req.body.check_in,
      check_out: req.body.check_out,
      guests: req.body.guests,
      hotel_category: req.body.hotel_category,
    };

    const updatedData = await Hotel.findByIdAndUpdate(
      req.body._id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({
        status: false,
        message: "Hotel Id not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Hotel Data Updated Successfully",
      data: updatedData, // Return the updated data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  PostHotels,
  GetHotels,
  GetHotelsById,
  updateHotels,
};
