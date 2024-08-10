import {Component, OnInit, Renderer2} from '@angular/core';
import {ScriptService} from "./services/scripts.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ScriptService]
})
export class AppComponent implements OnInit {
    title = 'bcr';

    constructor(
        private renderer: Renderer2,
        private scriptService: ScriptService
    ) {
    }

    ngOnInit(): void {
        this.scriptService.setBackendURL(this.renderer);
    }
}
