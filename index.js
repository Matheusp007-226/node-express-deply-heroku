var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json())
const nodemailer = require('nodemailer');

const port = process.env.PORT || 3001;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "sac@sgnsistemas.com.br",
        pass: "inova*@78#q)hRj)p-071"
    },
    tls: { rejectUnauthorized: false }
  });

  const mailOptions = {
    from: 'sac@sgnsistemas.com.br',
    to: 'matheus.007brasil@gmail.com',
    subject: 'E-mail enviado usando Node!',
    text: 'Bem fácil, não? ;)'
  };


let resp_json = {nome: "Matheus pimentel", idade: 26};

  app.get('/webhook',function(req, res) {

        res.json(resp_json);

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email enviado: ' + info.response);
            }
          });

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

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email enviado: ' + info.response);
            }
          });
        
    
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

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });

  })

  app.delete('/webhook', (req, res) => {

        if(req.body.tipo == 'transacao_documento'){

            console.log(req.body);

            res.json(req.body);
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email enviado: ' + info.response);
            }
          });

  })

  app.listen(port, () => {

        console.log('Servidor rodando...');

  })