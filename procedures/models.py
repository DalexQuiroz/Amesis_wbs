from pydantic import BaseModel
from typing import Optional

class GetUnits(BaseModel):
    apiKey:str
    secretKey:str
    id_client: int

class GetClients(BaseModel):
    apiKey:str
    secretKey:str

class CreateEventAmesis(BaseModel):
    socio:str
    contrasena:str
    id_vehículo:str
    tipo_evento:int
    tipo_unidad:int
    placas:str
    economico:str
    no_serie:str
    color:str
    marca:str
    modelo:str
    capacidad: Optional[float]
    tipo_remolque:int
    robo_mercancia:str
    tipo_mercancia:int
    monto_carga: Optional[float]
    placas_remolque:str
    marca_remolque:str
    color_remolque:str
    economico_remolque:str
    no_serie_remolque:str
    cliente_afectado:str
    persona_reporta:str
    telefono_persona_reporta:str
    fecha_evento:str
    nombre_conductor:str
    apellido_paterno_conductor:str
    apellido_materno_conductor:str
    rfc_conductor:str
    telefono_conductor:str
    telefono_cabina: Optional[str]
    calle:str
    municipio:str
    ciudad: Optional[str]
    estado: str
    cp: Optional[str]
    entre_calles:str
    latitud_evento:float
    longitud_evento:float
    calle_origen:str
    municipio_origen:str
    estado_origen:str
    referencias_origen:str
    latitud_origen:float
    longitud_origen:float
    calle_destino:str
    municipio_destino:str
    estado_destino:str
    referencias_destino:str
    latitud_destino:float
    longitud_destino:float
    id_fulltime: str
    id_unidad_fulltime:str

class GetApiKeys(BaseModel):
    id_fulltime:str

class GetFullUnitInformation(BaseModel):
    apiKey: str
    secretKey:str
    id_vehiculo:int

class ConsultaFolio(BaseModel):
    socio: str
    contrasena: str
    folio: str
    
class ConsultaUnidadesFolios(BaseModel):
    id_fulltime:str
    opciones:str

class InformeFolios(BaseModel):
    socio:str
    contrasena:str
    fecha_inicio:str
    fecha_fin:str

class InformeEventos(BaseModel):
    id_fulltime:str
    opciones:str
    placas:str
    fecha_inicio:str
    fecha_fin:str
