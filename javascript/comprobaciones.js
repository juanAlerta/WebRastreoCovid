function comprobarLogin() {
    formCorrecto = true;
    fallo = "";

    dniUser = document.getElementById("ldniUser");
    
    if(!checkDNI(dniUser.value)){
        dniUser.style.border = "2px solid red";
        dniUser.value = "";
        formCorrecto = false;
        mal += "DNI no válido.\n";
    }

    pass = document.getElementById("lpass");
    
    if(!checkPassword(pass.value)){
        pass.style.border = "2px solid red";
        pass.value = "";
        formCorrecto = false;
        mal += "Contraseña no válida.\n";
    }

    if(formCorrecto){
        $.ajax({
            url: './php/cogerUsuario.php?dniUser=' + dniUser.value + '&pass=' + pass.value,
            type: 'GET',
            dataType: 'json',
        })
        .done(function(data){
            if(typeof data[0] === "undefined"){
                alert("DNI o contraseña incorrectos. Intentalo de nuevo.");
                pass.value = "";
            }else{
                window.open("login.php?dniUser=" + dniUser.value + "&pass=" + pass.value ,"_self");
            }
        })
        .fail(function(){
            alert("No se ha podido iniciar sesión. Intentalo de nuevo más tarde.");
        });
    }else{
        alert(fallo);
    }
}


function comprobarRegistroCaso() {
    formCorrecto = true;
    fallo = "";
    
    dniCaso = document.getElementById("rdniCaso");
    
    if(!checkDNI(dniCaso.value)){
        dniCaso.style.border = "2px solid red";
        dniCaso.value = "";
        formCorrecto = false;
        mal += "DNI no válido.\n";
    }

    nombreCaso = document.getElementById("rnombre");
    
    if(!checkNombre(nombreCaso.value)){
        nombreCaso.style.border = "2px solid red";
        nombreCaso.value = "";
        formCorrecto = false;
        mal += "Nombre no válido.\n";
    }

    movilCaso = document.getElementById("rmovil");
    
    if(!checkMovil(movilCaso.value)){
        movilCaso.style.border = "2px solid red";
        movilCaso.value = "";
        formCorrecto = false;
        mal += "Móvil no válido.\n";
    }

    emailCaso = document.getElementById("remail");
    
    if(!checkEmail(emailCaso.value)){
        emailCaso.style.border = "2px solid red";
        emailCaso.value = "";
        formCorrecto = false;
        mal += "Email no válido.\n";
    }

    fechaAperturaCaso = document.getElementById("rfechaApertura");
    fechaCierreCaso = document.getElementById("rfechaCierre");

    if(fechaCierreCaso == null){
        if(formCorrecto){
            $.ajax({
                url: './php/guardarCaso.php?dniCaso=' + dniCaso.value + '&nombreCaso=' + nombreCaso.value + '&movilCaso=' + movilCaso.value + '&emailCaso=' + emailCaso.value + '&fechaAperturaCaso=' + fechaAperturaCaso.value  + '&fechaCierreCaso=NULL',
                type: 'POST',
                dataType: 'text',
            })
            .fail(function(){
                alert("No se ha podido registrar el caso. Intentalo de nuevo más tarde.");
            });
        }else{
            alert(mal);
        }

    } else {
        if(formCorrecto){
            $.ajax({
                url: './php/guardarCaso.php?dniCaso=' + dniCaso.value + '&nombreCaso=' + nombreCaso.value + '&movilCaso=' + movilCaso.value + '&emailCaso=' + emailCaso.value + '&fechaAperturaCaso=' + fechaAperturaCaso.value  + '&fechaCierreCaso=' + fechaCierreCaso.value, 
                type: 'POST',
                dataType: 'text',
            })
            .fail(function(){
                alert("No se ha podido registrar el caso. Intentalo de nuevo más tarde.");
            });
        }else{
            alert(mal);
        }
    }

}

function comprobarRegistroEvento(){
    formCorrecto = true;
    fallo = "";

    fechaNotificacionEvento = document.getElementById("rfechaNotificacion");
    fechaEfectoEvento = document.getElementById("rfechaEfecto");

    descripcionEvento = document.getElementById("rdescripcion");

    if(!checkTexto(descripcionEvento.value)){
        descripcionEvento.style.border = "2px solid red";
        descripcionEvento.value = "";
        formCorrecto = false;
        mal += "Descripción no válida.\n";
    }

    if(fechaEfectoEvento == null){
        if(formCorrecto){
            $.ajax({
                url: './php/guardarEvento.php?fechaNotificacionEvento=' + fechaNotificacionEvento.value + '&descripcionEvento=' + descripcionEvento.value,
                type: 'POST',
                dataType: 'text',
            })
            .fail(function(){
                alert("No se ha podido registrar el evento. Intentalo de nuevo más tarde.");
            });
        }else{
            alert(mal);
        }

    } else {
        if(formCorrecto){
            $.ajax({
                url: './php/guardarEvento.php?fechaNotificacionEvento=' + fechaNotificacionEvento.value + '&fechaEfectoEvento=' + fechaEfectoEvento.value + '&descripcionEvento=' + descripcionEvento.value,
                type: 'POST',
                dataType: 'text',
            })
            .fail(function(){
                alert("No se ha podido registrar el evento. Intentalo de nuevo más tarde.");
            });
        }else{
            alert(mal);
        }
    }

}

function actualizarEstado(idEvento, nuevoEstado){
    console.log("hola");
    $.ajax({
        url: './php/cambiarEstado.php?idEvento=' + idEvento + "&nuevoEstado=" + nuevoEstado,
        type: 'POST',
        dataType: 'text',
    })
    .done(function(data){
        location.reload();
    })
    .fail(function(){
        alert("No se ha podido actualizar el estado del evento. Intentalo de nuevo más tarde.");
    });
}