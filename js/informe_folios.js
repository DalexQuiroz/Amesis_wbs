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
    const fechaInicioInput = document.getElementById("fecha_incio").value;
    const fecha_inicio = fechaInicioInput.split("T").join(" ");
    const fechaFinInput= document.getElementById('fecha_fin').value;
    const fecha_fin = fechaFinInput.split("T").join(" ");
    const socio = document.getElementById('socio').value;
    const contrasena= document.getElementById('contrasena').value;
    const objeto_posiciones={
        socio:socio,
        contrasena:contrasena,
        fecha_inicio:fecha_inicio,
        fecha_fin:fecha_fin
    }
    // console.log(objeto_posiciones)

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
    const url = "http://192.168.1.76:8082/informe_folios";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            socio:socio,
            contrasena:contrasena,
            fecha_inicio:fechaInicioInput,
            fecha_fin:fechaFinInput
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
            // console.log(data)
            const filteredData = data.data.map(element => ({
                Folio: element.folio,
                Evento: element.evento,
                Carga: element.carga,
                Estatus: element.estatus,
                Remolque: element.remolque,
                Placas: element.placas,
                Economico:element.eco,
                "Estatus Autoridad":element.estatus_autoridad,
                "Estatus Oficial":element.estatus_oficial
            }));

            const downloadButton = document.getElementById('download-btn');
            downloadButton.addEventListener('click', () => {
                const worksheet = XLSX.utils.json_to_sheet(filteredData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Datos Obtenidos");
                XLSX.writeFile(workbook, "informe_folios.xlsx");
            });
            if (data.code==0){
                if (data.data.length==0){
                    const paginationDiv = document.getElementById('pagination');
                    if (paginationDiv) {
                        paginationDiv.innerHTML = "";
                    }
                    renderPaginatedTable(data.data);
                    showNotification("No se encontraron resultados",'error')
                    mostrarPagina(1)
                    resetFechaInputs();
                }
                else{
                    const paginationDiv = document.getElementById('pagination');
                    if (paginationDiv) {
                        paginationDiv.innerHTML = "";
                    }
                    renderPaginatedTable(data.data);
                    showNotification("Folios obtenidos con éxito",'success')
                    mostrarPagina(1)
                    resetFechaInputs();
                }
                
            }
            else if(data.code==-1){
                showNotification("El ID de Socio o la contraseña son incorrectas",'error')
                const paginationDiv = document.getElementById('pagination');
                    if (paginationDiv) {
                        paginationDiv.innerHTML = "";
                    }
                    renderPaginatedTable(data.data);
                    mostrarPagina(1)
                    resetFechaInputs();
            }

            else{
                showNotification("No se encontraron resultados",'error')
            }
                    
                
                
            
        })
        .catch(error => {
            console.error("Error consultando la tabla de folios:", error.message);
            showNotification("No se encontraron resultados",'error')
        });
});

let currentPage = 1;
const rowsPerPage = 5;

function renderPaginatedTable(data) {
    const table_body = document.getElementById('body_informe_folios');
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
            table_body.innerHTML = '<tr><td colspan="9">No hay datos para mostrar</td></tr>';
        } else {
            pageData.forEach(element => {
                const row = document.createElement('tr');
                row.innerHTML = `
                        <td>${element.folio}</td>
                        <td>${element.evento}</td>
                        <td>${element.carga}</td>
                        <td>${element.estatus}</td>
                        <td>${element.remolque}</td>
                        <td>${element.placas}</td>
                        <td>${element.eco}</td>
                        <td>${element.estatus_autoridad}</td>
                        <td>${element.estatus_oficial}</td>
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
    document.querySelector('#tabla_folio_unico').appendChild(div);
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