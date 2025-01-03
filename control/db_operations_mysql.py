from datetime import datetime
import pymysql


class MySQLHandler():
    def __init__(self):
        self.config_connection={
            "host":"localhost",
            "user":"root",
            "password":"12345678",
            "database":"amesis_fulltime"
        }
    def query_claves_api(self,id_fulltime):
        query_response= None
        try:
            connection = pymysql.connect(**self.config_connection)
            cursor= connection.cursor()
            query= "SELECT * FROM claves_api WHERE id_fulltime=%s"
            cursor.execute(query,(id_fulltime))
            results= cursor.fetchall()
            if len(results)!=0:
                api_claves={
                    "apiKey":results[0][2],
                    "secretKey": results[0][3],
                    "Cliente":results[0][4]
                }
                query_response=api_claves
            else:
                query_response={"message":"No hay claves existentes","code":0}
        except pymysql.MySQLError as e:
            print("Error conectando a la base de datos")
            query_response=None
        except Exception as e:
            print("Error consultando la tabla claves_api")
            query_response= None
        finally:
            connection.close()
        return query_response
    
    def query_all_the_folios(self,id_fulltime,fecha_incio,fecha_fin):
        query_response=None
        try:
            connection = pymysql.connect(**self.config_connection)
            cursor= connection.cursor()
            query ="SELECT * FROM folios WHERE id_fulltime=%s AND fecha_evento BETWEEN %s AND %s"
            cursor.execute(query,(id_fulltime,fecha_incio,fecha_fin))
            columns = [col[0] for col in cursor.description]
            result = cursor.fetchall()
            if len(result)!=0:
                query_response= result
                data= [dict(zip(columns,row)) for row in result]
                query_response= data
            else:
                query_response="No hay folios existentes"
        except Exception as e:
            print("Error consultando la tabla folios",e)
            query_response=None
        except pymysql.MySQLError as e:
            print("Error consultando la tabla folios",e)
            query_response=None
        finally:
            connection.close()
        return query_response
    
    def query_specific_folio(self,id_fulltime,placas,fecha_inicio,fecha_fin):
        query_response=None
        try:
            connenction= pymysql.connect(**self.config_connection)
            cursor= connenction.cursor()
            query="SELECT * FROM folios WHERE id_fulltime= %s AND placas=%s AND fecha_evento BETWEEN %s AND %s"
            cursor.execute(query,(id_fulltime,placas,fecha_inicio,fecha_fin))
            results = cursor.fetchall()
            columns= [col[0] for col in cursor.description]
            if len(results)!=0:
                data =[dict(zip(columns,row)) for row in results]
                query_response= data
            else:
                query_response= "No se encontraron folios de esa unidad"
        except pymysql.MySQLError as e:
            print("Error obteniendo un folio individual",e)
            query_response = None
        except Exception as e:
            print("Error obteniendo un folio individual",e)
            query_response= None
        finally:
            connenction.close()
        return query_response
    
    def query_placas(self,id_fulltime):
        query_response=None
        try:
            connenction= pymysql.connect(**self.config_connection)
            cursor= connenction.cursor()
            query="SELECT placas FROM folios WHERE id_fulltime= %s"
            cursor.execute(query,(id_fulltime))
            results = cursor.fetchall()
            if len(results)!=0:
                query_response= results
            else:
                query_response= "No se encontraron folios de esa unidad"
        except Exception as e:
            print("Error obteniendo un folio individual",e)
            query_response= None
        except pymysql.MySQLError as e:
            print("Error obteniendo un folio individual",e)
            query_response = None
        finally:
            connenction.close()
        return query_response

    def query_usuarios(self):
        query_response= None
        try:
            connection= pymysql.connect(**self.config_connection)
            cursor= connection.cursor()
            query="SELECT * FROM usuarios"
            cursor.execute(query)
            columns= [col[0] for col in cursor.description]
            results= cursor.fetchall()
            if len(results) !=0:
                query_response= results
                data=[dict(zip(columns,row)) for row in results]
                query_response = data
            else:
                query_response={"message":"Error consultando los ususarios","code":0}

        except Exception as e:
            print("Error consultando la tabla de usuarios",e)
            query_response= None
        except pymysql.MySQLError as e:
            query_response = None
            print("Error consultando la tabla usuarios",e)
        finally:
            connection.close()
        return query_response

    def save_event_to_db(self,data, msg, folio):
        try:
            connection = pymysql.connect(**self.config_connection)
            cursor = connection.cursor()

            # Verificar si el folio ya existe en la base de datos
            check_folio_query = "SELECT COUNT(*) FROM folios WHERE folio = %s"
            cursor.execute(check_folio_query, (folio,))
            result = cursor.fetchone()

            if result[0] > 0:
                print(f"El folio {folio} ya existe en la base de datos. No se insertarán los datos.")
                return  # Salir de la función si el folio ya existe


            tipo_evento_map = {
                1: 'ROBO A TRANSPORTE',
                2: 'ROBO A TRANSPORTE CON CARGA',
                3: 'ROBO A PARTICULAR'
            }
            tipo_evento_str = tipo_evento_map.get(data['tipo_evento'], 'desconocido')

            insert_query = """
                INSERT INTO folios (id_vehiculo, placas, id_fulltime, id_unidad_fulltime, fecha_evento, msg, folio, tipo_evento)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """

            insert_data = (
                data['id_vehículo'],
                data['placas'],
                data['id_fulltime'],
                data['id_unidad_fulltime'],
                datetime.now(), 
                msg,
                folio,
                tipo_evento_str
            )

            cursor.execute(insert_query, insert_data)
            connection.commit()
            print("Datos insertados correctamente en la base de datos.")
        except pymysql.MySQLError as err:
            print(f"Error al insertar los datos: {err}")
        finally:
            cursor.close()
            connection.close()
