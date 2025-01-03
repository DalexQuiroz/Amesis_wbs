document.querySelector('.formulario_amesis').addEventListener('submit', function (event) {
    event.preventDefault();
    const socio = document.getElementById('socio').value;
    const contrasena= document.getElementById('contrasena').value;
    const folio = document.getElementById('folio').value;
    const inputs_form= document.querySelector('.inputs_pagina1');
    const inputs = inputs_form.querySelectorAll("input, select");
        let valid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                valid = false;
                input.reportValidity();
            }
        });
        if (!valid) {
            return;
        }

    const objeto_posiciones={
        socio:socio,
        contrasena:contrasena,
        folio:folio
    }
    url_consultar_folio="http://192.168.1.76:8082/consultarFolio"
    fetch(url_consultar_folio,{
     method:"POST",
     headers:{
        "Content-Type": "application/json",
     },body:JSON.stringify(objeto_posiciones),    
    })
    .then(response => {
        if (!response.ok){
            throw new Error("Request error in consultarFolio")
            
        }
        return response.json()
    })
    .then(data=>{
        // console.log(data)
        if (data.status =="success"){
            showNotification("Estatus obtenido con éxito",'success')
            const table_body= document.getElementById('body_folio_unico');
            table_body.innerHTML=""
            const row = document.createElement('tr')
            row.innerHTML = `
                        <td>${data.folio}</td>
                        <td>${data.evento}</td>
                        <td>${data.placas}</td>
                        <td>${data.estatus}</td>
                        <td>${data.estatus_autoridad}</td>
                        <td>${data.estatus_oficial}</td>
                        <td>${data.last_date_pos}</td>
                    `;
                    table_body.appendChild(row)
            document.getElementById('formularioPaginado').reset()

        }
        else{
            showNotification("Folio o claves no válidas",'error')
        }
        
        
    })
    .catch(error =>{
        console.log("There was a problem with consultarFolio",error)
    })
})



function showNotification(message, type) {
    var notification = document.getElementById('notification');
    var notificationMessage = document.getElementById('notificationMessage');
    var progressBar = document.querySelector('.progress-bar');
    notificationMessage.textContent = message;
    if (type === 'success') {
        notification.style.backgroundColor = 'rgba(0, 128, 0, 0.877)';
    } else if (type === 'error') {
        notification.style.backgroundColor = 'rgba(255, 0, 0, 0.918)';
    }
    notification.classList.add('show');
    progressBar.classList.add('loading');
    setTimeout(function() {
        notification.classList.remove('show');
        progressBar.classList.remove('loading'); 
    }, 2000);
}
