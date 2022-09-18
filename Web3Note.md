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
