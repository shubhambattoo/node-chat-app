const express = require('express');
const app = express();
const path = require('path');

const publicPath = path.join(__dirname , '../public');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index.html')
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Node server running on ' + port)
})