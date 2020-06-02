const express = require('express');
const fileUpload = require('express-fileupload')
const path = require('path')
const FormImage = require('../models/form-image')

const app = express();

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/temp/'
}));

app.post('/form-image', function (req, res) {
    let body = req.body;

    let formImage = new FormImage({
        score: parseInt(body.score),
        comment: body.comment,
        imageOpen: body.imageOpen
    })

    formImage.save((err, formImageDB) =>{
        if(err)
            return res.status(400).json({
                ok: false,
                err
            });
        res.json({
            ok: true,
            formImage: formImageDB
        });
    });
});


app.post('/process-image', function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se subio ningun archivo'
            }
        });
    }

    let file = req.files.image;
    let validExts = ['jpg'];
    let ext = file.name.split('.').pop();

    /* Valid ext */
    if(validExts.indexOf(ext) < 0)
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Extension de archivo no valida. Es valido' + validExts.join(',')
            }
        });
    
    let name = `${new Date().getTime()}.${ext}`;

    file.mv(`uploads/images/${name}`, (err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            });
        
        res.sendFile(path.resolve(__dirname, `../../uploads/images/${name}`));

    });

});

module.exports = app;