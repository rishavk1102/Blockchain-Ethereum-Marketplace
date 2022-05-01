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
        address payable owner;
        bool purchased;
    }

    //Creating an event for product created
    event ProductCreated(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
        bool purchased
    );

    // Creating an event for product purchased
    event ProductPurchased(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
        bool purchased
    );

    // public constructor
    constructor() public {
        name = "Learning Marketplace";
    }

    // function to create a product
    function createProduct(string memory _name, uint256 _price) public {
        // Make sure parametres are correct
        // Parametre validation
        // Checking if name actually has some value stored in it
        require(bytes(_name).length > 0);
        // checking if price is greater than 0
        require(_price > 0);

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

    // function to purchase a product
    function purchaseProduct(uint256 _id) public payable {
        // Fetch the product
        Product memory _product = products[_id];
        // Fetch the owner
        address payable _seller = _product.owner;
        // Make sure the product has valid id
        require(_product.id > 0 && _product.id <= productCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price);
        // Require that the prouct has not been purchased already
        require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Purchase it - Transfer the ownership to the buyer
        _product.owner = msg.sender;
        // Mark as purchased
        _product.purchased = true;
        // Update the product
        products[_id] = _product;
        // Pay the seller by sending them ether
        // IMP
        address(_seller).transfer(msg.value);
        // Trigger an event
        emit ProductPurchased(
            productCount,
            _product.name,
            _product.price,
            msg.sender,
            true
        );
    }
}
