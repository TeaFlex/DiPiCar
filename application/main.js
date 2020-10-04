const express = require('express');
const path = require('path');
const app = express();
const port = 8060;

app.set('view engine', 'ejs');
app.use(express.static('static_files'));

app.get('/', (req, res)=>{
    res.render("template", { page:"home" });
});

app.listen(port, () => {
    console.log(`The app is running and listening to the port ${port}.`);
});