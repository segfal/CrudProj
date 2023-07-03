const express = require("express");
const router = require("express").Router();
const { Campus } = require("../db/models");

// Fetch all campuses DONE
router.get("/", async (req, res, next) => {
  try {
    console.log("getting all campuses");
    const allCampuses = await Campus.findAll();

    allCampuses
      ? res.status(200).json(allCampuses)
      : res.status(404).send("No campuses found");
  } catch (error) {
    next(error);
  }
});

// Fetch single campus
router.get("/SingleCampus/:id", async (req, res, next) => {
  try {
    //finds a single id based on the param request
    const singleCampus = await Campus.findByPk(req.params.id);
    
    singleCampus
      ? res.status(200).json(singleCampus)
      : res.status(404).send("No Campus Found");
  } catch (error) {
    next(error);
    console.log(error);
  }
});

///insert new campus with params, the params are the same as the model DONE
router.post("/addcampus", async (req, res, next) => {
  try {
    console.log(req.body);
    const newCampus = await Campus.create(req.body);

    res.status(201).json(newCampus);
  } catch (error) {
    console.log("An error occured", error);
  }
});

//Update campus
router.put("/updatecampus/:id", async (req, res, next) => {
  try {
    //Fetch Campus by ID #
    const campusId = req.params.id;
    console.log(req.body.id);

    //Await campus data
    const findCampus = await Campus.findOne({
      where: {
        id: campusId,
      },
    });

    //If Conditions to check if data exists
    //If it exists, then update the campus data
    if (!findCampus) {
      console.log("Campus does not exist");
      res.status(404).json({ error: "Campus not found" });
    } else {
      const updateCampus = await findCampus.update({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        location: req.body.location,
        description: req.body.description,
      });

      console.log("Campus updated successfully");
      res.status(200).json(updateCampus);
    }
  } catch (error) {
    console.log("Update Failed");
    res.status(500).json({ error: "Update failed" });
  }
});

//TODO: delete campus
router.delete("/deletecampus/", async (req, res, next) => {
  try {
    console.log(req.body.name);
    const deletedCampus = await Campus.destroy({
      where: {
        name: req.body.name,
      },
    });
    res.status(200).json(deletedCampus);
  } catch (error) {
    console.log("Delete Failed");
  }
});

module.exports = router;
