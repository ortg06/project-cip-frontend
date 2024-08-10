const TABLE_ID = '#exporInscritosDT';
const FORM_ID = '#formConsultarExportador';
const FORM_ID_MOD = '#formInscribirExportador';
const  CAN_EDIT = true;
const  CAN_CONSULT = true;
const  CAN_VERIFICAR = true;
const  CAN_EDIT_ACT = true;
const  CAN_DELETE_ACT = true;
var tableActividad;
var tableAgente;
var tableDivision;
var tableParque;
var tablePersonaAut;
var tableZonaFranca;
var tableAutorizacion;
var tableEstablecimiento;
var tableConsignatario;
var tableProductosEx;
var tablePlantasProd;
var tableRepresentanteExt;
var tableOrigen;
var tableBancos;
var tableProfesionale;
var tableUsuario;
const TABLE_ID_ACTIVIDADES = '#actividadesEconomicaDT';
const TABLE_ID_AGENTES = '#agentesAduanalesDT';
const TABLE_ID_DIVISIONES = '#divisionDT';
const TABLE_ID_PARQUE = '#parquesServicioDT';
const TABLE_ID_ZONA_FRANCA = '#zonaFrancaDT';
const TABLE_ID_PERSONA_AUT = '#personaAutDT';
const TABLE_ID_AUTORIZACION = '#autorizacionesDT';
const TABLE_ID_ESTABLECIMIENTO = '#establecimientosDT';
const TABLE_ID_CONSIGNATARIO = '#consignatariosDT';
const TABLE_ID_PRODUCTOS_EX = '#productosDT';
const TABLE_ID_PLANTAS_PROD = '#plantasDT';
const TABLE_ID_REPRESENTANTE_EXT = '#representacionesDT';
const TABLE_ID_ORIGENES = '#origenesDT';
const TABLE_ID_BANCOS = '#bancosDT';
const TABLE_ID_PROFESIONALE = '#profesionalesDT';
const TABLE_ID_USUARIO = '#usuariosDT';
var p;
var carnetExportador= null //variable para mantener el exportador una vez guardado
var tpaccion;//tipo de accion que se realiza en la tabla verificar 1: consultar 2: editar


function renderActions(data, type, row, meta) {
    let html = '';
    html += CAN_VERIFICAR ? ' <a data-rel="tooltip" data-placement="left" onclick="verificar(' + meta.row + ')" title="Verificar" href="javascript:void(0)" class="m-2"><i class="fa fa-check-square"></i></a>':'';
    html += CAN_CONSULT ? ' <a data-rel="tooltip" data-placement="left" onclick="consultar(' + meta.row + ')" title="Consultar" href="javascript:void(0)" class="m-2"><i class="fa fa-search"></i></a>':'';
    html += CAN_EDIT? ' <a data-rel="tooltip" data-placement="left"  onclick="edit(' + meta.row + ')" title="Modificar" href="javascript:void(0)" class="m-2"><i class="fa fa-edit"></i></a>':'';
    return html;
}
function renderActionsActividades(data, type, row, meta) {
    let html = '';
    html += CAN_EDIT_ACT ? ' <a data-rel="tooltip" data-placement="left" onclick="editExporActividad(' + meta.row + ')" title="Editar" href="javascript:void(0)" class="m-2"><i class="fa fa-edit"></i></a>':'';
    html += CAN_DELETE_ACT ? ' <a data-rel="tooltip" data-placement="left"  onclick="delExporActividad(' + meta.row + ')" title="Eliminar" href="javascript:void(0)" class="m-2"><i class="fa fa-trash-alt"></i></a>':'';
    return html;

}

function renderActionsAgente(data, type, row, meta) {
    let html = '';
    html += CAN_DELETE_ACT? ' <a data-rel="tooltip" data-placement="left"  onclick="delExporAgente(' + meta.row + ')" title="Eliminar" href="javascript:void(0)" class="m-2"><i class="fa fa-trash-alt"></i></a>':'';
    return html;
}

function renderActionsAutorizaciones(data, type, row, meta) {
    let html = '';
    html += CAN_EDIT_ACT ? ' <a data-rel="tooltip" data-placement="left" onclick="editExporAutorizacion(' + meta.row + ')" title="Editar" href="javascript:void(0)" class="m-2"><i class="fa fa-edit"></i></a>':'';
    html += CAN_DELETE_ACT ? ' <a data-rel="tooltip" data-placement="left"  onclick="delExporAutorizacion(' + meta.row + ')" title="Eliminar" href="javascript:void(0)" class="m-2"><i class="fa fa-trash-alt"></i></a>':'';
    return html;
}

function renderActionsDivision(data, type, row, meta) {
    let html = '';
    html += CAN_EDIT_ACT ? ' <a data-rel="tooltip" data-placement="left" onclick="editExporDivision(' + meta.row + ')" title="Editar" href="javascript:void(0)" class="m-2"><i class="fa fa-edit"></i></a>':'';
    html += CAN_DELETE_ACT? ' <a data-rel="tooltip" data-placement="left"  onclick="delExporDivision(' + meta.row + ')" title="Eliminar" href="javascript:void(0)" class="m-2"><i class="fa fa-trash-alt"></i></a>':'';
    return html;
}

function renderActionsParque(data, type, row, meta) {
    let html = '';
    html += CAN_EDIT_ACT ? ' <a data-rel="tooltip" data-placement="left" onclick="editExporParque(' + meta.row + ')" title="Editar" href="javascript:void(0)" class="m-2"><i class="fa fa-edit"></i></a>':'';
    html += CAN_DELETE_ACT? ' <a data-rel="tooltip" data-placement="left"  onclick="delExporParque(' + meta.row + ')" title="Eliminar" href="javascript:void(0)" class="m-2"><i class="fa fa-trash-alt"></i></a>':'';
    return html;
}

function renderActionsPersonaAut(data, type, row, meta) {
    let html = '';
    html += CAN_EDIT_ACT ? ' <a data-rel="tooltip" data-placement="left" onclick="editExporPersonaAut(' + meta.row + ')" title="Editar" href="javascript:void(0)" class="m-2"><i class="fa fa-edit"></i></a>':'';
    html += CAN_DELETE_ACT? ' <a data-rel="tooltip" data-placement="left"  onclick="delExporPersonaAut(' + meta.row + ')" title="Eliminar" href="javascript:void(0)" class="m-2"><i class="fa fa-trash-alt"></i></a>':'';
    return html;
}

function renderActionsZonaFranca(data, type, row, meta) {
    let html = '';
    html += CAN_EDIT_ACT ? ' <a data-rel="tooltip" data-placement="left" onclick="editExporZonaFranca(' + meta.row + ')" title="Editar" href="javascript:void(0)" class="m-2"><i class="fa fa-edit"></i></a>':'';
    html += CAN_DELETE_ACT? ' <a data-rel="tooltip" data-placement="left"  onclick="delExporZonaFranca(' + meta.row + ')" title="Eliminar" href="javascript:void(0)" class="m-2"><i class="fa fa-trash-alt"></i></a>':'';
    return html;
}

function renderActionsEstablecimiento(data, type, row, meta) {
    let html = '';
    html += CAN_EDIT_ACT ? ' <a data-rel="tooltip" data-placement="left" onclick="editExporEstablecimiento(' + meta.row + ')" title="Editar" href="javascript:void(0)" class="m-2"><i class="fa fa-edit"></i></a>':'';
    html += CAN_DELETE_ACT? ' <a data-rel="tooltip" data-placement="left"  onclick="delExporEstablecimiento(' + meta.row + ')" title="Eliminar" href="javascript:void(0)" class="m-2"><i class="fa fa-trash-alt"></i></a>':'';
    return html;
}

function renderActionsPlantaProd(data, type, row, meta) {
    let html = '';
    html += CAN_EDIT_ACT ? ' <a data-rel="tooltip" data-placement="left" onclick="editExporPlantaProd(' + meta.row + ')" title="Editar" href="javascript:void(0)" class="m-2"><i class="fa fa-edit"></i></a>':'';
    html += CAN_DELETE_ACT? ' <a data-rel="tooltip" data-placement="left"  onclick="delExporPlantaProd(' + meta.row + ')" title="Eliminar" href="javascript:void(0)" class="m-2"><i class="fa fa-trash-alt"></i></a>':'';
    return html;
}

function renderActionsRepresentante(data, type, row, meta) {
    let html = '';
    html += CAN_EDIT_ACT ? ' <a data-rel="tooltip" data-placement="left" onclick="editExporRepresentacion(' + meta.row + ')" title="Editar" href="javascript:void(0)" class="m-2"><i class="fa fa-edit"></i></a>':'';
    html += CAN_DELETE_ACT? ' <a data-rel="tooltip" data-placement="left"  onclick="delExporRepresentacion(' + meta.row + ')" title="Eliminar" href="javascript:void(0)" class="m-2"><i class="fa fa-trash-alt"></i></a>':'';
    return html;
}

function verificar(row) {
    let rowData = $(TABLE_ID).DataTable().row(row).data();
    let url = BACKEND_URL  + '/verificar-exportador/verificar?carnetExportador='+rowData.carnetExportador;
    let data = rowData.carnetExportador;
    showConfirmMessage('Desea verificar al exportador con carnet: ' + rowData.carnetExportador, function () {
        ajaxPostCall(url, data, null, function (result) {
            $(TABLE_ID).DataTable().ajax.reload(null, false);
        });
    });
}

function edit(row) {
    p = $('#consultarDiv').detach();

    let data = $(TABLE_ID).DataTable().row(row).data();
    $('#idexportador').val(data.carnetExportador);
    populateFormExportadorConsultar(data,1);//1: modificar

    $('#moodificarDiv').fadeIn(800);
    $('#verificarDiv').fadeOut(800);
    $("#verificarDiv").attr("hidden",true);
    $("#moodificarDiv").attr("hidden",false);
    cargarInfoAdicional(data);
    getActividadPrincipal(data.carnetExportador);
}

function del(row) {

}



function consultar(row){
    tpaccion = 1;
    p = $('#moodificarDiv').detach();
    let data = $(TABLE_ID).DataTable().row(row).data();
    populateFormExportadorConsultar(data,2);//2: consultar
    $('#consultarDiv').fadeIn(800);
    $('#verificarDiv').fadeOut(800);
    $("#verificarDiv").attr("hidden",true);
    $("#consultarDiv").attr("hidden",false);

    cargarInfoAdicional(data);
    getActividadPrincipal(data.carnetExportador);
}

$("#backBtn").on('click',function(){
    location.reload();
});

$("#backBtn2").on('click',function(){
    location.reload();
});

function populateFormExportadorConsultar(data,opcion){
    if(opcion === 1 ){
        populateForm($(FORM_ID_MOD)[0], data);
    }else{
        populateForm($(FORM_ID)[0], data);
    }


    document.getElementById("esGranContribuyenteCheck").checked = data.esGranContribuyente ==="S" ;
    document.getElementById("estaExentoCheck").checked = data.estaExento ==="S" ;

    let newOption1 = new Option(        data.tiposDocumentoIdentidadExpor.nombreDocumentoIdentidad,
        data.tiposDocumentoIdentidadExpor.codigoTipoDocumentoIdentida, true, true);
    $('#tiposDocumentoIdentidadExpor').append(newOption1).trigger('change');

    let newOption2 = new Option(data.pais1.nombrePais,
        data.pais1.codigoPais, true, true);
    $('#pais1').append(newOption2).trigger('change');

    let newOption3 = new Option(data.paisExportador.nombrePais,
        data.paisExportador.codigoPais, true, true);
    $('#codigoPais').append(newOption3).trigger('change');

    let newOption4 = new Option(data.departamento.nombreDepartamento,
        data.municipio.id.departamento.id.codigoDepartamento, true, true);
    $('#departamento').append(newOption4).trigger('change');

    let newOption5 = new Option(data.municipio.nombreMunicipio,
        data.municipio.id.codigoMunicipio, true, true);
    $('#municipio').append(newOption5).trigger('change');

    if(data.pais2 !== null){
        let newOption6 = new Option(data.pais2.nombrePais,
            data.pais2.codigoPais, true, true);
        $('#pais2').append(newOption6).trigger('change');
    }

    if(data.tiposDocumentoIdentidadRepresentante !== null){
        let newOption7 = new Option(data.tiposDocumentoIdentidadRepresentante.nombreDocumentoIdentidad,
            data.tiposDocumentoIdentidadRepresentante.codigoTipoDocumentoIdentida, true, true);
        $('#tiposDocumentoIdentidadRepresentante').append(newOption7).trigger('change');
    }
}


function cargarInfoAdicional(exportador){
    $("#labelCarnet").text(exportador.carnetExportador);
    $("#labelNombre").text(exportador.nombreExportador);
    carnetExportador = exportador.carnetExportador;
    $("#exportadore").val(exportador.carnetExportador);//id para campo exportador en actividad economica
    $("#exportadoreA").val(exportador.carnetExportador);//id para campo exportador en agentes aduanales
    $("#exportadorD").val(exportador.carnetExportador);//id para campo exportador endivisiones
    $("#exportadorE").val(exportador.carnetExportador);//id para campo exportador en establecimientos
    $("#carnetExportador").val(exportador.carnetExportador);//id para campo exportador en parque de servicio
    $("#carnetExportadorZ").val(exportador.carnetExportador);//id para campo exportador en zona franca
    $("#exportadoreP").val(exportador.carnetExportador); // id para campo exportadore en persona/usuario autorizado

 /*
   SE COLOCO ESTE IF YA QUE LAS DATATABLE DE CONSULTAR O MODIFICAR VARIAN EN CIERTOS CASOS
  */
  if(tpaccion === 1){ //DATATABLES PARA OPCION CONSULTA

      /*DATATABLE ACTIVIDADES ECONOMICAS*/
      tableActividad = $(TABLE_ID_ACTIVIDADES).DataTable({
          ajax: {
              url: BACKEND_URL  + '/exportadores-actividades/dt',
              data: function (c){ c.carnetExportador =  exportador.carnetExportador}
          },
          serverSide: true,
          columns: [
              {
                  data: 'id.actividadesEconomica.nombreActividadEconomic'
              },
              {
                  data: 'esActividadPrincipal'
              }
          ],
          order: [
              [
                  0, 'desc'
              ]
          ],
          pageLength: 5
      });
      /*DATATABLE ACTIVIDADES ECONOMICAS*/

      /*DATATABLE AGENTES ADUANALES*/
      tableAgente = $(TABLE_ID_AGENTES).DataTable({
          ajax: {
              url: BACKEND_URL  + '/exportadores-agentes-adua/dt',
              data: function (c){ c.carnetExportador =  exportador.carnetExportador}
          },
          serverSide: true,
          columns: [
              {
                  data: 'id.agentesAduanale.codigoAgenteAduanal'
              },
              {
                  data: 'id.agentesAduanale.nombreAgenteAduanal'
              }
          ],
          order: [
              [
                  0, 'desc'
              ]
          ],
          pageLength: 5
      });
      /*DATATABLE AGENTES ADUANALES*/

      /*DATATABLE DIVISIONES*/
      tableDivision = $(TABLE_ID_DIVISIONES).DataTable({
          ajax: {
              url: BACKEND_URL  + '/exportadores-division/dt',
              data: function (c){ c.carnetExportador =  exportador.carnetExportador}
          },
          serverSide: true,
          columns: [
              {
                  data: 'id.codigoDivision',
                  width: "10%"
              },
              {
                  data: 'nombreDivision'
              },
              {
                  data: 'direccionDivision'
              },
              {
                  data: 'numeroCuentaCorriente'
              },
              {
                  data: 'departamento.id.codigoDepartamento',
                  visible: false
              },
              {
                  data: 'municipio.id.codigoMunicipio',
                  visible: false
              },
          ],
          order: [
              [
                  0, 'desc'
              ]
          ],
          pageLength: 5
      });
      /*DATATABLE DIVISIONES*/

      /*DATATABLES PERSONAS/USUARIOS AUTORIZADAS*/
      tablePersonaAut =  $(TABLE_ID_PERSONA_AUT).DataTable({
          ajax: {
              url: BACKEND_URL  + '/exportadores-personas-aut/dt',
              data: function (c){ c.carnetExportador =  exportador.carnetExportador}
          },
          serverSide: true,
          columns: [
              {
                  data: 'nombrePersona'
              },
              {
                  data: 'cargoPersona'
              },
              {
                  data: 'fechaFinalVigencia',
                  render: function (data, type, row) {
                      if (type === 'display') {
                          if (!data || data === '') {
                              return 'VIGENTE'; // Si data es null o vacío, considerar como VIGENTE
                          } else {
                              // Convertir fechas de formato dd/mm/aaaa a objeto Date
                              let currentDate = new Date();
                              let fechaInicialParts = row.fechaInicialVigencia.split('/');
                              let fechaFinalParts = row.fechaFinalVigencia.split('/');

                              // Crear objetos Date usando partes de la cadena
                              let fechaInicial = new Date(fechaInicialParts[2], fechaInicialParts[1] - 1, fechaInicialParts[0]);
                              let fechaFinal = new Date(fechaFinalParts[2], fechaFinalParts[1] - 1, fechaFinalParts[0]);

                              // Verificar si las fechas son válidas
                              if (!isNaN(fechaInicial.getTime()) && !isNaN(fechaFinal.getTime())) {
                                  // Verificar si la fecha actual está entre fechaInicialVigencia y fechaFinalVigencia
                                  if (currentDate >= fechaInicial && currentDate <= fechaFinal) {
                                      return 'VIGENTE';
                                  } else {
                                      return 'NO VIGENTE';
                                  }
                              } else {
                                  // Si las fechas no son válidas, asumir como NO VIGENTE por precaución
                                  return 'NO VIGENTE';
                              }
                          }
                      }
                      return data; // Para otros tipos de renderizado, devolver el dato original
                  }
              },
              {
                  data: 'tiposDocumentoIdentidad.nombreDocumentoIdentidadAb'
              },
              {
                  data: 'numeroTelefono'
              },
              {
                  data: 'numeroFax'
              },
              {
                  data: 'emailPersona'
              },
              {
                  data: 'emailAlterno'
              },
              {
                  data: 'fechaInicialVigencia'
              }
          ],
          order: [
              [
                  0, 'desc'
              ]
          ],
          pageLength: 5
      });
      /*DATATABLES PERSONAS/USUARIOS AUTORIZADAS*/


      /*DATATABLES AUTORIZACIONES*/
      tableAutorizacion = $(TABLE_ID_AUTORIZACION).DataTable({
          ajax: {
              url: BACKEND_URL  + '/exportadores-autorizacion/dt',
              data: function (c){ c.carnetExportador =  exportador.carnetExportador}
          },
          serverSide: true,
          columns: [
              {
                  data: 'tiposInformacion.nombreTipoInformacion'
              },
              {
                  data: 'id.numeroAutorizacion'
              },
              {
                  data: 'fechaAutorizacion'
              },
              {
                  data: 'fechaVencimiento'
              }
          ],
          order: [
              [
                  0, 'desc'
              ]
          ],
          pageLength: 5
      });
      /*DATATABLES AUTORIZACIONES*/



      /*DATATABLES EXTABLECIMIENTO*/
      tableEstablecimiento = $(TABLE_ID_ESTABLECIMIENTO).DataTable({
          ajax: {
              url: BACKEND_URL + '/exportadores-establecimie/dt',
              data: function (c) {
                  c.carnetExportador = exportador.carnetExportador;
              }
          },
          serverSide: true,
          columns: [
              {
                  data: 'id.establecimientosAutorizado.codigoEstablecimiento',
                  visible: false
              },
              {
                  data: 'id.establecimientosAutorizado.nombreEstablecimiento'
              },
              {
                  data: 'id.establecimientosAutorizado.categoria',
                  render: function (data, type) {
                      if (type === 'display') {
                          let label = '';
                          if(data === 'PP'){
                              label = 'PLANTA DE TRANSFORMACIÓN';
                          }else{
                              label = 'BUQUE CONGELADOR'
                          }
                          return label;
                      }

                      return data;
                  }
              },
              {
                  data: 'numeroAutorizacion'
              },
              {
                  data: 'fechaAutorizacion'
              },
              {
                  data: 'id.establecimientosAutorizado.municipio.id.departamento.id.pais.nombrePais',
                  render: function (data, type, row) {
                      return row.id.establecimientosAutorizado.municipio.id.departamento.id.pais.nombrePais
                          + ', ' + row.id.establecimientosAutorizado.municipio.id.departamento.nombreDepartamento;
                  },
                  visible: true // Asegúrate de que esta columna sea visible
              }
          ],
          order: [
              [0, 'desc']
          ],
          pageLength: 5
      });
  }else{ //DATTABLE PARA OPCION MODIFICAR

      /*DATATABLE ACTIVIDADES ECONOMICAS*/
      tableActividad = $(TABLE_ID_ACTIVIDADES).DataTable({
          ajax: {
              url: BACKEND_URL  + '/exportadores-actividades/dt',
              data: function (c){ c.carnetExportador =  exportador.carnetExportador}
          },
          serverSide: true,
          columns: [
              {
                  data: 'id.actividadesEconomica.nombreActividadEconomic'
              },
              {
                  data: 'esActividadPrincipal'
              },
              {
                  data: 'id',
                  searchable: false,
                  orderable: false,
                  render: renderActionsActividades
              }
          ],
          order: [
              [
                  0, 'desc'
              ]
          ],
          pageLength: 5
      });
      /*DATATABLE ACTIVIDADES ECONOMICAS*/

      /*DATATABLE AGENTES ADUANALES*/
      tableAgente = $(TABLE_ID_AGENTES).DataTable({
          ajax: {
              url: BACKEND_URL  + '/exportadores-agentes-adua/dt',
              data: function (c){ c.carnetExportador =  exportador.carnetExportador}
          },
          serverSide: true,
          columns: [
              {
                  data: 'id.agentesAduanale.codigoAgenteAduanal'
              },
              {
                  data: 'id.agentesAduanale.nombreAgenteAduanal'
              },
              {
                  data: 'id',
                  searchable: false,
                  orderable: false,
                  render: renderActionsAgente
              }
          ],
          order: [
              [
                  0, 'desc'
              ]
          ],
          pageLength: 5
      });
      /*DATATABLE AGENTES ADUANALES*/


      /*DATATABLE DIVISIONES*/
      tableDivision = $(TABLE_ID_DIVISIONES).DataTable({
          ajax: {
              url: BACKEND_URL  + '/exportadores-division/dt',
              data: function (c){ c.carnetExportador =  exportador.carnetExportador}
          },
          serverSide: true,
          columns: [
              {
                  data: 'id.codigoDivision',
                  width: "10%"
              },
              {
                  data: 'nombreDivision'
              },
              {
                  data: 'direccionDivision'
              },
              {
                  data: 'numeroCuentaCorriente',
                  visible: false
              }
              ,
              {
                  data: 'pais.codigoPais',
                  visible: false
              },
              {
                  data: 'departamento.id.codigoDepartamento',
                  visible: false
              },
              {
                  data: 'municipio.id.codigoMunicipio',
                  visible: false
              },
              {
                  data: 'id',
                  searchable: false,
                  orderable: false,
                  render: renderActionsDivision
              }
          ],
          order: [
              [
                  0, 'desc'
              ]
          ],
          pageLength: 5
      });
      /*DATATABLE DIVISIONES*/

      /*DATATABLES PARQUES DE SERVICIO*/
      tableParque = $(TABLE_ID_PARQUE).DataTable({
          ajax: {
              url: BACKEND_URL  + '/exportadores-parque-servicio/dt',
              data: function (c){ c.carnetExportador =  exportador.carnetExportador}
          },
          serverSide: true,
          columns: [
              {
                  data: 'id.codigoParqueServicio.codigoParqueServicio'
              },
              {
                  data: 'id.codigoParqueServicio.nombreParqueServicio'
              },
              {
                  data: 'id',
                  searchable: false,
                  orderable: false,
                  render: renderActionsParque
              }
          ],
          order: [
              [
                  0, 'desc'
              ]
          ],
          pageLength: 5
      });
      /*DATATABLES PARQUES DE SERVICIO*/

      /*DATATABLES ZONA FRANCA*/
      tableZonaFranca = $(TABLE_ID_ZONA_FRANCA).DataTable({
          ajax: {
              url: BACKEND_URL  + '/exportadores-zonas-franca/dt',
              data: function (c){ c.carnetExportador =  exportador.carnetExportador}
          },
          serverSide: true,
          columns: [
              {
                  data: 'zonasFranca.id.codigoZonaFranca'
              },
              {
                  data: 'zonasFranca.nombreZonaFranca'
              },
              {
                  data: 'zonasFranca.id.pais.nombrePais'
              },
              {
                  data: 'id',
                  searchable: false,
                  orderable: false,
                  render: renderActionsZonaFranca
              }
          ],
          order: [
              [
                  0, 'desc'
              ]
          ],
          pageLength: 5
      });
      /*DATATABLES ZONA FRANCA*/

      /*DATATABLES AUTORIZACIONES*/
      tableAutorizacion = $(TABLE_ID_AUTORIZACION).DataTable({
          ajax: {
              url: BACKEND_URL  + '/exportadores-autorizacion/dt',
              data: function (c){ c.carnetExportador =  exportador.carnetExportador}
          },
          serverSide: true,
          columns: [
              {
                  data: 'tiposInformacion.nombreTipoInformacion'
              },
              {
                  data: 'id.numeroAutorizacion'
              },
              {
                  data: 'fechaAutorizacion'
              },
              {
                  data: 'fechaVencimiento'
              },
              {
                  data: 'id',
                  searchable: false,
                  orderable: false,
                  render: renderActionsAutorizaciones
              }
          ],
          order: [
              [
                  0, 'desc'
              ]
          ],
          pageLength: 5
      });
      /*DATATABLES AUTORIZACIONES*/

      /*DATATABLES PERSONAS/USUARIOS AUTORIZADAS*/
      tablePersonaAut =  $(TABLE_ID_PERSONA_AUT).DataTable({
          ajax: {
              url: BACKEND_URL  + '/exportadores-personas-aut/dt',
              data: function (c){ c.carnetExportador =  exportador.carnetExportador}
          },
          serverSide: true,
          columns: [
              {
                  data: 'nombrePersona'
              },
              {
                  data: 'cargoPersona'
              },
              {
                  data: 'fechaFinalVigencia',
                  render: function (data, type, row) {
                      if (type === 'display') {
                          if (!data || data === '') {
                              return 'VIGENTE'; // Si data es null o vacío, considerar como VIGENTE
                          } else {
                              // Convertir fechas de formato dd/mm/aaaa a objeto Date
                              let currentDate = new Date();
                              let fechaInicialParts = row.fechaInicialVigencia.split('/');
                              let fechaFinalParts = row.fechaFinalVigencia.split('/');

                              // Crear objetos Date usando partes de la cadena
                              let fechaInicial = new Date(fechaInicialParts[2], fechaInicialParts[1] - 1, fechaInicialParts[0]);
                              let fechaFinal = new Date(fechaFinalParts[2], fechaFinalParts[1] - 1, fechaFinalParts[0]);

                              // Verificar si las fechas son válidas
                              if (!isNaN(fechaInicial.getTime()) && !isNaN(fechaFinal.getTime())) {
                                  // Verificar si la fecha actual está entre fechaInicialVigencia y fechaFinalVigencia
                                  if (currentDate >= fechaInicial && currentDate <= fechaFinal) {
                                      return 'VIGENTE';
                                  } else {
                                      return 'NO VIGENTE';
                                  }
                              } else {
                                  // Si las fechas no son válidas, asumir como NO VIGENTE por precaución
                                  return 'NO VIGENTE';
                              }
                          }
                      }
                      return data; // Para otros tipos de renderizado, devolver el dato original
                  }
              },
              {
                  data: 'tiposDocumentoIdentidad.nombreDocumentoIdentidadAb'
              },
              {
                  data: 'numeroTelefono'
              },
              {
                  data: 'numeroFax'
              },
              {
                  data: 'emailPersona'
              },
              {
                  data: 'emailAlterno'
              },
              {
                  data: 'fechaInicialVigencia'
              },{
                  data: 'id',
                  searchable: false,
                  orderable: false,
                  render: renderActionsPersonaAut
              }
          ],
          order: [
              [
                  0, 'desc'
              ]
          ],
          pageLength: 5
      });
      /*DATATABLES PERSONAS/USUARIOS AUTORIZADAS*/



      /*DATATABLES EXTABLECIMIENTO*/
      tableEstablecimiento = $(TABLE_ID_ESTABLECIMIENTO).DataTable({
          ajax: {
              url: BACKEND_URL  + '/exportadores-establecimie/dt',
              data: function (c){ c.carnetExportador =  exportador.carnetExportador}
          },
          serverSide: true,
          columnsDefs: [
              {
                  targets:[5],
                  render: (data, type, row) => data + ' (' + row[6] + ')',
              },
              { visible: false, targets: [6] }
          ],
          columns: [
              {
                  data: 'id.establecimientosAutorizado.codigoEstablecimiento',
              },
              {
                  data: 'id.establecimientosAutorizado.nombreEstablecimiento',
              },
              {
                  data: 'id.establecimientosAutorizado.categoria',
                  visible: false
              },
              {
                  data: 'numeroAutorizacion',
                  visible: false
              },
              {
                  data: 'fechaAutorizacion',
                  visible: false
              },
              {
                  data: 'id.establecimientosAutorizado.pais.nombrePais',
                  visible: false
              },
              {
                  data: 'id.establecimientosAutorizado.departamento.nombreDepartamento',
                  visible: false
              },
              {
                  data: 'id.establecimientosAutorizado.departamento.nombreDepartamento',
                  visible: false
              },
              {
                  data: 'id',
                  searchable: false,
                  orderable: false,
                  render: renderActionsEstablecimiento
              }
          ],
          order: [
              [
                  0, 'desc'
              ]
          ],
          pageLength: 5
      });
  }

    /*DATATABLES ESTABLECIMIENTO*/


    /*DATATABLES CONSIGNATARIOS*/
    tableConsignatario = $(TABLE_ID_CONSIGNATARIO).DataTable({
        ajax: {
            url: BACKEND_URL  + '/exportadores-consignatari/dt',
            data: function (c){ c.carnetExportador =  exportador.carnetExportador}
        },
        serverSide: true,
        columns: [
            {
                data: 'id',
                visible: false
            },
            {
                data: 'consignatario.nombreConsignatario'
            }
        ],
        order: [
            [
                0, 'desc'
            ]
        ],
        pageLength: 5
    });
    /*DATATABLES CONSIGNATARIOS*/



    /*DATATABLES PRODUCTOS EXP*/
    tableProductosEx = $(TABLE_ID_PRODUCTOS_EX).DataTable({
        ajax: {
            url: BACKEND_URL  + '/exportadores-productosex/dt',
            data: function (c){ c.carnetExportador =  exportador.carnetExportador}
        },
        serverSide: true,
        columns: [
            {
                data: 'id.codigoArancelario'
            },
            {
                data: 'id.codigoProducto'
            },
            {
                data: 'productosExportable.nombreProducto'
            },
            {
                data: 'productosExportable.nombreProductoCientific'
            }
        ],
        order: [
            [
                0, 'desc'
            ]
        ],
        pageLength: 5
    });
    /*DATATABLES PRODUCTOS EXP*/


    /*DATATABLES PLANTAS PRODUCTORAS*/
    tablePlantasProd = $(TABLE_ID_PLANTAS_PROD).DataTable({
        ajax: {
            url: BACKEND_URL  + '/exportadores-plantas-prod/dt',
            data: function (c){ c.carnetExportador =  exportador.carnetExportador}
        },
        serverSide: true,
        columns: [
            {
                data: 'direccionPlanta'
            },
            {
                data: 'telefonoPlanta'
            },
            {
                data: 'faxPlanta'
            },
            {
                data: 'contactoPlanta'
            },
            {
                data: 'id',
                searchable: false,
                orderable: false,
                render: renderActionsPlantaProd
            }
        ],
        order: [
            [
                0, 'desc'
            ]
        ],
        pageLength: 5
    });
    /*DATATABLES PLANTAS PRODUCTORAS*/

    /*DATATABLES REPRESENTANTES EXTERIOR*/
    tableRepresentanteExt = $(TABLE_ID_REPRESENTANTE_EXT).DataTable({
        ajax: {
            url: BACKEND_URL  + '/exportadores-representante/dt',
            data: function (c){ c.carnetExportador =  exportador.carnetExportador}
        },
        serverSide: true,
        columns: [
            {
                data: 'nombreRepresentante'
            },
            {
                data: 'direccionRepresentante'
            },
            {
                data: 'telefonoRepresentante'
            },
            {
                data: 'faxRepresentante'
            },
            {
                data: 'urlRepresentante'
            },
            {
                data: 'emailRepresentante'
            },
            {
                data: 'id',
                searchable: false,
                orderable: false,
                render: renderActionsRepresentante
            }
        ],
        order: [
            [
                0, 'desc'
            ]
        ],
        pageLength: 5
    });
    /*DATATABLES REPRESENTANTES EXTERIOR*/


    /*DATATABLES ORIGENES*/
    tableOrigen = $(TABLE_ID_ORIGENES).DataTable({
        ajax: {
            url: BACKEND_URL  + '/exportadores-origenes/dt',
            data: function (c){ c.carnetExportador =  exportador.carnetExportador}
        },
        serverSide: true,
        columns: [
            {
                data: 'pais.nombrePais'
            },
            {
                data: 'porcentaje'
            }
        ],
        order: [
            [
                0, 'desc'
            ]
        ],
        pageLength: 5
    });
    /*DATATABLES ORIGENES*/

    /*DATATABLES BANCOS*/
    tableBancos = $(TABLE_ID_BANCOS).DataTable({
        ajax: {
            url: BACKEND_URL  + '/exportadores-banco/dt',
            data: function (c){ c.carnetExportador =  exportador.carnetExportador}
        },
        serverSide: true,
        columns: [
            {
                data: 'banco.nombreBanco'
            }
        ],
        order: [
            [
                0, 'desc'
            ]
        ],
        pageLength: 5
    });
    /*DATATABLES BANCOS*/

    /*DATATABLES PROFESIONALE*/
    tableProfesionale = $(TABLE_ID_PROFESIONALE).DataTable({
        ajax: {
            url: BACKEND_URL  + '/exportadores-profesionale/dt',
            data: function (c){ c.carnetExportador =  exportador.carnetExportador}
        },
        serverSide: true,
        columns: [
            {
                data: 'profesionalesAutorizado.nombreProfesional'
            },
            {
                data: 'profesionalesAutorizado.id.tipoProfesional',
                render: function (data, type) {
                    if (type === 'display') {
                        let label = '';
                        if(data === 'T'){
                            label = 'TECNICO DEL MAG';
                        }else{
                            label = 'M\u00c9DICO VETERINARIO'
                        }
                        return label;
                    }

                    return data;
                }
            }
        ],
        order: [
            [
                0, 'desc'
            ]
        ],
        pageLength: 5
    });
    /*DATATABLES PROFESIONALES*/


    /*DATATABLES USUARIOS AUT*/
    tableUsuario = $(TABLE_ID_USUARIO).DataTable({
        ajax: {
            url: BACKEND_URL  + '/exportadores-usuarios/dt',
            data: function (c){ c.carnetExportador =  exportador.carnetExportador}
        },
        serverSide: true,
        columns: [
            {
                data: 'nombreUsuario'
            },
            {
                data: 'numeroTelefono'
            },
            {
                data: 'emailUsuario'
            },
            {
                data: 'fechaFinalVigencia',
                render: function (data, type) {
                    if (type === 'display') {
                        let label = '';
                        if(data === null || data === ''){
                            label = 'VIGENTE';
                        }else{
                            label = 'NO VIGENTE'
                        }
                        return label;
                    }

                    return data;
                }
            },
        ],
        order: [
            [
                0, 'desc'
            ]
        ],
        pageLength: 5
    });
    /*DATATABLES USUARIOS AUT*/
}

function resetDatatables(){
    if (tableActividad != null || tableAgente != null || tableDivision != null || tableParque != null ||
        tablePersonaAut != null || tableZonaFranca != null || tableAutorizacion != null || tableEstablecimiento != null||
        tableConsignatario != null || tableProductosEx != null || tablePlantasProd != null || tableRepresentanteExt != null ||
        tableOrigen != null || tableBancos != null || tableProfesionale != null || tableUsuario != null) {

        tableActividad.clear().destroy();
        tableActividad = null;
        tableAgente.clear().destroy();
        tableAgente = null;
        tableDivision.clear().destroy();
        tableDivision = null;
        tableParque.clear().destroy();
        tableParque = null;
        tablePersonaAut.clear().destroy();
        tablePersonaAut = null;
        tableZonaFranca.clear().destroy();
        tableZonaFranca = null;

        tableAutorizacion.clear().destroy();
        tableAutorizacion = null;
        tableEstablecimiento.clear().destroy();
        tableEstablecimiento = null;
        tableConsignatario.clear().destroy();
        tableConsignatario = null;
        tableProductosEx.clear().destroy()
        tableProductosEx = null;
        tablePlantasProd.clear().destroy();
        tablePlantasProd = null;
        tableRepresentanteExt.clear().destroy();
        tableRepresentanteExt = null;
        tableOrigen.clear().destroy();
        tableOrigen = null;
        tableBancos.clear().destroy();
        tableBancos = null;
        tableProfesionale.clear().destroy();
        tableProfesionale = null;
        tableUsuario.clear().destroy();
        tableUsuario = null;

    }
}


function getActividadPrincipal(carnetExportador){
    $.ajax({
        data: { carnetExportador: carnetExportador},
        url: BACKEND_URL + '/exportadores-actividades/getByActividadPrincipalAndExportador',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            if (result.success === true) {
                let newOption8 = new Option(result.data.id.actividadesEconomica.nombreActividadEconomic,
                    result.data.id.actividadesEconomica.codigoActividadEconomic, true, true);
                $('#actividadEconomicaPrincipal').append(newOption8).trigger('change');
            } else {
                swalWithBootstrapButtons.fire(
                    'ERROR',
                    result.message,
                    'error'
                )
            }
        },
        error: function (jqXHR,errorTextStatus, status) {
            swalWithBootstrapButtons.fire(
                'ERROR',
                'Error en la petición: ' + errorTextStatus,
                'error'
            )
        }
    });
}
jQuery(function ($) {

    //DATATABLE DE EXPORTADORES EN PANTALLA VERIFICAR
    $(TABLE_ID).DataTable({
        ajax: BACKEND_URL  + '/verificar-exportador/dt',
        serverSide: true,
        columns: [
            {
                data: 'carnetExportador',
                width: "10%",
            },
            {
                data: 'nitExportador'
            },
            {
                data: 'nombreExportador'
            },
            {
                data: 'fechaInscripcion',
            },
            {
                data: 'fechaInscripcion',// columna cantidad de dias inscrito
                render: function ( data, type, row ){
                    const fecha = new Date().toLocaleDateString(); //fecha actual dd/mm/yyyy
                    var fechaParts = fecha.split("/");
                    var fechaData = new Date(+fechaParts[2], fechaParts[1] - 1, +fechaParts[0]);

                    var dateParts = data.split("/");
                    var dateData = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                    var diff = fechaData - dateData;
                    var cantDias = Math.round(diff / (1000 * 60 * 60 * 24));
                    return cantDias;
                }
            },
            {
                data: 'municipio.id.departamento.id.codigoDepartamento',
                visible: false
            },
            {
                data: 'municipio.id.codigoMunicipio',
                visible: false
            },
            {
                data: 'carnetExportador',
                searchable: false,
                orderable: false,
                render: renderActions
            }
        ],
        order: [
            [
                0, 'asc'
            ]
        ]
    });






    $('#tiposDocumentoIdentidadExpor').select2({placeholder: "Seleccione un documento"});
    select2single('#tiposDocumentoIdentidadExpor', BACKEND_URL + '/tipos-documentos-identidad/s2-nombre-documento', 10)

    select2single('#tiposDocumentoIdentidadRepresentante', BACKEND_URL + '/tipos-documentos-identidad/s2-nombre-documento', 10)

    //persona/usuario autorizados
    select2single('#tiposDocumentoIdentidad', BACKEND_URL + '/tipos-documentos-identidad/s2', 10)


    //pais emision documento expediente
    select2single('#pais1', BACKEND_URL + '/pais/s2Vigentes', 10);

    //pais emision documento representante legal
    select2single('#pais2', BACKEND_URL + '/pais/s2Vigentes', 10);

    //pais documento persona/usuario autorizado
    select2single('#paisDocumento', BACKEND_URL + '/pais/s2Vigentes', 10);

    //select2single('#codigoPais', BACKEND_URL + '/pais/s2Vigentes', 10);

    select2single('#departamento', BACKEND_URL + '/departamento/s2', 10, 213, null);

    select2single('#municipio', BACKEND_URL + '/municipio/s2', 10, 213, 6);


    $("#codigoPais").on("change", function() {
        $("#departamento").val('').trigger('change');
        select2ChangeSingle('#departamento', BACKEND_URL + '/departamento/s2', 10, $(this).val(), null);
    });

    $("#departamento").on("change", function() {
        $("#municipio").val('').trigger('change');
        select2ChangeSingle('#municipio', BACKEND_URL + '/municipio/s2', 10, $("#codigoPais").val(), $(this).val());
    });

    select2single('#paisExportador', BACKEND_URL + '/pais/s2Vigentes', 10);

    select2single('#actividadEconomicaPrincipal', BACKEND_URL + '/actividades-economica/s2', 10);

    select2single('#actividadesEconomica', BACKEND_URL + '/actividades-economica/s2', 10);

    select2single('#agentesAduanale', BACKEND_URL + '/exportadores-agentes-adua/s2AgentesVigentes', 10);

    select2single('#codigoParqueServicio', BACKEND_URL + '/exportadores-parque-servicio/s2ParqueServicioVigentes', 10);

    select2single('#paisD', BACKEND_URL + '/pais/s2Vigentes', 10);

    select2single('#departamentoD', BACKEND_URL + '/departamento/s2', 10, 213, null);

    select2single('#municipioD', BACKEND_URL + '/municipio/s2', 10, 213, $("#departamentoD").val());

    $("#paisD").on("change", function() {
        $("#departamentoD").val("").trigger('change');
        select2ChangeSingle('#departamentoD', BACKEND_URL + '/departamento/s2', 10, $(this).val(), null);
    });

    $("#departamentoD").on("change", function() {
        $("#municipioD").val("");
        select2ChangeSingle('#municipioD', BACKEND_URL + '/municipio/s2', 10, $("#paisD").val(), $(this).val());
    });

    select2single('#paisZ', BACKEND_URL + '/pais/s2Vigentes', 10);

    select2ChangeSingle('#departamentoZ', BACKEND_URL + '/departamento/s2', 10, 213, null);

    select2ChangeSingle('#municipioZ', BACKEND_URL + '/municipio/s2', 10, 213, $("#departamentoZ").val());

    $("#paisZ").on("change", function() {
        $("#departamentoZ").val("").trigger('change');
        select2ChangeSingle('#departamentoZ', BACKEND_URL + '/departamento/s2', 10, $(this).val(), null);
    });

    $("#departamentoZ").on("change", function() {
        $("#municipioZ").val("").trigger('change');
        select2ChangeSingle('#municipioZ', BACKEND_URL + '/municipio/s2', 10, $("#paisZ").val(), $(this).val());
    });

    select2single('#zonasFranca', BACKEND_URL + '/exportadores-zonas-franca/s2ZonasFranca', 10);

    select2single('#establecimientosAutorizado', BACKEND_URL + '/establecimiento/s2', 10);

    select2single('#tiposInformacion', BACKEND_URL + '/tipos-informacion/s2', 10);

});
