//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o express para o postman e para usar a pagina

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
const port = 3000;

//configurando o banco de dados

mongoose.connect("mongodb://127.0.0.1:27017/bookhaven", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//criando a model do seu projetoconst 
UsuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String
    }
});
const Usuario = mongoose.model("Usuario", UsuarioSchema);

produtolivrariaSchema = new mongoose.Schema({
    id_produtolivraria: {
        type: String,
        required: true
    },
    descricao: {
        type: String
    },
    editora: {
        type: String
    },
    dataDeImpressao: {
        type: Date
    },
    qntEstoque: {
        type: Number
    }
});
const Produtolivraria = mongoose.model("produtolivraria", produtolivrariaSchema);

//configuração dos roteamendos//
app.post("/cadastrousuario", async (req, res) => {

    const email = req.body.email;
    const senha = req.body.senha

    const usuario = new Usuario({
        email: email,
        senha : senha
    });
    try {
        const newUsuario = await await usuario.save();
        res.status(400).json({
            error: null,
            msg: "Cadastro ok",
            UsuarioId: newUsuario._id
        });
    } catch (error) {}
});

app.post("/cadastroprodutolivraria", async (req, res) => {

    const id_produtolivraria = req.body.id_produtolivraria;
    const descricao = req.body.descricao;
    const editora = req.body.editora;
    const dataDeImpressao = req.body.dataDeImpressao
    const qntEstoque = req.body.qntEstoque

    const produtolivraria = new Produtolivraria({
        id_produtolivraria : id_produtolivraria,
        descricao : descricao,
        editora : editora,
        dataDeImpressao : dataDeImpressao,
        qntEstoque : qntEstoque,
    });
    try {
        const newProdutolivraria = await produtolivraria.save();
        return res.json({
            error: null,
            msg: "Cadastro ok",
            UsuarioId: newProdutolivraria._id
        });
    } catch (error) {}
});

app.get("/", async(req, res)=>{
    res.json({error: null,msg: "bem vindo"})
});

app.listen(port, (res, req) => {
    console.log(`Servidor rodanda na porta ${port}`)
});