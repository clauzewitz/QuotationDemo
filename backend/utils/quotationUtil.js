'use strict'
const _ = require('underscore');
const QuotationType = require('../types/quotationType');
const QuotationStatusType = require('../types/quotationStatusType');

function tradeUtil () {
    function getWaitQutationIdxById (id, waitQuotations) {
        return waitQuotations.findIndex(function (value) {
            return value.id === id;
        });
    }

    function getEqualValue (quotation, quotations) {
        return quotations.find(function (value) {
            return _.isEqual(QuotationStatusType.ACTIVE, value.status) && _.isEqual(quotation.price, value.price);
        });
    }

    function getMinValue (quotations, quotationPrice) {
        let tempQuotations = quotations.filter(function (value) {
            return _.isEqual(QuotationStatusType.ACTIVE, value.status) && (value.price < quotationPrice);
        });

        if (_.isEmpty(tempQuotations)) {
            return false;
        } else {
            return tempQuotations.reduce(function (accumulator, value) {
                return (accumulator.price < value.price ? accumulator : value);
            });
        }
    }

    function getMaxValue (quotations, quotationPrice) {
        let tempQuotations = quotations.filter(function (value) {
            return _.isEqual(QuotationStatusType.ACTIVE, value.status) && (value.price > quotationPrice);
        });

        if (_.isEmpty(tempQuotations)) {
            return false;
        } else {
            return tempQuotations.reduce(function (accumulator, value) {
                return (accumulator.price > value.price ? accumulator : value);
            });
        }
    }

    function getWaitSellQuotations (waitQuotations) {
        return waitQuotations.filter(function (value) {
            return _.isEqual(QuotationType.SELL, value.type) && _.isEqual(QuotationStatusType.ACTIVE, value.status);
        });
    }

    function getWaitBuyQuotations (waitQuotations) {
        return waitQuotations.filter(function (value) {
            return _.isEqual(QuotationType.BUY, value.type) && _.isEqual(QuotationStatusType.ACTIVE, value.status);
        });
    }

    return {
        getWaitQutationIdxById: getWaitQutationIdxById,
        getEqualValue: getEqualValue,
        getMinValue: getMinValue,
        getMaxValue: getMaxValue,
        getWaitSellQuotations: getWaitSellQuotations,
        getWaitBuyQuotations: getWaitBuyQuotations
    };
};

module.exports = tradeUtil();
