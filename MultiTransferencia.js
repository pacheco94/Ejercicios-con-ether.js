/**
 * Ejercicio 4: Enviar ETH a Múltiples Direcciones
Problema: Crea una función multiTransfer que envíe 0.1 ETH a cada dirección en un array de direcciones.
 * 
 */

const { ethers, Wallet} = require('ethers');
require('dotenv').config();
const{PRIVATE_KEY_WALLET1} = process.env;

const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
const wallet = new ethers.Wallet(PRIVATE_KEY_WALLET1, provider);

const multiTransfer = async(addresses,amount) => {
    try{
        const balance = await provider.getBalance(wallet.address);
        const balanceEth = ethers.utils.formatEther(balance);
        console.log("Balance de la wallet: ", balanceEth, "ETH");

        //comprobar que el saldo no este vacio 
        if(isNaN(balanceEth) || Number(balanceEth) <= 0){
           console.log("Debes tener ETH en tu cuenta.");
           return;
        }

        //verificamos que amount sea un numero valico y mayor a cero
        if(isNaN(amount) || Number(amount) <= 0){
            console.log(`Amount debe ser mayor a cero: ${amount}`);
            return;
        }

        //convertimos la cantidad en Wei
        const value = ethers.utils.parseEther(amount.toString());

        //creamos las transacciones para el array de cuetas
        for(const address of addresses) {
            const tx = {
                to: address,
                value:value, // ya esta convertido en Wei
                gasLimit:21000
            };

            //firmando y enviando la transaccion
        const transaction = await wallet.sendTransaction(tx);
        const receive = await transaction.wait();

        console.log(`Transaccion enviada a ${address}: `,receive);
        }
    }catch(error){
            console.error("Error en las Transacciones: ",error);
        }
    } ;
//importando las cuentas al array
const address = [
    '0x76ddC543F25B4424941153F504774C7156ec2616',
    '0xCD8c6CC334B663edF09497c28e6fE58B312a3D78',
    '0x484FF949F82D56170dB17F7912E5b17c25CAd980'
];

multiTransfer(address,'0.5');