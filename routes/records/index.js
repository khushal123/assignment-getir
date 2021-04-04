const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const recordsController = require("../../controller/records");

/**
 * @route get /records
 * All params are mandatory
 */

router.get(
  "/",
  [
    body("startDate", "A valid startDate is required").exists(),
    body("endDate", "A valid endDate is required").exists(),
    body("minCount", "A valid minCount is required").exists(),
    body("maxCount", "A valid maxCount is required").exists(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        code: 1,
        msg: "validation error, refer errors object",
        errors: errors,
      });
    }
    return recordsController.get(req, res);
  }
);

module.exports = router;
