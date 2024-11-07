/**
 * Ejercicio 5: Consultar el Nonce de una Cuenta
Problema: Crea una función que consulte y devuelva el nonce actual de una cuenta.
*/

const { ethers, Wallet} = require('ethers');
require('dotenv').config();
const{PRIVATE_KEY_WALLET1} = process.env;

const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
const wallet = new ethers.Wallet(PRIVATE_KEY_WALLET1, provider);

//funcion prara obtener el nonce de una cuenta
const getNonce = async () => {
    const nonce = await provider.getTransactionCount(wallet.address);
    console.log(`El nonce de la cuenta es: ${nonce}`);
}

getNonce();