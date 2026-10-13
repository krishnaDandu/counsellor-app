// import { Routes } from '@angular/router';

// export const routes: Routes = [];

import { Routes } from '@angular/router';

import { RegistrationComponent }
  from './pages/registration/registration';

import { LoginComponent }
  from './pages/login/login';

import { DashboardComponent }
  from './pages/dashboard/dashboard';

import { EnquiryAddComponent }
  from './pages/enquiry-add/enquiry-add';

import { EnquiryListComponent }
  from './pages/enquiry-list/enquiry-list';

import { EnquiryEditComponent }
  from './pages/enquiry-edit/enquiry-edit';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'register',
    component: RegistrationComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'enquiries',
    component: EnquiryListComponent
  },

  {
    path: 'enquiries/add',
    component: EnquiryAddComponent
  },

  {
    path: 'enquiries/edit/:id',
    component: EnquiryEditComponent
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];