const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
const sqlite3 = require('sqlite3').verbose();

const app=express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.listen(3000, ()=>{
    console.log(`Server is listening on port 3000`);
});


let db = new sqlite3.Database('formsDB.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the formsDB database.');
  });



//--------------------------------------requests----------------------------------------

  app.get('/getFormsForMainTable', function(req,res) {
  
    db.all('select distinct cleanForms.formID, cleanForms.formName, formsSubs.subs from formsSubs join cleanForms on formsSubs.formID= cleanForms.formID', function(err, rows) { 
      if (err){
        res.sendStatus(500);
      }
      else{
        res.send(rows)
      }
  
      
      })  
  });
  

app.get('/getCleanFormByID/:id', function(req,res) {
  var id = req.params.id;
  
    db.all('select * from cleanForms where formID='+ id , function(err, rows) { 
      if (err){
        
        res.status(500);
      }
      else{
        res.send(rows)
      }
  
      
      })  
  });


  app.get('/getAllForms', function(req,res) {
  
    db.all('select * from formsSubs ORDER BY formID ASC', function(err, rows) { 
      if (err){
        console.err(err);
        res.status(500);
      }
      else{
        res.send(rows)
      }
  
      
      })  
  });

  app.get('/getAllFullFormsByID/:id', function(req,res) {
    var id = req.params.id;
     var s= 'select distinct cleanForms.formName, fullForms.inputName, fullForms.data from fullForms join cleanForms on fullForms.formID= cleanForms.formID where fullForms.formID='+ id +' ORDER BY fullForms.inputName ASC, fullForms.data ASC';
      db.all(s , function(err, rows) { 
        if (err){
          
          res.sendStatus(500);
        }
        else{
          res.send(rows);
        }
    
        
        })  
    });



app.post('/saveCleanForm', function(req,res) {
  var fields= req.body.fields;
  var formName= req.body.formName;
  var formID= req.body.formID;
  var values="";
  // create values string: (formName, label, name, type),.....
  for (var i=0; i<fields.length; i++)
  {
      values+= "(";
      values+= "\""+ formID + "\",";
      values+= "\""+ formName + "\",";
      values+= "\""+ fields[i].label + "\",";
      values+= "\""+ fields[i].name + "\",";
      values+= "\""+ fields[i].type+ "\")";
      if (i< fields.length-1)
        values+= ",";
  }  

  let query= 'INSERT INTO cleanForms (formID, formName, labelName, inputName, inputType) VALUES '+ values;
  db.all(query , function(err, rows) { 
    if (err){
      return res.sendStatus(500);
    }
    else{
         res.sendStatus(200);
         return
    }

    
    })  
});


app.post('/initFormSubs', function(req,res) {
  let query2= 'INSERT INTO formsSubs (subs) VALUES ("0")';
      db.all(query2 , function(err, rows) { 
        if (err){
           res.sendStatus(500);
        }
        else{
          res.sendStatus(200);
        }
    })  
});


app.post('/saveFullForm', function(req,res) {
  var formID= req.body.formID;
  var names= req.body.names;
  var values="";
  for (var i=0; i<names.length; i++)
  {
      values+= "(";
      values+= "\""+ formID + "\",";
      values+= "\""+ names[i].inputName + "\",";
      values+= "\""+ names[i].data + "\")";
      if (i< names.length-1)
        values+= ",";
  }  
  let query= 'INSERT INTO fullForms (formID, inputName, data) VALUES '+ values;
  db.all(query, function(err, rows) { 
    if (err){
      res.sendStatus(500);
    }
    else{//good
      let query2= "select * from formsSubs order by formID ASC"
      db.all(query2, function(err, rows) { 
        if (err){
          res.sendStatus(500);
        }
        else{//good
          let upSubs= rows[rows.length-1].subs+1;
          let query3= "update formsSubs set subs='"+upSubs+ "' where formID='" +formID + "'"
          db.all(query3, function(err, rows) { 
            if (err){
              res.sendStatus(500);
            }
            else{
              res.sendStatus(200)
        
              
            }
        
            
            })
    
          
        }
    
        
        })  
      
    }

    
    })  
});









