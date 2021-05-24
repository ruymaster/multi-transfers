pragma solidity ^0.5.0;

import "./ITransferableToken.sol";
// import "@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";

contract BatchTransfer is ERC1155TokenReceiver, CommonConstants {
     using SafeMath for uint256;

    ITransferableToken public token; // Address of token contract
    address public transferOperator; // Address to manage the Transfers

    // Modifiers
    modifier onlyOperator() {
        require(
            msg.sender == transferOperator,
            "Only operator can call this function."
        );
        _;
    }


    constructor(address _token)
    public
    {
        token = ITransferableToken(_token);
        transferOperator = msg.sender;
    }


    // Events
    event NewOperator(address transferOperator);
    event WithdrawToken(address indexed owner, uint256 stakeAmount);

    function updateOperator(address newOperator) public onlyOperator {

        require(newOperator != address(0), "Invalid operator address");
        
        transferOperator = newOperator;

        emit NewOperator(newOperator);
    }

    // To withdraw tokens from contract, to deposit directly transfer to the contract
    function withdrawToken(uint256 tokenId, uint256 value, bytes memory _data) public onlyOperator
    {
        // Check if contract is having required balance
        require(token.balanceOf(address(this), tokenId) >= value, "Not enough balance in the contract");
        token.safeTransferFrom(address(this), msg.sender, tokenId, value, _data);
        emit WithdrawToken(msg.sender, value);
    }

    // To transfer tokens from Contract to the provided list of token holders with respective amount
    function batchTransfer(address[] calldata tokenHolders, uint256[] calldata amounts, uint256 tokenId, bytes calldata  _data) 
    external 
    onlyOperator
    {
        require(tokenHolders.length == amounts.length, "Invalid input parameters");
        uint256 total = 0;
        for (uint256 i = 0; i < amounts.length; i++)
            total += amounts[i];
        require(token.balanceOf(address(this), tokenId) >= total, "Insufficient balance");    
        for(uint256 indx = 0; indx < tokenHolders.length; indx++) {
            token.safeTransferFrom(address(this), tokenHolders[indx], tokenId, amounts[indx], _data);
        }
    }

    function onERC1155Received(address _operator, address _from, uint256 _id, uint256 _value, bytes calldata _data) external returns(bytes4)
    {
        return ERC1155_ACCEPTED;
    }

    function onERC1155BatchReceived(address _operator, address _from, uint256[] calldata _ids, uint256[] calldata _values, bytes calldata _data) external returns(bytes4)
    {

    }
}