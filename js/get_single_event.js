document.querySelector('.formulario_amesis').addEventListener('submit', function (event) {
    event.preventDefault();
    const socio= document.getElementById('socio').value
    const contrasena = document.getElementById('contrasena').value
    const imei= document.getElementById('id_vehiculo').value
    const tipo_evento = document.getElementById('tipo_evento').value
    const tipo_evento_int = parseInt(tipo_evento,10)
    const tipo_unidad= document.getElementById('tipo_unidad').value
    const tipo_unidad_int = parseInt(tipo_unidad,10)
    const placas = document.getElementById('placas').value;
    const economico  = document.getElementById('economico').value;
    const no_serie= document.getElementById('no_serie').value;
    const color =  document.getElementById('color').value;
    const marca= document.getElementById('marca').value;
    const modelo= document.getElementById('modelo').value;
    const capacidad= document.getElementById('capacidad').value;
    const capacidad_float= parseFloat(capacidad)
    const tipo_remolque= document.getElementById('tipo_remolque').value;
    const tipo_remolque_int= parseInt(tipo_remolque,10)
    const robo_mercancia= document.getElementById('robo_mercancia').value;
    const tipo_mercancia= document.getElementById('tipo_mercancia').value;
    const tipo_mercancia_int= parseInt(tipo_mercancia,10)
    const monto_carga= document.getElementById('monto_carga').value;
    const monto_carga_float= parseFloat(monto_carga)
    const placas_remolque= document.getElementById('placas_remolque').value;    
    const marca_remolque= document.getElementById('marca_remolque').value;
    const color_remolque= document.getElementById('color_remolque').value;
    const economico_remolque= document.getElementById('economico_remolque').value;
    const no_serie_remolque= document.getElementById('no_serie_remolque').value;
    const cliente_afectado= document.getElementById('cliente_afectado').value;
    const persona_reporta= document.getElementById('persona_reporta').value;
    const telefono_persona_reporta= document.getElementById('telefono_persona_reporta').value;
    const fecha_evento= document.getElementById('fecha_evento').value;
    const nombre_conductor= document.getElementById('nombre_conductor').value;
    const apellido_paterno_conductor= document.getElementById('apellido_paterno_conductor').value;
    const apellido_materno_conductor= document.getElementById('apellido_materno_conductor').value;
    const rfc_conductor= document.getElementById('rfc_conductor').value;
    const telefono_conductor= document.getElementById('telefono_conductor').value;
    const telefono_cabina= document.getElementById('telefono_cabina').value;
    const calle= document.getElementById('calle').value;
    const municipio= document.getElementById('municipio').value;
    const ciudad= document.getElementById('ciudad').value;
    const estado= document.getElementById('estado').value;
    const cp= document.getElementById('cp').value;
    const entre_calles= document.getElementById('entre_calles').value;
    const latitud_evento= document.getElementById('latitud_evento').value;
    const latitud_evento_float= parseFloat(latitud_evento)
    const longitud_evento= document.getElementById('longitud_evento').value;
    const longitud_evento_float = parseFloat(longitud_evento)
    const calle_origen= document.getElementById('calle_origen').value;
    const municipio_origen= document.getElementById('municipio_origen').value;
    const estado_origen= document.getElementById('estado_origen').value;
    const referencias_origen= document.getElementById('referencias_origen').value;
    const latitud_origen= document.getElementById('latitud_origen').value;
    const latitud_origen_float= parseFloat(latitud_origen)
    const longitud_origen= document.getElementById('longitud_origen').value;
    const longitud_origen_float= parseFloat(longitud_origen)
    const calle_destino= document.getElementById('calle_destino').value;
    const municipio_destino= document.getElementById('municipio_destino').value;
    const estado_destino= document.getElementById('estado_destino').value;
    const referencias_destino= document.getElementById('referencias_destino').value;
    const latitud_destino= document.getElementById('latitud_destino').value;
    const latitud_destino_float= parseFloat(latitud_destino)
    const longitud_destino= document.getElementById('longitud_destino').value;
    const longitud_destino_float= parseFloat(longitud_destino)
    const id_fulltime= document.getElementById('id_fulltime').value;
    const id_unidad_fulltime= document.getElementById('unidades').value;

    
    const genera_evento={
        socio:socio,
        contrasena:contrasena,
        id_vehículo:imei,
        // id_vehículo:"TESTE 42",
        tipo_evento:tipo_evento_int,
        tipo_unidad:tipo_unidad_int,
        placas:placas,
        // placas:"TESTE 42",
        economico:economico,
        no_serie:no_serie,
        color:color,
        marca:marca,
        modelo:modelo,
        capacidad:capacidad_float,
        tipo_remolque:tipo_remolque_int,
        robo_mercancia:robo_mercancia,
        tipo_mercancia:tipo_mercancia_int,
        monto_carga:monto_carga_float,
        placas_remolque:placas_remolque,
        marca_remolque:marca_remolque,
        color_remolque: color_remolque,
        economico_remolque:economico_remolque,
        no_serie_remolque:no_serie_remolque,
        cliente_afectado:cliente_afectado,
        persona_reporta:persona_reporta,
        telefono_persona_reporta:telefono_persona_reporta,
        fecha_evento:fecha_evento,
        nombre_conductor:nombre_conductor,
        apellido_paterno_conductor:apellido_paterno_conductor,
        apellido_materno_conductor:apellido_materno_conductor,
        rfc_conductor:rfc_conductor,
        telefono_conductor:telefono_conductor,
        telefono_cabina:telefono_cabina,
        calle:calle,
        municipio:municipio,
        ciudad:ciudad,
        estado:estado,
        cp:cp,
        entre_calles:entre_calles,
        latitud_evento:latitud_evento_float,
        longitud_evento:longitud_evento_float,
        calle_origen:calle_origen,
        municipio_origen:municipio_origen,
        estado_origen:estado_origen,
        referencias_origen:referencias_origen,
        latitud_origen:latitud_origen_float,
        longitud_origen:longitud_origen_float,
        calle_destino:calle_destino,
        municipio_destino:municipio_destino,
        estado_destino:estado_destino,
        referencias_destino:referencias_destino,
        latitud_destino:latitud_destino_float,
        longitud_destino:longitud_destino_float,
        id_fulltime:id_fulltime,
        id_unidad_fulltime:id_unidad_fulltime
    }
    const cantidad_items= Object.keys(genera_evento).length;
    url_genera_evento_amesis="http://192.168.1.76:8082/create_event_amesis"
    fetch(url_genera_evento_amesis,{
     method:"POST",
     headers:{
        "Content-Type": "application/json",
     },body:JSON.stringify(genera_evento),    
    })
    .then(response => {
        if (!response.ok){
            throw new Error("Request error in create_event_amesis")
        }
        return response.json()
    })
    .then(data=>{
        if (data.status=="success"){
            showNotification(data.message,'success')
            const table_body= document.getElementById('body_folio_evento');
            const row = document.createElement('tr')
            table_body.innerHTML=""
            row.innerHTML = `
                        <td>${data.processed_data.placas}</td>
                        <td>${data.folio}</td>
                         <td>
                            <button class="copyButton" onclick="copyToClipboard('${data.folio}')">Copiar</button>
                        </td>
                    `;
            table_body.appendChild(row)
            mostrarPagina(1);
            document.getElementById('formularioPaginado').reset();
            
                
        }
        else{
            showNotification(data.message,'error')
        }
        
        
    })
    .catch(error =>{
        console.log("There was a problem with create_event_amesis",error)
    })
})

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            showNotification("Folio copiado al portapapeles",'success');
        })
        .catch(err => {
            console.error("Error al copiar el texto: ", err);
        });
}


function mostrarPagina(paginaActual) {
    const paginaVisible = document.querySelector(".pagina:not([style*='display: none'])");
    if (paginaVisible) {
        const inputs = paginaVisible.querySelectorAll("input, select");
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
    }
    const paginas = document.querySelectorAll(".pagina");
    paginas.forEach(pagina => pagina.style.display = "none");
    const paginaSeleccionada = document.getElementById(`pagina${paginaActual}`);
    if (paginaSeleccionada) {
        paginaSeleccionada.style.display = "block";
    }
}

function limpiarFormularios() {
    const formularios = [document.getElementById("formularioPaginado"), document.getElementById("form_genera_evento")];
    formularios.forEach(formulario => {
        if (formulario) {
            formulario.querySelectorAll("input, select").forEach(campo => {
                if (campo.type === "text" || campo.type === "password" || campo.type=="number" ) {
                    campo.value = "";
                } else if (campo.tagName === "SELECT") {
                    campo.selectedIndex = 0;
                }
            });
        }
    });
}


function obtener_api_keys(){
    const id_fulltime = document.getElementById('id_fulltime').value;
    const clientes = document.getElementById('clientes')
    const select_unidades = document.getElementById('unidades')
    url= "http://192.168.1.76:8082/get_api_claves"
    fetch(url,{
        method:"POST",
        headers:{
           "Content-Type": "application/json",
        },body:JSON.stringify({
            id_fulltime:id_fulltime
        }),    
       })
       .then(response => {
           if (!response.ok){
               throw new Error("Request error in create_event_amesis")
           }
           return response.json()
       })
       .then(data=>{
        if (data.code == 0){
            showNotification("Id fulltime inválido , intente de nuevo",'error')
        }
        else{
            cargarClientes(data.apiKey,data.secretKey,clientes)
            clientes.addEventListener("change", (event) => {
                selectedClienteId = event.target.value;
                const select_client_converted= parseInt(selectedClienteId)
                cargarUnidades(select_client_converted,data.apiKey,data.secretKey, select_unidades);
            });
            select_unidades.addEventListener("change", (event) => {
                id_vehiculo = event.target.value;
                const id_vehiculo_converted= parseInt(id_vehiculo)
                obtenerInformacionUnidades(id_vehiculo_converted,data.apiKey,data.secretKey)
            });
        }
        
        
       })
       .catch(error =>{
           console.log("There was a problem with create_event_amesis",error)
       })
}

function cargarClientes(apiKey, secretKey, select_clientes) {
    const url = "http://192.168.1.76:8082/get_clients";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            apiKey: apiKey,
            secretKey: secretKey
        }),
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                console.error("Respuesta del servidor:", text);
                throw new Error(`Error al obtener unidades: ${response.statusText}, Respuesta: ${text}`);
            });
        }
        return response.json();
    })
    .then(data => {
        select_clientes.innerHTML = ""; 
        
        if (data.data && Array.isArray(data.data)) {
            const response = data.data;
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.textContent = "--Seleccione una unidad--";
            select_clientes.appendChild(defaultOption);
            response.forEach(element => {
                const option = document.createElement("option");
                option.textContent = element.ras_cli_desc;
                option.value = element.ras_cli_id;
                select_clientes.appendChild(option);
            });
        } else {
            console.error("Error: 'data.data' no contiene un arreglo válido");
        }
    })
    .catch(error => {
        console.error("Error al cargar unidades:", error.message);
    });
}

function cargarUnidades(clienteId, apiKey, secretKey, select_unidades) {
    const url = "http://192.168.1.76:8082/get_units_name";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            apiKey: apiKey,
            secretKey: secretKey,
            id_client: clienteId, 
        }),
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    console.error("Respuesta del servidor:", text);
                    throw new Error(`Error al obtener unidades: ${response.statusText}, Respuesta: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error("Formato de datos inválido, se esperaba un array.");
            }
            select_unidades.innerHTML = ""; 
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.textContent = "--Seleccione una unidad--";
            select_unidades.appendChild(defaultOption);
            data.forEach(element => {
                const unit_name = `${element.ras_vei_placa} - ${element.ras_vei_veiculo}`;
                const option = document.createElement('option');
                option.textContent = unit_name;
                option.value=element.ras_vei_id;
                select_unidades.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error al cargar unidades:", error.message);
        });
}


function obtenerInformacionUnidades(id_vehiculo, apiKey, secretKey) {

    const url = "http://192.168.1.76:8082/get_informacion_unidad";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            apiKey: apiKey,
            secretKey: secretKey,
            id_vehiculo: id_vehiculo, 
        }),
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    console.error("Respuesta del servidor:", text);
                    throw new Error(`Error al obtener unidades: ${response.statusText}, Respuesta: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            const informacion_registro = data.registration_information.data
            const informacion_registro_data= informacion_registro[0];
            const single_event= data.single_event.data
            const single_event_info= single_event[0]
            const id_vei = document.getElementById('id_vehiculo');
            id_vei.value= single_event_info.ras_ras_id_aparelho
            id_vei.classList.add("input_readonly")
            const plac= document.getElementById('placas');
            plac.value = single_event_info.ras_vei_placa;
            plac.classList.add("input_readonly")
            const economic = document.getElementById('economico');
            economic.value = single_event_info.ras_vei_veiculo;
            economic.classList.add("input_readonly")

            const fecha_api = single_event_info.ras_ras_data_ult_comunicacao;

            function convertirFecha(fechaString) {
                const [fecha, tiempo] = fechaString.split(' '); 
                const [dia, mes, ano] = fecha.split('/');
                const [horas, minutos, segundos] = tiempo.split(':');
                return new Date(ano, mes - 1, dia, horas, minutos, segundos);
            }

            let fecha_api_convertida = convertirFecha(fecha_api);
            fecha_api_convertida.setHours(fecha_api_convertida.getHours() - 6);
            function formatearFecha(fecha) {
                let ano = fecha.getFullYear();
                let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
                let dia = fecha.getDate().toString().padStart(2, '0');
                let horas = fecha.getHours().toString().padStart(2, '0');
                let minutos = fecha.getMinutes().toString().padStart(2, '0');

                return `${ano}-${mes}-${dia} ${horas}:${minutos}`;
            }

            const fecha_evento = formatearFecha(fecha_api_convertida);
            const fecha_evento_input = document.getElementById('fecha_evento');
            fecha_evento_input.value= fecha_evento
            fecha_evento_input.classList.add('input_readonly');
            let latitud = single_event_info.ras_eve_latitude;
            let longitud = single_event_info.ras_eve_longitude;
            const latitud_evento = document.getElementById('latitud_evento');
            latitud_evento.value = parseFloat(latitud)
            latitud_evento.classList.add("input_readonly")
            const longitud_evento= document.getElementById('longitud_evento');
            longitud_evento.value = parseFloat(longitud);
            longitud_evento.classList.add("input_readonly")
            const latitud_origen=document.getElementById('latitud_origen');
            latitud_origen.value = parseFloat(latitud);
            latitud_origen.classList.add("input_readonly")
            const longitud_origen =document.getElementById('longitud_origen');
            longitud_origen.value = parseFloat(longitud);
            longitud_origen.classList.add("input_readonly");
            const color = document.getElementById('color');
            color.value= informacion_registro_data.ras_vei_cor;
            color.classList.add("input_readonly")
            const modelo = document.getElementById('modelo');
            modelo.value= informacion_registro_data.ras_vei_modelo;
            modelo.classList.add("input_readonly")
            modelo


        })
        .catch(error => {
            console.error("Error al cargar unidades:", error.message);
        });
}



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
