import express from 'express';
import chalk from 'chalk';

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


app.post('/', (req, res) => {
    console.log(req.body);
    res.send('Account created successfully');
});

app.listen(PORT, () => {
    console.log(chalk.yellowBright(`Server is listening on ${PORT}`))
});
