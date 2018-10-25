const express = require('express');
const path = require('path');
const app = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

//middleware
app.use(fileUpload());

// Static
app.use(express.static(path.join(__dirname, './client/dist')));

app.post('/upload', (req, res) => {
  // req.files used by express-fileupload middleware
  let file = req.files.file;
  file.mv(`${__dirname}/uploads/${req.body.filename}`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send('File uploaded!!!!');
  });
})

app.listen(PORT, (err) => {
  if(err) console.log('Err connecting to server: ', err);
  else console.log('Successfully connected to server on port: ', PORT);
})