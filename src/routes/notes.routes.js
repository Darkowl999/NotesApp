const { Router } = require("express");

const router = Router();

const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deletenote,
} = require("../controllers/notes.controller");

const {isAuthenticated}= require('../helpers/auth');

//ESTAS SON RUTAS DE NAVEGACION CON LOS RESPECTIVOS METODOS 

//New note
router.get("/notes/add",isAuthenticated, renderNoteForm);

//esto es para crear nueva nota
router.post("/notes/new-note",isAuthenticated,createNewNote);

//Get All Note -> Obtener todas las notas

router.get("/notes",isAuthenticated, renderNotes);

//Edit

router.get("/notes/edit/:id",isAuthenticated, renderEditForm);

//put es para actualizar
router.put("/notes/edit/:id",isAuthenticated, updateNote);

//Delete note

router.delete("/notes/delete/:id",isAuthenticated, deletenote);

module.exports = router;
