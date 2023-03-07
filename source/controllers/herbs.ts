import { Request, Response, NextFunction } from "express";
import { MongooseError } from "mongoose";
// import axios, { AxiosResponse } from "axios";

require("dotenv").config();
var fs = require("fs");
var path = require("path");

// setup mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// setup herb interface
interface IHerb {
  name: String;
  sciName: String;
  description?: String;
  image?: String;
  indications?: String[];
  effects?: String[];
}
// setup mongoose schema
let herbSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  sciName: { type: String, required: true },
  description: String,
  image: String,
  indications: [String],
  effects: [String],
});
const Herb = mongoose.model("herb", herbSchema);

// getting all the herbs
const getHerbs = async (req: Request, res: Response, next: NextFunction) => {
  const foundHerbs = await Herb.find({}, "-_id name sciName image");
  res.json(foundHerbs);
};

// getting a single herb
const getHerb = async (req: Request, res: Response) => {
  let herbname = req.params.herbname;
  // turn underscores to spaces
  // uppercase first letters
  herbname = herbname
    .split("_")
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(" ");
  const foundHerb = await Herb.findOne(
    { name: herbname },
    "-_id name sciName description indications effects"
  );
  return res.json(foundHerb);
};

// add/update a herb
const addHerb = async (req: Request, res: Response) => {
  const newName = req.body.name;
  const herbResult = await Herb.findOne({ name: newName });

  if (!herbResult) {
    const newHerb = new Herb({
      name: newName,
      sciName: req.body.sciName,
      description: req.body.description ? req.body.description : undefined,
      image: req.body.image ? req.body.image : undefined,
      indications: req.body.indications ? req.body.indications : undefined,
      effects: req.body.effects ? req.body.effects : undefined,
    });
    const result = await newHerb.save();
    // if success
    if (result) {
      res.json(newHerb);
    }
  } else {
    console.log("update");
    herbResult.sciName = req.body.sciName
      ? req.body.sciName
      : herbResult.sciName;
    herbResult.description = req.body.description
      ? req.body.description
      : herbResult.description;
    herbResult.image = req.body.image ? req.body.image : herbResult.image;
    herbResult.indications = req.body.indications
      ? req.body.indications
      : herbResult.indications;
    herbResult.effects = req.body.effects
      ? req.body.effects
      : herbResult.effects;
    const updatedHerb = await herbResult.save();
    if (updatedHerb) {
      res.json(updatedHerb);
    }
  }
};

// update herb
const updateHerb = async (req: Request, res: Response) => {
  const herbName = req.body.name;
  const herbResult = await Herb.findOne({ name: herbName });
  if (herbResult) {
    herbResult.sciName = req.body.sciName
      ? req.body.sciName
      : herbResult.sciName;
    herbResult.description = req.body.description
      ? req.body.description
      : herbResult.description;
    herbResult.image = req.body.image ? req.body.image : herbResult.image;
    herbResult.indications = req.body.indications
      ? req.body.indications
      : herbResult.indications;
    herbResult.effects = req.body.effects
      ? req.body.effects
      : herbResult.effects;
    const result = await herbResult.save();
    if (result) {
      res.json(result);
    }
  } else {
    console.log("no herb found by that name");
  }
};

const deleteHerb = (req: Request, res: Response) => {
  console.log("delete herb");
};

export default { getHerb, getHerbs, addHerb, updateHerb, deleteHerb };
