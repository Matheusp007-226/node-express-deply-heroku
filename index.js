var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json())

const port = process.env.PORT || 3001;


let resp_json = {nome: "Matheus pimentel", idade: 26};

  app.get('/webhook',function(req, res) {

        res.json(resp_json);

  })

  app.post('/webhook',function(req, res) {

        if(req.body.tipo == 'transacao'){

            console.log('TRANSAÇÃO');

            console.log(req.body);
            res.json(req.body);

        }else if(req.body.tipo == 'transferencia'){

            console.log('TRANFERÊNCIA');

            console.log(req.body);
            res.json(req.body);

        }
        
    
  })

  app.put('/webhook', function(req, res) {

    if(req.body.tipo == 'transacao_documento'){

        console.log('Documento '+ req.body.documento[0].nome+ ' vinculado a transação')

        console.log(req.body);

        res.json(req.body);

    }else if(req.body.tipo == "conta_digital"){

        console.log('APROVAÇÃO DE CONTA!');

        console.log(req.body);

        res.json(req.body);
    }

  })

  app.delete('/webhook', (req, res) => {

        if(req.body.tipo == 'transacao_documento'){

            console.log(req.body);

            res.json(req.body);
        }

  })

  app.listen(port, () => {

        console.log('Servidor rodando...');

  })