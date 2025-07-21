// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract EnsClone {
    mapping(string => address) private s_nameToAddress;

    error EnsClone__NotAnOwner();
    error EnsClone__NotAvailable();

    event Registerd(string indexed name, address indexed owner);
    event nameDeleted(string indexed name, address indexed owner);
    event nameUpdated(
        string indexed oldName,
        string indexed newName,
        address indexed owner
    );

    modifier onlyOwner(string memory _name) {
        if (s_nameToAddress[_name] != msg.sender) revert EnsClone__NotAnOwner();
        _;
    }

    function register(string calldata _name) external {
        if (s_nameToAddress[_name] != address(0))
            revert EnsClone__NotAvailable();
        s_nameToAddress[_name] = msg.sender;
        emit Registerd(_name, msg.sender);
    }

    function update(
        string calldata _oldName,
        string calldata _newName
    ) external onlyOwner(_oldName) {
        delete s_nameToAddress[_oldName];
        s_nameToAddress[_newName] = msg.sender;
        
        emit nameUpdated(_oldName, _newName, msg.sender);
    }

    function remove(string calldata _name) external onlyOwner(_name) {
        
        delete s_nameToAddress[_name];
        emit nameDeleted(_name, msg.sender);
    }

    function getAddress(string calldata _name) external view returns(address){
        return s_nameToAddress[_name];
    }
}
