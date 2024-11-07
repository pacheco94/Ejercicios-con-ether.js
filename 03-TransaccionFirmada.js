/**
 * Ejercicio 3: Firmar y Enviar una Transacción Raw
Problema: Crea una función que tome una dirección destino y una cantidad, 
firme la transacción y luego la envíe utilizando sendTransaction.
 */

const { ethers, Wallet } = require('ethers');
require('dotenv').config();

const { PRIVATE_KEY_WALLET2 } = process.env;
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
const wallet = new ethers.Wallet(PRIVATE_KEY_WALLET2, provider);

const sigAndSend = async (_to, amount) => {
    try {
        // Verificamos que el valor de `amount` sea un número válido
        if (isNaN(amount) || Number(amount) <= 0) {
            console.error("El valor de amount debe ser un número mayor que cero.");
            return;
        }

        // Convertimos `amount` a wei
        const value = ethers.utils.parseEther(amount.toString());
        console.log("Cantidad convertida a Wei:", value.toString());

        // Construimos la transacción
        const tx = {
            to: _to,
            value: value,
            gasLimit: 21000
        };

        // Firmamos y enviamos la transacción
        const transactionResponse = await wallet.sendTransaction(tx);

        // Esperamos a que se confirme la transacción
        const receipt = await transactionResponse.wait();
        console.log("Transacción enviada y confirmada:", receipt);
    } catch (error) {
        console.error("Error al transferir:", error);
    }
};

// Llamada a la función con la dirección de destino y cantidad en Ether
sigAndSend('0xd2C5Bac0362f22e8304B6B04CcD334952087b3a1', '10');
