const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("./gradeController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.get("/:classId", controller.listGrade);

router.get("/listGradeForStudent/:classId", controller.listGradeForStudent);

router.post(
  "/listStudent/:classId",
  upload.single("studentFile"),
  controller.addStudentListForClass
);

router.post(
  "/listGrade/:classId",
  upload.single("gradeFile"),
  controller.addGradeListForAssignment
);

router.post("/UpdateOrCreate/:id", controller.UpdateOrCreateGrade);

router.post("/markDone/:classId", controller.markDoneGradeColumn);

router.put("/finishAll", controller.finishAll);
module.exports = router;
