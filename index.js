const express =  require('express');
const chalk = require('chalk');
const usersRepo = require('./repositories/users');

const PORT = process.env.PORT || 5000;
const app = express();
//Middleware
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
    <div>
    <form method="POST">
   
    <input name="email" placeholder="email"/>
    <input name="password" placeholder="password"/>
    <input name="passwordConfirmation" placeholder="password confirmation"/>
    <button>Sign up</button>
    </form>
    </div>
    `);

});

app.post('/', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;

    const existingUser = await usersRepo.getOneBy({email: email});
    if(existingUser) {
        return res.send('Email in use');
    }

    if (password !== passwordConfirmation) {
        return res.send('Password must match')
    }

    res.send('Account created successfully');
});

app.listen(PORT, () => {
    console.log(chalk.yellowBright(`Server is listening on ${PORT}`))
});
