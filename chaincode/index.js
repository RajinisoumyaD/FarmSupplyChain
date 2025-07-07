'use strict';

const { Contract } = require('fabric-contract-api');

class FarmSupplyContract extends Contract {

    async addNewProductByProducer(ctx, id, prodDesc, producerName, producerAddr, harvestDate) {
        const productBytes = await ctx.stub.getState(id);
        if(productBytes && productBytes.length > 0) {
            throw new Error(`The Product ${id} already exists`);
        }

        const date = new Date(harvestDate);

        const product = {
            id,
            prodDesc,
            producerName,
            producerAddr,
            wareHouse: 'producer',
            harvestDate: {
                day: date.getDate(),
                month: date.getMonth()+1,
                year: date.getFullYear()
            }
        };

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(product)));
    }

    async transferProductFromProducerToDistributer(ctx, id, distributerName, distributerAddr, distributerTxDate) {
        const productBytes = await ctx.stub.getState(id);
        if(!productBytes || productBytes.length === 0) {
            throw new Error(`The product ${id} does not exist.`);
        }

        let product = JSON.parse(productBytes.toString());

        if(product.wareHouse !== 'producer') {
            throw new Error(`The product ${id} does not exist in producer warehouse`);
        }

        const producerDate = new Date(product.harvestDate.year, product.harvestDate.month-1, product.harvestDate.day);
        const distributerDate = new Date(distributerTxDate);

        if(producerDate > distributerDate) {
            throw new Error(`The product ${id} Producer harvest date should not be greater than Distributer procurement date`);
        }

        const distributerDetails = {
            distributerName,
            distributerAddr,
            distributerTxDate: {
                day: distributerDate.getDate(),
                month: distributerDate.getMonth()+1,
                year: distributerDate.getFullYear()
            }
        };

        product.distributerDetails = distributerDetails;
        product.wareHouse = 'distributor';

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(product)));
    }

    async transferProductFromDistributorToRetailer(ctx, id, retailerName, retailerAddr, retailerTxDate) {
        const productBytes = await ctx.stub.getState(id);
        if(!productBytes || productBytes.length === 0) {
            throw new Error(`The product ${id} does not exist.`);
        }

        let product = JSON.parse(productBytes.toString());

        if(product.wareHouse !== 'distributor') {
            throw new Error(`The product ${id} does not exist in Distributor warehouse`);
        }

        const distributertxDate = product.distributerDetails.distributerTxDate;
        const distributerDate = new Date(distributertxDate.year, distributertxDate.month-1, distributertxDate.day);
        const retailerDate = new Date(retailerTxDate);

        if(distributerDate > retailerDate) {
            throw new Error(`The product ${id} Distributer procurement date should not be greater than Retailer procurement date`);
        }

        const retailerDetails = {
            retailerName,
            retailerAddr,
            retailerTxDate: {
                day: retailerDate.getDate(),
                month: retailerDate.getMonth()+1,
                year: retailerDate.getFullYear()
            }
        };

        product.retailerDetails = retailerDetails;
        product.wareHouse = 'retailer';

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(product)));
        return id;
    }

    async getProductById(ctx, id) {
        const productBytes = await ctx.stub.getState(id);
        if(!productBytes || productBytes.length === 0){
            throw new Error(`The product ${id} does not exist.`);
        }

        return JSON.parse(productBytes.toString());
    }

    async getHistory(ctx, id) {
        let iterator = await ctx.stub.getHistoryForKey(id);
        let history = [];

        let res = await iterator.next();
        while(!res.done) {
            if(res.value) {
                history.push({
                    txId: res.value.txId,
                    value: JSON.parse(res.value.value.toString('utf8')),
                    isDelete:res.value.isDelete
                });
            }
            res = await iterator.next();
        }

        await iterator.close();
        return history;
    }
}

module.exports = FarmSupplyContract;
