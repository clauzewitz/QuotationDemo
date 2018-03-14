import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';
import {WebsocketService} from '../common/websocket.service';

const WS_URL = 'ws://localhost:40510';

@Injectable()
export class QuotationResource {
    public messages: Subject<any>;

    constructor (wsService: WebsocketService) {
        this.messages = <Subject<any>>wsService
            .connect(WS_URL)
            .map((response: MessageEvent): any => {
                return JSON.parse(response.data);
            });
    }
}
