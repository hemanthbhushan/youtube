pragma solidity ^0.8.0;

import { AxelarExecutable } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { IAxelarGateway } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GeneralMP is AxelarExecutable, Ownable{

    IAxelarGasService public immutable gasService;
    string public message;
    mapping (address => bool) public trusted;
    // uint256 public tokens;

    constructor(address gateway_, address gasService_) AxelarExecutable(gateway_){
        gasService = IAxelarGasService(gasService_);
    }

    function trustReceiver(address _contract, bool _trust) public onlyOwner{
        trusted[_contract] = _trust;
    }

    function sendMessage(
        string calldata destinationChain,
        string calldata destinationAddress,
        string calldata message_
    ) external payable {
        bytes memory payload = abi.encode(1, message_);
        gasService.payNativeGasForContractCall{value: msg.value}(address(this), destinationChain, destinationAddress, payload, msg.sender);

        gateway.callContract(destinationChain, destinationAddress, payload);
    }

    function sendMintInstruction(
        string calldata destinationChain,
        string calldata destinationAddress,
        address _to,
        uint256 _tokens,
        address token
    ) external payable {
        bytes memory payload = abi.encode(2, _to, _tokens, token, address(msg.sender));
        gasService.payNativeGasForContractCall{value: msg.value}(address(this), destinationChain, destinationAddress, payload, msg.sender);

        gateway.callContract(destinationChain, destinationAddress, payload);
    }

    function _execute(
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload_
    ) internal override{
        uint action;
        address to;
        uint256 tokens;
        address token;
        address from;
        (action) = abi.decode(payload_, (uint));

        if(action == 1){
            ( ,message) = abi.decode(payload_, (uint,string));
        }
        else if(action == 2){
            (, to, tokens, token, from) = abi.decode(payload_, (uint, address, uint256, address, address));
            require(trusted[from],"Not Whitelisted Source Address");
            IERC20 erc20 = IERC20(token);
            erc20.mint(to, tokens);
        }
    }

}