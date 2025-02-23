import express from "express";
import employeeServices from "../services/employeeServices.js"

const router = express.Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const funcionario = await employeeServices.getFuncionarioById(id);
        if (funcionario) {
            res.status(200).send(funcionario);
        } else {
            res.status(404).send({ message: 'Funcionário não encontrado.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao buscar funcionário.' });
    }
});

// Rota para obter todos os funcionários
router.get('/', async (req, res) => {
    try {
        const funcionarios = await employeeServices.getAllFuncionarios();
        res.status(200).send(funcionarios);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao buscar funcionários.' });
    }
});

// Rota para criar um novo funcionário
router.post('/', async (req, res) => {
    const { nome, cargo, telefone, salario, data_admissao, CPF, salao_id } = req.body;

    try {
        await employeeServices.createFuncionario(nome, cargo, telefone, salario, data_admissao, CPF, salao_id);
        res.status(201).send({ message: 'Funcionário criado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao criar funcionário.' });
    }
});

// Rota para atualizar um funcionário
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, cargo, telefone, salario, data_admissao, CPF, salao_id } = req.body;

    try {
        await employeeServices.updateFuncionario(id, nome, cargo, telefone, salario, data_admissao, CPF, salao_id);
        res.status(200).send({ message: 'Funcionário atualizado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao atualizar funcionário.' });
    }
});

// Rota para deletar um funcionário (soft delete)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await employeeServices.deleteFuncionario(id);
        res.status(200).send({ message: 'Funcionário deletado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao deletar funcionário.' });
    }
});

export default router;