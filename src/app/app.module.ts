import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLogin } from './login/login.component';
import { AppModal } from './ui-components/modal/modal.component';
import { AppNavbar } from './ui-components/navbar/navbar.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { AppHome } from './home/home.component';
import { AppSerachDialog } from './ui-components/search-dialog/search-dialog.component';
import { AppSummaryView } from './ui-components/summary-view/summary-view.component';
import { AppAbout } from './about/about.component';
import { AppProfile } from './profile/profile.component';
import { AppKRMInit } from './ui-components/krm-init/krm-init.component';
import { AppStatusView } from './ui-components/status-view/status-view.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToggleButtonModule } from 'primeng/togglebutton';

@NgModule({
  declarations: [
    AppComponent,
    AppModal,
    AppNavbar,
    AppLogin,
    AppHome,
    AppSerachDialog,
    AppSummaryView,
    AppAbout,
    AppProfile,
    AppKRMInit,
    AppStatusView
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AutoCompleteModule,
    DialogModule,
    ButtonModule,
    TableModule,
    MenubarModule,
    CardModule,
    InputTextModule,
    ToastModule,
    CheckboxModule,
    BadgeModule,
    OverlayPanelModule,
    ProgressSpinnerModule,
    ToggleButtonModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
