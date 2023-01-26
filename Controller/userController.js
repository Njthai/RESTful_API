const express = require("express");
const { verifyToken } = require("../lib/util");
const router = express.Router();

//importamos modelo con schema correspondiente
const Model = require("../Model/userModel");

//Escuchar peticiones GET

//Escuchar peticiones GET
router.get("/", verifyToken, async (req, res) => {
  // Model.find()
  //   .then((data) =>
  //     res.status(200).json({ status: "succeeded", data, error: null })
  //   )
  //   .catch((error) =>
  //     res.status(404).json({
  //       status: "Failed",
  //       data: null,
  //       error: error.message,
  //     })
  //   );
  try {
    const data = await Model.find();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      data: null,
      error: error.message,
    });
  }
});

//Obtenet documento  por id

router.get("/:id", (req, res) => {
  //res.send(`get document id ${req.params.id}`);

  //The exec() method executes a search for a match in a specified string and returns a result array, or null

  Model.findById(req.params.id)
    .exec()
    .then((data) =>
      res
        .status(200)
        .json({ status: "succeeded", data, error: null })
        .catch((error) =>
          res.status(404).json({
            status: "failed",
            data: null,
            error: error.message,
          })
        )
    );
});

//añadir documento POST

router.post("/", (req, res) => {
  const data = new Model({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    role: req.body.role,
    skills: req.body.skills,
    personality: req.body.personality,
  });

  data
    .save()
    .then((data) =>
      res.status(201).json({ status: "succeeded", data, error: null })
    )
    .catch((error) =>
      res.status(404).json({
        status: "Failed",
        data: null,
        error: error.message,
      })
    );
});

//actualizar documentos

router.patch("/:id", (req, res) => {
  // res.send(`Update document id ${req.params.id}`);
  let id = req.params.id;
  let data = req.body;
  //para no volver hacer el fetch, hacemos que nos devuelva el documento actualizado
  const options = {
    new: true,
  };
  Model.findByIdAndUpdate(id, data, options)
    .then((data) =>
      res.status(200).json({ status: "succeeded", data, error: null })
    )
    .catch((error) =>
      res.status(404).json({
        status: "Failed",
        data: null,
        error: error.message,
      })
    );
});

router.delete("/:id", (req, res) => {
  //res.send(`Delete document id ${req.params.id}`);
  let id = req.params.id;
  Model.findByIdAndDelete(id)
    .then((data) =>
      res.status(200).json({ status: "succeeded", data, error: null })
    )
    .catch((error) =>
      res.status(404).json({
        status: "Failed",
        data: null,
        error: error.message,
      })
    );
});

module.exports = router;