import {Component} from '@angular/core';
import {QuotationResource} from '../../resources/quotation.resource';
import {Quotation} from '../../model/quotation';
import {WebsocketService} from '../../common/websocket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [WebsocketService, QuotationResource]
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
