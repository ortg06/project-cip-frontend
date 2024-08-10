import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MainHeaderComponent } from '../app-components/main-header/main-header.component';
import { MainSidebarComponent } from '../app-components/main-sidebar/main-sidebar.component';
import { ContentWrapperComponent } from '../app-components/content-wrapper/content-wrapper.component';
import { ControlSidebarComponent } from '../app-components/control-sidebar/control-sidebar.component';
import { MainFooterComponent } from '../app-components/main-footer/main-footer.component';
import { PreloaderComponent } from '../app-components/preloader/preloader.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        PagesComponent,
        MainHeaderComponent,
        MainSidebarComponent,
        ContentWrapperComponent,
        ControlSidebarComponent,
        MainFooterComponent,
        PreloaderComponent
    ],
    imports: [
        BrowserModule,
        PagesRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [PagesComponent]
})
export class PagesModule { }
