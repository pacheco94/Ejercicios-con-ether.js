/**
 * Tu objetivo: Encontrar las direcciones
La función findEther recibe una dirección que ha enviado Ether a
 varias otras direcciones. El objetivo de esta función es encontrar
  cada dirección que haya recibido Ether y devolverlas en un array de direcciones.
 */
  const { ethers, Wallet} = require('ethers');
  require('dotenv').config();
  const{PRIVATE_KEY_WALLET1} = process.env;
  
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
  const wallet = new ethers.Wallet(PRIVATE_KEY_WALLET1, provider);

  const findEther = async () => {
    try{
        const addresses = [];
        const latesBlock = await provider.getBlockNumber();

        //Iteramos a travez de los blocques de la block chain en este caso ganache
        for(let blockNumber = 0; blockNumber <= latesBlock; blockNumber++) {
            const block = await provider.getBlockWithTransactions(blockNumber);

            //Revisamos cada transaccion dentro del bloque
            for(const transaction of block.transactions) {
                if(transaction.from.toLowerCase() === wallet.address.toLowerCase()) {
                    addresses.push(transaction.to);
                }
            }
        }

        console.log("Direcciones a las que se envió Ether:");
        addresses.forEach((address, index) => {
        console.log(`${index + 1}: ${address}`);
         });


    }catch(error) {
        console.error("Error al encontrar las transacciones: ",error);
    }
  }

  findEther();