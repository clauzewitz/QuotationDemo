const tradeService = require('./tradeService');

describe('TradeService Test', () => {
    it('should defined Module', () => {
        expect(tradeService).toBeDefined();
    });
    it('should defined Functions', () => {
        expect(tradeService.getInstance).toBeDefined();
        expect(tradeService.run).toBeDefined();
    });
    it('should check Function: getInstance', () => {
        let result = tradeService.getInstance(undefined, undefined);
        expect(result).toBeDefined();
        expect(result).toEqual(tradeService);
    });
});
