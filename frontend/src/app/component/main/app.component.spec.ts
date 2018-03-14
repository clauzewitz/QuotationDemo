import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';

import {WebsocketService} from '../../common/websocket.service';
import {QuotationResource} from '../../resources/quotation.resource';

describe('AppComponent', () => {
    let fixture;
    let comp;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [
                WebsocketService,
                QuotationResource
            ]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should create the app', async(() => {
        expect(comp).toBeDefined();
    }));
    it(`should defined variable`, async(() => {
        expect(comp.quotations).toBeDefined();
        expect(comp.quotations.length).toBeGreaterThanOrEqual(0);
        expect(comp.currentPrice).toBeDefined();
        expect(comp.currentPrice).toBeGreaterThanOrEqual(0);
        expect(comp.quotationResource).toBeDefined();
    }));
    it('should be watching messages', async(() => {
        const dummyData = {currentPrice: 0, reqQuotation: {buyAmount: 100, buyPrice: 554, sellAmount: 20, sellPrice: 600}};
        comp.quotationResource.messages.subscribe(data => {
            expect(data).toBeDefined();
            expect(data.currentPrice).toBeDefined();
            expect(data.currentPrice).toBeGreaterThanOrEqual(0);
            expect(data.reqQuotation).toBeDefined();
        });
    }));
});
