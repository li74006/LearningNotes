// 这个合同用来干啥
// 1. Get funds from users
// 2. Withdraw funds
// 3. Set a minium funding value in USD

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract fundMe {

    function fund() public payable{
        require(msg.value > 1e18, "Didn't send enough~"); // 1e18 = 1 * 10 ** 18 = 1000000000000000000
    }

    // function withdraw(){}
}
