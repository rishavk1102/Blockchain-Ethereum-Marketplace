pragma solidity ^0.5.0;

contract Marketplace {
    // Global Variables
    // public string variable
    string public name;

    // public initialized int
    uint256 public productCount = 0;

    // Mapping - Int and product key-value pairs = like map
    mapping(uint256 => Product) public products;

    // Class product
    struct Product {
        uint256 id;
        string name;
        uint256 price;
        address owner;
        bool purchased;
    }

    //Creating an event for product created
    event ProductCreated(
        uint256 id,
        string name,
        uint256 price,
        address owner,
        bool purchased
    );

    // public constructor
    constructor() public {
        name = "Learning Marketplace";
    }

    // function to create a product
    function createProduct(string memory _name, uint256 _price) public {
        // Make sure parametres are correct
        // Create the product

        // Increment productCount
        productCount++;

        //Creating the product
        products[productCount] = Product(
            productCount,
            _name,
            _price,
            msg.sender,
            false
        );

        // Trigger an event
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }
}
