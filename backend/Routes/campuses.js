const express = require("express");
const router = require("express").Router();
const { Campus, findCampuses } = require("../DB/Models/campuses");

// Fetch all campuses DONE
router.get("/", async (req, res, next) => {
  try {
    const allCampuses = await findCampuses();

    allCampuses
      ? res.status(200).json(allCampuses)
      : res.status(404).send("No campuses found");
  } catch (error) {
    next(error);
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
