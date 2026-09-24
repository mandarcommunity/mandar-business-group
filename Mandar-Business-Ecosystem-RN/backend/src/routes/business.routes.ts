// @ts-nocheck
import express
from "express";

import {

  createBusiness,
  getMyBusiness,
  getBusinessById,
  getBusinessByUserId,
  updateBusiness,
  getAllBusinesses, getBusinessesByIds, getBusinessesByIndustry,
  submitVerification
} from "../controllers/business.controller";

import {

  protect,

} from "../middleware/auth.middleware";

const router =
  express.Router();

/* CREATE BUSINESS */
router.post(

  "/create",

  protect,

  createBusiness
);

/* GET MY BUSINESS */
router.get(

  "/me",

  protect,

  getMyBusiness
);

/* GET ALL BUSINESSES */
router.get(
  "/all",
  protect,
  getAllBusinesses
);

/* GET BUSINESS BY USER ID */
router.get(
  "/user/:userId",
  protect,
  getBusinessByUserId
);

/* GET BUSINESS BY ID */
router.get(
  "/:id",
  protect,
  getBusinessById
);

/* UPDATE BUSINESS */
router.put(

  "/update",

  protect,

  updateBusiness
);

/* GET BUSINESSES BY IDS */
router.post("/saved", protect, getBusinessesByIds);
/* GET BUSINESSES BY INDUSTRY */
router.get("/industry", protect, getBusinessesByIndustry);

export default router;/* SUBMIT VERIFICATION */
router.post(
  "/verify",
  protect,
  submitVerification
);
