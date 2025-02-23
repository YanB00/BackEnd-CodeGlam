import express from "express";
import loginServices from "../services/loginServices.js"; 

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await loginServices.login(email, password);
        if (user && user.length > 0) {
            res.status(200).send({ message: 'Login realizado com sucesso!', user: user[0] }); // Retorna o primeiro usuário encontrado
        } else {
            res.status(401).send({ message: 'Email ou senha incorretos.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao realizar login.' });
    }
});

router.post('/check-email', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await loginServices.checkEmail(email);
        if (user && user.length > 0) {
            res.status(200).send({ message: 'Email encontrado.', exists: true });
        } else {
            res.status(404).send({ message: 'Email não encontrado.', exists: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao verificar email.' });
    }
});

router.put('/change-password', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        await loginServices.changePassword(email, newPassword);
        res.status(200).send({ message: 'Senha alterada com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao alterar senha.' });
    }
});

export default router;