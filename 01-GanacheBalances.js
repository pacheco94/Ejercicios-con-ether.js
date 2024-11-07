/**
 * Ejercicio 1: Conectar a Ganache y Consultar el Balance
Problema: Crea una función que, dado un array de direcciones, 
se conecte a Ganache y devuelva el balance de cada dirección 
en ETH.
 * 
 */

const { ethers } = require('ethers');
const { ganacheProvider } = process.env;

//obtener la url del proveedor de ganache desde la variable de entorno
const ganacheUrl = process.env.ganacheProvider || 'http://localhost:7545';
//conectarnos con el proveedor
const provider = new ethers.providers.JsonRpcProvider(ganacheUrl);

//consultar las cuenta de ganache
const getBalances = async (addresses) => {
    try{
        const balances = {};
        for(const address of addresses) {
             const balance = await provider.getBalance(address);
             balances[address] = ethers.utils.formatEther(balance);
        } 
        console.log(balances);
    }catch(error){
        console.error("Error al obtener los balances: ", error);
    }
   
};

//array de direcciones de ejemplo
const address = [
    '0xcC93D94A156dDbd36F0633CD936ae4186EB8b3D3',
    '0x5E77C3Ea962c912Ed4f035C2683d16A14b1aAA7d',
    '0x21B5baEff59f43e8DE8F77Fa26774f145062515a'
];

getBalances(address);