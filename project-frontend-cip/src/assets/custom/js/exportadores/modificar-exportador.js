const FORM_ID_EXP = '#formInscribirExportador';
const FORM_ID_ACTIVIDAD = '#formActividad';
const FORM_ID_AGENTE_ADUA = '#formAgenteAduanal';
const FORM_ID_DIVISION = '#formDivision';
const FORM_ID_PARQUE = '#formParqueServicio';
const FORM_ID_ZONA_FRANCA = '#formZonaFranca';
const FORM_ID_PERSONA_AUT = '#formPersonaAut';
const FORM_ID_ESTABLECIMIENTO = '#formEstablecimiento';
const FORM_ID_AUTORIZACION = '#formAutorizaciones';
const FORM_PAIS = '#formPaises';
const FORM_PRODUCTO = '#formProductos';
const FORM_ID_PLANTA_PROD = '#formPlantaProd';
const FORM_ID_REPRESENTANTE_EXT = '#formRepresentaciones';
const FORM_ID_PRORROGAS = '#formProrrogas'
const MODAL_ID_ACTIVIDADES = '#actividadModal';
const MODAL_ID_AGENTES = '#agentesAduaModal';
const MODAL_ID_DIVISION = '#divisionModal';
const MODAL_ID_PARQUE = '#parqueServicioModal';
const MODAL_ID_ZONA_FRANCA = '#zonaFrancaModal';
const MODAL_ID_PERSONA_AUT = '#personaAutModal';
const MODAL_ID_ESTABLECIMIENTO = '#establecimientoModal';
const MODAL_ID_AUTORIZACION = '#autorizacionesModal';
const MODAL_ID_PLANTA_PROD = '#plantaProdModal';
const MODAL_ID_REPRESENTANTE_EXT = '#representacionesModal';
const MODAL_ID_PRORROGAS = '#prorrogasModal';
var paisesSeleccionados = [];
var productosSeleccionados = [];
var accionPr;//accion de productos 1:agregar 2:editar
var campoNrc;
const TABLE_ID_PRORROGA = '#prorrogasDT';
var tableProrroga;
var carnetExportador;
var nombreExportador;
var tipoInformacion;
var numeroAutorizacion;
var codigoTipoInformacion;


function addActividades() {
    $(MODAL_ID_ACTIVIDADES).find('.modal-title').html("Agregar actividad económica");
    $("#accion").val(1);
    $("#actividadesEconomica").attr("disabled", false);
    // resetFormData($(FORM_ID_ACTIVIDAD), 'input');
    $(MODAL_ID_ACTIVIDADES).modal('show');
}

function addAgentesAdua() {
    $(MODAL_ID_AGENTES).find('.modal-title').html("Agregar agentes aduanal");
    $(MODAL_ID_AGENTES).modal('show');
}

function addDivision() {
    $(MODAL_ID_DIVISION).find('.modal-title').html("Agregar división");
    $("#paisD").val(213).trigger('change');
    $("#departamentoD").val(6).trigger('change');
    $("#municipioD").val(14).trigger('change');
    $("#divCodigoSfce").attr("hidden",true);
    $("#nombreDivision").attr("readonly",false);
    $("#nombreDivision").val("");
    $("#direccionDivision").val("");
    $("#actividadesEconomica").attr("disabled", false);
    $("#paisD").removeAttr("disabled");
    $("#codigoDivision").val("");
    $(MODAL_ID_DIVISION).modal('show');
}

function addParqueServicio(){
    $(MODAL_ID_PARQUE).find('.modal-title').html("Agregar parque de servicio");
    resetFormData($(FORM_ID_PARQUE));
    $("#codigoParqueServicio").removeAttr("disabled");
    $(MODAL_ID_PARQUE).modal('show');
}

function addPersonaAut(){
    $(MODAL_ID_PERSONA_AUT).find('.modal-title').html("Agregar persona/usuario autorizado por el exportador");
    // resetFormData($(FORM_ACTIVIDADES_ID));
    $("#accionP").val(1);
    $(MODAL_ID_PERSONA_AUT).modal('show');
}

function addZonaFranca(){
    $("#zonasFranca").removeAttr('disabled');
    $("#accionZ").val(1);
    $("#zonasFranca").val("").trigger('change');
    $("#paisZ").val(213).trigger('change');
    $("#departamentoZ").val(6).trigger('change');
    $("#municipioZ").val(14).trigger('change');
    $("#direccionZonaFranca").val("");
    $(MODAL_ID_ZONA_FRANCA).find('.modal-title').html("Agregar zona franca");
    $(MODAL_ID_ZONA_FRANCA).modal('show');
}

function addEstablecimiento(){
    $("#establecimientosAutorizado").removeAttr('disabled');
    $(MODAL_ID_ESTABLECIMIENTO).find('.modal-title').html("Agregar establecimiento");
    resetFormData($(FORM_ID_ESTABLECIMIENTO));
    $("#accionE").val(1);
    $(MODAL_ID_ESTABLECIMIENTO).modal('show');
}

function addAutorizacion(){
    $("#tabProrroga").hide();
    $("#divRadioProd").show();
    $("#divRadioPais").show();
    $("#tab_aut_datos").addClass("active");
    $("#datos-generales-autorizaciones").addClass("show");
    $("#datos-generales-autorizaciones").addClass("active");
    $("#registrar-paises").removeClass("show");
    $("#registrar-paises").removeClass("active");
    $("#registrar-productos").removeClass("show");
    $("#registrar-productos").removeClass("active");
    $("#tab_aut_pais").attr("disabled",true);
    $("#tab_aut_prod").attr("disabled",true);
    $("#tab_aut_pais").removeClass("active");
    $("#tab_aut_prod").removeClass("active");
    $("#tiposInformacion").attr("disabled", false);
    $("#numeroAutorizacionA").attr("readonly", false);
    $("#fechaAutorizacionA").attr("readonly", false);
    $("#containerS2").show();
    $('#lProductos').empty();
    $('#checkProductos').empty();

    $("#containerList").show();
    accionPr = 1;

    var estado = $("#estadoExportador").val();
    var fechaInicioVExp = $("#fechaInicialVigencia").val();
    var dateParts1 = fechaInicioVExp.split("/");
    var dateData1 = new Date(+dateParts1[2], dateParts1[1] - 1, +dateParts1[0]);

    var fechaFinVExp = $("#fechaFinalVigencia").val();
    var dateParts2 = fechaFinVExp.split("/");
    var dateData2 = new Date(+dateParts2[2], dateParts2[1] - 1, +dateParts2[0]);

    const fechaHoy = new Date().toLocaleDateString(); //fecha actual dd/mm/yyyy
    var fechaParts = fechaHoy.split("/");
    var fechaData = new Date(+fechaParts[2], fechaParts[1] - 1, +fechaParts[0]);



    if(estado === 'S' && dateData1 <= fechaData && (dateData2  >= fechaData || fechaFinVExp === '')){
        $(MODAL_ID_AUTORIZACION).find('.modal-title').html("Agregar autorización");
        resetFormData($(FORM_ID_AUTORIZACION));
        //set de valores inicialess
        $("#accionAut").val(1);
        $("#carnetExportadorA").val($("#carnetExportador").val());
        $("#nitExportadorA").val($("#nitExportador").val());
        $("#nombreExportadorA").val($("#nombreExportador").val());
        $("#detallaraPaisesNo").prop('checked', true);
        $("#detallaraProductosNo").prop('checked', true);
        $(MODAL_ID_AUTORIZACION).modal('show');
    }else{
        swalWithBootstrapButtons.fire(
            'ERROR',
            "El exportador seleccionado no existe o no está vigente",
            'error'
        )
    }
}

function addProrrogas(){
    $("#exportador").val($("#nombreExportador").val());
    $(MODAL_ID_PRORROGAS).find('.modal-title').html("Agregar Prorroga");
    $(MODAL_ID_PRORROGAS).modal('show');
}

//EDIT ACTIVIDAD EXPORTADOR
function editExporActividad(row) {
    let data = $(TABLE_ID_ACTIVIDADES).DataTable().row(row).data();
    populateFormExporActividad(data);
    $("#accion").val(2);
    $("#actividadesEconomica").attr("disabled", true);
    $(MODAL_ID_ACTIVIDADES).find('.modal-title').html("Editar actividad económica");
    $(MODAL_ID_ACTIVIDADES).modal('show');
}

//EDIT DIVISION EXPORTADOR
function editExporDivision(row) {
    let data = $(TABLE_ID_DIVISIONES).DataTable().row(row).data();

    populateFormExporDivision(data);
    $("#divCodigoSfce").attr("hidden",false);
    $("#nombreDivision").attr("readonly",true);
    $("#actividadesEconomica").attr("disabled", true);
    $("#paisD").attr("disabled",true);
    $(MODAL_ID_DIVISION).find('.modal-title').html("Editar división");
    $(MODAL_ID_DIVISION).modal('show');
}


//EDIT PARQUE EXPORTADOR
function editExporParque(row) {
    let data = $(TABLE_ID_PARQUE).DataTable().row(row).data();
    $("#parqueOld").val(data.id.codigoParqueServicio.codigoParqueServicio);
    $("#codigoParqueServicio").attr("disabled", true);
    populateFormExporParque(data);
    $(MODAL_ID_PARQUE).find('.modal-title').html("Editar parque");
    $(MODAL_ID_PARQUE).modal('show');
}

//EDIT PERSONAS AUT EXPORTADOR
function editExporPersonaAut(row) {
    $("#accionP").val(2);
    let data = $(TABLE_ID_PERSONA_AUT).DataTable().row(row).data();
    populateFormExporPersona(data);
    $(MODAL_ID_PERSONA_AUT).find('.modal-title').html("Editar persona autorizada");
    $(MODAL_ID_PERSONA_AUT).modal('show');
}

//EDIT ZONAS FRANCA EXPORTADOR
function editExporZonaFranca(row) {
    $("#accionZ").val(2);
    let data = $(TABLE_ID_ZONA_FRANCA).DataTable().row(row).data();
    populateFormExporZonasFranca(data);
    $("#zonasFranca").attr("disabled",true);
    $(MODAL_ID_ZONA_FRANCA).find('.modal-title').html("Editar zona franca que utiliza");
    $(MODAL_ID_ZONA_FRANCA).modal('show');
}

//EDIT ESTABLECIMIENTOS EXPORTADOR
function editExporEstablecimiento(row) {
    let data = $(TABLE_ID_ESTABLECIMIENTO).DataTable().row(row).data();
    populateFormExporEstablecimiento(data);
    $("#establecimientoOld").val(data.id.establecimientosAutorizado.codigoEstablecimiento);
    $("#accionE").val(2);
    $("#establecimientosAutorizado").attr("disabled",true);
    $(MODAL_ID_ESTABLECIMIENTO).find('.modal-title').html("Editar establecimiento");
    $(MODAL_ID_ESTABLECIMIENTO).modal('show');
}

//EDIT AUTORIZACIONES EXPORTADOR
function editExporAutorizacion(row) {
    let data = $(TABLE_ID_AUTORIZACION).DataTable().row(row).data();
    populateFormExporAutorizacion(data);


    /*PRORROGAS*/
    $("#tabProrroga").show();
    tipoInformacion = data.tiposInformacion.nombreTipoInformacion;
    numeroAutorizacion = data.id.numeroAutorizacion;
    carnetExportador = data.exportadore.carnetExportador;
    codigoTipoInformacion = data.tiposInformacion.codigoTipoInformacion;
    $("#tipoInformacionPro").val(tipoInformacion);
    $("#numAutorizacion").val(numeroAutorizacion);
    $("#carnetExportadorPro").val(carnetExportador);
    $("#codigoTipoInformacion").val(codigoTipoInformacion);
    getTableProrrogas(data.exportadore.carnetExportador,data.tiposInformacion.codigoTipoInformacion,
        data.id.numeroAutorizacion);
    $("#agregar-prorroga").removeClass("show");
    $("#agregar-prorroga").removeClass("active");
    $("#tab_ag_prorroga").removeClass("active");
    $("#tab_ag_prorroga").attr("disabled",false);
    /*PRORROGAS*/

    $("#accionAut").val(2);
    $("#carnetExportadorA").val(data.exportadore.carnetExportador);
    $("#nitExportadorA").val($("#nitExportador").val());
    $("#nombreExportadorA").val(data.exportadore.nombreExportador);
    $("#tiposInformacion").attr("disabled", true);
    $("#numeroAutorizacionA").attr("readonly", true);
    $("#fechaAutorizacionA").attr("readonly", true);
    $("#divRadioProd").hide();
    $("#divRadioPais").hide();
    $("#tab_aut_datos").addClass("active");
    $("#datos-generales-autorizaciones").addClass("show");
    $("#datos-generales-autorizaciones").addClass("active");
    $("#registrar-paises").removeClass("show");
    $("#registrar-paises").removeClass("active");
    $("#registrar-productos").removeClass("show");
    $("#registrar-productos").removeClass("active");
    $("#tab_aut_pais").removeClass("active");
    $("#tab_aut_prod").removeClass("active");
    $("#tab_aut_pais").attr("disabled",false);
    $("#tab_aut_prod").attr("disabled",false);
    $('#checkProductos').empty();
    $("#containerS2").show();
    $("#containerList").show();
    $('#lProductos').empty();
    llenarPaisesEdit(data);
    llenarProductosEdit(data);
    $("#chktodos").prop("checked", false);
    $("#chktodosProd").prop("checked", false);
    accionPr = 2;
    $(MODAL_ID_AUTORIZACION).find('.modal-title').html("Editar autorización");
    $(MODAL_ID_AUTORIZACION).modal('show');
}


function getTableProrrogas(carnetExportador,tipoInformacion,numeroAutorizacion){

    resetDatatablesPro();
    /*DATATABLE PRORROGA*/
    tableProrroga = $(TABLE_ID_PRORROGA).DataTable({
        ajax: {
            url: BACKEND_URL  + '/exportadores-aut-prorroga/dt',
            data: function (c){
                c.carnetExportador =  carnetExportador,c.tipoInformacion = tipoInformacion, c.numeroAutorizacion = numeroAutorizacion}
        },
        serverSide: true,
        columns: [
            {
                data: 'id.correlativoProrroga',
                width: "10%"
            },
            {
                data: 'fechaAutorizacionProrroga'
            },
            {
                data: 'fechaVencimientoProrroga'
            },
            {
                data: 'observaciones'
            }
        ],
        order: [
            [
                0, 'desc'
            ]
        ],
        pageLength: 5
    });
    /*DATATABLE PRORROGA*/
}

function resetDatatablesPro(){
    if (tableProrroga != null) {

        tableProrroga.clear().destroy();
        tableProrroga = null;
    }
}




//DELETE ACTIVIDAD
function delExporActividad(row) {
    let rowData = $(TABLE_ID_ACTIVIDADES).DataTable().row(row).data();
    populateFormExporActividad(rowData);
    $("#accion").val(1);
    $("#actividadesEconomica").attr("disabled", false);
    let url = BACKEND_URL + '/exportadores-actividades/delete';
    let data = $(FORM_ID_ACTIVIDAD).serialize();
    showConfirmMessage('Desea eliminar la actividad exportadora: '
        + rowData.id.actividadesEconomica.nombreActividadEconomic, function () {
        ajaxPostCall(url, data, null, function (result) {
            $(TABLE_ID_ACTIVIDADES).DataTable().ajax.reload(null, false);
        });
    });
}


//DELETE AGENTE ADUANERO
function delExporAgente(row) {
    let rowData = $(TABLE_ID_AGENTES).DataTable().row(row).data();
    populateFormExporAgente(rowData);
    let url = BACKEND_URL + '/exportadores-agentes-adua/delete';
    let data = $(FORM_ID_AGENTE_ADUA).serialize();
    showConfirmMessage('Desea eliminar el agente aduanal: '
        + rowData.id.agentesAduanale.nombreAgenteAduanal, function () {
        ajaxPostCall(url, data, null, function (result) {
            $(TABLE_ID_AGENTES).DataTable().ajax.reload(null, false);
        });
    });
}

//DELETE DIVISION
function delExporDivision(row) {
    let rowData = $(TABLE_ID_DIVISIONES).DataTable().row(row).data();
    $("#paisD").removeAttr("disabled");
    populateFormExporDivision(rowData);
    let url = BACKEND_URL + '/exportadores-division/delete';
    let data = $(FORM_ID_DIVISION).serialize();
    showConfirmMessage('Desea eliminar la división: '
        + rowData.nombreDivision, function () {
        ajaxPostCall(url, data, null, function (result) {
            $(TABLE_ID_DIVISIONES).DataTable().ajax.reload(null, false);
        });
    });
}

//DELETE PARQUE
function delExporParque(row) {
    let rowData = $(TABLE_ID_PARQUE).DataTable().row(row).data();
    $("#codigoParqueServicio").removeAttr("disabled");
    populateFormExporParque(rowData);
    let url = BACKEND_URL + '/exportadores-parque-servicio/delete';
    let data = $(FORM_ID_PARQUE).serialize();
    showConfirmMessage('Desea eliminar el parque de servicio: '
        + rowData.id.codigoParqueServicio.nombreParqueServicio, function () {
        ajaxPostCall(url, data, null, function (result) {
            $(TABLE_ID_PARQUE).DataTable().ajax.reload(null, false);
        });
    });
}

//DELETE PERSONAS AUTORIZADAS
function delExporPersonaAut(row) {
    let rowData = $(TABLE_ID_PERSONA_AUT).DataTable().row(row).data();
    populateFormExporPersona(rowData);
    let url = BACKEND_URL + '/exportadores-personas-aut/delete';
    let data = $(FORM_ID_PERSONA_AUT).serialize();
    showConfirmMessage('Desea eliminar la persona/usuario autorizado: '
        + rowData.nombrePersona, function () {
        ajaxPostCall(url, data, null, function (result) {
            $(TABLE_ID_PERSONA_AUT).DataTable().ajax.reload(null, false);
        });
    });
}

//DELETE ZONA FRANCA
function delExporZonaFranca(row) {
    $("#paisZ").removeAttr('disabled');
    $("#accionZ").val(2);
    $("#zonasFranca").removeAttr('disabled');
    let rowData = $(TABLE_ID_ZONA_FRANCA).DataTable().row(row).data();
    populateFormExporZonasFranca(rowData);
    let url = BACKEND_URL + '/exportadores-zonas-franca/delete';
    let data = $(FORM_ID_ZONA_FRANCA).serialize();
    showConfirmMessage('Desea eliminar la zona franca: '
        + rowData.zonasFranca.nombreZonaFranca, function () {
        ajaxPostCall(url, data, null, function (result) {
            $(TABLE_ID_ZONA_FRANCA).DataTable().ajax.reload(null, false);
            $("#zonasFranca").attr("disabled",true);
            $("#paisZ").attr('disabled', true);
        });
    });
}

//DELETE EXTABLECIMIENTO
function delExporEstablecimiento(row) {
    $("#establecimientosAutorizado").removeAttr('disabled');
    let rowData = $(TABLE_ID_ESTABLECIMIENTO).DataTable().row(row).data();
    populateFormExporEstablecimiento(rowData);
    let url = BACKEND_URL + '/exportadores-establecimie/delete';
    let data = $(FORM_ID_ESTABLECIMIENTO).serialize();
    showConfirmMessage('Desea eliminar el establecimiento: '
        + rowData.id.establecimientosAutorizado.nombreEstablecimiento, function () {
        ajaxPostCall(url, data, null, function (result) {
            $(TABLE_ID_ESTABLECIMIENTO).DataTable().ajax.reload(null, false);
            $("#establecimientosAutorizado").attr("disabled",true);
        });
    });
}

//DELETE AUTORIZACION
function delExporAutorizacion(row) {
    let rowData = $(TABLE_ID_AUTORIZACION).DataTable().row(row).data();
    populateFormExporAutorizacion(rowData);
    let url = BACKEND_URL + '/exportadores-autorizacion/delete';
    let data = $(FORM_ID_AUTORIZACION).serialize();
    showConfirmMessage('Desea eliminar la autorización con número: '
        + rowData.id.numeroAutorizacion, function () {
        ajaxPostCall(url, data, null, function (result) {
            $(TABLE_ID_AUTORIZACION).DataTable().ajax.reload(null, false);
        });
    });
}

function populateFormExporActividad(data){
    populateForm($(FORM_ID_ACTIVIDAD)[0], data);
    document.getElementById("esActividadPrincipalCheck").checked = data.esActividadPrincipal ==="S" ;
    let newOption1 = new Option(data.id.actividadesEconomica.nombreActividadEconomic,
        data.id.actividadesEconomica.codigoActividadEconomic, true, true);
    $('#actividadesEconomica').append(newOption1).trigger('change');
}

function populateFormExporAgente(data){
    populateForm($(FORM_ID_AGENTE_ADUA)[0], data);
    let newOption1 = new Option(data.id.agentesAduanale.nombreAgenteAduanal,
        data.id.agentesAduanale.codigoAgenteAduanal, true, true);
    $('#agentesAduanale').append(newOption1).trigger('change');
}

function populateFormExporDivision(data){
    populateForm($(FORM_ID_DIVISION)[0], data);

    let newOption2 = new Option(data.pais.nombrePais,
        data.pais.codigoPais, true, true);
    $('#paisD').append(newOption2).trigger('change');

    let newOption3 = new Option(data.departamento.nombreDepartamento,
        data.departamento.id.codigoDepartamento, true, true);
    $('#departamentoD').append(newOption3).trigger('change');

    let newOption4 = new Option(data.municipio.nombreMunicipio,
        data.municipio.id.codigoMunicipio, true, true);
    $('#municipioD').append(newOption4).trigger('change');
}

function populateFormExporParque(data){
    populateForm($(FORM_ID_PARQUE)[0], data);
    let newOption1 = new Option(data.id.codigoParqueServicio.nombreParqueServicio,
        data.id.codigoParqueServicio.codigoParqueServicio, true, true);
    $('#codigoParqueServicio').append(newOption1).trigger('change');
}
function populateFormExporPersona(data){
    populateForm($(FORM_ID_PERSONA_AUT)[0], data);
}
function populateFormExporZonasFranca(data){
    populateForm($(FORM_ID_ZONA_FRANCA)[0], data);

    let newOption = new Option(data.zonasFranca.nombreZonaFranca,
        data.zonasFranca.id.codigoZonaFranca, true, true);
    $('#zonasFranca').append(newOption).trigger('change');

    let newOption2 = new Option(data.pais.nombrePais,
        data.pais.codigoPais, true, true);
    $('#paisZ').append(newOption2).trigger('change');

    let newOption3 = new Option(data.departamento.nombreDepartamento,
        data.departamento.id.codigoDepartamento, true, true);
    $('#departamentoZ').append(newOption3).trigger('change');

    let newOption4 = new Option(data.municipio.nombreMunicipio,
        data.municipio.id.codigoMunicipio, true, true);
    $('#municipioZ').append(newOption4).trigger('change');

}

function populateFormExporEstablecimiento(data){
    populateForm($(FORM_ID_ESTABLECIMIENTO)[0], data);
    let newOption1 = new Option(data.id.establecimientosAutorizado.nombreEstablecimiento,
        data.id.establecimientosAutorizado.codigoEstablecimiento, true, true);
    $('#establecimientosAutorizado').append(newOption1).trigger('change');
}

function populateFormExporAutorizacion(data){
    populateForm($(FORM_ID_AUTORIZACION)[0], data);
    let newOption1 = new Option(data.tiposInformacion.nombreTipoInformacion,
        data.tiposInformacion.codigoTipoInformacion, true, true);
    $('#tiposInformacion').append(newOption1).trigger('change');
}


//metodo para regresar
function back(){
    location.reload();
}


/** AUTORIZACIONES EXPORTADOR **/
$(FORM_ID_AUTORIZACION).validate({
    submitHandler: function (form) {
        var fechaAut = $('#fechaAutorizacionA').datetimepicker('viewDate');
        var fechaVen = $("#fechaVencimiento").datetimepicker('viewDate');
        var fechaDiff = fechaVen.diff(fechaAut);

        if (fechaDiff < 0) {
            swalWithBootstrapButtons.fire(
                'ERROR',
                "La fecha autorización no puede ser menor que la fecha vencimiento",
                'error'
            )
        } else {
            let paisSi = $("#detallaraPaisesSi").is(':checked');
            let paisNo = $("#detallaraPaisesNo").is(':checked');
            let prodSi = $("#detallaraProductosSi").is(':checked');
            let prodNo = $("#detallaraProductosNo").is(':checked');
            $("#codCarnetExportador").val($("#carnetExportador").val());
            $("#codTipoInformacion").val($("#tiposInformacion").val());
            if(paisSi){
                $("#tiposInformacion").attr("disabled", false);
                let url = BACKEND_URL + $(form).attr('action');
                let data = convertTextUpperCase(form);
                $("#carnetExportadorPais").val($("#codCarnetExportador").val());
                $("#codTipoInformacionPais").val($("#codTipoInformacion").val());
                $("#numeroAutorizacionPais").val($("#numeroAutorizacionA").val());
                $("#exportadorePais").val($("#carnetExportadorPais").val());
                showConfirmMessage('Desea guardar la autorizaci\u00f3n y luego detallar pais', function () {
                    ajaxPostCall(url, data, null, function (result) {
                        if(accionPr === 1){
                            detallarPais();
                        }else{
                            $(MODAL_ID_AUTORIZACION).modal('hide');
                        }
                        $(TABLE_ID_AUTORIZACION).DataTable().ajax.reload(null, false);
                    });
                });
            }
            if(prodSi){
                let url = BACKEND_URL + $(form).attr('action');
                let data = convertTextUpperCase(form);
                $("#exportadoreProd").val($("#codCarnetExportador").val());
                $("#codTipoInformacionProd").val($("#codTipoInformacion").val());
                $("#numeroAutorizacionProd").val($("#numeroAutorizacionA").val());
                $("#fechaAutorizacionProd").val($("#fechaAutorizacionA").val());
                $("#fechaVencimientoProd").val($("#fechaVencimiento").val());
                showConfirmMessage('Desea registrar la autorizaci\u00f3n y luego detallar productos', function () {
                    ajaxPostCall(url, data, null, function (result) {
                        if(accionPr === 1){
                            detallarProducto();
                        }else{
                            $(MODAL_ID_AUTORIZACION).modal('hide');
                        }
                        $(TABLE_ID_AUTORIZACION).DataTable().ajax.reload(null, false);
                    });
                });
            }
            if(paisSi && prodSi){
                let url = BACKEND_URL + $(form).attr('action');
                let data = convertTextUpperCase(form);
                $("#exportadoreProd").val($("#codCarnetExportador").val());
                $("#codTipoInformacionProd").val($("#codTipoInformacion").val());
                $("#numeroAutorizacionProd").val($("#numeroAutorizacionA").val());
                $("#fechaAutorizacionProd").val($("#fechaAutorizacionA").val());
                $("#fechaVencimientoProd").val($("#fechaVencimiento").val());
                showConfirmMessage('Desea registrar la autorizaci\u00f3n y luego detallar productos y pa\u00edses', function () {
                    ajaxPostCall(url, data, null, function (result) {
                        detallarProducto();
                        $("#detallaraPaises").val(1);
                        $(MODAL_ID).modal('hide');
                    });
                });
            }
            if (paisNo && prodNo) {
                $("#tiposInformacion").attr("disabled", false);
                let url = BACKEND_URL + $(form).attr('action');
                let data = convertTextUpperCase(form);
                showConfirmMessage('Desea guardar la autorizaci\u00f3n', function () {
                    ajaxPostCall(url, data, null, function (result) {
                        $("#tiposInformacion").attr("disabled", true);
                        $(MODAL_ID_AUTORIZACION).modal('hide');
                        $(TABLE_ID_AUTORIZACION).DataTable().ajax.reload(null, false);
                    });
                });
            }
        }
    }
});

/*---------------------------DETALLAR PAISES ---------------------------------------*/

function detallarPais() {
    $('#tab_aut_datos').removeClass('active');
    $('#tab_aut_datos').attr('aria-selected', false);
    $("#tab_aut_pais").addClass("active");
    $("#tab_aut_pais").attr("disabled",false);
    $("#tab_aut_pais").attr("aria-selected",true);
    $('#tab_aut_prod').removeClass('active');
    $('#tab_aut_prod').attr('aria-selected', false);
    $("#datos-generales-autorizaciones").removeClass("show");
    $("#datos-generales-autorizaciones").removeClass("active");
    $("#registrar-paises").addClass("show");
    $("#registrar-paises").addClass("active");
    $("#accionAutPais").val(1);
    $.ajax({
        type: 'GET',
        url: BACKEND_URL + '/pais/checkboxes',
        success: function(response) {
            var opciones = response;
            var numColumnas = 4;

            // Limpiar las columnas antes de agregar nuevas filas
            $('#columna1').empty();
            $('#columna2').empty();
            $('#columna3').empty();
            $('#columna4').empty();

            // Calcular el número de países por columna
            var numFilasPorColumna = Math.ceil(opciones.length / numColumnas);

            // Iterar sobre las opciones y agregarlas a las columnas
            for (var i = 0; i < opciones.length; i++) {
                // Obtener el código y el nombre del país
                var checkboxValue = opciones[i][0];
                var checkboxLabel = opciones[i][1];

                // Calcular la columna a la que pertenece este país
                var columna = Math.floor(i / numFilasPorColumna) + 1;

                // Crear el hidden, checkbox y la etiqueta
                var checkboxId = 'checkbox-' + checkboxValue;
                var checkbox = $('<input type="checkbox" class="form-check-input" id="' + checkboxId + '" name="arrayPais" value="' + checkboxValue + '">');
                var label = $('<label for="' + checkboxId + '" class="form-check-label">'+ "&nbsp;&nbsp;" + checkboxLabel + '</label>');

                // Crear la fila y agregar el input hidden, checkbox y la etiqueta
                var fila = $('<tr>').append($('<td>').append(checkbox).append(label));

                // Agregar la fila a la columna correspondiente
                $('#columna' + columna).append(fila);
            }
        },
        error: function(x, e, thrownError) {
            Swal.fire({title: "¡Error!", text: "Error interno del servidor.", type: 'error'});
            return;
        }
    });
}


function llenarPaisesEdit(data){
    $("#carnetExportadorPais").val($("#codCarnetExportador").val());
    $("#codTipoInformacionPais").val($("#codTipoInformacion").val());
    $("#numeroAutorizacionPais").val($("#numeroAutorizacionA").val());
    $("#exportadorePais").val($("#carnetExportadorPais").val());
    $("#exportadoreProd").val($("#codCarnetExportador").val());
    $("#codTipoInformacionProd").val($("#codTipoInformacion").val());
    $("#numeroAutorizacionProd").val($("#numeroAutorizacionA").val());
    $("#fechaAutorizacionProd").val($("#fechaAutorizacionA").val());
    $("#fechaVencimientoProd").val($("#fechaVencimiento").val());

    $("#accionAutPais").val(2);
    var noCheckPais = 0;

    $.ajax({
        type: 'GET',

        url: BACKEND_URL + '/pais/checkboxesExportadoresAut',
        data: {carnetExportador : data.id.carnetExportador , codigoTipoInformacion :data.id.codigoTipoInformacion
            , numeroAutorizacion: data.id.numeroAutorizacion

        },

        success: function (response) {


            var opciones = response;
            var numColumnas = 4;

            // Limpiar las columnas antes de agregar nuevas filas
            $('#columna1').empty();
            $('#columna2').empty();
            $('#columna3').empty();
            $('#columna4').empty();

            // Calcular el número de países por columna
            var numFilasPorColumna = Math.ceil(opciones.length / numColumnas);

            // Iterar sobre las opciones y agregarlas a las columnas
            for (var i = 0; i < opciones.length; i++) {
                // Obtener el código y el nombre del país
                var checkboxValue = opciones[i][0];
                var checkboxLabel = opciones[i][1];
                var bandera = opciones[i][2];

                // Calcular la columna a la que pertenece este país
                var columna = Math.floor(i / numFilasPorColumna) + 1;

                // Crear el hidden, checkbox y la etiqueta
                var checkboxId = 'checkbox-' + checkboxValue;

                if(bandera === '1'){
                    var checkbox = $('<input checked type="checkbox" class="form-check-input" id="' + checkboxId + '" name="arrayPais" value="' + checkboxValue + '">');
                }else{
                    noCheckPais = noCheckPais + 1;
                    var checkbox = $('<input type="checkbox" class="form-check-input" id="' + checkboxId + '" name="arrayPais" value="' + checkboxValue + '">');
                }

                //se agrego para habilitar o deshabilitar el chktodosProd
                if(noCheckPais === 0){
                    $("#chktodos").prop("checked", true);
                }else{
                    $("#chktodos").prop("checked", false);
                }

                var label = $('<label for="' + checkboxId + '" class="form-check-label">' + checkboxLabel + '</label>');

                // Crear la fila y agregar el input hidden, checkbox y la etiqueta
                var fila = $('<tr>').append($('<td>').append(checkbox).append(label));

                // Agregar la fila a la columna correspondiente
                $('#columna' + columna).append(fila);
            }
        },
        error: function (x, e, thrownError) {
            Swal.fire({title: "Â¡Error!", text: "Error interno del servidor.", type: 'error'});
            return;
        }
    });
}


function obtenerValores() {
    $("input[name='arrayPais']:checked").each(function() {
        paisesSeleccionados.push($(this).val());
    });
}

$("#chktodos").click(function() {
    var isChecked = $("#chktodos").prop("checked");
    if (isChecked) {
        $("input[name='arrayPais']").prop("checked", true);
    } else {
        $("input[name='arrayPais']").prop("checked", false);
        obtenerValores();
    }
});



$(FORM_PAIS).validate({
    submitHandler: function (form) {
        obtenerValores();
        let url = BACKEND_URL + $(form).attr('action');
        let data = convertTextUpperCase(form);
        showConfirmMessage('Desea registrar los paises', function () {
            ajaxPostCall(url, data, null, function (result) {
                paisesSeleccionados = [];
                resetFormData($(FORM_PAIS));
                $('#columna1').empty();
                $('#columna2').empty();
                $('#columna3').empty();
                $('#columna4').empty();
                $('#tab1').removeClass('disabled');
                $('#tab1').attr('aria-selected', true);
                $('#tab2').attr('aria-selected', false);
                $('#tab2').addClass('disabled');
                $("#tab1").addClass("active");
                $("#tab1").attr("disabled", false);
                $("#tab2").removeClass("active");
                $("#tab2").attr("disabled", true);
                $('#registrar-paises').removeClass('show');
                $("#registrar-paises").removeClass("active");
                $("#busqueda").addClass("show");
                $("#busqueda").addClass("active");
                $(MODAL_ID_AUTORIZACION).modal('hide');
                $(TABLE_ID_AUTORIZACION).DataTable().ajax.reload(null, false);
            })
        })
    }
});

/*---------------------------DETALLAR PAISES ---------------------------------------*/


/*---------------------------DETALLAR PRODUCTO ---------------------------------------*/

function llenarProductosEdit(){
    select2single('#tiposProducto', BACKEND_URL + '/tipos-producto/s2', 10);
}

function detallarProducto(){

    $('#tab_aut_datos').removeClass('active');
    $('#tab_aut_datos').attr('aria-selected', false);
    $("#tab_aut_prod").addClass("active");
    $("#tab_aut_prod").attr("disabled",false);
    $("#tab_aut_prod").attr("aria-selected",true);
    $('#tab_aut_pais').removeClass('active');
    $('#tab_aut_pais').attr('aria-selected', false);
    $("#datos-generales-autorizaciones").removeClass("show");
    $("#datos-generales-autorizaciones").removeClass("active");
    $("#registrar-productos").addClass("show");
    $("#registrar-productos").addClass("active");
    $("#bqCarnetExportador").empty();
    $("#bqNitExportador").empty();
    $("#containerS2").show();
    $("#containerList").show();
    select2single('#tiposProducto', BACKEND_URL + '/tipos-producto/s2', 10);
}

$("#tiposProducto").on('change', function (){
    var codigoTipoProducto = $("#tiposProducto").val();
    obtenerProductos(codigoTipoProducto);
});

function obtenerProductos(codigoTipoProducto) {
    // Realizar una solicitud AJAX al backend para obtener la lista de productos
    $.ajax({
        url:  BACKEND_URL + '/productos-exportables/lProductos',
        method: 'GET',
        data: {
            codigoTipoProducto: codigoTipoProducto
        },
        success: function(response) {
            // Limpiar el contenido existente de la tabla
            $('#lProductos').empty();

            for (var i = 0; i < response.length; i++) {
                var producto = response[i];

                // Crear una fila para cada producto
                var fila = $('<tr>');

                // Agregar una celda para el código de capítulo
                var codigoCapitulo = $('<td>').text(producto[0]);
                fila.append(codigoCapitulo);

                // Agregar una celda para el nombre de capítulo
                var nombreCapitulo = $('<td>').text(producto[1]);
                fila.append(nombreCapitulo);

                // Agregar la fila a la tabla
                $('#lProductos').append(fila);

                // Desvincular el evento click de la fila para evitar posibles duplicaciones
                fila.off('click');

                // Agregar un nuevo evento de clic a la fila para obtener el código de arancelario
                fila.on('click', function() {
                    var codigoArancelario = $(this).find('td:first').text();
                    cargarProductosExportables(codigoArancelario, codigoTipoProducto,accionPr);
                    $("#containerS2").hide();
                    $("#containerList").hide();
                });
            }
        },
        error: function(xhr, status, error) {
            // Manejar errores de solicitud AJAX
            console.error('Error al obtener la lista de productos:', error);
        }
    });
}

function cargarProductosExportables(codigoArancelario, codigoTipoProducto,accionPr) {



    if(accionPr === 1){//cargar para un nuevo registro
        $("#accionAutProd").val(1);
        // Realizar una solicitud AJAX para obtener los productos exportables
        $.ajax({
            type: 'GET',
            url: BACKEND_URL + '/productos-exportables/checkboxes',
            data: {
                codigoArancelario: codigoArancelario,
                codigoTipoProducto: codigoTipoProducto
            },
            success: function(response) {
                // Limpiar el contenido existente de los checkboxes
                $('#checkProductos').empty();

                // Iterar sobre los productos obtenidos y agregarlos como checkboxes
                response.forEach(function(producto) {
                    var codArancelario = producto[0];
                    var codProducto = producto[1];
                    var nomProducto = producto[2];
                    var nomCientifico = producto[3] || '';


                    // Crear el checkbox
                    var checkboxId = 'checkbox-' + codArancelario + '-' + codProducto;
                    var checkbox = $('<input type="checkbox" class="form-check-input ml-auto" id="' + checkboxId + '" name="arrayProducto" value="' + codArancelario + '-' + codProducto + '">');
                    var label = $('<label for="' + checkboxId + '" class="form-check-label">' +'&emsp;&emsp;'+ codArancelario + '-' + codProducto + ' - ' + nomProducto + '</label>');
                    var label2 = $('<span class="form-label">' + nomCientifico + '</span>');

                    // Crear la fila y agregar las celdas del checkbox y del nombre científico
                    var fila = $('<tr>').append($('<td>').append(checkbox).append(label)).append($('<td>').append(label2));

                    // Agregar la fila a la tabla
                    $('#checkProductos').append(fila);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener la lista de productos exportables:', error);
            }
        });
    }else{//cargar para editar
        var carnetExportador = $("#exportadoreProd").val();
        var codigoTipoInformacion = $("#codTipoInformacionProd").val();
        var numeroAutorizacion = $("#numeroAutorizacionProd").val();
        $("#accionAutProd").val(2);
        var noChecked = 0;//variable para contar hay uno que no es checked

        $.ajax({
            type: 'GET',
            url: BACKEND_URL + '/productos-exportables/checkboxesExportadoresAutProd',
            data: {
                codigoArancelario: codigoArancelario,
                codigoTipoProducto: codigoTipoProducto,
                carnetExportador: carnetExportador,
                codigoTipoInformacion: codigoTipoInformacion,
                numeroAutorizacion: numeroAutorizacion
            },
            success: function(response) {

                // Limpiar el contenido existente de los checkboxes
                $('#checkProductos').empty();

                // Iterar sobre los productos obtenidos y agregarlos como checkboxes
                response.forEach(function(producto) {
                    var codArancelario = producto[0];
                    var codProducto = producto[1];
                    var nomProducto = producto[2];
                    var nomCientifico = producto[3] || '';
                    var bandera = producto[4];

                    // Crear el checkbox
                    var checkboxId = 'checkbox-' + codArancelario + '-' + codProducto;
                    if(bandera === '1'){

                        var checkbox = $('<input checked type="checkbox" class="form-check-input ml-auto" id="' + checkboxId + '" name="arrayProducto" value="' + codArancelario + '-' + codProducto + '">');
                    }else{
                        noChecked = noChecked +1;
                        var checkbox = $('<input type="checkbox" class="form-check-input ml-auto" id="' + checkboxId + '" name="arrayProducto" value="' + codArancelario + '-' + codProducto + '">');
                    }

                    //se agrego para habilitar o deshabilitar el chktodosProd
                    if(noChecked === 0){
                        $("#chktodosProd").prop("checked", true);
                    }else{
                        $("#chktodosProd").prop("checked", false);
                    }

                    var label = $('<label for="' + checkboxId + '" class="form-check-label">' +'&emsp;&emsp;'+ codArancelario + '-' + codProducto + ' - ' + nomProducto + '</label>');
                    var label2 = $('<span class="form-label">' + nomCientifico + '</span>');

                    // Crear la fila y agregar las celdas del checkbox y del nombre científico
                    var fila = $('<tr>').append($('<td>').append(checkbox).append(label)).append($('<td>').append(label2));

                    // Agregar la fila a la tabla
                    $('#checkProductos').append(fila);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener la lista de productos exportables:', error);
            }
        });
    }
}

function obtenerValoresProd() {
    $("input[name='arrayProducto']:checked").each(function() {
        productosSeleccionados.push($(this).val());
    });
}

$("#chktodosProd").click(function() {
    var isCheckedProd = $("#chktodosProd").prop("checked");
    if (isCheckedProd) {
        $("input[name='arrayProducto']").prop("checked", true);
    } else {
        $("input[name='arrayProducto']").prop("checked", false);
    }
});

function arrayProductoChecked(){

}

$(FORM_PRODUCTO).validate({
    submitHandler: function (form) {
        var detPaises = $("#detallaraPaises").val();
        if (detPaises == 1) {
            obtenerValoresProd();
            let url = BACKEND_URL + $(form).attr('action');
            let data = convertTextUpperCase(form);
            $("#carnetExportadorPais").val($("#exportadoreProd").val());
            $("#codTipoInformacionPais").val($("#codTipoInformacionProd").val());
            $("#numeroAutorizacionPais").val($("#numeroAutorizacionProd").val());
            $("#exportadorePais").val($("#exportadoreProd").val());
            showConfirmMessage('Desea registrar los productos seleccionados y luego detallar pa\u00edses', function () {
                ajaxPostCall(url, data, null, function (result) {
                    productosSeleccionados = [];
                    resetFormData($(FORM_PRODUCTO));
                    $("#chktodosProd").prop("checked", false);
                    $("#checkProductos").empty();
                    $('#tab3').attr('aria-selected', false);
                    $('#tab3').addClass('disabled');
                    $("#tab3").removeClass("active");
                    $("#tab3").attr("disabled", true);
                    $('#registrar-productos').removeClass('show');
                    $("#registrar-productos").removeClass("active");
                    detallarPais();
                })
            })
        }else{
            obtenerValoresProd();
            let url = BACKEND_URL + $(form).attr('action');
            let data = convertTextUpperCase(form);
            showConfirmMessage('Desea registrar los productos seleccionados', function () {
                ajaxPostCall(url, data, null, function (result) {
                    productosSeleccionados = [];
                    resetFormData($(FORM_PRODUCTO));
                    $("#checkProductos").empty();
                    $('#registrar-productos').removeClass('show');
                    $("#registrar-productos").removeClass("active");
                    $(MODAL_ID_AUTORIZACION).modal('hide');
                    $(TABLE_ID_AUTORIZACION).DataTable().ajax.reload(null, false);
                })
            })
        }
    }
});


/*PRORROGAS AUTORIZACIONES*/
$(FORM_ID_PRORROGAS).validate({
    submitHandler: function (form) {
        let url = BACKEND_URL + $(form).attr('action');
        let data = convertTextUpperCase(form);
        var fechaAut = $('#fechaAutorizacionProrroga').datetimepicker('viewDate');
        var fechaVen = $("#fechaVencimientoProrroga").datetimepicker('viewDate');
        var fechaDiff = fechaVen.diff(fechaAut);

        if (fechaDiff < 0) {
            swalWithBootstrapButtons.fire(
                'ERROR',
                "La fecha autorización prorroga no puede ser menor que la fecha vencimiento prorroga",
                'error'
            )
        }else{
            showConfirmMessage('Desea guardar la prorroga de autorización', function () {
                ajaxPostCall(url, data, null, function (result) {
                    resetFormData($(FORM_ID_PRORROGAS));
                    $("#tipoInformacionPro").val(tipoInformacion);
                    $("#numAutorizacion").val(numeroAutorizacion);
                    $("#carnetExportadorPro").val(carnetExportador);
                    $("#codigoTipoInformacion").val(codigoTipoInformacion);
                    $(MODAL_ID_PRORROGAS).modal('hide');
                    $(TABLE_ID_PRORROGA).DataTable().ajax.reload(null, false);
                })
            })
        }
    }
});

/** AUTORIZACIONES EXPORTADOR **/



// Función para mostrar mensajes de error comunes
function mostrarError(mensaje) {
    swalWithBootstrapButtons.fire(
        'ERROR',
        mensaje,
        'error'
    );
}

//valida campos obligatorio en paso 3
function validarCamposObligatoriosPaso3() {
    var campo9 = $("#actividadEconomica").val();
    if (campo9 === "") {
        mostrarError("Por favor especifique todos los campos marcados con *.");
        return false;
    }
    return true;
}

// Función para validar gran contribuyente y exento/tasa cero
function validarGranContribuyenteYExento() {
    var numeroConstancia = $("#numeroConstanciaExento").val();
    var fechaAutorizacion = $("#fechaAutorizacionExento").val();
    var campoNrc = $("#nrcExportador").val();

    if ((numeroConstancia === "" || fechaAutorizacion === "") && $('#estaExentoCheck').is(':checked')) {
        mostrarError("El Exportador tiene tasa cero, se deben registrar Número de Constancia y Fecha de Autorización");
        return false;
    }

    if (campoNrc === "" && $('#esGranContribuyenteCheck').is(':checked')) {
        mostrarError("Favor especifique el NRC si es gran contribuyente.");
        return false;
    }

    return true;
}

// Función principal para manejar la lógica de validación y ejecución
function manejarValidacionYAccion() {
    if (!validarCamposObligatoriosPaso3()) {
        return;
    }

    if (!validarGranContribuyenteYExento()) {
        return;
    }

    cambio1_3aS2();
}

function cambio1_3aS2(){
    $("#tab1_3").removeClass("active");
    $("#tab1_3").attr("aria-selected",false);
    $("#tab1_3").removeClass("active");
    $("#tab2").addClass("active");
    $("#tab2").attr("disabled",false);
    $("#tab2").attr("aria-selected",true);
    $("#datos-generales-empresa").removeClass("show");
    $("#datos-generales-empresa").removeClass("active");
    $("#datos-constitucion-empresa").addClass("show");
    $("#datos-constitucion-empresa").addClass("active");
}

function cambio1_2a1_3(){
    $("#tab1_2").removeClass("active");
    $("#tab1_2").attr("aria-selected",false);
    $("#tab1_2").removeClass("active");
    $("#tab1_3").addClass("active");
    $("#tab1_3").attr("disabled",false);
    $("#tab1_3").attr("aria-selected",true);
    $("#datos-contacto-empresa").removeClass("show");
    $("#datos-contacto-empresa").removeClass("active");
    $("#datos-generales-empresa").addClass("show");
    $("#datos-generales-empresa").addClass("active");
}


// Función para validar el formato del correo electrónico
function isValidEmailAddress(emailAddress) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(emailAddress);
}

function cambioS4aS5(){
    $("#tab4").removeClass("active");
    $("#tab4").attr("aria-selected",false);
    $("#tab4").removeClass("active");
    $("#tab5").addClass("active");
    $("#tab5").attr("disabled",false);
    $("#tab5").attr("aria-selected",true);
    $("#datos-contacto-materia").removeClass("show");
    $("#datos-contacto-materia").removeClass("active");
    $("#datos-calificaciones").addClass("show");
    $("#datos-calificaciones").addClass("active");
}


// Función para validar las fechas
function validarFechas() {
    var fechaInicial = $('#fechaInicialVigencia').val();
    var fechaFinal = $('#fechaFinalVigencia').val();

    // Convertir las fechas a objetos Date
    var fechaInicialDate = parseDate(fechaInicial);
    var fechaFinalDate = parseDate(fechaFinal);

    // Comparar las fechas
    if (fechaFinalDate < fechaInicialDate) {
        // Mostrar mensaje de error
        mostrarError('La Fecha Final de Vigencia no puede ser menor a la Fecha Inicial de Vigencia.')
        // Limpiar el valor de fechaFinalVigencia si lo deseas
        $('#fechaFinalVigencia').val('');
    }
}

// Función para parsear la fecha (dd/mm/aaaa)
function parseDate(dateString) {
    var parts = dateString.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]); // Año, mes (restar 1 porque en JavaScript los meses van de 0 a 11), día
}

$('#fechaFinalVigencia').on('input', function () {
    validarFechas();
});

//VALIDACION DE CAMPOS AL GUARDAR EL FORMULARIO EN PASO 7 CALIFICACIONES
function validarCamposGuardar() {
    // Variables para campos obligatorios
    var campo1 = $("#fechaInicialVigencia").val();
    var campo2 = $("#nitExportador").val();
    var campo3 = $("#nombreExportador").val();
    var campo4 = $("#nombreExportadorAbr").val();
    var campo5 = $("#direccionExportador").val();
    var campo6 = $("#paisExportador").val();
    var campo7 = $("#departamento").val();
    var campo8 = $("#municipio").val();
    var campo9 = $("#actividadEconomica").val();
    var campo10 = $("#fechaConstitucion").val();
    var campo11 = $("#nombreRepresentanteLega").val();
    var campo12 = $("#tiposDocumentoIdentidadRepresentante").val();
    var campo13 = $("#numeroDocRepresentanteLegal").val();
    var campo14 = $("#nombreContactoComercial").val();

    // Variables específicas para validaciones adicionales
    var numeroConstancia = $("#numeroConstanciaExento").val();
    var fechaAutorizacion = $("#fechaAutorizacionExento").val();
    var campoNrc = $("#nrcExportador").val();
    var emailExportador = $("#emailExportador").val();
    var emailRepresentanteLegal = $("#emailRepresentanteLegal").val();
    var emailContactoComercial = $("#emailContactoComercial").val();
    var numeroAutorizacionRein = $("#numeroAutorizacionRein").val();
    var fechaAutorizacionRein = $("#fechaAutorizacionRein").val();
    var numeroAcuerdoCentro = $("#numeroAcuerdoCentro").val();
    var fechaAutorizacionCentro = $("#fechaAutorizacionCentro").val();

    var valido = 'S';
    var mensaje = "";

    // Validaciones comunes para ambos tipos de persona
    if (campo1 === "" || campo2 === "" || campo3 === "" || campo4 === "" || campo5 === "" ||
        campo6 === null || campo7 === null || campo8 === null || campo9 === "" || campo14 === "") {
        mensaje = "Por favor especifique todos los campos marcados con *.";
        valido = "N";
    } else if ((numeroConstancia === "" || fechaAutorizacion === "") && $('#estaExentoCheck').is(':checked')) {
        mensaje = "El Exportador tiene tasa cero, se deben registrar Número de Constancia y Fecha de Autorización";
        valido = "N";
    } else if (campoNrc === "" && $('#esGranContribuyenteCheck').is(':checked')) {
        mensaje = "Favor especifique el NRC si es gran contribuyente.";
        valido = "N";
    } else if ((emailExportador !== "" && !isValidEmailAddress(emailExportador)) ||
        (emailRepresentanteLegal !== "" && !isValidEmailAddress(emailRepresentanteLegal)) ||
        (emailContactoComercial !== "" && !isValidEmailAddress(emailContactoComercial))) {
        mensaje = "La dirección de email no es válida";
        valido = "N";
    }

    // Validaciones adicionales según el tipo de persona
    if (tipoPersona === 'J') {
        if (campo10 === "" || campo11 === "" || campo12 === null || campo13 === "") {
            mensaje = "Los campos Fecha de Constitución, Nombre, " +
                "Tipo de Documento y Número de Documento del Representante Legal son obligatorios para personas Jurídicas.";
            valido = "N";
        } else if (numeroAutorizacionRein !== "" && fechaAutorizacionRein === "") {
            mensaje = 'Se ha registrado el Número de Acuerdo para el Reintegro de los Derechos Arancelarios ' +
                'de Importación. También debe registrar la Fecha de Autorización';
            valido = 'N';
        } else if (numeroAcuerdoCentro !== "" && fechaAutorizacionCentro === "") {
            mensaje = 'Es obligatorio especificar la Fecha de Autorización del Beneficio de la Ley de Servicios Internacionales';
            valido = 'N';
        }
    }

    return {
        mensaje: mensaje,
        valido: valido
    };
}

function actualizarDatosExportador(exportador){
    $("#labelCarnet").text(exportador.carnetExportador);
    $("#labelNombre").text(exportador.nombreExportador);
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

    //guardado de actividades economicas del exportador
    $(FORM_ID_ACTIVIDAD).validate({

        submitHandler: function (form) {
            $("#actividadesEconomica").attr("disabled", false);
            carnetExportadorAct = $("#exportadore").val();
            let url = BACKEND_URL + $(form).attr('action');
            let data = convertTextUpperCase(form);
            showConfirmMessage('Desea guardar la actividad economica', function () {
                ajaxPostCall(url, data, null, function (result) {
                    $(MODAL_ID_ACTIVIDADES).modal('hide');
                    $(TABLE_ID_ACTIVIDADES).DataTable().ajax.reload(null, false);
                    $("#actividadesEconomica").attr("disabled", true);
                    getActividadPrincipal(carnetExportadorAct);
                });
            });
        }
    });


    //guardado de agente aduanal del exportador
    $(FORM_ID_AGENTE_ADUA).validate({
        submitHandler: function (form) {
            let url = BACKEND_URL + $(form).attr('action');
            let data = convertTextUpperCase(form);
            showConfirmMessage('Desea guardar el agente aduanal', function () {
                ajaxPostCall(url, data, null, function (result) {
                    $(TABLE_ID_AGENTES).DataTable().ajax.reload(null, false);
                });
            });
        }
    });


    //guardado de divisiones del exportador
    $(FORM_ID_DIVISION).validate({

        submitHandler: function (form) {
            let url = BACKEND_URL + $(form).attr('action');
            $("#paisD").removeAttr("disabled");
            let data = convertTextUpperCase(form);
            showConfirmMessage('Desea guardar la división ', function () {
                ajaxPostCall(url, data, null, function (result) {
                    $(TABLE_ID_DIVISIONES).DataTable().ajax.reload(null, false);
                    $("#paisD").attr("disabled",true);
                    $(MODAL_ID_DIVISION).modal('hide');
                });
            });
        }
    });

    //guardado de parque de servicio del exportador
    $(FORM_ID_PARQUE).validate({
        submitHandler: function (form) {
            let url = BACKEND_URL + $(form).attr('action');
            $("#exportadorePar").val(carnetExportador);
            $("#codigoParqueServicio").removeAttr("disabled");
            let data = convertTextUpperCase(form);
            showConfirmMessage('Desea guardar el parque de servicio ', function () {
                ajaxPostCall(url, data, null, function (result) {
                    $(TABLE_ID_PARQUE).DataTable().ajax.reload(null, false);
                    $(MODAL_ID_PARQUE).modal('hide');
                });
            });
        }
    });


    //guardado de persona autorizada del exportador
    $(FORM_ID_PERSONA_AUT).validate({
        submitHandler: function (form) {
            emailPersona = $("#emailPersona").val();
            emailAlterno = $("#emailAlterno").val();
            if(!isValidEmailAddress(emailPersona)){
                mostrarError('La dirección de email no es valida');
            }else if(emailAlterno && !isValidEmailAddress(emailAlterno)){
                mostrarError('La dirección de email no es valida');
            }else {
                let url = BACKEND_URL + $(form).attr('action');
                let data = convertTextUpperCase(form);
                showConfirmMessage('Desea guardar la persona/usuario ', function () {
                    ajaxPostCall(url, data, null, function (result) {
                        resetFormData($(FORM_ID_PERSONA_AUT), 'select');
                        $("#exportadoreP").val(carnetExportador); // id para campo exportadore en persona/usuario autorizado
                        $(TABLE_ID_PERSONA_AUT).DataTable().ajax.reload(null, false);
                    });
                });
            }
        }
    });


    //guardado de zona franca del exportador
    $(FORM_ID_ZONA_FRANCA).validate({
        submitHandler: function (form) {
            let url = BACKEND_URL + $(form).attr('action');
            $("#paisZ").removeAttr('disabled');
            $("#zonasFranca").removeAttr('disabled');
            var accionZ = $("#accionZ").val();
            let data = convertTextUpperCase(form);
            console.log(accionZ);
            if(accionZ !== '1'){
                $("#zonasFranca").attr("disabled",true);
            }else{
                $("#zonasFranca").removeAttr('disabled');
            }
            $("#paisZ").attr('disabled', true);
            showConfirmMessage('Desea guardar la zona franca ', function () {
                ajaxPostCall(url, data, null, function (result) {
                    console.log(result);
                    $(TABLE_ID_ZONA_FRANCA).DataTable().ajax.reload(null, false);
                    $(MODAL_ID_ZONA_FRANCA).modal('hide');
                });
            });
        }
    });


    //guardado de establecimiento del exportador
    $(FORM_ID_ESTABLECIMIENTO).validate({
        submitHandler: function (form) {
            let url = BACKEND_URL + $(form).attr('action');
            $("#exportadoreE").val(carnetExportador); // id para campo exportadore en establecimiento
            $("#establecimientosAutorizado").removeAttr('disabled');
            let data = convertTextUpperCase(form);
            showConfirmMessage('Desea guardar el establecimiento ', function () {
                ajaxPostCall(url, data, null, function (result) {
                    $("#establecimientosAutorizado").attr("disabled",true);
                    $(MODAL_ID_ESTABLECIMIENTO).modal('hide');
                    $(TABLE_ID_ESTABLECIMIENTO).DataTable().ajax.reload(null, false);
                });
            });
        }
    });


    /*
        //guardado de planta productora del exportador
        $(FORM_ID_PLANTA_PROD).validate({
            submitHandler: function (form) {
                let url = BACKEND_URL + $(form).attr('action');
                let data = convertTextUpperCase(form);
                showConfirmMessage('Desea guardar la planta de producción ', function () {
                    ajaxPostCall(url, data, null, function (result) {
                        $(TABLE_ID_PLANTAS_PROD).DataTable().ajax.reload(null, false);
                        $(MODAL_ID_PLANTA_PROD).hide();
                    });
                });
            }
        });



        //guardado representaciones en el exterior del exportador
        $(FORM_ID_REPRESENTANTE_EXT).validate({
            submitHandler: function (form) {
                let url = BACKEND_URL + $(form).attr('action');
                let data = convertTextUpperCase(form);
                showConfirmMessage('Desea guardar el representante en el exterior ', function () {
                    ajaxPostCall(url, data, null, function (result) {
                        $(TABLE_ID_REPRESENTANTE_EXT).DataTable().ajax.reload(null, false);
                        $(MODAL_ID_REPRESENTANTE_EXT).hide();
                    });
                });
            }
        });*/

    //validaciones de tabs
    $("#s1").on('click',function(){

        campo1 = $("#fechaInicialVigencia").val();
        campo2 = $("#nitExportador").val();
        campo3 = $("#nombreExportador").val();
        campo4 = $("#nombreExportadorAbr").val();
        campo5 = $("#direccionExportador").val();
        campo6 = $("#paisExportador").val();
        campo7 = $("#departamento").val();
        campo8 = $("#municipio").val();


        if(campo1 === "" || campo2 === "" || campo3 === "" || campo4 === ""
            || campo5 === "" || campo6 === null || campo7 === null || campo8 === null){
            swalWithBootstrapButtons.fire(
                'ERROR',
                "Por favor especifique todos los campos marcados con *.",
                'error'
            )
        }else{
            $("#tab1").removeClass("active");
            $("#tab1").attr("aria-selected",false);
            $("#tab1").removeClass("active");
            $("#tab1_2").addClass("active");
            $("#tab1_2").attr("disabled",false);
            $("#tab1_2").attr("aria-selected",true);
            $("#datos-generales-exportador").removeClass("show");
            $("#datos-generales-exportador").removeClass("active");
            $("#datos-contacto-empresa").addClass("show");
            $("#datos-contacto-empresa").addClass("active");
        }

    });

    $("#s1_2").on('click',function(){
        emailExportador = $("#emailExportador").val();

        if (emailExportador !== "") {
            if (!isValidEmailAddress(emailExportador)) {
                swalWithBootstrapButtons.fire(
                    'ERROR',
                    "La dirección de email no es valida",
                    'error'
                )
            }else{
                cambio1_2a1_3();
            }
        }else{
            cambio1_2a1_3();
        }
    });

    $("#s1_3").on('click',function(){
        manejarValidacionYAccion(); //se manejan las validaciones en 3- Datos Generales de la Empresa
    });




    $("#s2").on('click',function(){
        tipoPersona = $("#tipoPersona").val();
        campo10 = $("#fechaConstitucion").val();
        if(tipoPersona === 'J'){
            if(campo10 === ""){
                swalWithBootstrapButtons.fire(
                    'ERROR',
                    "El campo Fecha de Constitución es obligatorio para personas Jurídicas.",
                    'error'
                )
            }else{
                cambioS2aS3();
            }
        }else{
            cambioS2aS3();
        }
    });

    function cambioS2aS3(){
        $("#tab2").removeClass("active");
        $("#tab2").attr("aria-selected",false);
        $("#tab2").removeClass("active");
        $("#tab3").addClass("active");
        $("#tab3").attr("disabled",false);
        $("#tab3").attr("aria-selected",true);
        $("#datos-constitucion-empresa").removeClass("show");
        $("#datos-constitucion-empresa").removeClass("active");
        $("#datos-representante-legal").addClass("show");
        $("#datos-representante-legal").addClass("active");
    }

    $("#s3").on('click',function(){
        tipoPersona = $("#tipoPersona").val();

        emailRepresentanteLegal = $("#emailRepresentanteLegal").val();

        // Validación común para todos los casos
        if (emailRepresentanteLegal !== "" && !isValidEmailAddress(emailRepresentanteLegal)) {
            mostrarError('La dirección de email no es válida');
        } else if (tipoPersona === 'J') {
            // Validación específica para personas jurídicas
            campo11 = $("#nombreRepresentanteLega").val();
            campo12 = $("#tiposDocumentoIdentidadRepresentante").val();
            campo13 = $("#numeroDocRepresentanteLegal").val();

            if (campo11 === "" || campo12 === null || campo13 === "") {
                mostrarError('Los campos Nombre, Tipo de Documento y Número de Documento del' +
                    'Representante Legal son obligatorios para personas Jurídicas.');
            } else {
                cambioS3aS4();
            }
        } else {
            // En caso de no ser persona jurídica y el email es válido o no se requiere validación de email
            cambioS3aS4();
        }

    });

    function cambioS3aS4(){
        $("#tab3").removeClass("active");
        $("#tab3").attr("aria-selected",false);
        $("#tab3").removeClass("active");
        $("#tab4").addClass("active");
        $("#tab4").attr("disabled",false);
        $("#tab4").attr("aria-selected",true);
        $("#datos-representante-legal").removeClass("show");
        $("#datos-representante-legal").removeClass("active");
        $("#datos-contacto-materia").addClass("show");
        $("#datos-contacto-materia").addClass("active");
    }


    $("#s4").on('click',function(){
        campo9 = $("#nombreContactoComercial").val();

        emailContactoComercial = $("#emailContactoComercial").val();

        if (campo9 === "") {
            mostrarError("Por favor especifique todos los campos marcados con *.");
        } else if (emailContactoComercial !== "") {
            if (!isValidEmailAddress(emailContactoComercial)) {
                mostrarError("La dirección de email no es válida.");
            } else {
                cambioS4aS5();
            }
        } else if (campo9 !== "") {
            cambioS4aS5();
        }
    });

    //editado de exportador info principal pestaña 1 a 7
    $(FORM_ID_EXP).validate({
        submitHandler: function (form) {
            validacion = validarCamposGuardar();
            if(validacion.valido === "N"){
                mostrarError(validacion.mensaje);
            }else{
                let url = BACKEND_URL + $(form).attr('action');
                let data = convertTextUpperCase(form);
                showConfirmMessage('Desea guardar los datos generales del exportador', function () {
                    ajaxPostCallEditarExportador(url, data, null, function (result) {

                    });
                });
            }
        }
    });


    //metodo para modificar la accion luego del guardado
    function ajaxPostCallEditarExportador(url, data, messageSuccess = null, successCallback = null, fireSwal = true, fireSwalError = true) {
        $.ajax({
            data: data,
            url: url,
            type: 'POST',
            success: function (result) {
                if (result.success === true) {
                    if (fireSwal) {
                        Swal.fire({
                            title: 'EXITO',
                            text: 'LA INFORMACIÓN GENERAL DEL EXPORTADOR FUE EDITADA CORRECTAMENTE, ¿DESEA EDITAR LA INFORMACIÓN ADICIONAL?',
                            icon: 'success',
                            showCancelButton: true,
                            scrollbarPadding: false,
                            confirmButtonText: 'SI, CONTINUAR',
                            cancelButtonText: 'NO, SALIR'
                        }).then(function (result) {
                            if (result.value) {
                                moveToTabInfoAdicional();

                            } else if (
                                result.dismiss === Swal.DismissReason.cancel
                            ) {
                                location.reload();
                            }
                        });
                    } else {
                        console.info(messageSuccess || result.message);
                    }
                } else {
                    if (fireSwalError) {
                        swalWithBootstrapButtons.fire(
                            'ERROR',
                            result.message,
                            'error'
                        )
                    } else {
                        console.info(result.message);
                    }
                }
            },
            error: function (x, e, thrownError) {
                swalWithBootstrapButtons.fire(
                    'ERROR',
                    'ERROR',
                    'error'
                )
            }
        });
    }

    function moveToTabInfoAdicional(){
        //REFRESH DE LABEL NOMBRE EXPORTADOR
        $("#labelNombre").text($("#nombreExportador").val());
        $("#tab5").removeClass("active");
        $("#tab5").attr("aria-selected",false);
        $("#tab6").addClass("active");
        $("#tab6").attr("disabled",false);
        $("#datos-calificaciones").removeClass("show");
        $("#datos-calificaciones").removeClass("active");
        $("#informacion-adicional").addClass("show");
        $("#informacion-adicional").addClass("active");
    }


    //definiciones de campos

    $("#esActividadPrincipalCheck").on('change',function(){
        $("#esActividadPrincipal").val("N");
        if ($(this).is(':checked')) {
            $("#esActividadPrincipal").val("S");
        }else{
            $("#esActividadPrincipal").val("N");
        }
    });

    $("#tipoPersona").on("change", function() {
        tipoPersona = $(this).val();
    });


});
$('[data-mask]').inputmask()

