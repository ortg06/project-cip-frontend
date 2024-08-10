jQuery(function ($) {
    $.extend(true, $.fn.dataTable.defaults, {
        processing: true,
        colReorder: true,
        language: {url: '/assets/custom/js/plugins/datatables-es.json'},
        responsive: true,
        autoWidth: false,
        lengthMenu: [25, 50, 100, 200],
        pageLength: 25
    });
});