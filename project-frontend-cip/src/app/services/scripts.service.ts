import {Renderer2, Inject, Injectable} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {environment} from "../../environments/environment";
@Injectable()
export class ScriptService {

    constructor(
        @Inject(DOCUMENT) private document: Document
    ) { }

    /**
     * Append the JS tag to the Document Body.
     * @param renderer The Angular Renderer
     * @param src The path to the script
     * @returns the script element
     */

    public setBackendURL(renderer: Renderer2): HTMLScriptElement {
        const script = renderer.createElement('script');
        script.type = 'text/javascript';
        script.text = "const BACKEND_URL = '" + environment.url + "';";
        renderer.appendChild(this.document.head, script);
        return script;
    }
    public loadJsScript(renderer: Renderer2, src: string): HTMLScriptElement {
        const script = renderer.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        renderer.appendChild(this.document.body, script);
        return script;
    }

    public loadCSS(renderer: Renderer2, src: string): HTMLScriptElement {
        const script = renderer.createElement('link');
        script.rel = 'stylesheet';
        script.href = src;
        renderer.appendChild(this.document.head, script);
        return script;
    }

    public loadS2(renderer: Renderer2){
        this.loadCSS(renderer, '/assets/plugins/select2/css/select2.min.css');
        this.loadCSS(renderer, '/assets/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css');
        this.loadJsScript(renderer, '/assets/plugins/select2/js/select2.full.min.js');
        this.loadJsScript(renderer, '/assets/plugins/select2/js/i18n/es.js');
        this.loadJsScript(renderer, '/assets/custom/js/plugins/select2-config.js');
    }

    public loadDT(renderer: Renderer2){
        this.loadCSS(renderer, '/assets/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css');
        this.loadCSS(renderer, '/assets/plugins/datatables-responsive/css/responsive.bootstrap4.min.css');
        this.loadCSS(renderer, '/assets/plugins/datatables-buttons/css/buttons.bootstrap4.min.css');
        this.loadJsScript(renderer, '/assets/plugins/datatables/jquery.dataTables.min.js');
        this.loadJsScript(renderer, '/assets/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js');
        this.loadJsScript(renderer, '/assets/plugins/datatables-responsive/js/dataTables.responsive.min.js');
        this.loadJsScript(renderer, '/assets/plugins/datatables-responsive/js/responsive.bootstrap4.min.js');
        this.loadJsScript(renderer, '/assets/plugins/datatables-buttons/js/dataTables.buttons.min.js');
        this.loadJsScript(renderer, '/assets/plugins/datatables-buttons/js/buttons.bootstrap4.min.js');
        this.loadJsScript(renderer, '/assets/plugins/jszip/jszip.min.js');
        this.loadJsScript(renderer, '/assets/plugins/pdfmake/pdfmake.min.js');
        this.loadJsScript(renderer, '/assets/plugins/pdfmake/vfs_fonts.js');
        this.loadJsScript(renderer, '/assets/plugins/datatables-buttons/js/buttons.html5.min.js');
        this.loadJsScript(renderer, '/assets/plugins/datatables-buttons/js/buttons.print.min.js');
        this.loadJsScript(renderer, '/assets/plugins/datatables-buttons/js/buttons.colVis.min.js');
        this.loadJsScript(renderer, '/assets/custom/js/plugins/jquery.spring-friendly.min.js');
    }

}