const express = require('express');
const chalk = require('chalk');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const PORT = process.env.PORT || 5000;
const app = express();
//Middleware
app.use(cookieSession({
    keys: ['dfasdfhjkdk32124@#$%^0a[s.d/?kjfhhfueij95d']
}));
app.use(express.urlencoded({extended: true}));
// app.use(express.json());

app.get('/signup', (req, res) => {
    res.send(`
    <div>
    Your id is: ${req.session.userId || 'You are not logged in'}
    <form method="POST">
    <input name="email" placeholder="email"/>
    <input name="password" placeholder="password"/>
    <input name="passwordConfirmation" placeholder="password confirmation"/>
    <button>Sign up</button>
    </form>
    </div>
    `);
});

app.post('/signup', async (req, res) => {
    const {email, password, passwordConfirmation} = req.body;

    const existingUser = await usersRepo.getOneBy({email: email});
    if (existingUser) {
        return res.send('Email in use');
    }

    if (password !== passwordConfirmation) {
        return res.send('Password must match')
    }

    //Create a user in our user repo to represent this person
    const user = await usersRepo.create({email: email, password: password});
    //Store the id of the user inside the users cookie
    req.session.userId = user.id; //This add the cookie to the created user
    res.send('Account created successfully');
});

app.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out');
});

app.get('/signin', (req, res) => {
    res.send(`
    <div>
    <form method="POST">
    <input name="email" placeholder="email"/>
    <input name="password" placeholder="password"/>
    <button>Sign in</button>
    </form>
    </div>
    `);
})

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.getOneBy({ email: email });
    if(!user) {
        return res.send('Email not found');
    }

    const validPassword = await usersRepo.comparePassword(
        user.password,
        password
    )

    if(!validPassword) {
        return res.send('Invalid password');
    }

    req.session.userId = user.id; //This is the line that logs in the user after validation is passed

    res.send('You are signed in');
});

app.listen(PORT, () => {
    console.log(chalk.yellowBright(`Server is listening on ${PORT}`))
});
