const {Schema,model}=require('mongoose');
const bcrypt= require('bcryptjs');


const UserSchema = new Schema({

    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true}

},{
    timestamps:true
});


//este metodo es para cifrar la contraseña
UserSchema.methods.encryptPassword= async password =>{

  const salt=await bcrypt.genSalt(10);

  return  await bcrypt.hash(password,salt);    
    
};

//este metodo nos devuelve un true o un false si la contraseña es correcta
UserSchema.methods.matchPassword= async function(password){
  return bcrypt.compare(password,this.password);
}

module.exports = model('User',UserSchema);



