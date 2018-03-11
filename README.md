# Ethereum-lottery
### 简述
这是一个简单的抽彩票游戏，基于智能合约实现。游戏中的manager将智能合约部署到Rinkeby测试网络中的一个节点上，玩家可以通过投入不低于0.01ETH的金额参与游戏。由manager在任意时机pickWinner,即随机挑选一个玩家，将彩票池中所有的ETH送给他。之后player列表清空，开始新的一轮游戏
## 安装依赖包的注意事项
node的版本应该为8.xx及以上
