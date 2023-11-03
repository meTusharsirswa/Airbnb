const express = require("express")
const router = express.Router();


// User Routes
const {UserDetail , loginData,userData,logout} = require("../Controller/UserController")
router.route("/register").post(UserDetail);
router.route("/login").post(loginData);
router.route('/user').get(userData)
router.route('/user-logout').post(logout)

// Hotel Routes
const Hotels = require("../Controller/HotelController")
router.post("/add-hotel", Hotels.PostHotels);
router.get("/get-hotels", Hotels.GetHotels);
router.get("/get-hotels/:id", Hotels.GetHotelsById);
router.post("/update-hotel",Hotels.updateHotels)

// Hotel Category Routes
const HotelCategory = require("../Controller/HotelCategory")
router.post("/add-hotel-category",HotelCategory.PostHotelCategory)
router.get("/get-hotel-category",HotelCategory.GetHotelCategory)
router.get("/get-hotel-category/:id",HotelCategory.GetHotelCategoryById)
router.post("/update-hotel-category",HotelCategory.updateHotelCategory)

module.exports = router;

  