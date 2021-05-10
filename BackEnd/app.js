require('dotenv').config();
const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./middleware/passport');
const {PORT} = require('./config')

const brandRoutes  = require('./routes/brand-routes'); 
const userRoutes  = require('./routes/user-routes');
const categoryRoutes = require('./routes/category-routes');
const productRoutes = require('./routes/product-routes');
const groupRoutes = require('./routes/group-routes');
const sizeRoutes = require('./routes/size-routes');
const orderRoutes = require('./routes/order-routes');
const promotionRoutes = require('./routes/promotion-routes');
const importRoutes = require('./routes/import-routes');
const HttpError = require('./error-handle/http-error');
const app = express();


app.use(passport.initialize());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use(bodyParser.json());
app.use(cors());


//Handling CORS Error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PATCH, DELETE');
    next(); 
})

app.use('/api/product', productRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/user', userRoutes);
app.use('/api/size', sizeRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/promotion',promotionRoutes);
app.use('/api/import',importRoutes);
app.get('/sync', (req, res) =>{
    let models = require('./models');
    models.sequelize.sync()
    .then(() =>{
        res.send('Database sync completed!')
    });
});

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw(error);
});

app.use((error, req, res, next) => {       
    if(req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);  
    res.json({message: error.message || 'An unknown error occurred'});
})
//Start server
app.listen(PORT); 



