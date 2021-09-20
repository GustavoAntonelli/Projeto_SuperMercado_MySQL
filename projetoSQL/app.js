var express = require("express");
var mysql = require('mysql');
const app = express();
const PORT = 7000;


var con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "user",
    database: "mercado"
});


app.set("view engine", "ejs");
app.set("views",__dirname,"/views");
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));


//ROTA PAGINA PRINCIPAL
app.get("/", (req, res)=> {
    res.send("Home");
});


//ROTA LISTAGEM DE LIVROS
app.get("/produtos", (req, res)=>{
    con.query(
        'SELECT * FROM produtos', 
        (err, rows) => {
        if (err) throw err
    
        rows.forEach(row => {
            console.log(`${row.id_produto}, ${row.nome_produto}, ${row.marca_produto}, ${row.quantidade}`)
        });
        res.render("produtos", {produto_lista: rows})
    })
    
});


app.get("/procuraProduto", (req, res) => {
    var resValor = req.query.procura;
    var sql = `SELECT * FROM produtos WHERE '${resValor}' IN (codigo_categoria, nome_produto, marca_produto, quantidade)`;
    con.query(sql, (err, rows) =>{
        if(err) throw err
        res.render("produtos", {produto_lista:rows})
    });   
});

//ROTA CADASTRO LIVROS
app.get("/cadastrarProduto", (req, res)=>{
    res.render("formproduto");
});


//ROTA CADASTRANDO LIVRO
app.post("/cadastrarProduto", (req, res)=>{
    produtoId = req.body.codigo_categoria;
    produtoNome = req.body.nome_produto;
    produtoMarca = req.body.marca_produto;
    produtoQuantidade = req.body.quantidade;
    var sql = `INSERT INTO produtos(codigo_categoria, nome_produto, marca_produto, quantidade) VALUES('${produtoId}', '${produtoNome}', '${produtoMarca}', '${produtoQuantidade}')`;
    con.query(sql, function(err, result){
        if(err) throw err;
          console.log("dado inserido: " + sql);
    });
        return res.redirect("/produtos");
});


//ROTA DELETAR LIVRO DO DB
app.get("/deletarProduto/:id", (req, res)=>{
    var id = req.params.id;
    var sql = `DELETE FROM produtos WHERE id_produto = ?`;
    con.query(sql, [id], function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + sql);
    });
    return res.redirect("/produtos");

});


//ROTA DE EDIÇAO
app.get("/editarProduto/:id", (req, res)=>{
    var UserId = req.params.id;
    var sql = `SELECT * FROM produtos WHERE id_produto= ${UserId}`;
    con.query(sql, function (err, rows) {
        if (err) throw err;
        console.log("Number of records update: " + sql);
        return res.render("editarformproduto", {produto_item:rows[0]})
    });  
});


//ROTA EDITANDO LIVRO
app.post("/editarProduto", (req, res)=>{
    var id = req.body.id_produto;
    var updateData= req.body;
    var sql = `UPDATE produtos SET ? WHERE id_produto = ?`;
    con.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
      });
      res.redirect('/produtos');
 });


app.get("/entradaProduto/:id", (req, res)=>{
    var UserId = req.params.id;
    var sql = `SELECT * FROM produtos WHERE id_produto= ${UserId}`;
    con.query(sql, function (err, rows) {
        if (err) throw err;
        console.log("Quantidade de produtos selecionada: " + sql);
        return res.render("entradas", {produto_item:rows[0]})
    });
});

app.post("/entradaProduto", (req, res)=>{
    var id = req.body.id_produto;
    var updateData = {}
    updateData.quantidade = parseInt(req.body.quantidade);
    updateData.quantidade += parseInt(req.body.quantidade_anterior)
    var sql = `UPDATE produtos SET ? WHERE id_produto = ?`;
    con.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
      });
      res.redirect('/produtos');
 });

 app.get("/saidaProduto/:id", (req, res)=>{
    var UserId = req.params.id;
    var sql = `SELECT * FROM produtos WHERE id_produto= ${UserId}`;
    con.query(sql, function (err, rows) {
        if (err) throw err;
        console.log("Quantidade de produtos selecionada: " + sql);
        return res.render("saidas", {produto_item:rows[0]})
    });
});

app.post("/saidaProduto", (req, res)=>{
    var id = req.body.id_produto;
    var updateData = {}
    updateData.quantidade = parseInt(req.body.quantidade_anterior);
    updateData.quantidade -= parseInt(req.body.quantidade)
    console.log(updateData.quantidade)
    if(updateData.quantidade == 0 || updateData.quantidade > 0){
        var sql = `UPDATE produtos SET ? WHERE id_produto = ?`;
        con.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
      });
        res.redirect('/produtos');
    }else if(updateData.quantidade < 0){
        res.redirect('/produtos');
    }
 });


app.listen(PORT, ()=>{
    console.log(`server running gate ${PORT}`)
});