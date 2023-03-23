// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './SimpleStorage.sol';

contract StorageFactory {
    SimpleStorage[] public SimpleStorageArray;

    function createSimpleStorageContract() public {
        SimpleStorage simpleStorage = new SimpleStorage();
        SimpleStorageArray.push(simpleStorage);
    }

    function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {
        // 当与其他合同互动的时候，需要以下两个参数
        // 1.  Address ： 其他合同的地址
        // 2. ABI ： Application Binary Interface ABI - 告诉合同如何与其他合同互动
    }
}