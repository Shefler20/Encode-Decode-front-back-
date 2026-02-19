import express, {Request, Response} from "express";
import cors from "cors";

const Vigenere = require('caesar-salad').Vigenere;

const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;

app.post('/encode', (req: Request, res: Response) => {
    const { message, password } = req.body;
    if (!message || !password) return res.status(400).send({ error: 'please enter word and password' });
    const encoded  = Vigenere.Cipher(password).crypt(message);
    res.send({encoded: encoded});
});

app.post('/decode', (req: Request, res: Response) => {
    const { message, password } = req.body;
    if (!message || !password) return res.status(400).send({ error: 'please enter word and password' });
    const decoded = Vigenere.Decipher(password).crypt(message);
    res.send({decoded: decoded});
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})