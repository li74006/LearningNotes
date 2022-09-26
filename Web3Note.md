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
}
```
