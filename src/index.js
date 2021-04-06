require('dotenv').config(); //con esto podremos crear variables de entorno
require('./database');


const app = require('./server');



app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'));
})
