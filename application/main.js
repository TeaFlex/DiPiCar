const express = require('express');
const path = require('path');
const app = express();
const port = 8060;

app.set('view engine', 'ejs');
app.use(express.static('style'));

app.get('/', (req, res)=>{
    res.render("index");
});

app.listen(port, () => {
    console.log(`The app is running and listening to the port ${port}.`);
});