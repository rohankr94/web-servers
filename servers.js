const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000 ;
var app=express();


hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getFullYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(str) => {
  return str.toUpperCase();
});

app.use((req,res,next) => {
  var now = new Date().toString();
  var log=`${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n');
  next();
});

// app.use((req,res,next) => {
//   res.render('maintainance.hbs',{
//     message : 'Oh snap ! site under maintainance'
//   })
// });

app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle : 'About page',
  });
});

app.get('/',(req,res) => {
  res.send({
    page : 'Homepage',
    number : '123546'
  });
});
app.listen(port, () => {
  console.log(`server is connected to ${port}`);
});
