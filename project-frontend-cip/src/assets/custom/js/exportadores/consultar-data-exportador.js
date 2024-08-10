let queryString = window.location.search;
let params = new URLSearchParams(queryString);
let carnetExportador = params.get('carnetExportador');

const FORM_ID_MOD = '#formConsultarExportador';
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


jQuery(function ($) {

   // $("#contenido").hide();
    swalInstance = Swal.fire({
        title: 'CARGANDO....',
        text: 'LA INFORMACIÓN ESTA CARGANDO',
        icon: 'info',
        showConfirmButton: false
    });


    // Función para realizar la solicitud AJAX y devolver una promesa
    function consultarExportador(carnetExportador) {
        return new Promise((resolve, reject) => {
            $.ajax({
                data: { carnetExportador: carnetExportador },
                url: BACKEND_URL + '/buscarExportador/getDatosExportador',
                type: 'GET',
                dataType: 'json',
                success: function (result) {
                    resolve(result);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    reject(errorThrown);
                }
            });
        });
    }

    // Función asincrónica para manejar la consulta de operación
    async function consultarExportadorAsync(carnetExportador) {
        try {
            const result = await consultarExportador(carnetExportador);
            if (result.success === true) {
                let data = result.data;
                populateFormExportadorConsultar(data);
               // $("#contenido").show();
                if (swalInstance) {
                    Swal.close();
                }
            } else {
                swalWithBootstrapButtons.fire(
                    'ERROR',
                    result.message,
                    'error'
                );
                $("#contenido").hide();
            }
        } catch (error) {
            swalWithBootstrapButtons.fire(
                'ERROR',
                'Error en la petición: ' + error,
                'error'
            );
        }
    }

    consultarExportadorAsync(carnetExportador);

    //CARGA GENERAL DE SELECTS 2

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

//definicion de accion regresar
function backBtn(){
    window.close();
}

//definicion de accion terminar
function endBtn(){
    window.close();
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

function cargarInfoAdicional(exportador){
    console.log(exportador);
    $("#labelCarnet").text(exportador.carnetExportador);
    $("#labelNombre").text(exportador.nombreExportador);
    $("#exportadore").val(exportador.carnetExportador);//id para campo exportador en actividad economica
    $("#exportadoreA").val(exportador.carnetExportador);//id para campo exportador en agentes aduanales
    $("#exportadorD").val(exportador.carnetExportador);//id para campo exportador endivisiones
    $("#exportadorE").val(exportador.carnetExportador);//id para campo exportador en establecimientos
    $("#carnetExportador").val(exportador.carnetExportador);//id para campo exportador en parque de servicio
    $("#carnetExportadorZ").val(exportador.carnetExportador);//id para campo exportador en zona franca
    $("#exportadoreP").val(exportador.carnetExportador); // id para campo exportadore en persona/usuario autorizado

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

function populateFormExportadorConsultar(data){

    console.log(data.carnetExportador);
    populateForm($(FORM_ID_MOD)[0], data);

    cargarInfoAdicional(data);
    getActividadPrincipal(carnetExportador)

    document.getElementById("esGranContribuyenteCheck").checked = data.esGranContribuyente ==="S" ;
    document.getElementById("estaExentoCheck").checked = data.estaExento ==="S" ;


    if(data.tiposDocumentoIdentidadExpor !== null){
        let newOption1 = new Option(        data.tiposDocumentoIdentidadExpor.nombreDocumentoIdentidad,
            data.tiposDocumentoIdentidadExpor.codigoTipoDocumentoIdentida, true, true);
        $('#tiposDocumentoIdentidadExpor').append(newOption1).trigger('change');
    }

    if(data.pais1 !== null){
        let newOption2 = new Option(data.pais1.nombrePais,
            data.pais1.codigoPais, true, true);
        $('#pais1').append(newOption2).trigger('change');
    }

    if(data.paisExportador !== null){
        let newOption3 = new Option(data.paisExportador.nombrePais,
            data.paisExportador.codigoPais, true, true);
        $('#codigoPais').append(newOption3).trigger('change');
    }

    if(data.departamento !== null){
        let newOption4 = new Option(data.departamento.nombreDepartamento,
            data.municipio.id.departamento.id.codigoDepartamento, true, true);
        $('#departamento').append(newOption4).trigger('change');

    }

    if(data.municipio !== null){
        let newOption5 = new Option(data.municipio.nombreMunicipio,
            data.municipio.id.codigoMunicipio, true, true);
        $('#municipio').append(newOption5).trigger('change');
    }

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
$('[data-mask]').inputmask()


