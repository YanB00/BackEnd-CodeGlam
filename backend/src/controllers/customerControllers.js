import express from "express";
import customerServices from "../services/customerServices.js"; 
const router = express.Router();

// Rota para obter um cliente por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await customerServices.getClienteById(id);
        if (cliente) {
            res.status(200).send(cliente);
        } else {
            res.status(404).send({ message: 'Cliente não encontrado.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao buscar cliente.' });
    }
});

// Rota para obter todos os clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await customerServices.getAllClientes();
        res.status(200).send(clientes);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao buscar clientes.' });
    }
});

// Rota para criar um novo cliente
router.post('/', async (req, res) => {
    const { nome, telefone, email, data_nascimento, alergia, CPF, cliente_frequente, beneficios, observacoes } = req.body;

    try {
        await customerServices.createCliente(nome, telefone, email, data_nascimento, alergia, CPF, cliente_frequente, beneficios, observacoes);
        res.status(201).send({ message: 'Cliente criado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao criar cliente.' });
    }
});

// Rota para atualizar um cliente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, telefone, email, data_nascimento, alergia, CPF, cliente_frequente, beneficios, observacoes } = req.body;

    try {
        await customerServices.updateCliente(id, nome, telefone, email, data_nascimento, alergia, CPF, cliente_frequente, beneficios, observacoes);
        res.status(200).send({ message: 'Cliente atualizado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao atualizar cliente.' });
    }
});

// Rota para deletar um cliente
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await customerServices.deleteCliente(id);
        res.status(200).send({ message: 'Cliente deletado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao deletar cliente.' });
    }
});

export default router;