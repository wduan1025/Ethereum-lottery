const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const {interface, bytecode} = require("./compile");

const provider = new HDWalletProvider(
    "item choice genius crisp youth bridge live crop coffee typical universe leg",
    "https://rinkeby.infura.io/IM8GjYmXlQZCY3LMWaqm"
);

const web3 = new Web3(provider);
const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({gas: "1000000", from: accounts[0]});
    console.log("Contract deployed to", result.options.address);
};
deploy();