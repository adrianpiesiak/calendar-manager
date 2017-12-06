import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthorizeComponent } from './authorize/authorize.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthorizeGuard } from './authorize/authorize.guard';

const routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [
            AuthorizeGuard
        ]
    },
    {
        path: '',
        component: AuthorizeComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [
        AuthorizeGuard
    ]
})
export class AppRoutingModule {}
