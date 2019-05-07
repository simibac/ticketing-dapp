var EventFactory = artifacts.require("./EventFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(EventFactory);
};
