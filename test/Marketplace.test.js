const { assert } = require("chai");
const Web3 = require("web3");

const Marketplace = artifacts.require("./src/Marketplace.sol");

const web3 = new Web3();

contract("Marketplace", (accounts) => {
  let marketplace;

  before(async () => {
    marketplace = await Marketplace.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await marketplace.address;
      assert.notEqual(address, "0x0");
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("it has a name", async () => {
      const name = await marketplace.name();
      assert.equal(name, "Learning Marketplace");
    });
  });

  describe("products", async () => {
    let result, productCount;

    before(async () => {
      result = await marketplace.createProduct(
        "iPhone 13",
        web3.utils.toWei("1", "ether")
      );
      productCount = await marketplace.productCount();
    });

    it("creates product", async () => {
      //SUCCESS
      assert.equal(productCount, 1);
      const event = result.logs[0].args;

      console.log(event);
    });
  });
});
