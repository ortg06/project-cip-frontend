'use strict'

const Plugins = [
  // jQuery
  {
    from: 'node_modules/jquery/dist',
    to: '../src/assets/plugins/jquery'
  },
  // Popper
  {
    from: 'node_modules/popper.js/dist',
    to: '../src/assets/plugins/popper'
  },
  // Bootstrap
  {
    from: 'node_modules/bootstrap/dist/js',
    to: '../src/assets/plugins/bootstrap/js'
  },
  // Font Awesome
  {
    from: 'node_modules/@fortawesome/fontawesome-free/css',
    to: '../src/assets/plugins/fontawesome-free/css'
  },
  {
    from: 'node_modules/@fortawesome/fontawesome-free/webfonts',
    to: '../src/assets/plugins/fontawesome-free/webfonts'
  },
  // overlayScrollbars
  {
    from: 'node_modules/overlayscrollbars/js',
    to: '../src/assets/plugins/overlayScrollbars/js'
  },
  {
    from: 'node_modules/overlayscrollbars/css',
    to: '../src/assets/plugins/overlayScrollbars/css'
  },
  // Chart.js
  {
    from: 'node_modules/chart.js/dist/',
    to: '../src/assets/plugins/chart.js'
  },
  // jQuery UI
  {
    from: 'node_modules/jquery-ui-dist/',
    to: '../src/assets/plugins/jquery-ui'
  },
  // Flot
  {
    from: 'node_modules/flot/dist/es5/',
    to: '../src/assets/plugins/flot'
  },
  {
    from: 'node_modules/flot/source/',
    to: '../src/assets/plugins/flot/plugins'
  },
  // Summernote
  {
    from: 'node_modules/summernote/dist/',
    to: '../src/assets/plugins/summernote'
  },
  // Bootstrap Slider
  {
    from: 'node_modules/bootstrap-slider/dist/',
    to: '../src/assets/plugins/bootstrap-slider'
  },
  {
    from: 'node_modules/bootstrap-slider/dist/css',
    to: '../src/assets/plugins/bootstrap-slider/css'
  },
  // Bootstrap Colorpicker
  {
    from: 'node_modules/bootstrap-colorpicker/dist/js',
    to: '../src/assets/plugins/bootstrap-colorpicker/js'
  },
  {
    from: 'node_modules/bootstrap-colorpicker/dist/css',
    to: '../src/assets/plugins/bootstrap-colorpicker/css'
  },
  // Tempusdominus Bootstrap 4
  {
    from: 'node_modules/tempusdominus-bootstrap-4/build/js',
    to: '../src/assets/plugins/tempusdominus-bootstrap-4/js'
  },
  {
    from: 'node_modules/tempusdominus-bootstrap-4/build/css',
    to: '../src/assets/plugins/tempusdominus-bootstrap-4/css'
  },
  // Moment
  {
    from: 'node_modules/moment/min',
    to: '../src/assets/plugins/moment'
  },
  {
    from: 'node_modules/moment/locale',
    to: '../src/assets/plugins/moment/locale'
  },
  // FastClick
  {
    from: 'node_modules/fastclick/lib',
    to: '../src/assets/plugins/fastclick'
  },
  // Date Range Picker
  {
    from: 'node_modules/daterangepicker/',
    to: '../src/assets/plugins/daterangepicker'
  },
  // DataTables
  {
    from: 'node_modules/pdfmake/build',
    to: '../src/assets/plugins/pdfmake'
  },
  {
    from: 'node_modules/jszip/dist',
    to: '../src/assets/plugins/jszip'
  },
  {
    from: 'node_modules/datatables.net/js',
    to: '../src/assets/plugins/datatables'
  },
  {
    from: 'node_modules/datatables.net-bs4/js',
    to: '../src/assets/plugins/datatables-bs4/js'
  },
  {
    from: 'node_modules/datatables.net-bs4/css',
    to: '../src/assets/plugins/datatables-bs4/css'
  },
  {
    from: 'node_modules/datatables.net-autofill/js',
    to: '../src/assets/plugins/datatables-autofill/js'
  },
  {
    from: 'node_modules/datatables.net-autofill-bs4/js',
    to: '../src/assets/plugins/datatables-autofill/js'
  },
  {
    from: 'node_modules/datatables.net-autofill-bs4/css',
    to: '../src/assets/plugins/datatables-autofill/css'
  },
  {
    from: 'node_modules/datatables.net-buttons/js',
    to: '../src/assets/plugins/datatables-buttons/js'
  },
  {
    from: 'node_modules/datatables.net-buttons-bs4/js',
    to: '../src/assets/plugins/datatables-buttons/js'
  },
  {
    from: 'node_modules/datatables.net-buttons-bs4/css',
    to: '../src/assets/plugins/datatables-buttons/css'
  },
  {
    from: 'node_modules/datatables.net-colreorder/js',
    to: '../src/assets/plugins/datatables-colreorder/js'
  },
  {
    from: 'node_modules/datatables.net-colreorder-bs4/js',
    to: '../src/assets/plugins/datatables-colreorder/js'
  },
  {
    from: 'node_modules/datatables.net-colreorder-bs4/css',
    to: '../src/assets/plugins/datatables-colreorder/css'
  },
  {
    from: 'node_modules/datatables.net-fixedcolumns/js',
    to: '../src/assets/plugins/datatables-fixedcolumns/js'
  },
  {
    from: 'node_modules/datatables.net-fixedcolumns-bs4/js',
    to: '../src/assets/plugins/datatables-fixedcolumns/js'
  },
  {
    from: 'node_modules/datatables.net-fixedcolumns-bs4/css',
    to: '../src/assets/plugins/datatables-fixedcolumns/css'
  },
  {
    from: 'node_modules/datatables.net-fixedheader/js',
    to: '../src/assets/plugins/datatables-fixedheader/js'
  },
  {
    from: 'node_modules/datatables.net-fixedheader-bs4/js',
    to: '../src/assets/plugins/datatables-fixedheader/js'
  },
  {
    from: 'node_modules/datatables.net-fixedheader-bs4/css',
    to: '../src/assets/plugins/datatables-fixedheader/css'
  },
  {
    from: 'node_modules/datatables.net-keytable/js',
    to: '../src/assets/plugins/datatables-keytable/js'
  },
  {
    from: 'node_modules/datatables.net-keytable-bs4/js',
    to: '../src/assets/plugins/datatables-keytable/js'
  },
  {
    from: 'node_modules/datatables.net-keytable-bs4/css',
    to: '../src/assets/plugins/datatables-keytable/css'
  },
  {
    from: 'node_modules/datatables.net-responsive/js',
    to: '../src/assets/plugins/datatables-responsive/js'
  },
  {
    from: 'node_modules/datatables.net-responsive-bs4/js',
    to: '../src/assets/plugins/datatables-responsive/js'
  },
  {
    from: 'node_modules/datatables.net-responsive-bs4/css',
    to: '../src/assets/plugins/datatables-responsive/css'
  },
  {
    from: 'node_modules/datatables.net-rowgroup/js',
    to: '../src/assets/plugins/datatables-rowgroup/js'
  },
  {
    from: 'node_modules/datatables.net-rowgroup-bs4/js',
    to: '../src/assets/plugins/datatables-rowgroup/js'
  },
  {
    from: 'node_modules/datatables.net-rowgroup-bs4/css',
    to: '../src/assets/plugins/datatables-rowgroup/css'
  },
  {
    from: 'node_modules/datatables.net-rowreorder/js',
    to: '../src/assets/plugins/datatables-rowreorder/js'
  },
  {
    from: 'node_modules/datatables.net-rowreorder-bs4/js',
    to: '../src/assets/plugins/datatables-rowreorder/js'
  },
  {
    from: 'node_modules/datatables.net-rowreorder-bs4/css',
    to: '../src/assets/plugins/datatables-rowreorder/css'
  },
  {
    from: 'node_modules/datatables.net-scroller/js',
    to: '../src/assets/plugins/datatables-scroller/js'
  },
  {
    from: 'node_modules/datatables.net-scroller-bs4/js',
    to: '../src/assets/plugins/datatables-scroller/js'
  },
  {
    from: 'node_modules/datatables.net-scroller-bs4/css',
    to: '../src/assets/plugins/datatables-scroller/css'
  },
  {
    from: 'node_modules/datatables.net-searchbuilder/js',
    to: '../src/assets/plugins/datatables-searchbuilder/js'
  },
  {
    from: 'node_modules/datatables.net-searchbuilder-bs4/js',
    to: '../src/assets/plugins/datatables-searchbuilder/js'
  },
  {
    from: 'node_modules/datatables.net-searchbuilder-bs4/css',
    to: '../src/assets/plugins/datatables-searchbuilder/css'
  },
  {
    from: 'node_modules/datatables.net-searchpanes/js',
    to: '../src/assets/plugins/datatables-searchpanes/js'
  },
  {
    from: 'node_modules/datatables.net-searchpanes-bs4/js',
    to: '../src/assets/plugins/datatables-searchpanes/js'
  },
  {
    from: 'node_modules/datatables.net-searchpanes-bs4/css',
    to: '../src/assets/plugins/datatables-searchpanes/css'
  },
  {
    from: 'node_modules/datatables.net-select/js',
    to: '../src/assets/plugins/datatables-select/js'
  },
  {
    from: 'node_modules/datatables.net-select-bs4/js',
    to: '../src/assets/plugins/datatables-select/js'
  },
  {
    from: 'node_modules/datatables.net-select-bs4/css',
    to: '../src/assets/plugins/datatables-select/css'
  },

  // Fullcalendar
  {
    from: 'node_modules/fullcalendar/',
    to: '../src/assets/plugins/fullcalendar'
  },
  // icheck bootstrap
  {
    from: 'node_modules/icheck-bootstrap/',
    to: '../src/assets/plugins/icheck-bootstrap'
  },
  // inputmask
  {
    from: 'node_modules/inputmask/dist/',
    to: '../src/assets/plugins/inputmask'
  },
  // ion-rangeslider
  {
    from: 'node_modules/ion-rangeslider/',
    to: '../src/assets/plugins/ion-rangeslider'
  },
  // JQVMap (jqvmap-novulnerability)
  {
    from: 'node_modules/jqvmap-novulnerability/dist/',
    to: '../src/assets/plugins/jqvmap'
  },
  // jQuery Mapael
  {
    from: 'node_modules/jquery-mapael/js/',
    to: '../src/assets/plugins/jquery-mapael'
  },
  // Raphael
  {
    from: 'node_modules/raphael/',
    to: '../src/assets/plugins/raphael'
  },
  // jQuery Mousewheel
  {
    from: 'node_modules/jquery-mousewheel/',
    to: '../src/assets/plugins/jquery-mousewheel'
  },
  // jQuery Knob
  {
    from: 'node_modules/jquery-knob-chif/dist/',
    to: '../src/assets/plugins/jquery-knob'
  },
  // pace-progress
  {
    from: 'node_modules/@lgaitan/pace-progress/dist/',
    to: '../src/assets/plugins/pace-progress'
  },
  // Select2
  {
    from: 'node_modules/select2/dist/',
    to: '../src/assets/plugins/select2'
  },
  {
    from: 'node_modules/@ttskch/select2-bootstrap4-theme/dist/',
    to: '../src/assets/plugins/select2-bootstrap4-theme'
  },
  // Sparklines
  {
    from: 'node_modules/sparklines/source/',
    to: '../src/assets/plugins/sparklines'
  },
  // SweetAlert2
  {
    from: 'node_modules/sweetalert2/dist/',
    to: '../src/assets/plugins/sweetalert2'
  },
  {
    from: 'node_modules/@sweetalert2/theme-bootstrap-4/',
    to: '../src/assets/plugins/sweetalert2-theme-bootstrap-4'
  },
  // Toastr
  {
    from: 'node_modules/toastr/build/',
    to: '../src/assets/plugins/toastr'
  },
  // jsGrid
  {
    from: 'node_modules/jsgrid/dist',
    to: '../src/assets/plugins/jsgrid'
  },
  {
    from: 'node_modules/jsgrid/demos/db.js',
    to: '../src/assets/plugins/jsgrid/demos/db.js'
  },
  // flag-icons
  {
    from: 'node_modules/flag-icons/css',
    to: '../src/assets/plugins/flag-icons/css'
  },
  {
    from: 'node_modules/flag-icons/flags',
    to: '../src/assets/plugins/flag-icons/flags'
  },
  // bootstrap4-duallistbox
  {
    from: 'node_modules/bootstrap4-duallistbox/dist',
    to: '../src/assets/plugins/bootstrap4-duallistbox/'
  },
  // filterizr
  {
    from: 'node_modules/filterizr/dist',
    to: '../src/assets/plugins/filterizr/'
  },
  // ekko-lightbox
  {
    from: 'node_modules/ekko-lightbox/dist',
    to: '../src/assets/plugins/ekko-lightbox/'
  },
  // jQuery Validate
  {
    from: 'node_modules/jquery-validation/dist/',
    to: '../src/assets/plugins/jquery-validation'
  },
  // bs-custom-file-input
  {
    from: 'node_modules/bs-custom-file-input/dist/',
    to: '../src/assets/plugins/bs-custom-file-input'
  },
  // bs-stepper
  {
    from: 'node_modules/bs-stepper/dist/',
    to: '../src/assets/plugins/bs-stepper'
  },
  // CodeMirror
  {
    from: 'node_modules/codemirror/lib/',
    to: '../src/assets/plugins/codemirror'
  },
  {
    from: 'node_modules/codemirror/addon/',
    to: '../src/assets/plugins/codemirror/addon'
  },
  {
    from: 'node_modules/codemirror/keymap/',
    to: '../src/assets/plugins/codemirror/keymap'
  },
  {
    from: 'node_modules/codemirror/mode/',
    to: '../src/assets/plugins/codemirror/mode'
  },
  {
    from: 'node_modules/codemirror/theme/',
    to: '../src/assets/plugins/codemirror/theme'
  },
  // dropzonejs
  {
    from: 'node_modules/dropzone/dist/',
    to: '../src/assets/plugins/dropzone'
  },
  // uPlot
  {
    from: 'node_modules/uplot/dist/',
    to: '../src/assets/plugins/uplot'
  }
]

module.exports = Plugins
