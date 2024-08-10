const select2single = function (element, url, rows, isIntoForm = true) {
    $(element)
        .select2({
            ajax: {
                url: url,
                dataType: 'json',
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page || 1,
                        rows: rows
                    };
                },
                cache: true
            }
        });
    if (isIntoForm) {
        $(element).on("select2:close", function (e) {
            $(this).valid();
        });
    }
}

function select2Dependent(element, url, rows, parentElement, isIntoForm = true) {
    $(element)
        .select2({
            ajax: {
                url: function (params){
                    let id = $(parentElement).val();
                    if (id === null) {
                        id = 0;
                    }
                    let urlFull = url;
                    urlFull = urlFull.replace(':id', id);
                    return urlFull;
                },
                dataType: 'json',
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page || 1,
                        rows: rows
                    };
                },
                cache: true
            }
        });
    $(parentElement).on('select2:select', function (e) {
        $(element).val(null).trigger('change');
    });
    if (isIntoForm) {
        $(element).on("select2:close", function (e) {
            $(this).valid();
        });
    }
}

function select2DependentWith2Params(element, url, rows, parentElement1,parentElement2, isIntoForm = true) {
    $(element)
        .select2({
            ajax: {
                url: function (params){
                    let id1 = $(parentElement1).val();
                    let id2 = $(parentElement2).val();
                    if (id1 === null) {
                        id1 = 0;
                    }
                    if (id2 === null) {
                        id2 = 0;
                    }
                    let urlFull = url;
                    urlFull = urlFull.replace(':id1', id1);
                    urlFull = urlFull.replace(':id2', id2);
                    return urlFull;
                },
                dataType: 'json',
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page || 1,
                        rows: rows
                    };
                },
                cache: true
            }
        });
    $(parentElement1).on('select2:select', function (e) {
        $(element).val(null).trigger('change');
    });
    $(parentElement2).on('select2:select', function (e) {
        $(element).val(null).trigger('change');
    });
    if (isIntoForm) {
        $(element).on("select2:close", function (e) {
            $(this).valid();
        });
    }
}

const select2ChangeSingle = function (element, url, rows, parentId1, parentId2, isIntoForm = true) {
    $(element)
        .select2({
            ajax: {
                url: url,
                dataType: 'json',
                data: function (params) {
                    return {
                        q: params.term, // search term
                        parentId1: parentId1,
                        parentId2: parentId2,
                        page: params.page || 1,
                        rows: rows
                    };
                },
                cache: true
            }
        });
    if (isIntoForm) {
        $(element).on("select2:close", function (e) {
            $(this).valid();
        });
    }
}

const select2native = function (element) {
    $(element)
        .select2();
}

jQuery(function ($) {
    $.fn.select2.defaults.set('placeholder', 'Seleccionar');
    $.fn.select2.defaults.set('language', 'es');
    $.fn.select2.defaults.set('width', '100%');
});