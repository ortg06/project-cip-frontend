const FORM_ID = '#formAutorizaciones';
const FORM_PAIS = '#formPaises';
const FORM_PRODUCTO = '#formProductos';
const MODAL_ID = '#autorizacionesModal';
var paisesSeleccionados = [];
var productosSeleccionados = [];

$("#btnContinuar").on('click',function() {

    campo1 = $("#bqCarnetExportador").val();
    campo2 = $("#bqNitExportador").val();

    if (campo1 === "" && campo2 === "") {
        swalWithBootstrapButtons.fire(
            'ERROR',
            "Por favor, especificar el carnet o el NIT del exportador.",
            'error'
        )
    } else {
        getExportador();
    }

    function getExportador() {
        $.ajax({
            data: {
                carnetExportador: campo1,
                nitExportador: campo2
            },
            url: BACKEND_URL + '/exportador/get',
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                if (result.success === true) {
                    add();
                    fillTab(result);
                } else {
                    swalWithBootstrapButtons.fire(
                        'ERROR',
                        result.message,
                        'error'
                    )
                }
            },
            error: function (jqXHR, errorTextStatus, status) {
                swalWithBootstrapButtons.fire(
                    'ERROR',
                    'Error en la petición: ' + errorTextStatus,
                    'error'
                )
            }
        });
    }

    function fillTab(result){
        $("#carnetExportador").val(result.data.carnetExportador);
        $("#nitExportador").val(result.data.nitExportador);
        $("#nombreExportador").val(result.data.nombreExportador);
    }

});

function add() {
    $(MODAL_ID).find('.modal-title').html("Registrar autorizaciones del exportador");
    resetFormData($(FORM_ID));
    $("#accionAut").val(1);
    $("#detallaraPaisesNo").prop('checked', true);
    $("#detallaraProductosNo").prop('checked', true);
    $(MODAL_ID).modal('show');
}

select2single('#tiposInformacion', BACKEND_URL + '/tipos-informacion/s2', 10);

$(FORM_ID).validate({
    submitHandler: function (form) {
        var fechaAut = $('#fechaAutorizacion').datetimepicker('viewDate');
        var fechaVen = $("#fechaVencimiento").datetimepicker('viewDate');
        var fechaDiff = fechaVen.diff(fechaAut);

        if (fechaDiff < 0) {
            swalWithBootstrapButtons.fire(
                'ERROR',
                "La fecha autorizaci\u00f3n no puede ser menor a la de fecha vencimiento",
                'error'
            )
        } else {
            let paisSi = $("#detallaraPaisesSi").is(':checked');
            let paisNo = $("#detallaraPaisesNo").is(':checked');
            let prodSi = $("#detallaraProductosSi").is(':checked');
            let prodNo = $("#detallaraProductosNo").is(':checked');
            $("#codCarnetExportador").val($("#carnetExportador").val());
            $("#codTipoInformacion").val($("#tiposInformacion").val());
            $("#bqCarnetExportador").val('');
            $("#bqNitExportador").val('');
            $('#tab1').attr('aria-selected', false);
            $('#tab1').addClass('disabled');
            if(paisSi){
                let url = BACKEND_URL + $(form).attr('action');
                let data = convertTextUpperCase(form);
                $("#carnetExportadorPais").val($("#codCarnetExportador").val());
                $("#codTipoInformacionPais").val($("#codTipoInformacion").val());
                $("#numeroAutorizacionPais").val($("#numeroAutorizacion").val());
                $("#exportadorePais").val($("#carnetExportadorPais").val());
                showConfirmMessage('Desea registrar la autorizaci\u00f3n y luego detallar pa\u00edses', function () {
                    ajaxPostCall(url, data, null, function (result) {
                        detallarPais();
                        $(MODAL_ID).modal('hide');
                    });
                });
            }
            if(prodSi){
                let url = BACKEND_URL + $(form).attr('action');
                let data = convertTextUpperCase(form);
                $("#exportadoreProd").val($("#codCarnetExportador").val());
                $("#codTipoInformacionProd").val($("#codTipoInformacion").val());
                $("#numeroAutorizacionProd").val($("#numeroAutorizacion").val());
                $("#fechaAutorizacionProd").val($("#fechaAutorizacion").val());
                $("#fechaVencimientoProd").val($("#fechaVencimiento").val());
                showConfirmMessage('Desea registrar la autorizaci\u00f3n y luego detallar productos', function () {
                    ajaxPostCall(url, data, null, function (result) {
                        detallarProducto();
                        $(MODAL_ID).modal('hide');
                    });
                });
            }
            if(paisSi && prodSi){
                let url = BACKEND_URL + $(form).attr('action');
                let data = convertTextUpperCase(form);
                $("#exportadoreProd").val($("#codCarnetExportador").val());
                $("#codTipoInformacionProd").val($("#codTipoInformacion").val());
                $("#numeroAutorizacionProd").val($("#numeroAutorizacion").val());
                $("#fechaAutorizacionProd").val($("#fechaAutorizacion").val());
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
                let url = BACKEND_URL + $(form).attr('action');
                let data = convertTextUpperCase(form);
                showConfirmMessage('Desea registrar la autorizaci\u00f3n', function () {
                    ajaxPostCall(url, data, null, function (result) {
                        $(MODAL_ID).modal('hide');
                    });
                });
            }
        }
    }
});

/*---------------------------DETALLAR PAIS ---------------------------------------*/
function detallarPais() {
    $('#tab1').removeClass('active');
    $('#tab1').attr('aria-selected', false);
    $("#tab2").addClass("active");
    $("#tab2").attr("disabled",false);
    $("#tab2").attr("aria-selected",true);
    $("#busqueda").removeClass("show");
    $("#busqueda").removeClass("active");
    $("#registrar-paises").addClass("show");
    $("#registrar-paises").addClass("active");
    $("#bqCarnetExportador").empty();
    $("#bqNitExportador").empty();
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
                var label = $('<label for="' + checkboxId + '" class="form-check-label">' + checkboxLabel + '</label>');

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
       showConfirmMessage('Desea registrar los pa\u00edses seleccionados', function () {
           ajaxPostCall(url, data, null, function (result) {
               paisesSeleccionados = [];
               resetFormData($(FORM_PAIS));
               $("#chktodos").prop("checked", false);
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
           })
       })
   }
});

/*---------------------------DETALLAR PRODUCTO ---------------------------------------*/

function detallarProducto(){
    $('#tab1').removeClass('active');
    $('#tab1').attr('aria-selected', false);
    $("#tab3").addClass("active");
    $("#tab3").attr("disabled",false);
    $("#tab3").attr("aria-selected",true);
    $("#busqueda").removeClass("show");
    $("#busqueda").removeClass("active");
    $("#registrar-productos").addClass("show");
    $("#registrar-productos").addClass("active");
    $("#bqCarnetExportador").empty();
    $("#bqNitExportador").empty();
    $("#containerS2").show();
    $("#containerList").show();
    $("#accionAutProd").val(1);
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
                    cargarProductosExportables(codigoArancelario, codigoTipoProducto);
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

function cargarProductosExportables(codigoArancelario, codigoTipoProducto) {
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
                var label = $('<label for="' + checkboxId + '" class="form-check-label">'+ '&emsp;&emsp;' + codArancelario + '-' + codProducto + ' - ' + nomProducto + '</label>');
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
                    $('#tab1').removeClass('disabled');
                    $('#tab1').attr('aria-selected', true);
                    $('#tab3').attr('aria-selected', false);
                    $('#tab3').addClass('disabled');
                    $("#tab1").addClass("active");
                    $("#tab1").attr("disabled", false);
                    $("#tab3").removeClass("active");
                    $("#tab3").attr("disabled", true);
                    $('#registrar-productos').removeClass('show');
                    $("#registrar-productos").removeClass("active");
                    $("#busqueda").addClass("show");
                    $("#busqueda").addClass("active");
                })
            })
        }
    }
});