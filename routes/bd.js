var mysql=require('mysql');

var conexion=mysql.createConnection({
    host:'bs2zdy0ajr9kcvcutygy-mysql.services.clever-cloud.com',
    user:'ustfvmp4ii57kvg7',
    password:'6pcuHZBqGhmqW86uKLdu',
    database:'bs2zdy0ajr9kcvcutygy'
});

conexion.connect(function (error){
    if (error) {
        console.log('Problemas de conexion con mysql');
        console.log('Error: ' + error);
    }else
        console.log('se inicio conexion');
});


module.exports=conexion;

