import {NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    exports: [
        FormsModule,
        MatInputModule,
        MatCardModule
    ]
})
export class MaterialModule {
}
