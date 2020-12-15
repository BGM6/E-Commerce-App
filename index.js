const express = require('express');
const chalk = require('chalk');
const authRouter = require('./routes/admin/auth.js');
const cookieSession = require('cookie-session');
const productsRouter = require('./routes/admin/products');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.static('public'));
//Middleware
app.use(express.urlencoded({extended: true}));
app.use(cookieSession({
    keys: ['dfasdfhjkdk32124@#$%^0a[s.d/?kjfhhfueij95d']
}));

//Admin router from auth.js
app.use(authRouter);
app.use(productsRouter);

app.listen(PORT, () => {
    console.log(chalk.yellowBright(`Server is listening on ${PORT}`))
});

