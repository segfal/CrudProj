const router = require("express").Router();

// Already mounted on /api/
router.use("/students", require("./students"));
router.use("/campuses", require("./campuses"));

// 404 Handling
router.use((req, res, next) => {
  console.log(req.body)
  const error = new Error("404 Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;