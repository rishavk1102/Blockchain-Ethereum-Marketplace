const { assert } = require("chai");
const Web3 = require("web3");

require("chai")
  .use(require("chai-as-promised"))
  .should();

const Marketplace = artifacts.require("./src/Marketplace.sol");

const web3 = new Web3();

contract("Marketplace", ([deployer, seller, buyer]) => {
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
        web3.utils.toWei("1", "ether"),
        // adding metadata - sender
        { from: seller }
      );
      productCount = await marketplace.productCount();
    });

    it("creates product", async () => {
      // SUCCESS
      assert.equal(productCount, 1);
      const event = result.logs[0].args;

      assert.equal(
        event.id.toNumber(),
        productCount.toNumber(),
        "id is correct"
      );
      assert.equal(event.owner, seller, "owner is correct");

      // FAILURE
      // Product must have a name
      await await marketplace.createProduct(
        "",
        web3.utils.toWei("1", "ether"),
        { from: seller }
      ).should.be.rejected;
      // Product must have a price
      await await marketplace.createProduct("iPhone X", 0, { from: seller })
        .should.be.rejected;
    });

    it("lists products", async () => {
      const product = await marketplace.products(productCount);

      assert.equal(
        product.id.toNumber(),
        productCount.toNumber(),
        "id is correct"
      );
    });
  });
});
