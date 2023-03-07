/**
 * This module will handle all the API logic,
 * i.e. getting plants, getting a single plant, updating a plant, deleting a plant, and creating a plant.
 */

/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
// const data = require("db.json");

var fs = require("fs");
var path = require("path");

interface Plant {
  // id: Number;
  name: String;
  sciName: String;
  desc: String;
  image?: String;
  indications?: String[];
  effects?: String[];
}

let plantdata: Plant[] = [];
// get plant data helper
const getPlantData = async () => {
  await fs.readFileSync(
    path.resolve("./source/db.json"),
    // "utf8",
    (err: Error, data: any) => {
      //error handling
      if (err) return console.error(err);

      //return file content
      console.log("FILE CONTENT: " + data.toString());
      let result = JSON.parse(data);
      // plantdata = result.plants;
      return result.plants;
      // console.log(plantdata); WORKS
    }
  );
};
/*
(async () => {
  localplantdata = await getPlantData();
  console.log("local plant data" + localplantdata);
})();
*/

// getting all plants
const getPlants = async (req: Request, res: Response, next: NextFunction) => {
  // get some plants
  // localplantdata = await getPlantData();
  // console.log("local plant data" + localplantdata);

  let localplantdata;
  (async () => {
    localplantdata = await getPlantData();
    console.log("local plant data" + localplantdata);
  })();
  /* let result: AxiosResponse = await axios.get(
    // TODO replace with local json? 
    // `https://jsonplaceholder.typicode.com/plants`
  ); */
  // let plants: [Plant] = result.data;
  // let localplantdata = await getPlantData();
  // console.log(localplantdata);
  return res.status(200).json({
    message: localplantdata,
  });
};

// getting a single plant
const getPlant = async (req: Request, res: Response, next: NextFunction) => {
  // get the plant id from the req
  let selectedId: string = req.params.id;
  // get the plant
  // TODO replace
  let result = {
    id: 1,
    name: "test",
    sciName: "testSci",
    desc: "some description",
  }; /* .find((id: Number) => {
    id.toString() === selectedId;
  }); */
  /* let result: AxiosResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/plants/${id}`
  ); */
  let plant: Plant = result;
  return res.status(200).json({
    message: plant,
  });
};

// updating a plant
const updatePlant = async (req: Request, res: Response, next: NextFunction) => {
  // get the plant id from the req.params
  let id: string = req.params.id;
  // get the data from req.body
  let name: string = req.body.name ?? null;
  let sciName: string = req.body.sciName ?? null;
  // update the plant
  /* let response: AxiosResponse = await axios.put(
    `https://jsonplaceholder.typicode.com/plants/${id}`,
    {
      ...(title && { title }),
      ...(body && { body }),
    }
  ); */
  // return response
  return res.status(200).json({
    // message: response.data,
  });
};

// deleting a plant
const deletePlant = async (req: Request, res: Response, next: NextFunction) => {
  // get the plant id from req.params
  let id: string = req.params.id;
  // delete the plant
  let response: AxiosResponse = await axios.delete(
    `https://jsonplaceholder.typicode.com/plants/${id}`
  );
  // return response
  return res.status(200).json({
    message: "plant deleted successfully",
  });
};

// adding a plant
const addPlant = async (req: Request, res: Response, next: NextFunction) => {
  // get the data from req.body
  let title: string = req.body.title;
  let body: string = req.body.body;
  // add the plant
  let response: AxiosResponse = await axios.post(
    `https://jsonplaceholder.typicode.com/plants`,
    {
      title,
      body,
    }
  );
  // return response
  return res.status(200).json({
    message: response.data,
  });
};

export default { getPlants, getPlant, updatePlant, deletePlant, addPlant };
