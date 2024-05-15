const conectarBancoDeDados = require('../config/db');

async function insert(cliente) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();

        const res = await connection.query('INSERT INTO cliente (nome, data_nasc, cpf, sexo, estado_civil, email, telefone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [cliente.nome, cliente.data_nasc, cliente.cpf, cliente.sexo, cliente.estado_civil, cliente.email, cliente.telefone]);
        console.log('RESULTADO INSERT CLIENTE =>', res);

        await connection.commit();
        console.log('Transação concluída com sucesso.');
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return (error);
    } finally {
        await connection.end();
    }
}
module.exports = { insert };