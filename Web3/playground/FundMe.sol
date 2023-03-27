// 这个合同用来干啥
// 1. Get funds from users
// 2. Withdraw funds
// 3. Set a minium funding value in USD

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract fundMe {

    uint256 public miniumUsd = 50;

    function fund() public payable{
        require(msg.value > miniumUsd, "Didn't send enough~"); // 1e18 = 1 * 10 ** 18 = 1000000000000000000
    }

    // 获取价格
    function getPrice() public view returns(uint256){
        // ABI
        // Address 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
        (, int256 price,,,) = priceFeed.latestRoundData(); // 相当于从多个返回值中结构出 price

        return uint256(price * 1e10); // 确保返回值和 msg.value 的 decimal 和 type 相同
    }

    // 获取汇率
    function getConversionRate() public{

    }

    // function withdraw(){}
}
