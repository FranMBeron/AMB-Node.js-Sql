var express = require('express');
var router = express.Router();

var bd=require('./bd');

//Creación de la tabla
router.get('/creartabla', function(req, res, next) {
   bd.query('drop table if exists alumnos',function (error,resultado){
        if (error) {
          console.log(error);                
          return;
        }
   });    
   bd.query('create table alumnos ('+
                       'MatriculaAlumno int primary key auto_increment,'+
                       'NombreAlumno varchar(30),'+
                       'ApellidoAlumno varchar(30),'+
                       'Domicilio varchar(30),'+
                       'CursoAlumno int,'+
                       'DivisionAlumno int,'+
                       'TurnoAlumno varchar(7),'+
                       'FechaNacAlumno date,'+
                       'EmailAlumno varchar(30),'+
                       'cod_postal int,'+
                       'grupo_sang_alumno varchar(50),'+
                       'tel_fijo_alumno varchar(50),'+
                       'tel_movil_alumno varchar(50),'+
                       'dni_alumno double'+
                    ')', function (error,resultado){
        if (error) {            
          console.log(error);                
          return;
        }  
  });    
  res.render('mensajealumnos',{mensaje:'La tabla se creo correctamente.'});  
});


//Alta de registros
router.get('/alta', function(req, res, next) {
  res.render('altaalumnos');
});


router.post('/alta', function(req, res, next) {
      var registro={
          NombreAlumno:req.body.NombreAlumno,
          ApellidoAlumno:req.body.ApellidoAlumno,
          Domicilio:req.body.Domicilio,
          CursoAlumno:req.body.CursoAlumno,
          DivisionAlumno:req.body.DivisionAlumno,
          TurnoAlumno:req.body.TurnoAlumno,
          FechaNacAlumno:req.body.FechaNacAlumno,
          EmailAlumno:req.body.EmailAlumno,
          cod_postal:req.body.cod_postal,
          grupo_sang_alumno:req.body.grupo_sang_alumno,
          tel_fijo_alumno:req.body.tel_fijo_alumno,
          tel_movil_alumno:req.body.tel_movil_alumno,
          dni_alumno:req.body.dni_alumno
        };
      bd.query('insert into alumnos set ?',registro, function (error,resultado){
          if (error){
              console.log(error);
              return;
          }
      });    
  res.render('mensajealumnos',{mensaje:'La carga se efectuo correctamente'});
});


//Listado de registros
router.get('/listado', function(req, res, next) {
  bd.query('select MatriculaAlumno,NombreAlumno,ApellidoAlumno,Domicilio,CursoAlumno,DivisionAlumno,TurnoAlumno,FechaNacAlumno,EmailAlumno,cod_postal,grupo_sang_alumno,tel_fijo_alumno,tel_movil_alumno,dni_alumno from alumnos', function(error,filas){
        if (error) {            
            console.log('error en el listado');
            return;
        }    
        res.render('listaralumnos',{alumnos:filas});
  });
});

//Batan
router.get('/batan', function(req, res, next) {
  bd.query('select * from alumnos  where cod_postal= 7601', function(error,filas){
        if (error) {            
            console.log('error en el listado');
            return;
        }    
        res.render('listarbatan',{alumnos:filas});
  });
});

//2002
router.get('/2002', function(req, res, next) {
  bd.query('select * from alumnos  where FechaNacAlumno between 20020101 and 20021231', function(error,filas){
        if (error) {            
            console.log('error en el listado');
            return;
        }    
        res.render('listardosmildos',{alumnos:filas});
  });
});

//Batan+RH-
router.get('/batanrh', function(req, res, next) {
  bd.query('select * from alumnos  where cod_postal= 7601 AND grupo_sang_alumno like "rh-"', function(error,filas){
        if (error) {            
            console.log('error en el listado');
            console.log(error);
            return;
        }    
        res.render('listarbatanrh',{alumnos:filas});
  });
});

//DNIASC
router.get('/DNIA', function(req, res, next) {
  bd.query('select * from alumnos ORDER BY dni_alumno ASC', function(error,filas){
        if (error) {            
            console.log('error en el listado');
            console.log(error);
            return;
        }    
        res.render('listardnia',{alumnos:filas});
  });
});

//av.JB.Justo
router.get('/AvJBJ', function(req, res, next) {
  bd.query('select * from alumnos where Domicilio= "av.JB.Justo" ', function(error,filas){
        if (error) {            
            console.log('error en el listado');
            console.log(error);
            return;
        }    
        res.render('listarjbj',{alumnos:filas});
  });
});

//Consulta
router.get('/consulta', function(req, res, next) {
  res.render('consultaalumnos');
});


router.post('/consulta', function(req, res, next) {
  bd.query('select NombreAlumno,ApellidoAlumno,CursoAlumno,DivisionAlumno,TurnoAlumno,FechaNacAlumno,EmailAlumno,cod_postal,grupo_sang_alumno,tel_fijo_alumno,tel_movil_alumno,dni_alumno from alumnos where MatriculaAlumno=?',req.body.MatriculaAlumno, function(error,filas){
            if (error) {            
                console.log('error en la consulta');
                return;
            }
            if (filas.length>0) {
                res.render('listadoconsulta',{alumnos:filas});
            } else {
                res.render('mensajealumnos',{mensaje:'No existe la matricula de alumno ingresada'});
            }    
        });
});


//Modificacion
router.get('/modificacion', function(req, res, next) {
  res.render('consultamodificacion');
});

router.post('/modificar', function(req, res, next) {
  bd.query('select MatriculaAlumno,NombreAlumno,ApellidoAlumno,CursoAlumno,DivisionAlumno,TurnoAlumno,FechaNacAlumno,EmailAlumno,cod_postal,grupo_sang_alumno,tel_fijo_alumno,tel_movil_alumno,dni_alumno from alumnos where MatriculaAlumno=?',req.body.MatriculaAlumno, function(error,filas){
            if (error) {            
                console.log('error en la consulta');
                return;
            }
            if (filas.length>0) {
                res.render('formulariomodifica',{alumnos:filas});
            } else {
                res.render('mensajealumnos',{mensaje:'No existe la matricula de alumno ingresada'});
            }    
        });
});


router.post('/confirmarmodifica', function(req, res, next) {
  var registro={
        NombreAlumno:req.body.NombreAlumno,
        ApellidoAlumno:req.body.ApellidoAlumno,
        CursoAlumno:req.body.CursoAlumno,
        DivisionAlumno:req.body.DivisionAlumno,
        TurnoAlumno:req.body.TurnoAlumno,
        FechaNacAlumno:req.body.FechaNacAlumno,
        EmailAlumno:req.body.EmailAlumno,
        cod_postal:req.body.cod_postal,
        grupo_sang_alumno:req.body.grupo_sang_alumno,
        tel_fijo_alumno:req.body.tel_fijo_alumno,
        tel_movil_alumno:req.body.tel_movil_alumno,
        dni_alumno:req.body.dni_alumno
      };    
  bd.query('UPDATE alumnos SET ? WHERE ?',[registro,{MatriculaAlumno:req.body.MatriculaAlumno}], function(error,filas){
            if (error) {            
                console.log('error en la consulta');
                console.log(error);
                return;
            }
            res.render('mensajealumnos',{mensaje:'El alumno fue modificado'});
        });
});


module.exports = router;
