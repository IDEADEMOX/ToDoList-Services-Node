import { Request, Response, NextFunction } from "express";
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/list", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});

router.post("/add", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});

router.post("/update", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});

router.post("/delete", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});

module.exports = router;
