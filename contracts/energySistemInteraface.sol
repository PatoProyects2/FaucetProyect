// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract energySisInterface {
    // Variables:
    IERC20 public buyToken; // Direccion de contrato para comprar energia
    address public owner; //Direccion de owner, editor de contrato
    address public feeWallet; // Direccion de wallet donde terminan los tokens del pago
    uint public pricePerDay; //Precio por dia de energia
    uint public maxDayToBuy; //Cantidad maxima de dias que se pueden comprar
    bool public funActive; //bool para activar-desactivar funciones
    

    /*================= Funciones de lectura, NO CONSUMEN FEE ====================*/

    //Usar esta funcion para saber si el usuario puede o no usar el bot. 
    //PUBLICA
    function chekUser(address _user) public view returns(bool){
        /*Dada un address retorna:
         * True si el usuario tiene energia(Puede usar el bot)
         * False si no tiene energia (no puede usar el bot)
        */ 
    }

    function howTimeLeft(address _user) public view returns(uint){
        //Retorna el tiempo en segundos que le queda al usuario, no contempla a los vips.
        //Se puede utilizar para dar informacion en el front
        //Retorna en segundos
    }

    //Retorna si el usuario es vip. puede ser usada publicamente, 
    // Pero es mas para uso interno.
    function getVipChek(address _user) public view returns(bool){
        /* el parametro _user, es el usuario que llama*/
    }

    //========================FUNCIONES DE ESCRITURA ====================================


    function buyDay(uint _days) public {
        //Parametro days en unidades simples, 1 = 1 dia. 
        /*Requerimientos para ejecucion :
         * funActive(var) = true
         * tiempo que le queda de energia (howTimeLeft(useraddress)) < maxDayTobuy(var)
         * aprove del token con el que se compra (buyToken (var))
         * que el usuario tenga balance. 
         desde el front no se hace nada, etas cosas las comprueba la funcion internamente
        */
        // IMPORTANTE, utilizar approve del token antes de ejecutar la funcion
    }

    //Las demas funciones son de uso Propietario/admin. Luego las comentare


}
