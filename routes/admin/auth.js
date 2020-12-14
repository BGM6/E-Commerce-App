const router = require('express').Router();
const usersRepo = require('../../repositories/users.js');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

router.get('/signup', (req, res) => {
    res.send(signupTemplate({req: req}));
});

router.post('/signup', async (req, res) => {
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

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out');
});

router.get('/signin', (req, res) => {
    res.send(signinTemplate());
});

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    const user = await usersRepo.getOneBy({email: email});
    if (!user) {
        return res.send('Email not found');
    }

    const validPassword = await usersRepo.comparePassword(
        user.password,
        password
    )

    if (!validPassword) {
        return res.send('Invalid password');
    }

    req.session.userId = user.id; //This is the line that logs in the user after validation is passed

    res.send('You are signed in');
});


module.exports = router;
