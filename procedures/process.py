import requests
import pymysql
from pymysql import Error
from control.db_operations_mysql import MySQLHandler


mysql_operations= MySQLHandler()
class FulltimeApiHandler():
    
    def get_plates_name_unit(self,id_client,apiKey,secretKey):
        url= requests.get(f"https://ws.fulltrack2.com/vehicles/client/id/{id_client}/apiKey/{apiKey}/secretKey/{secretKey}")
        data= url.json()
        data_extracted= data.get("data")
        units_info=[]
        for extract in data_extracted:
            info= {"ras_vei_id":extract["ras_vei_id"],"ras_vei_id_cli":extract["ras_vei_id_cli"],"ras_vei_placa":extract["ras_vei_placa"],"ras_vei_veiculo":extract["ras_vei_veiculo"]}
            units_info.append(info)
        return units_info

    def get_single_event(self,id_unit,apiKey,secretKey):
        url= requests.get(f"https://ws.fulltrack2.com/events/single/id/{id_unit}/apiKey/{apiKey}/secretKey/{secretKey}")
        data= url.json()
        return data
    
    def get_clients_name(self,apiKey,secretKey):
        url= requests.get(f"https://ws.fulltrack2.com/clients/all/apiKey/{apiKey}/secretKey/{secretKey}")
        data= url.json()
        return data
    
    def get_full_unit_informartion(self,apiKey,secretKey,id_vehiculo):
        get_single_event= f"https://ws.fulltrack2.com/events/single/id/{id_vehiculo}/apiKey/{apiKey}/secretKey/{secretKey}"
        get_unit_information= f"https://ws.fulltrack2.com/vehicles/single/id/{id_vehiculo}/apiKey/{apiKey}/secretKey/{secretKey}"
        response_single_event= requests.get(get_single_event)
        response_unit_information= requests.get(get_unit_information)
        dict_information={
            "single_event":response_single_event.json(),
            "registration_information": response_unit_information.json()
        }
        return dict_information
    
    def return_placas_mysql(self,id_fulltime,opciones):
        dict_information={
            "code":None
        }
        if opciones=="Todos":
            dict_placas={"code":1,"placas":["TODAS LAS UNIDADES"]}
            dict_information.update(dict_placas)       
        elif opciones=="Unica":
            placas_response=mysql_operations.query_placas(id_fulltime)
            if placas_response=="No se encontraron folios de esa unidad":
                dict_information={"code":0,"placas":["ID inválido"]}
            else:
                placas_list= [placa[0] for placa in placas_response]
                placas_set= set(placas_list)
                final_placas_list= list(placas_set)
                dict_placas={"code":2,"placas":final_placas_list}
                dict_information.update(dict_placas)
        return dict_information
    
    def return_table_results(self,opciones,id_fulltime,placas,fecha_inicio,fecha_fin):
        table_response=""
        if opciones=="Todos":
            query_response= mysql_operations.query_all_the_folios(id_fulltime,fecha_inicio,fecha_fin)
            if query_response=="No hay folios existentes":
                table_response={"code":0,"results":query_response}
            else:
                table_response={"code":1,"results":query_response}
        elif opciones=="Unica":
            query_response= mysql_operations.query_specific_folio(id_fulltime,placas,fecha_inicio,fecha_fin)
            if query_response =="No se encontraron folios de esa unidad":
                table_response= {"code":0,"results":query_response}
            else:
                table_response= {"code":2,"results":query_response}    
        return table_response
    
   