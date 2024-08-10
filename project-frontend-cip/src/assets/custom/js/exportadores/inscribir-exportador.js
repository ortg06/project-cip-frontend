const FORM_ID = '#formInscribirExportador';
const FORM_ID_ACTIVIDAD = '#formActividad';
const FORM_ID_AGENTE_ADUA = '#formAgenteAduanal';
const FORM_ID_DIVISION = '#formDivision';
const FORM_ID_PARQUE = '#formParqueServicio';
const FORM_ID_ZONA_FRANCA = '#formZonaFranca';
const FORM_ID_PERSONA_AUT = '#formPersonaAut';
const TABLE_ID_ACTIVIDADES = '#actividadesEconomicaDT';
const TABLE_ID_AGENTES = '#agentesAduanalesDT';
const TABLE_ID_DIVISIONES = '#divisionDT';
const TABLE_ID_PARQUE = '#parquesServicioDT';
const TABLE_ID_ZONA_FRANCA = '#zonaFrancaDT';
const TABLE_ID_PERSONA_AUT = '#personaAutDT';
const MODAL_ID_ACTIVIDADES = '#actividadModal';
const MODAL_ID_AGENTES = '#agentesAduaModal';
const MODAL_ID_DIVISION = '#divisionModal';
const MODAL_ID_PARQUE = '#parqueServicioModal';
const MODAL_ID_ZONA_FRANCA = '#zonaFrancaModal';
const MODAL_ID_PERSONA_AUT = '#personaAutModal';
const  CAN_DELETE = true;
const CAN_EDIT_ACT = true;
var tableActividad;
var tableAgente;
var tableDivision;
var tableParque;
var tablePersonaAut;
var tableZonaFranca;
var exportador = null //variable para mantener el exportador una vez guardado
var tipoPersona;
var campo1;
var campo2;
var campo3;
var campo4;
var campo5;
var campo6;
var campo7;
var campo8;
var campo9;
var campo10;
var campo11;
var campo12;
var campo13;
var campoNrc;


function addActividades() {
    $(MODAL_ID_ACTIVIDADES).find('.modal-title').html("Agregar actividad económica");
    $("#accion").val(1);
    // resetFormData($(FORM_ID_ACTIVIDAD), 'input');
    $(MODAL_ID_ACTIVIDADES).modal('show');
}

function addAgentesAdua() {
    $(MODAL_ID_AGENTES).find('.modal-title').html("Agregar agentes aduanal");
    // resetFormData($(FORM_ACTIVIDADES_ID));
    $(MODAL_ID_AGENTES).modal('show');
}

function addDivision() {
    $(MODAL_ID_DIVISION).find('.modal-title').html("Agregar división");
    resetFormData($(FORM_ID_DIVISION),'select');
    $("#paisD").val(213).trigger('change');
    $("#departamentoD").val(6).trigger('change');
    $("#municipioD").val(14).trigger('change');
    $("#exportadorD").val(exportador.carnetExportador); // id para campo exportadore en DIVISIONES del exportador

    $(MODAL_ID_DIVISION).modal('show');
}

function addParqueServicio(){
    $(MODAL_ID_PARQUE).find('.modal-title').html("Agregar parque de servicio");
    // resetFormData($(FORM_ACTIVIDADES_ID));
    $(MODAL_ID_PARQUE).modal('show');
}

function addPersonaAut(){
    $("#accionP").val(1);
    $(MODAL_ID_PERSONA_AUT).find('.modal-title').html("Agregar persona/usuario autorizado por el exportador");
    // resetFormData($(FORM_ACTIVIDADES_ID));
    $(MODAL_ID_PERSONA_AUT).modal('show');
}

function addZonaFranca(){
    $("#accionZ").val(1);
    $(MODAL_ID_ZONA_FRANCA).find('.modal-title').html("Agregar zona franca");
    // resetFormData($(FORM_ACTIVIDADES_ID));
    $(MODAL_ID_ZONA_FRANCA).modal('show');
}




function renderActionsActividad(data, type, row, meta) {
    let html = '';
    html += CAN_DELETE? ' <a data-rel="tooltip" data-placement="left"  onclick="delExporActividad(' + meta.row + ')" title="Eliminar" href="javascript:void(0)" class="m-2"><i class="fa fa-trash-alt"></i></a>':'';
    return html;
}

function renderActionsAgente(data, type, row, meta) {
    let html = '';
    html += CAN_DELETE? ' <a data-rel="tooltip" data-placement="left"  onclick="delExporAgente(' + meta.row + ')" title="Eliminar" href="javascript:void(0)" class="m-2"><i class="fa fa-trash-alt"></i></a>':'';
    return html;
}

function renderActionsDivision(data, type, row, meta) {
    let html = '';
    html += CAN_DELETE? ' <a data-rel="tooltip" data-placement="left"  onclick="delExporDivision(' + meta.row + ')" title="Eliminar" href="javascript:void(0)" class="m-2"><i class="fa fa-trash-alt"></i></a>':'';
    return html;
}

function renderActionsParque(data, type, row, meta) {
    let html = '';
    html += CAN_DELETE? ' <a data-rel="tooltip" data-placement="left"  onclick="delExporParque(' + meta.row + ')" title="Eliminar" href="javascript:void(0)" class="m-2"><i class="fa fa-trash-alt"></i></a>':'';
    return html;
}

function renderActionsPersonaAut(data, type, row, meta) {
    let html = '';
    html += CAN_EDIT_ACT ? ' <a data-rel="tooltip" data-placement="left" onclick="editExporPersonaAut(' + meta.row + ')" title="Editar" href="javascript:void(0)" class="m-2"><i class="fa fa-edit"></i></a>':'';
    html += CAN_DELETE? ' <a data-rel="tooltip" data-placement="left"  onclick="delExporPersonaAut(' + meta.row + ')" title="Eliminar" href="javascript:void(0)" class="m-2"><i class="fa fa-trash-alt"></i></a>':'';
    return html;
}

function renderActionsZonaFranca(data, type, row, meta) {
    let html = '';
    html += CAN_DELETE? ' <a data-rel="tooltip" data-placement="left"  onclick="delExporZonaFranca(' + meta.row + ')" title="Eliminar" href="javascript:void(0)" class="m-2"><i class="fa fa-trash-alt"></i></a>':'';
    return html;
}

//EDIT PERSONAS AUT EXPORTADOR
function editExporPersonaAut(row) {
    $("#accionP").val(2);
    let data = $(TABLE_ID_PERSONA_AUT).DataTable().row(row).data();
    populateFormExporPersona(data);
    $(MODAL_ID_PERSONA_AUT).find('.modal-title').html("Editar persona autorizada");
    $(MODAL_ID_PERSONA_AUT).modal('show');
}


function delExporActividad(row) {
    let rowData = $(TABLE_ID_ACTIVIDADES).DataTable().row(row).data();
    populateFormExporActividad(rowData);
    let url = BACKEND_URL + '/exportadores-actividades/delete';
    let data = $(FORM_ID_ACTIVIDAD).serialize();
    showConfirmMessage('Desea eliminar la actividad exportadora: '
        + rowData.id.actividadesEconomica.nombreActividadEconomic, function () {
        ajaxPostCall(url, data, null, function (result) {
            $(TABLE_ID_ACTIVIDADES).DataTable().ajax.reload(null, false);
        });
    });
}

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

function delExporDivision(row) {
    let rowData = $(TABLE_ID_DIVISIONES).DataTable().row(row).data();
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

function delExporParque(row) {
    let rowData = $(TABLE_ID_PARQUE).DataTable().row(row).data();
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

function delExporZonaFranca(row) {
    let rowData = $(TABLE_ID_ZONA_FRANCA).DataTable().row(row).data();
    populateFormExporZonasFranca(rowData);
    let url = BACKEND_URL + '/exportadores-zonas-franca/delete';
    let data = $(FORM_ID_ZONA_FRANCA).serialize();
    showConfirmMessage('Desea eliminar la zona franca: '
        + rowData.zonasFranca.nombreZonaFranca, function () {
        ajaxPostCall(url, data, null, function (result) {
            $(TABLE_ID_ZONA_FRANCA).DataTable().ajax.reload(null, false);
        });
    });
}

function populateFormExporActividad(data){
    populateForm($(FORM_ID_ACTIVIDAD)[0], data);
}

function populateFormExporAgente(data){
    populateForm($(FORM_ID_AGENTE_ADUA)[0], data);
}

function populateFormExporDivision(data){
    populateForm($(FORM_ID_DIVISION)[0], data);
}

function populateFormExporParque(data){
    populateForm($(FORM_ID_PARQUE)[0], data);
}
function populateFormExporPersona(data){
    populateForm($(FORM_ID_PERSONA_AUT)[0], data);
}
function populateFormExporZonasFranca(data){
    populateForm($(FORM_ID_ZONA_FRANCA)[0], data);
}

function resetDatatables(){
    if (tableActividad != null || tableAgente != null || tableDivision != null || tableParque != null ||
        tablePersonaAut != null || tableZonaFranca != null) {

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
    }
}

function setFechaVigencia(){
    let today = moment().format('DD/MM/YYYY');
    $('#fechaInicialVigencia').val(today);
}


/*** VALIDACION PARA DUPLICIDAD DE EXPORTADOR CON CAMPO NIT **/
function getvalidarDuplicidadExportador(){

    $.ajax({
        data: { nitExportador: $("#nitExportador").val() },
        url: BACKEND_URL + '/inscribirExportador/validarDuplicidadExportador',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            if (result.data === "E") {
                swalWithBootstrapButtons.fire(
                    'ERROR',
                    result.message,
                    'error'
                )
            } else {
                clickS1();
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

function clickS1(){
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
}


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


// Función para validar el formato del correo electrónico
function isValidEmailAddress(emailAddress) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(emailAddress);
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
jQuery(function ($) {

    setFechaVigencia();

    //guardado de exportador info principal
    $(FORM_ID).validate({
        submitHandler: function (form) {
            validacion = validarCamposGuardar();
            if(validacion.valido === "N"){
                mostrarError(validacion.mensaje);
            }else{
                let url = BACKEND_URL + $(form).attr('action');
                let data = convertTextUpperCase(form);
                showConfirmMessage('Desea guardar el exportador', function () {
                    ajaxPostCall(url, data, null, function (result) {
                        resetFormData($(FORM_ID), 'select');
                        $("#departamento").val(6).trigger('change');
                        $("#municipio").val(14).trigger('change');
                        //resetTabFromTab5();
                        resetDatatables();
                        exportador = result.data;
                        cargarPaso6(exportador);
                    });
                });
            }
        }
    });

    //guardado de actividades economicas del exportador
    $(FORM_ID_ACTIVIDAD).validate({
        submitHandler: function (form) {
            let url = BACKEND_URL + $(form).attr('action');
            let data = convertTextUpperCase(form);
            showConfirmMessage('Desea guardar la actividad economica', function () {
                ajaxPostCall(url, data, null, function (result) {
                    $(TABLE_ID_ACTIVIDADES).DataTable().ajax.reload(null, false);
                });
            });
        }
    });

    //guardado de actividades economicas del exportador
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
            let data = convertTextUpperCase(form);
            showConfirmMessage('Desea guardar la división ', function () {
                ajaxPostCall(url, data, null, function (result) {
                    $("#exportadorD").val(exportador.carnetExportador); // id para campo exportadore en DIVISIONES del exportador
                    $(TABLE_ID_DIVISIONES).DataTable().ajax.reload(null, false);
                });
            });
        }
    });

    //guardado de parque de servicio del exportador
    $(FORM_ID_PARQUE).validate({
        submitHandler: function (form) {
            let url = BACKEND_URL + $(form).attr('action');
            let data = convertTextUpperCase(form);
            showConfirmMessage('Desea guardar el parque de servicio ', function () {
                ajaxPostCall(url, data, null, function (result) {
                    resetFormData($(FORM_ID_PARQUE), 'select');
                    $("#carnetExportador").val(exportador.carnetExportador); // id para campo exportadore en parque de servicio del exportador
                    $(TABLE_ID_PARQUE).DataTable().ajax.reload(null, false);
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
            }else{
                let url = BACKEND_URL + $(form).attr('action');
                let data = convertTextUpperCase(form);
                showConfirmMessage('Desea guardar la persona/usuario ', function () {
                    ajaxPostCall(url, data, null, function (result) {
                        resetFormData($(FORM_ID_PERSONA_AUT), 'select');
                        $("#exportadoreP").val(exportador.carnetExportador); // id para campo exportadore en persona/usuario autorizado
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
            let data = convertTextUpperCase(form);
            $("#paisZ").attr('disabled', true);
            showConfirmMessage('Desea guardar la zona franca ', function () {
                ajaxPostCall(url, data, null, function (result) {
                    $(TABLE_ID_ZONA_FRANCA).DataTable().ajax.reload(null, false);
                    $("#paisZ").attr('disabled', true);
                });
            });
        }
    });



    //validaciones de tabs
    $("#s1").on('click',function(){
        getvalidarDuplicidadExportador(); //se ejecuta la validadcion de duplicidad
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

    $("#s3").on('click',function() {
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
        campo14 = $("#nombreContactoComercial").val();
        emailContactoComercial = $("#emailContactoComercial").val();

        if (campo14 === "") {
            mostrarError("Por favor especifique todos los campos marcados con *.");
        } else if (emailContactoComercial !== "") {
            if (!isValidEmailAddress(emailContactoComercial)) {
                mostrarError("La dirección de email no es válida.");
            } else {
                cambioS4aS5();
            }
        } else if (campo14 !== "") {
            cambioS4aS5();
        }
    });



    //metodo para cargar paso 6-informacion adicional
    function cargarPaso6(exportador){
        $("#labelCarnet").text(exportador.carnetExportador);
        $("#labelNombre").text(exportador.nombreExportador);
        $("#creadoPorExp").val(exportador.creadoPor);
        $("#fechaCreacionExp").val(exportador.fechaCreacion);
        $("#modificadoPorExp").val(exportador.modificadoPor);
        $("#fechaModificacionExp").val();
        $("#exportadore").val(exportador.carnetExportador);//id para campo exportador en actividad economica
        $("#exportadoreA").val(exportador.carnetExportador);//id para campo exportador en agentes aduanales
        $("#exportadorD").val(exportador.carnetExportador);//id para campo exportador endivisiones
        $("#carnetExportador").val(exportador.carnetExportador);//id para campo exportador en parque de servicio
        $("#carnetExportadorZ").val(exportador.carnetExportador);//id para campo exportador en zona franca
        $("#exportadoreP").val(exportador.carnetExportador); // id para campo exportadore en persona/usuario autorizado
        $("#codigoPaisZ").val('213');
        $("#codigoDepartamentoZ").val('6');
        $("#codigoMunicipioZ").val('14');
        $("#tab5").removeClass("active");
        $("#tab5").attr("aria-selected",false);
        $("#tab6").addClass("active");
        $("#tab6").attr("disabled",false);
        $("#tab6").attr("aria-selected",true);
        $("#tab7").attr("disabled",false);
        $("#tab1_2").attr("disabled",true);
        $("#tab1_3").attr("disabled",true);
        $("#tab2").attr("disabled",true);
        $("#tab3").attr("disabled",true);
        $("#tab4").attr("disabled",true);
        $("#tab5").attr("disabled",true);
        $("#datos-calificaciones").removeClass("show");
        $("#datos-calificaciones").removeClass("active");
        $("#informacion-adicional").addClass("show");
        $("#informacion-adicional").addClass("active");

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
                    data: 'id',
                    searchable: false,
                    orderable: false,
                    render: renderActionsActividad
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


        tableAgente = $(TABLE_ID_AGENTES).DataTable({
            ajax: {
                url: BACKEND_URL  + '/exportadores-agentes-adua/dt',
                data: function (c){ c.carnetExportador =  exportador.carnetExportador}
            },
            serverSide: true,
            columns: [
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
        /*DATATABLE ACTIVIDADES ECONOMICAS*/

        /*DATATABLE DIVISIONES*/

        tableDivision = $(TABLE_ID_DIVISIONES).DataTable({
            ajax: {
                url: BACKEND_URL  + '/exportadores-division/dt',
                data: function (c){ c.carnetExportador =  exportador.carnetExportador}
            },
            serverSide: true,
            columns: [
                {
                    data: 'id.exportador.carnetExportador',
                    visible: false
                },
                {
                    data: 'nombreDivision'
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
                    data: 'id.codigoParqueServicio.nombreParqueServicio'
                }
                , {
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
                    data: 'tiposDocumentoIdentidad.nombreDocumentoIdentidadAb'
                },
                {
                    data: 'numeroDocumentoIdentidad'
                },
                {
                    data: 'numeroTelefono'
                },
                {
                    data: 'numeroFax'
                },
                {
                    data: 'emailAlterno'
                },
                {
                    data: 'emailPersona'
                },
                {
                    data: 'fechaInicialVigencia'
                },
                {
                    data: 'fechaFinalVigencia',
                    render: function (data, type) {
                        if (type === 'display') {
                            let label = '';
                            if(data === '' || data === null){
                                label = 'VIGENTE';
                            }else{
                                label = 'NO VIGENTE'
                            }
                            return label;
                        }

                        return data;
                    }
                },
                {
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



        /*DATATABLES ZONA FRANCA*/
        tableZonaFranca = $(TABLE_ID_ZONA_FRANCA).DataTable({
            ajax: {
                url: BACKEND_URL  + '/exportadores-zonas-franca/dt',
                data: function (c){ c.carnetExportador =  exportador.carnetExportador}
            },
            serverSide: true,
            columns: [
                {
                    data: 'zonasFranca.nombreZonaFranca'
                },
                {
                    data: 'direccionZonaFranca'
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


    }



    //definiciones de campos

    $("#estaExentoCheck").on('change',function(){
        $("#estaExento").val("N");
        if ($(this).is(':checked')) {
            $("#estaExento").val("S");
        }else{
            $("#estaExento").val("N");
        }
    });

    $("#esGranContribuyenteCheck").on('change',function(){
        $("#esGranContribuyente").val("N");
        if ($(this).is(':checked')) {
            $("#esGranContribuyente").val("S");
        }else{
            $("#esGranContribuyente").val("N");
        }
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

    select2ChangeSingle('#departamento', BACKEND_URL + '/departamento/s2', 10, 213, null);

    select2ChangeSingle('#municipio', BACKEND_URL + '/municipio/s2', 10, 213, 6);


    $("#codigoPais").on("change", function() {
        $("#departamento").val('').trigger('change');
        select2ChangeSingle('#departamento', BACKEND_URL + '/departamento/s2', 10, 213, null);
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

    select2ChangeSingle('#departamentoD', BACKEND_URL + '/departamento/s2', 10, 213, null);

    select2ChangeSingle('#municipioD', BACKEND_URL + '/municipio/s2', 10, 213, $("#departamentoD").val());

    $("#paisD").on("change", function() {
        $("#departamentoD").val("").trigger('change');
        select2ChangeSingle('#departamentoD', BACKEND_URL + '/departamento/s2', 10, $(this).val(), null);
    });

    $("#departamentoD").on("change", function() {
        $("#municipioD").val("").trigger('change');
        select2ChangeSingle('#municipioD', BACKEND_URL + '/municipio/s2', 10, $("#paisD").val(), $(this).val());
    });

    select2ChangeSingle('#departamentoZ', BACKEND_URL + '/departamento/s2', 10, 213, null);

    select2ChangeSingle('#municipioZ', BACKEND_URL + '/municipio/s2', 10, 213, $("#departamentoZ").val());

    /* $("#paisZ").on("change", function() {
         select2ChangeSingle('#departamentoZ', BACKEND_URL + '/departamento/s2', 10, 213, null);
     });*/

    $("#departamentoZ").on("change", function() {
        $("#codigoDepartamentoZ").val($(this).val());
        $("#municipioZ").val('').trigger('change');
        select2ChangeSingle('#municipioZ', BACKEND_URL + '/municipio/s2', 10, 213, $(this).val());
    });

    $("#municipioZ").on("change", function() {
        $("#codigoMunicipioZ").val($(this).val());
    });

    select2single('#zonasFranca', BACKEND_URL + '/exportadores-zonas-franca/s2ZonasFranca', 10);

    $("#tipoPersona").on("change", function() {
        tipoPersona = $(this).val();
    });


});

$('[data-mask]').inputmask()