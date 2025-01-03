from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from procedures.models import GetUnits,CreateEventAmesis,GetClients,GetApiKeys,GetFullUnitInformation,ConsultaFolio,ConsultaUnidadesFolios,InformeFolios,InformeEventos
from fastapi.responses import JSONResponse
from procedures.process import FulltimeApiHandler
from control.db_operations_mysql import MySQLHandler
from procedures.wbs import EventProcessor
import requests

app= FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

fulltime_handler= FulltimeApiHandler()
mysql_operation= MySQLHandler()
event_processor = EventProcessor()


@app.post("/get_units_name")
def get_units_name(request: GetUnits):
    full_response= fulltime_handler.get_plates_name_unit(request.id_client,request.apiKey,request.secretKey)
    return JSONResponse(status_code=200,content=full_response)

@app.post("/create_event_amesis")
def create_event_amesis(request: CreateEventAmesis):
    data = request.model_dump()
    print("Data received:", data)
    processed_response = event_processor.process_event(data)
    return JSONResponse(status_code=200, content=processed_response)

@app.post("/get_clients")
def get_clients_name(request:GetClients):
    full_response= fulltime_handler.get_clients_name(request.apiKey,request.secretKey)
    return JSONResponse(status_code=200,content=full_response)

@app.post("/get_api_claves")
def get_api_claves(request:GetApiKeys):
    response= mysql_operation.query_claves_api(request.id_fulltime)
    return JSONResponse(status_code=200, content=response)

@app.post("/get_informacion_unidad")
def get_informacion_unidad(request: GetFullUnitInformation):
    full_response= fulltime_handler.get_full_unit_informartion(request.apiKey,request.secretKey,request.id_vehiculo)
    return JSONResponse(status_code=200, content=full_response)

@app.post("/consultarFolio")
def consulta_folio(request:ConsultaFolio):
    data = request.model_dump()
    print("Data received:", data)
    processed_response = event_processor.process_event_folio(data)
    return JSONResponse(status_code=200, content=processed_response)

@app.post("/obtenerPlacasMysql")
def get_folios_tabla(request: ConsultaUnidadesFolios):
    response = fulltime_handler.return_placas_mysql(request.id_fulltime,request.opciones)
    return JSONResponse(status_code=200,content=response)

@app.get("/usuarios")
def obtener_usuarios():
    response_query= mysql_operation.query_usuarios()
    return JSONResponse(status_code=200,content=response_query)

@app.post("/informe_folios")
def informe_folios(request:InformeFolios):
    data = request.model_dump()
    print("Data received:", data)
    processed_response = event_processor.process_event_folio_report(data)
    return JSONResponse(status_code=200, content=processed_response)

@app.post("/InformeEventos")
def get_event_table(request:InformeEventos):
    response= fulltime_handler.return_table_results(request.opciones,request.id_fulltime,request.placas,request.fecha_inicio,request.fecha_fin)
    json_data= jsonable_encoder(response)
    return JSONResponse(status_code=200, content=json_data)

if __name__ == "__main__":
    uvicorn.run(app,host="0.0.0.0",port=8082)

