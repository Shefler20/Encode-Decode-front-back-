import express, {Request, Response} from "express";

const Vigenere = require('caesar-salad').Vigenere;

const app = express();
app.use(express.json());
const port = 8000;

app.post('/encode', (req: Request, res: Response) => {
    const { message, password } = req.body;
    if (!message || !password) return res.status(400).send({ error: 'please enter word and password' });
    const encoded  = Vigenere.Cipher(password).crypt(message);
    res.send({encoded: encoded});
});

/*app.post('/decode/:word', (req: Request, res: Response) => {
    const decoded = Vigenere.Decipher('password').crypt(req.params.word);
    res.send('Decoded:' + decoded);
});*/

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})