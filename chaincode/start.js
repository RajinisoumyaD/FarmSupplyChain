'use strict';

const FarmSupplyContract = require('./index');
const { ChaincodeServer } = require('fabric-shim');

const server = new ChaincodeServer(
    new FarmSupplyContract(),
    {
        ccid: process.env.CHAINCODE_ID,
        address: '0.0.0.0:9999',
        tlsProps: {
            disabled: true
        }
    }
);

server.start();
