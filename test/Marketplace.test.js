const { assert } = require("chai")

const Marketplace = artifacts.require('./src/Marketplace.sol')

contract('Marketplace', accounts => {
    let marketplace

    before(async () => {
        marketplace = await Marketplace.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await marketplace.address
            assert.notEqual(address, '0x0')
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('it has a name', async () => {
            const name = await marketplace.name()
            assert.equal(name, 'Learning Marketplace')
        })
    })
})