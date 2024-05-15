const { insert } = require('../Models/clienteModel.js');

const clienteController = {
    adicionarCliente: async (req, res) => {
        try {
            const { nome, data_nasc, cpf, sexo, estado_civil, email, telefone } = req.body;

            const objCliente = new Cliente(null, nome, data_nasc, cpf, sexo, estado_civil, email, telefone);

            const result = await insert(objCliente);
            return res.json(result);

        } catch (error) {
            console.log(error);
            res.json(error);
        }
    },
}

module.exports = clienteController;
