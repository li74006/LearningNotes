# Web3 Learning Notes

## Lesson 1 : Blockchain Basic

### 1.4 : First Transaction

1. 创建 [METAMASK](https://metamask.io/) 账户。
   - 严格保存 Secret Recovery Pharse（助记词）。
   - 每个账户的 Hash 就是 私钥，也要存好。
2. 点击 METAMASK 插件图标，选择显示测试网络。
3. 使用较为主流的 Rinkeby / Kovan 作为测试网络。
4. 进入 https://faucets.chain.link (俗称水龙头)，链接 METAMASK 账户，获得测试 ETH。

### 1.5 : Gas 1 - 什么是 Gas？

> Gas ：区块链是被不同节点执行的，创建交易时，不同节点上的某个运行区块链软件的人就会获得一笔小费，这些收入可以激励人们运行节点。他们收入的多少取决于 Gas 的用量，要使用更多的计算资源，就会消耗越多的 Gas。

> Gas Fees（Gas 费） = Gas Price × Gas Usage（Gas 用量）

### 1.6 : How Do Blcokchains Work?

> Hash : 一串独一无二的固定长度的字符串，用以验证一段数据。它是通过把数据输入“哈希函数”来生成的。

> Genesis Block(创世区块) : The first blcok in a blockchain.

> Mining(挖矿) : 就是算出区块链 Nonce 的过程。由 Nodes 给矿工付费。

> Nonce : A "number used once" to find the "solution" to the blockchain problem.

> Blcok : 由 Blcok、Nonce、Transaction、prev（上一个块的哈希值）结合算出当前块的哈希。

==我理解的基本原理就是（该理解有待优化） ：==

1. 建立在 Hash 算法上；
2. 将 Blcok、Nonce、Transaction 等结合，算出该块的哈希；
3. 将一个块的 prev 块串联到上一块的哈希形成块链；
4. 将块链形成多个 peer，保证去中心化。

### 1.7 : Signing Transactions（签名交易）

> DSA : Digital Signature Algorithm 数字签名算法

> Public Key : Is derived from private key.Anyone can "see" it,and use it to verify that a transaction came from you

> Singing a transaction : A "one way" process.Someone with a private key signs a transaction by their private key being hashed with their transaction data.Anyone can then verify this new transaction hash with your public key.

### 1.8 GasⅡ - Block Rewards & EIP 1559

EIP 1559 Explained : https://www.youtube.com/watch?v=MGemhK9t44Q

### 1.9 High-Level Blcokchain Fundamentals

> Nodes : A single instance in a decentralized network.

> Consensus : Is the mechanism（机制） used to agree on the state of a blockchain.

### 2.1 : Welcome to Remix!

> Remix ID（集成开发环境） : https://remix.ethereum.org/

### 2.2 : Setting Up Your First Contract

```sol
// SPDX-License-Identifier:  MIT
// 上面一行内容是可选的，但不写的话有些编译器会出警告，它定义 是 license 和代码分享规则；MIT 是限制 License 最少的协议之一👆
pragma solidity ^0.8.7; // pragma(编译指示；编译附注)；"^"表示任何比0.8.7高的版本都适合当前的代码
pragma solidity >= 0.8.7 < 0.9.0; // 任何大于等于8.7，小于9.0的版本都适合当前代码

contract SimpleStorage{

} // 该标签告诉solidity后面是定义的合约

```

### 2.3 : Basic Solidity Types

> Basic Types :
>
> - boolean : true / false
> - unit : 表示无符号正整数,可以决定给变量分配多少 bits（Byte = 8 bit），默认是 256，也可以跟 8。[Bits vs Bytes as Fast As Possible](https://www.youtube.com/watch?v=Dnd28lQHquU)
> - int : 类似于 uint，后面也可以分配大小。
> - address : 钱包地址
> - bytes : 后面可以跟 32，代表给变量分配了多少 Bytes，跟字符串类似。

### 2.4 : Basic Solidity Functions

> "Functions" or "Methods" : 能够调用并执行某些操的的一块封包代码。

```sol
contract SimpleStorage {
   uint256 public favoriteNumber;

   function store(uint256 _favoriteNumber) public {
      favoriteNumber = _favoriteNumber;
   }

   // view, pure 这两个关键词不消耗 Gas，但是 pure 不能读取区块链的状态。
   function retrieve() public view returns(uint256){
      return favoriteNumber;
   }

   function add() public pure {
      return(1+1);
   }
}
```

每一次改变区块链的状态，都会发送交易。
函数中的操作越多，消耗的 Gas 就越多。

### 2.5 : Basic Solidity Arrays & Structs(结构体)

```sol
// struct 类似于工厂函数。
struct People {
   uint256 favoriteNumber;
   string name;
}

People public person = People ({
   favoriteNumber: 2,
   name: 'Tony'
})

// unit256[] public favoriteNumbersList; --> 这样favoriteNumbersList 就是一个数组了。
// 如果 People[3] --> 这样就将 People 数组大小限定为 3 个了，当 [] 为空时，数组可以任意大小。
People[] public people;

 function addPerson(string memory _name, unit256 _favoriteNumber) public {
   // 向 people 中 push 一个新 People
   People memroy newPerson = People ({
      favoriteNumber: _favoriteNumber,
      name: _name
   })
   people.push(newPerson);
   // 或者直接写成 people.push(People(_favoriteNumber, _name)); 这样就不用写 memroy 了。
 }
```

### 2.6 : Errors & Warnings

一些建议~

### 2.7 : Memory, Storage, & Calldata(Intro)

> memroy 和 calldata 类型的变量，只是当某个函数被调用时，暂时的存储在内存中；memroy 存储的临时变量可以被修改，而 calldata 存储的临时变量不可以被修改。

> storage 类型的变量即使在函数执行结束后也可以在函数外进行调用，存储的是可以被修改的永久变量。

### 2.8 : Basic Solidity Mappings

> Mapping（映射） : 是一种数据结构，其中的每一个值都对应着唯一的 key（键），其实就是键值对;当创建映射时，会首先把所有数据都初始化为 0。

```sol

mapping(string => uint256) public nameToFavoriteNumber;
 function addPerson(string memory _name, unit256 _favoriteNumber) public {
   people.push(People(_favoriteNumber, _name));
   nameToFavoriteNumber[_name] = _favoriteNumber;
 }
```

### 2.9 : Develop your Fitst Contract

insufficient funds ~

### 2.10 : The EVM & A Recap of Lesson 2

> EVM : Ethereum Virtual Machine.是一种将智能合约部署到以太坊的标准；任何执行 EVM 标准的区块链，我们都可以把 solidity 代码部署上去，例如 ：Avalanche， Fanton， Polygon。

### 3.1 : Remix Storage Factory

### 3.2 : Importing Contracts into other Contracts

```sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SimpleStorage.sol";

contract StorageFactory{
   SimpleStorage public simpleStorage;
   // 类型是 SimpleStorage contract，可见性是 public，变量名是 simplestorage。因为上面引入了用 contract 关键字定义的 SimpleStorage 合同（这一步就是生成一个全局变量，名字叫 simplestorage，跟前几节课学的声明变量意思差不多），详情参考 https://stackoverflow.com/questions/71550258/what-is-this-solidity-variable-type?newreg=59643602469e46b2a3c952a62f7eb7e0
   SimpleStorage[] public simpleStorageArray;
   // 这样每次生成的合同，就会存在数组里，而不是像上一个定义的变量，每次生成一个新的合同都会替换之前的合同。

   function createSimpleStorageContract() public {
      simpleStorage = new SimpleStorage();

      SimpleStorage simpleStorage = new SimpleStorage();
      // 第一个是，用 SimpleStorage 将其存作为一个 memory variable 来存储，然后新 new 一个 simpleStorage 实例，然后就能用下一行代码把它 push 进 simpleStorageArray 里面了，就类似于前些课程讲的创建数组，并且往里面 push 东西类似。
      simpleStorageArray.push(simpleStorage);
   }
}
```

### 3.3 : Interacting with other Contracts

bookmark : 2023-03-22 今天是真的干累了，明天开始，继续学习！！！从 3:16:36 接着听！！！👺
bookmark : 2023-03-23 虽然没咋听，但是逐渐上道了，并且还顺利的将 remixd 接入到本地 fs ~ 干了兄弟们！
