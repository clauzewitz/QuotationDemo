'use strict'
const WebSocket = require('ws');
const _ = require('underscore');
const LineByLineReader = require('line-by-line');
const QuotationType = require('../types/quotationType');
const QuotationStatusType = require('../types/quotationStatusType');
const QuotationUtil = require('../utils/quotationUtil');

function TradeService () {
    const TIME_OUT = 1000;
    let wss;
    let ws;

    function getInstance (_wss, _ws) {
        wss = _wss;
        ws = _ws;
        return this;
    }

    function sendMessage (currentPrice, reqQuotation) {
        if (!_.isUndefined(wss) && !_.isUndefined(ws)) {
            wss.clients.forEach(function (client) {
                if (client === ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        currentPrice: currentPrice,
                        reqQuotation: reqQuotation
                    }));
                }
            });
        }
    }

    function run () {
        let lr = new LineByLineReader('./data/input.txt');
        let waitQuotations = [];
        let currentPrice = 0;

        lr.on('error', function (err) {
            lr.close();
        });

        lr.on('end', function () {
            lr.close();
        });

        lr.on('line', function (line) {
            let dataArr = line.split('\t');
            let quotation = {
                status: QuotationStatusType.ACTIVE
            };
            quotation.type = dataArr[0];
            quotation.price = Number(dataArr[1]);
            quotation.amount = Number(dataArr[2]);
            quotation.id = waitQuotations.length;
            waitQuotations.push(_.clone(quotation));
            sendMessage(currentPrice, {
                buyAmount: _.isEqual(QuotationType.BUY, quotation.type) ? quotation.amount : undefined,
                buyPrice: _.isEqual(QuotationType.BUY, quotation.type) ? quotation.price : undefined,
                sellAmount: _.isEqual(QuotationType.SELL, quotation.type) ? quotation.amount : undefined,
                sellPrice: _.isEqual(QuotationType.SELL, quotation.type) ? quotation.price : undefined,
            });

            if (waitQuotations.length > 1) {
                waitQuotations.filter(function (value) {
                    return _.isEqual(QuotationStatusType.ACTIVE, value.status);
                }).forEach(function (value) {
                    tradeQuotation(value);
                });
            }

            function tradeQuotation (quotation) {
                let waitSellQuotations = QuotationUtil.getWaitSellQuotations(waitQuotations);
                let waitBuyQuotations = QuotationUtil.getWaitBuyQuotations(waitQuotations);
                let targetQuotation = QuotationUtil.getEqualValue(quotation, (_.isEqual(QuotationType.BUY, quotation.type) ? waitSellQuotations : waitBuyQuotations));
                if (!targetQuotation) {
                    if (_.isEqual(QuotationType.BUY, quotation.type)) {
                        targetQuotation = QuotationUtil.getMinValue(waitSellQuotations, quotation.price);
                    } else {
                        targetQuotation = QuotationUtil.getMaxValue(waitBuyQuotations, quotation.price);
                    }
                }
                if (targetQuotation) {
                    let diffAmount = quotation.amount - targetQuotation.amount;
                    if (diffAmount > 0) {
                        quotation.amount -= targetQuotation.amount;
                        setCompleteQuotation(targetQuotation);
                        tradeQuotation(quotation);
                    } else if (diffAmount < 0) {
                        targetQuotation.amount -= quotation.amount;
                        setCompleteQuotation(quotation);
                    } else {
                        setCompleteQuotation(targetQuotation);
                        setCompleteQuotation(quotation);
                    }
                    if (_.isEqual(QuotationType.BUY, quotation.type)) {
                        let buyIdx = QuotationUtil.getWaitQutationIdxById(quotation.id, waitQuotations);
                        let sellIdx = QuotationUtil.getWaitQutationIdxById(targetQuotation.id, waitQuotations);
                        waitQuotations[buyIdx] = quotation;
                        waitQuotations[sellIdx] = targetQuotation;
                        currentPrice = quotation.price;
                    } else {
                        let buyIdx = QuotationUtil.getWaitQutationIdxById(targetQuotation.id, waitQuotations);
                        let sellIdx = QuotationUtil.getWaitQutationIdxById(quotation.id, waitQuotations);
                        waitQuotations[buyIdx] = targetQuotation;
                        waitQuotations[sellIdx] = quotation;
                        currentPrice = targetQuotation.price;
                    }
                    sendMessage(currentPrice);
                }
            }

            function setCompleteQuotation (quotation) {
                quotation.amount = 0;
                quotation.status = QuotationStatusType.COMPLETE;
            }

            lr.pause();

            setTimeout(function () {
                lr.resume();
            }, TIME_OUT);
        });
    };

    return {
        getInstance: getInstance,
        run: run
    }
};

module.exports = TradeService();
