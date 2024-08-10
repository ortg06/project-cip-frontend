function resetFormData($form, exclude = '') {
    $form.data("validator").resetForm();
    $form.find('input:text, input:password, input:file, input[type=number], input:hidden, select, textarea')
        .not("[persist], input[name='" + CSRF_ATTR_NAME + "'], input:radio")
        .not(exclude)
        .val('');
    $form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
    $form.find(".select2").trigger("change");
    $form.removeClass('was-validated');
}

/**
 * Populate form fields from a JSON object
 * Native Non JQuery
 *
 * @param form object The form element containing your input fields.
 * @param data array JSON data to populate the fields with.
 * @param basename string Optional basename which is added to name attributes
 */
function populateForm(form, data, basename) {
    for (var key in data) {
        if (!data.hasOwnProperty(key)) {
            continue;
        }
        var name = key;
        var value = data[key];
        if ('undefined' === typeof value) {
            value = '';
        }
        if (null === value) {
            value = '';
        }
        // handle array name attributes
        if (typeof (basename) !== "undefined") {
            name = basename + "." + key;
        }
        if (value.constructor === Array) {
            name += '[]';
        } else if (typeof value == "object") {
            populateForm(form, value, name);
            continue;
        }
        // only proceed if element is set
        var element = form.elements.namedItem(name);
        if (!element || element === $("meta[name='_csrf_header']").attr("content")) {
            continue;
        }
        var type = element.type || element[0].type;
        switch (type) {
            default:
                element.value = value;
                break;
            case 'radio':
            case 'checkbox':
                for (var j = 0; j < element.length; j++) {
                    element[j].checked = (String(value) === String(element[j].value));
                }
                break;
            case 'select-multiple':
                var values = value.constructor == Array ? value : [value];
                for (var k = 0; k < element.options.length; k++) {
                    element.options[k].selected = (values.indexOf(element.options[k].value) > -1);
                }
                break;
            case 'select':
            case 'select-one':
                element.value = value.toString() || value;
                break;
            case 'date':
                element.value = new Date(value).toISOString().split('T')[0];
                break;
        }
    }
}

function showConfirmMessage(text, callbackConfirm, title = null) {

    swalWithBootstrapButtons.fire({
        title: title || 'CONFIRMAR',
        text: text || 'TEXTO SWAL',
        icon: 'warning',
        showCancelButton: true,
        scrollbarPadding: false,
        confirmButtonText: 'OK',
        cancelButtonText: 'CANCELAR'
    }).then(function (result) {
        if (result.value) {
            isFunction(callbackConfirm) ? callbackConfirm() : null;
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'CANCELADO',
                'CANCELADO',
                'error'
            )
        }
    });
}

function ajaxPostCall(url, data, messageSuccess = null, successCallback = null, fireSwal = true, fireSwalError = true) {
    $.ajax({
        data: data,
        url: url,
        type: 'POST',
        success: function (result) {
            if (result.success === true) {
                if (fireSwal) {
                    Swal.fire(
                        'EXITO',
                        'OPERACION REALIZADA CORRECTAMENTE',
                        'success'
                    )
                } else {
                    console.info(messageSuccess || result.message);
                }
                isFunction(successCallback) ? successCallback(result) : null;
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
            //TODO:handle errors on ajax
            swalWithBootstrapButtons.fire(
                'ERROR',
                'ERROR',
                'error'
            )
        }
    });
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

const CSRF_ATTR_NAME = '_csrf';
const swalWithBootstrapButtons = Swal.mixin({});
jQuery(function ($) {
    $.validator.setDefaults({
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });
});

function convertTextUpperCase(form) {
    $(form).find('input[type="text"], textarea').each(function () {
        let value = $(this).val().toUpperCase();
        $(this).val(value);
    });
    return $(form).serialize();
}