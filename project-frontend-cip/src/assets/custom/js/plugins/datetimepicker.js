const DATE_FORMAT = 'DD/MM/YYYY';
const TIME_FORMAT = 'HH:mm:ss';


jQuery(function ($) {

    $.fn.datetimepicker.Constructor.Default = $.extend({}, $.fn.datetimepicker.Constructor.Default, {
        locale: 'es'
    });
    //date/time picker defaults
    $('.datepicker').datetimepicker({
        format: DATE_FORMAT.toUpperCase()
    })

    $('.timepicker').datetimepicker({
        format: TIME_FORMAT
    })

    $('.datetimepicker').datetimepicker({
        format: DATE_FORMAT.toUpperCase() + ' ' + TIME_FORMAT
    })

});