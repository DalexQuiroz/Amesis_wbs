function resetFechaInputs() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = "01";
    const minutes = "00";
    const hours_fin = "23";
    const minutes_fin = "59";
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    const formattedDateFin = `${year}-${month}-${day}T${hours_fin}:${minutes_fin}`;

    const fechaInicioInput = document.getElementById("fecha_incio");
    fechaInicioInput.setAttribute("max", formattedDateFin);
    fechaInicioInput.value = formattedDate;

    const fechaFinInput = document.getElementById('fecha_fin');
    fechaFinInput.setAttribute("max", formattedDateFin);
    fechaFinInput.value = formattedDateFin;
}

document.addEventListener("DOMContentLoaded", function () {
    resetFechaInputs(); 
    document.querySelector('.formulario_amesis').addEventListener('reset', function () {
        resetFechaInputs(); 
    });
});

document.querySelector('.formulario_amesis').addEventListener('submit', function (event) {
    event.preventDefault();

    const inputs_form = document.querySelector('.claves');
    const inputs = inputs_form.querySelectorAll("input, select");
    const id_fulltime = document.getElementById('id_fulltime').value;
    const opciones = document.getElementById('opciones').value;
    const placas = document.getElementById('unidades_informe').value;
    const fecha_incio_value = document.getElementById('fecha_incio').value;
    const fecha_inicio = fecha_incio_value.split("T").join(" ");
    const fecha_fin_value = document.getElementById('fecha_fin').value;
    const fecha_fin = fecha_fin_value.split("T").join(" ");

    const objeto_test={
        id_fulltime:id_fulltime,
        opciones:opciones,
        placas:placas,
        fecha_inicio:fecha_inicio,
        fecha_fin:fecha_fin
    }
    // console.log(objeto_test)

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
    currentPage = 1;
    const paginationDiv = document.getElementById('pagination');
    if (paginationDiv) {
        paginationDiv.innerHTML = "";
    }
    const url = "http://192.168.1.76:8082/InformeEventos";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_fulltime: id_fulltime,
            opciones:opciones,
            placas:placas,
            fecha_inicio:fecha_inicio,
            fecha_fin:fecha_fin
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

            const filteredData = data.results.map(element => ({
                "Id vehículo": element.id_vehiculo,
                Placa: element.placas,
                Fecha: element.fecha_evento.split("T").join(" "),
                Estatus: element.msg,
                "Tipo de evento": element.tipo_evento,
                Folio: element.folio
            }));

            const downloadButton = document.getElementById('download-btn');
            downloadButton.addEventListener('click', () => {
                const worksheet = XLSX.utils.json_to_sheet(filteredData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Datos Obtenidos");
                XLSX.writeFile(workbook, "informe_eventos.xlsx");
            });
                if (data.code==0){
                    const table_body = document.getElementById('body_folios');
                    table_body.innerHTML = "";
                    const row = document.createElement('tr');
                    row.classList.add("no-data-cell")
                    row.innerHTML = `
                        <td colspan="5">${"Consulta tus folios"}</td>
                    `;
                    table_body.appendChild(row);
                    showNotification("No se encontraron resultados",'error')
                    mostrarPagina(1)
                }
                else{
                    const paginationDiv = document.getElementById('pagination');
                    if (paginationDiv) {
                        paginationDiv.innerHTML = "";
                    }
                    renderPaginatedTable(data.results);
                    showNotification("Folios obtenidos con éxito",'success')
                    mostrarPagina(1)
                    document.getElementById('consultarFolio').reset()
                    resetFechaInputs();
                }
                
            
        })
        .catch(error => {
            console.error("Error consultando la tabla de folios:", error.message);
            showNotification("No se encontraron resultados",'error')
        });
});

let currentPage = 1;
const rowsPerPage = 10;

function renderPaginatedTable(data) {
    const table_body = document.getElementById('body_folios');
    const paginationDiv = document.getElementById('pagination') || createPaginationDiv();

    const totalRows = data.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    function renderPage(page) {
        currentPage = page;
        table_body.innerHTML = "";
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
        const pageData = data.slice(startIndex, endIndex);

        if (pageData.length === 0) {
            table_body.innerHTML = '<tr><td colspan="5">No hay datos para mostrar</td></tr>';
        } else {
            pageData.forEach(element => {
                const row = document.createElement('tr');
                const fecha_evento_final = element.fecha_evento.split("T").join(" ");
                row.innerHTML = `
                    <td>${element.id_vehiculo}</td>
                    <td>${element.placas}</td>
                    <td>${fecha_evento_final}</td>
                    <td>${element.msg}</td>
                    <td>${element.tipo_evento}</td>
                    <td>${element.folio}</td>
                `;
                table_body.appendChild(row);
            });
        }

        renderPaginationControls(totalPages);
    }

    function renderPaginationControls(totalPages) {
        paginationDiv.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.className = currentPage === i ? "active" : "";
            button.addEventListener('click', () => renderPage(i));
            paginationDiv.appendChild(button);
        }
    }

    renderPage(currentPage);
}

function createPaginationDiv() {
    const div = document.createElement('div');
    div.id = 'pagination';
    div.style.marginTop = "10px";
    document.querySelector('#tabla_folios').appendChild(div);
    return div;
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

function obtenerPlacas(){
    const opciones = document.getElementById('opciones').value;
    const id_fulltime= document.getElementById('id_fulltime').value;

    const payload={
        opciones:opciones,
        id_fulltime:id_fulltime
    }
    url_genera_evento_amesis="http://192.168.1.76:8082/obtenerPlacasMysql"
    fetch(url_genera_evento_amesis,{
     method:"POST",
     headers:{
        "Content-Type": "application/json",
     },body:JSON.stringify(payload),    
    })
    .then(response => {
        if (!response.ok){
            throw new Error("Request error in obtenerPlacasMysql")
        }
        return response.json()
    })
    .then(data=>{
        if (data.code==2){
            const unidades_informe= document.getElementById('unidades_informe');
            unidades_informe.disabled = false; 
            unidades_informe.classList.remove('input_readonly'); 
            unidades_informe.innerHTML = "";        
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.textContent = "--Seleccione una unidad--";
            unidades_informe.appendChild(defaultOption)
            data.placas.forEach(element=>{
                const option= document.createElement('option')
                option.innerHTML=element
                option.value= element
                unidades_informe.appendChild(option)
            })
        }
        else if (data.code==1){
            const unidades_informe= document.getElementById('unidades_informe');
            unidades_informe.innerHTML=""
            const defaultOption = document.createElement('option');
            defaultOption.value = "Todos";
            defaultOption.disabled = true;
            unidades_informe.disabled=true;
            unidades_informe.classList.add('input_readonly');
            defaultOption.selected = true;
            defaultOption.textContent = "TODAS LAS UNIDADES";
            unidades_informe.appendChild(defaultOption)
        }
        else if (data.code==0){
            showNotification("ID de fulltime inválido",'error');
            const unidades_informe= document.getElementById('unidades_informe');
            unidades_informe.innerHTML = "";  
            unidades_informe.classList.remove('input_readonly');
            unidades_informe.disabled = false;    
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.textContent = "--Seleccione una unidad--";
            unidades_informe.appendChild(defaultOption)
            const table_body = document.getElementById('body_folios');
            table_body.innerHTML = "";
            const row = document.createElement('tr');
            row.classList.add("no-data-cell")
            row.innerHTML = `
                        <td colspan="5">${"Consulta tus folios"}</td>
                    `;
            table_body.appendChild(row);
            showNotification("No se encontraron resultados",'error')
            mostrarPagina(1)
        }
        
    })
    .catch(error =>{
        console.log("There was a problem with obtenerPlacasMysql",error)
    })

}