import requests
import xml.etree.ElementTree as ET
from control.db_operations_mysql import MySQLHandler
from fastapi.encoders import jsonable_encoder

class SoapRequestHandler:
    def __init__(self, url, headers):
        self.url = url
        self.headers = headers

    def send_genera_evento(self, data):

        soap_body = f"""
        <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soc="http://201.131.96.25/wbs_S5Socios/v2.0/SociosSC5WBS.php">
            <soapenv:Header/>
            <soapenv:Body>
                <soc:generaEvento soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                    <socio xsi:type="xsd:string">{data['socio']}</socio>
                    <contrasena xsi:type="xsd:string">{data['contrasena']}</contrasena>
                    <id_vehiculo xsi:type="xsd:string">{data['id_vehículo']}</id_vehiculo>
                    <tipo_evento xsi:type="xsd:string">{data['tipo_evento']}</tipo_evento>
                    <tipo_unidad xsi:type="xsd:string">{data['tipo_unidad']}</tipo_unidad>
                    <placas xsi:type="xsd:string">{data['placas']}</placas>
                    <economico xsi:type="xsd:string">{data['economico']}</economico>
                    <no_serie xsi:type="xsd:string">{data['no_serie']}</no_serie>
                    <color xsi:type="xsd:string">{data['color']}</color>
                    <marca xsi:type="xsd:string">{data['marca']}</marca>
                    <modelo xsi:type="xsd:string">{data['modelo']}</modelo>
                    <capacidad xsi:type="xsd:string">{data['capacidad']}</capacidad>
                    <tipo_remolque xsi:type="xsd:string">{data['tipo_remolque']}</tipo_remolque>
                    <robo_mercancia xsi:type="xsd:string">{data['robo_mercancia']}</robo_mercancia>
                    <tipo_mercancia xsi:type="xsd:string">{data['tipo_mercancia']}</tipo_mercancia>
                    <monto_carga xsi:type="xsd:string">{data['monto_carga']}</monto_carga>
                    <placas_remolque xsi:type="xsd:string">{data['placas_remolque']}</placas_remolque>
                    <marca_remolque xsi:type="xsd:string">{data['marca_remolque']}</marca_remolque>
                    <color_remolque xsi:type="xsd:string">{data['color_remolque']}</color_remolque>
                    <economico_remolque xsi:type="xsd:string">{data['economico_remolque']}</economico_remolque>
                    <no_serie_remolque xsi:type="xsd:string">{data['no_serie_remolque']}</no_serie_remolque>
                    <cliente_afectado xsi:type="xsd:string">{data['cliente_afectado']}</cliente_afectado>
                    <persona_reporta xsi:type="xsd:string">{data['persona_reporta']}</persona_reporta>
                    <telefono_persona_reporta xsi:type="xsd:string">{data['telefono_persona_reporta']}</telefono_persona_reporta>
                    <fecha_evento xsi:type="xsd:string">{data['fecha_evento']}</fecha_evento>
                    <nombre_conductor xsi:type="xsd:string">{data['nombre_conductor']}</nombre_conductor>
                    <apellido_paterno_conductor xsi:type="xsd:string">{data['apellido_paterno_conductor']}</apellido_paterno_conductor>
                    <apellido_materno_conductor xsi:type="xsd:string">{data['apellido_materno_conductor']}</apellido_materno_conductor>
                    <rfc_conductor xsi:type="xsd:string">{data['rfc_conductor']}</rfc_conductor>
                    <telefono_conductor xsi:type="xsd:string">{data['telefono_conductor']}</telefono_conductor>
                    <telefono_cabina xsi:type="xsd:string">{data.get('telefono_cabina', '')}</telefono_cabina>
                    <calle xsi:type="xsd:string">{data['calle']}</calle>
                    <municipio xsi:type="xsd:string">{data['municipio']}</municipio>
                    <ciudad xsi:type="xsd:string">{data.get('ciudad', '')}</ciudad>
                    <estado xsi:type="xsd:string">{data['estado']}</estado>
                    <cp xsi:type="xsd:string">{data.get('cp', '')}</cp>
                    <entre_calles xsi:type="xsd:string">{data['entre_calles']}</entre_calles>
                    <latitud_evento xsi:type="xsd:string">{data['latitud_evento']}</latitud_evento>
                    <longitud_evento xsi:type="xsd:string">{data['longitud_evento']}</longitud_evento>
                    <calle_origen xsi:type="xsd:string">{data['calle_origen']}</calle_origen>
                    <municipio_origen xsi:type="xsd:string">{data['municipio_origen']}</municipio_origen>
                    <estado_origen xsi:type="xsd:string">{data['estado_origen']}</estado_origen>
                    <referencias_origen xsi:type="xsd:string">{data['referencias_origen']}</referencias_origen>
                    <latitud_origen xsi:type="xsd:string">{data['latitud_origen']}</latitud_origen>
                    <longitud_origen xsi:type="xsd:string">{data['longitud_origen']}</longitud_origen>
                    <calle_destino xsi:type="xsd:string">{data['calle_destino']}</calle_destino>
                    <municipio_destino xsi:type="xsd:string">{data['municipio_destino']}</municipio_destino>
                    <estado_destino xsi:type="xsd:string">{data['estado_destino']}</estado_destino>
                    <referencias_destino xsi:type="xsd:string">{data['referencias_destino']}</referencias_destino>
                    <latitud_destino xsi:type="xsd:string">{data['latitud_destino']}</latitud_destino>
                    <longitud_destino xsi:type="xsd:string">{data['longitud_destino']}</longitud_destino>
                </soc:generaEvento>
            </soapenv:Body>
        </soapenv:Envelope>
        """

        response = requests.post(self.url, data=soap_body, headers=self.headers, verify=False)
        return response.text

    def send_consulta_evento(self, data):
        soap_body = f"""
        <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soc="http://201.131.96.25/wbs_S5Socios/v1.0/SociosSC5WBS.php">
            <soapenv:Header/>
            <soapenv:Body>
                <soc:consultaEvento soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                    <socio xsi:type="xsd:string">{data['socio']}</socio>
                    <contrasena xsi:type="xsd:string">{data['contrasena']}</contrasena>
                    <folio xsi:type="xsd:string">{data['folio']}</folio>
                </soc:consultaEvento>
            </soapenv:Body>
        </soapenv:Envelope>
        """
        response = requests.post(self.url, data=soap_body, headers=self.headers, verify=False)
        return response.text
    

    def send_consulta_folio_report(self, data):
        soap_body = f"""
        <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soc="http://201.131.96.25/wbs_S5Socios/v2.0/SociosSC5WBS.php">
            <soapenv:Header/>
            <soapenv:Body>
                <soc:consultaEventos soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                    <socio xsi:type="xsd:string">{data['socio']}</socio>
                    <contrasena xsi:type="xsd:string">{data['contrasena']}</contrasena>
                    <fecha_inicio xsi:type="xsd:string">{data['fecha_inicio']}</fecha_inicio>
                    <fecha_fin xsi:type="xsd:string">{data['fecha_fin']}</fecha_fin>
                </soc:consultaEventos>
            </soapenv:Body>
        </soapenv:Envelope>

        """
        response = requests.post(self.url, data=soap_body, headers=self.headers, verify=False)
        return response.text

class EventProcessor:
    def __init__(self):
        self.soap_handler = SoapRequestHandler(
            url="https://siamesc5.amesis.org.mx/wbs_S5Socios/v2.0/SociosSC5WBS.php",
            headers={
                'Content-Type': 'text/xml; charset=utf-8',
                'SOAPAction': 'https://siamesc5.amesis.org.mx/wbs_S5Socios/v2.0/SociosSC5WBS.php/generaEvento'
            }
        )

        self.soap_handler_consulta = SoapRequestHandler(
            url="https://siamesc5.amesis.org.mx/wbs_S5Socios/v2.0/SociosSC5WBS.php",
            headers={
                'Content-Type': 'text/xml; charset=utf-8',
                'SOAPAction': 'https://siamesc5.amesis.org.mx/wbs_S5Socios/v2.0/SociosSC5WBS.php/consultaEventos'
            }
        )

        self.soap_handler_folio_report = SoapRequestHandler(
            url="https://siamesc5.amesis.org.mx/wbs_S5Socios/v2.0/SociosSC5WBS.php",
            headers={
                'Content-Type': 'text/xml; charset=utf-8',
                'SOAPAction': 'https://siamesc5.amesis.org.mx/wbs_S5Socios/v2.0/SociosSC5WBS.php/consultaEventos'
            }
        )

    def process_event(self, data):
        soap_response = self.soap_handler.send_genera_evento(data)
        print("Respuesta SOAP:", soap_response)
        db_config = MySQLHandler()
        try:
            root = ET.fromstring(soap_response)
            return_code = root.find(".//return").text
            inner_xml = ET.fromstring(return_code)
            code = inner_xml.find(".//code").text
            msg = inner_xml.find(".//msg").text
            folio = inner_xml.find(".//folio").text

            if msg.lower() == "ok":
                msg = "Creado con exito"

            db_config.save_event_to_db(data, msg, folio)

            response = {
                "status": "success",
                "message": msg,
                "code": code,
                "folio": folio,
                "processed_data": {
                    "placas": data.get('placas', 'No disponible')
                }
            }
            return response
        except Exception as e:
            print("Error al procesar la respuesta SOAP:", e)
            return {"status": "error", "message": "Error en la respuesta SOAP"}


    def process_event_folio(self, data):
        soap_response = self.soap_handler_consulta.send_consulta_evento(data)
        print("Respuesta SOAP Consulta:", soap_response)
        try:
            root = ET.fromstring(soap_response)
            return_code = root.find(".//return").text
            inner_xml = ET.fromstring(return_code)

            code = inner_xml.find(".//code").text or "No disponible"
            msg = inner_xml.find(".//msg").text or "No disponible"
            folio = inner_xml.find(".//folio").text or "No disponible"
            evento = inner_xml.find(".//evento").text or "No disponible"
            estatus = inner_xml.find(".//estatus").text or "No disponible"
            placas = inner_xml.find(".//placas").text or "No disponible"
            estatus_autoridad = inner_xml.find(".//estatus_autoridad").text or "No disponible"
            estatus_oficial = inner_xml.find(".//estatus_oficial").text or "No disponible"
            last_date_pos = inner_xml.find(".//last_date_pos").text or "No disponible"

            response = {
                "status": "success",
                "message": msg,
                "code": code,
                "folio": folio,
                "evento": evento,
                "placas": placas,
                "estatus": estatus,
                "estatus_autoridad": estatus_autoridad,
                "estatus_oficial": estatus_oficial,
                "last_date_pos": last_date_pos
            }
            return response
        except Exception as e:
            print("Error al procesar la respuesta SOAP de consulta:", e)
            return {"status": "error", "message": "Error en la respuesta SOAP de consulta"}

        
    def process_event_folio_report(self, data):
        soap_response = self.soap_handler_folio_report.send_consulta_folio_report(data)
        print("Respuesta SOAP Consulta:", soap_response)
        try:
            root = ET.fromstring(soap_response)
            return_code = root.find(".//return").text
            inner_xml = ET.fromstring(return_code)
            code = inner_xml.find(".//code").text
            msg = inner_xml.find(".//msg").text

            registros = inner_xml.findall(".//registro")
            data_response = []

            for registro in registros:
                folio = registro.find(".//folio").text if registro.find(".//folio") is not None else None
                evento = registro.find(".//evento").text if registro.find(".//evento") is not None else None
                carga = registro.find(".//carga").text if registro.find(".//carga") is not None else None
                estatus = registro.find(".//estatus").text if registro.find(".//estatus") is not None else None
                remolque = registro.find(".//remolque").text if registro.find(".//remolque") is not None else None
                placas = registro.find(".//placas").text if registro.find(".//placas") is not None else None
                eco = registro.find(".//eco").text if registro.find(".//eco") is not None else None
                estatus_autoridad = registro.find(".//estatus_autoridad").text if registro.find(".//estatus_autoridad") is not None else None
                estatus_oficial = registro.find(".//estatus_oficial").text if registro.find(".//estatus_oficial") is not None else None


                data_response.append({
                    "folio": folio,
                    "evento": evento,
                    "carga": carga,
                    "estatus": estatus,
                    "remolque": remolque,
                    "placas": placas,
                    "eco": eco,
                    "estatus_autoridad": estatus_autoridad,
                    "estatus_oficial": estatus_oficial,
                })

            response = {
                "status": "success",
                "message": msg,
                "code": code,
                "data": data_response,
            }
            return response
        except Exception as e:
            print("Error al procesar la respuesta SOAP de consulta:", e)
            return {"status": "error", "message": "Error en la respuesta SOAP de consulta"}