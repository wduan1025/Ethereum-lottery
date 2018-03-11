# Ethereum-lottery
### 简述
这是一个简单的抽彩票游戏，基于智能合约实现。游戏中的manager将智能合约部署到Rinkeby测试网络中的一个节点上，玩家可以通过投入不低于一定金额的参与游戏。由manager在任意时机随机挑选一个玩家，将彩票池中所有的ETH送给他。之后player列表清空，开始新的一轮游戏
### 运行
1.在本地测试:npm run test
2.在Rinkeby上部署: 在mnemonic中输入自己在测试网络中的助计词，然后在命令行中输入node deploy.js
### 安装依赖包的注意事项
node的版本应该为8.xx及以上
