import {Component} from '@angular/core';
import {QuotationResource} from '../../resources/quotation.resource';
import {Quotation} from '../../model/quotation';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [QuotationResource]
})
export class AppComponent {
    quotations: Array<Quotation> = [];
    currentPrice: number = 0;

    constructor (private quotationResource: QuotationResource) {
        quotationResource.messages.subscribe(message => {
            this.currentPrice = message.currentPrice;
            if (message.reqQuotation) {
                this.quotations.unshift(message.reqQuotation);
            }
        });
    }
}
