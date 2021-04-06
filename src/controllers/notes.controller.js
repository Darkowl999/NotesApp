const notesCtrl = {};
const Note = require('../models/Note');


notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note');
};

notesCtrl.createNewNote = async (req, res) => {
    const { title, description } = req.body;

    const newNote = new Note({ title, description });
    newNote.user= req.user.id;
    await newNote.save();
    req.flash('success_msg','Nota agregada exitosamente')

    res.redirect('/notes');
};

notesCtrl.renderNotes = async(req, res) => {
    const notes = await Note.find({user: req.user.id}).lean();
    res.render('notes/all-notes',{notes});
}

notesCtrl.renderEditForm = async (req, res) => {
    const note =await Note.findById(req.params.id).lean();
    if(note.user!= req.user.id){
        req.flash('error_msg','Not Authorize');
        return res.render('/notes');
    }
    res.render('notes/edit-note',{note});
};

notesCtrl.updateNote = async (req, res) => {
    const {title, description}= req.body;
   await Note.findByIdAndUpdate(req.params.id,{title,description});
    console.log(req.body);
    req.flash('success_msg','Nota actualizada exitosamente');
    res.redirect('/notes');
}
notesCtrl.deletenote = async (req, res) => {
    //Asi se usa el modelo de datos de moongoose para poder eliminar algo
  await Note.findByIdAndDelete(req.params.id); //esta es una forma de eliminar
  req.flash('success_msg','Nota eliminada exitosamente');
    res.redirect('/notes');//esto redirecciona al inicio pero sin las notas creadas
}

module.exports = notesCtrl;



//ESPECIFICACIONES SOBRE LAS LINEAS DE CODIGO DE ESTE FICHERO

//en la linea 9 la variable "req.body" esa variable contiene la info del formulario
//y sera la variable con la que manipularemos para hacernos con los datos