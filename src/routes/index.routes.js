const{Router}= require('express');
const { connections } = require('mongoose');
const router= Router();

//esta seran las rutas está en este archivo para que tenga mas orden

const{renderIndex,renderAbout}= require('../controllers/index.controller');


router.get('/',renderIndex);

router.get('/about',renderAbout);

module.exports=router;