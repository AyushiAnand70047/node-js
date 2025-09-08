const path = require('path');
const multer = require('multer');
const express = require('express');

const app = express();

// const upload = multer({ dest: 'uploads/'});
const storage = multer.diskStorage({
    destination: function (req,file, cb){
        return cb(null, './uploads')
    },
    filename: function(req,file,cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({storage});

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req,res) => {
    return res.render('homepage');
})

app.post('/upload', upload.single('profileImage') ,(req,res) => {
    console.log(req.file);
    return res.redirect('/');
})

app.listen(8000, () => console.log('server started'));