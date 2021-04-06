const {Schema, model}=require('mongoose');//sirve para definir el modelo de la base de datos

const NoteSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    user:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required:true

    }


    
},{
    timestamps:true
})

module.exports = model('Note',NoteSchema);


