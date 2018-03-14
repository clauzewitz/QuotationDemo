const quotationUtil = require('./quotationUtil');

describe('QuotationUtil Test', () => {
    it('should defined Module', () => {
        expect(quotationUtil).toBeDefined();
    });
    it('should defined Functions', () => {
        expect(quotationUtil.getWaitQutationIdxById).toBeDefined();
        expect(quotationUtil.getEqualValue).toBeDefined();
        expect(quotationUtil.getMinValue).toBeDefined();
        expect(quotationUtil.getMaxValue).toBeDefined();
        expect(quotationUtil.getWaitSellQuotations).toBeDefined();
        expect(quotationUtil.getWaitBuyQuotations).toBeDefined();
    });
    it('should check Function: getWaitQutationIdxById', () => {
        const dummyData = [{type: 'B', id: 0, amount: 20, price: 550, status: 'A'}, {type: 'B', id: 1, amount: 100, price: 600, status: 'C'},{type: 'S', id: 2, amount: 20, price: 550, status: 'A'},{type: 'S', id: 3, amount: 50, price: 545, status: 'A'}];
        const dummyResult = 2;
        let result = quotationUtil.getWaitQutationIdxById(2, dummyData);
        expect(result).toBeDefined();
        expect(result).toEqual(dummyResult);
    });
    it('should check Function: getEqualValue', () => {
        const dummyData1 = {type: 'S', id: 6, amount: 100, price: 600, status: 'A'};
        const dummyData2 = [{type: 'B', id: 0, amount: 20, price: 550, status: 'A'}, {type: 'B', id: 1, amount: 100, price: 600, status: 'A'},{type: 'S', id: 2, amount: 20, price: 550, status: 'A'},{type: 'S', id: 3, amount: 50, price: 545, status: 'A'}];
        const dummyResult = {type: 'B', id: 1, amount: 100, price: 600, status: 'A'};
        let result = quotationUtil.getEqualValue(dummyData1, dummyData2);
        expect(result).toBeDefined();
        expect(result).toEqual(dummyResult);
    });
    it('should check Function: getMinValue', () => {
        const dummyData1 = [{type: 'B', id: 0, amount: 20, price: 550, status: 'A'}, {type: 'B', id: 1, amount: 100, price: 600, status: 'A'},{type: 'S', id: 2, amount: 20, price: 550, status: 'A'},{type: 'S', id: 3, amount: 50, price: 545, status: 'A'}];
        const dummyData2 = 550;
        const dummyResult = {type: 'S', id: 3, amount: 50, price: 545, status: 'A'};
        let result = quotationUtil.getMinValue(dummyData1, dummyData2);
        expect(result).toBeDefined();
        expect(result).toEqual(dummyResult);
    });
    it('should check Function: getMaxValue', () => {
        const dummyData1 = [{type: 'B', id: 0, amount: 20, price: 550, status: 'A'}, {type: 'B', id: 1, amount: 100, price: 600, status: 'A'},{type: 'S', id: 2, amount: 20, price: 550, status: 'A'},{type: 'S', id: 3, amount: 50, price: 545, status: 'A'}];
        const dummyData2 = 545;
        const dummyResult = {type: 'B', id: 1, amount: 100, price: 600, status: 'A'};
        let result = quotationUtil.getMaxValue(dummyData1, dummyData2);
        expect(result).toBeDefined();
        expect(result).toEqual(dummyResult);
    });
    it('should check Function: getWaitSellQuotations', () => {
        const dummyData = [{type: 'B', id: 0, amount: 20, price: 550, status: 'A'}, {type: 'B', id: 1, amount: 100, price: 600, status: 'A'},{type: 'S', id: 2, amount: 20, price: 550, status: 'A'},{type: 'S', id: 3, amount: 50, price: 545, status: 'A'}];
        const dummyResult = [{type: 'S', id: 2, amount: 20, price: 550, status: 'A'}, {type: 'S', id: 3, amount: 50, price: 545, status: 'A'}];
        let result = quotationUtil.getWaitSellQuotations(dummyData);
        expect(result).toBeDefined();
        expect(result).toEqual(dummyResult);
    });
    it('should check Function: getWaitBuyQuotations', () => {
        const dummyData = [{type: 'B', id: 0, amount: 20, price: 550, status: 'A'}, {type: 'B', id: 1, amount: 100, price: 600, status: 'A'},{type: 'S', id: 2, amount: 20, price: 550, status: 'A'},{type: 'S', id: 3, amount: 50, price: 545, status: 'A'}];
        const dummyResult = [{type: 'B', id: 0, amount: 20, price: 550, status: 'A'}, {type: 'B', id: 1, amount: 100, price: 600, status: 'A'}];
        let result = quotationUtil.getWaitBuyQuotations(dummyData);
        console.log(result);
        expect(result).toBeDefined();
        expect(result).toEqual(dummyResult);
    });
});
