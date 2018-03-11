const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const provider = ganache.provider();
const web3 = new Web3(provider);
const {interface, bytecode} = require("../compile");

let lottery;
let accounts;

beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({data:bytecode})
      .send({from:accounts[0], gas:"1000000"});
});

describe("Lottery Contract", ()=>{
   it("deploys a contract", ()=>{
       assert.ok(lottery.options.address);
   });
   it("allows one account to enter", async () =>{
       await lottery.methods.enter().send({
           from: accounts[0],
           value: web3.utils.toWei("0.02", "ether")
       });

       const players = await lottery.methods.getPlayers().call({
          from: accounts[0] 
       });
       assert.equal(accounts[0], players[0]);
       assert.equal(1, players.length);
   });
   it("allows multiple accounts to enter", async () =>{
       await lottery.methods.enter().send({
           from: accounts[0],
           value: web3.utils.toWei("0.02", "ether")
       });
       await lottery.methods.enter().send({
           from: accounts[1],
           value: web3.utils.toWei("0.02", "ether")
       });       
       await lottery.methods.enter().send({
           from: accounts[2],
           value: web3.utils.toWei("0.02", "ether")
       });

       const players = await lottery.methods.getPlayers().call({
          from: accounts[0] 
       });
       assert.equal(accounts[0], players[0]);
       assert.equal(accounts[1], players[1]);
       assert.equal(accounts[2], players[2]);
       assert.equal(3, players.length);
   });
   
   it("requires a minimum amout of ether to enter", async() =>{
      try{
          await lottery.methods.enter().send({
              from: accounts[0],
              value: 200
          }); 
          //sending 200 wei is expected to be wrong, so there should be an error if 
          //no error happens. a little bit cofusing here
          assert(false);
      } catch(err){
          assert(err);
      }
   });
   
   it("only manager can call pickWinner", async() => {
       try{
           await lottery.methods.pickWinner().send({
               //send from someone other than the manager
              from: accounts[1] 
           });
           assert(false); //same logic as above
       } catch(err){
           assert(err);
       }
   });
   
   it("sends money to the winner and resets the players array", async()=>{
       //to simplify, only enter one player into the array
       await lottery.methods.enter().send({
          from: accounts[0], 
          value: web3.utils.toWei("2","ether")
       });
       
       const initialBalance = await web3.eth.getBalance(accounts[0]);
       //pickWinner is expected to send the money back to him
       await lottery.methods.pickWinner().send({from: accounts[0]});
       const finalBalance = await web3.eth.getBalance(accounts[0]);
       // the different is not expected to be exactly 2 becasue there is gas
       // so the difference will be slightly less than 2 ether
       const difference = finalBalance - initialBalance;
       // 1.8 is safe considering gas.
       assert(difference > web3.utils.toWei("1.8", "ether"))
   });
});