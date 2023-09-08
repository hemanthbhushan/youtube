pragma solidity ^0.8.0;

import {AxelarExecutable} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
import {IAxelarGateway} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TwoWayMP is AxelarExecutable, Ownable {
    IAxelarGasService public immutable gasService;
    string public message;

    constructor(
        address gateway_,
        address gasService_ 
    ) AxelarExecutable(gateway_) {
        gasService = IAxelarGasService(gasService_);
    }

    //this for source chain
    function sendMessage(
        string calldata destinationChain,
        string calldata destinationAddress,
        string calldata message_
    ) external payable {
        bytes memory payload = abi.encode(message_);
        gasService.payNativeGasForContractCall{value: msg.value}(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );

        gateway.callContract(destinationChain, destinationAddress, payload);
    }

    //for destination chain

    function _execute(
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload_
    ) internal override {
        (message) = abi.decode(payload_, (string));
        //if the message received from the source chain hello it will respond with hii
        if (keccak256(abi.encode(message)) == keccak256(abi.encode("hello"))) {
            gateway.callContract(
                sourceChain,
                sourceAddress,
                abi.encode("hiii")
            );
        }
    }
}

//matic 0xE8790107F7b025A45324b675e46fF6992eD4479B
//bsc 0xB3D3817B98e515054eFb008Bba4879Ec2eD0974f