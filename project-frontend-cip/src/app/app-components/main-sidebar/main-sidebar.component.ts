import {Component, OnInit, Renderer2} from '@angular/core';
import {ScriptService} from "../../services/scripts.service";

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit{

  username?: string;
  role?: string;

  constructor(private renderer: Renderer2, private scriptService: ScriptService) {
  }
  ngOnInit() {
    this.username = 'Francisco Javier Tobias';
    this.role = 'Administrador';
    this.scriptService.loadJsScript(this.renderer, '/assets/custom/js/sidebar/sidebar.js');
  }

}
