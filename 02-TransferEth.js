/**
 * Ejercicio 2: Transferencia de ETH entre dos cuentas
Problema: Crea una función transfer que envíe 0.5 ETH desde una cuenta 
con clave privada conocida hacia otra cuenta destino.
 */

const { ethers, Wallet } = require('ethers');
require('dotenv').config();
const{PRIVATE_KEY_WALLET1, PRIVATE_KEY_WALLET2} = process.env;

//conectando con el proveedor en este caso ganache
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');

//creando las billeteras
const wallet1 = new Wallet(PRIVATE_KEY_WALLET1,provider);
const wallet2 = new Wallet(PRIVATE_KEY_WALLET2,provider);

//enviando 0.5ETH desde las billeteras
const transfer = async (to)=> {
    try{
        const tx = {
            to:to,
            value: ethers.utils.parseUnits('10','ether'),
            gasLimit: 21000
        };
        //enviamos la transaccion y esperamos que se mine el bloque
         const transaction = await wallet1.sendTransaction(tx);
         
        //Esperamos la confirmacion de la transaccion
        const receipt = await transaction.wait(); 
         console.log("Transaccion enviada: ", receipt);
    }catch(error){
        console.error("Error al transferir: ", error);
    }
}

transfer('0x21B5baEff59f43e8DE8F77Fa26774f145062515a');