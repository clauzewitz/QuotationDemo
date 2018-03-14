import {NgModule} from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';

import {AppComponent} from '../component/main/app.component';

const routes: Routes = [
    {
        path: '',
        component: AppComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {
}
