const web3 = new Web3(Web3.givenProvider || "http://localhost:5501");
let durianContract;
let recordContract;

// function myFunction() {
//         const farmerName = document.getElementById("farmerName").value;
//         window.alert(farmerName);
// }

let account;

const accessToMetamask = async () => {
        if (window.ethereum !== "undefined") {
                const accounts = await ethereum.request({ method: "eth_requestAccounts" });
                account = accounts[0];


                // Add the following lines to check if the user is on the correct page
                if (window.location.href === "YOUR_PAGE_URL_HERE") {
                        const allowedAccount = "YOUR_ALLOWED_ACCOUNT_ADDRESS_HERE";
                        if (account !== allowedAccount) {
                                alert("Sorry, you are not authorized to access this page.");
                                window.location.href = "YOUR_DEFAULT_URL_HERE";
                        }
                }
        }
}



//2- connect to smart contract
const accessToContract = async () => {
        const ABI_Durian = [
                {
                        "inputs": [
                                {
                                        "internalType": "string",
                                        "name": "_companyName",
                                        "type": "string"
                                }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "constructor"
                },
                {
                        "anonymous": false,
                        "inputs": [
                                {
                                        "indexed": false,
                                        "internalType": "uint8",
                                        "name": "status",
                                        "type": "uint8"
                                }
                        ],
                        "name": "LoginEvent",
                        "type": "event"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "_distributorAddress",
                                        "type": "address"
                                },
                                {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                }
                        ],
                        "name": "addDistributor",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                },
                                {
                                        "internalType": "string",
                                        "name": "location",
                                        "type": "string"
                                },
                                {
                                        "internalType": "uint16",
                                        "name": "size",
                                        "type": "uint16"
                                },
                                {
                                        "internalType": "uint16",
                                        "name": "num",
                                        "type": "uint16"
                                }
                        ],
                        "name": "addFarm",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "_farmerAddress",
                                        "type": "address"
                                },
                                {
                                        "internalType": "string",
                                        "name": "_farmerName",
                                        "type": "string"
                                },
                                {
                                        "internalType": "string",
                                        "name": "_farmID",
                                        "type": "string"
                                }
                        ],
                        "name": "addFarmer",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "retailerAddress",
                                        "type": "address"
                                },
                                {
                                        "internalType": "string",
                                        "name": "retailerName",
                                        "type": "string"
                                },
                                {
                                        "internalType": "string",
                                        "name": "retailerLocation",
                                        "type": "string"
                                }
                        ],
                        "name": "addRetailer",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "consumerCount",
                        "outputs": [
                                {
                                        "internalType": "uint8",
                                        "name": "",
                                        "type": "uint8"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "uint256",
                                        "name": "",
                                        "type": "uint256"
                                }
                        ],
                        "name": "consumerList",
                        "outputs": [
                                {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                }
                        ],
                        "name": "consumers",
                        "outputs": [
                                {
                                        "internalType": "address",
                                        "name": "consumerAddress",
                                        "type": "address"
                                },
                                {
                                        "internalType": "string",
                                        "name": "consumerName",
                                        "type": "string"
                                },
                                {
                                        "internalType": "enum DurianContract.UserState",
                                        "name": "userState",
                                        "type": "uint8"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "userAddress",
                                        "type": "address"
                                }
                        ],
                        "name": "deactivateAccount",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "distributorCount",
                        "outputs": [
                                {
                                        "internalType": "uint8",
                                        "name": "",
                                        "type": "uint8"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "uint256",
                                        "name": "",
                                        "type": "uint256"
                                }
                        ],
                        "name": "distributorList",
                        "outputs": [
                                {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                }
                        ],
                        "name": "distributors",
                        "outputs": [
                                {
                                        "internalType": "address",
                                        "name": "distributorAddress",
                                        "type": "address"
                                },
                                {
                                        "internalType": "string",
                                        "name": "distributorName",
                                        "type": "string"
                                },
                                {
                                        "internalType": "enum DurianContract.UserState",
                                        "name": "userState",
                                        "type": "uint8"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "string",
                                        "name": "",
                                        "type": "string"
                                }
                        ],
                        "name": "durianBatch",
                        "outputs": [
                                {
                                        "internalType": "string",
                                        "name": "batchID",
                                        "type": "string"
                                },
                                {
                                        "internalType": "uint256",
                                        "name": "harvestDate",
                                        "type": "uint256"
                                },
                                {
                                        "internalType": "string",
                                        "name": "durianType",
                                        "type": "string"
                                },
                                {
                                        "internalType": "uint16",
                                        "name": "weightInKg",
                                        "type": "uint16"
                                },
                                {
                                        "internalType": "string",
                                        "name": "farmID",
                                        "type": "string"
                                },
                                {
                                        "internalType": "enum DurianContract.DurianStatus",
                                        "name": "durianStatus",
                                        "type": "uint8"
                                },
                                {
                                        "internalType": "uint256",
                                        "name": "arriveAtDistributorTime",
                                        "type": "uint256"
                                },
                                {
                                        "internalType": "address",
                                        "name": "distributorAddress",
                                        "type": "address"
                                },
                                {
                                        "components": [
                                                {
                                                        "internalType": "uint8",
                                                        "name": "taste",
                                                        "type": "uint8"
                                                },
                                                {
                                                        "internalType": "uint8",
                                                        "name": "fragnance",
                                                        "type": "uint8"
                                                },
                                                {
                                                        "internalType": "uint8",
                                                        "name": "creaminess",
                                                        "type": "uint8"
                                                },
                                                {
                                                        "internalType": "address",
                                                        "name": "rateBy",
                                                        "type": "address"
                                                },
                                                {
                                                        "internalType": "uint8",
                                                        "name": "rateCount",
                                                        "type": "uint8"
                                                }
                                        ],
                                        "internalType": "struct DurianContract.Rating",
                                        "name": "rating",
                                        "type": "tuple"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "durianBatchCount",
                        "outputs": [
                                {
                                        "internalType": "uint8",
                                        "name": "",
                                        "type": "uint8"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "uint256",
                                        "name": "",
                                        "type": "uint256"
                                }
                        ],
                        "name": "durianList",
                        "outputs": [
                                {
                                        "internalType": "string",
                                        "name": "",
                                        "type": "string"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "string",
                                        "name": "",
                                        "type": "string"
                                }
                        ],
                        "name": "durianRetailer",
                        "outputs": [
                                {
                                        "internalType": "string",
                                        "name": "batchID",
                                        "type": "string"
                                },
                                {
                                        "internalType": "address",
                                        "name": "retailerAddress",
                                        "type": "address"
                                },
                                {
                                        "internalType": "uint256",
                                        "name": "arriveAtRetailerTime",
                                        "type": "uint256"
                                },
                                {
                                        "internalType": "uint16",
                                        "name": "distributedWeight",
                                        "type": "uint16"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "string",
                                        "name": "id",
                                        "type": "string"
                                },
                                {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                },
                                {
                                        "internalType": "string",
                                        "name": "location",
                                        "type": "string"
                                },
                                {
                                        "internalType": "uint16",
                                        "name": "size",
                                        "type": "uint16"
                                },
                                {
                                        "internalType": "uint16",
                                        "name": "num",
                                        "type": "uint16"
                                }
                        ],
                        "name": "editFarm",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "farmCount",
                        "outputs": [
                                {
                                        "internalType": "uint8",
                                        "name": "",
                                        "type": "uint8"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "uint256",
                                        "name": "",
                                        "type": "uint256"
                                }
                        ],
                        "name": "farmList",
                        "outputs": [
                                {
                                        "internalType": "string",
                                        "name": "",
                                        "type": "string"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "string",
                                        "name": "",
                                        "type": "string"
                                },
                                {
                                        "internalType": "uint256",
                                        "name": "",
                                        "type": "uint256"
                                }
                        ],
                        "name": "farmWorkers",
                        "outputs": [
                                {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "farmerCount",
                        "outputs": [
                                {
                                        "internalType": "uint8",
                                        "name": "",
                                        "type": "uint8"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "uint256",
                                        "name": "",
                                        "type": "uint256"
                                }
                        ],
                        "name": "farmerList",
                        "outputs": [
                                {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                }
                        ],
                        "name": "farmers",
                        "outputs": [
                                {
                                        "internalType": "address",
                                        "name": "farmerAddress",
                                        "type": "address"
                                },
                                {
                                        "internalType": "string",
                                        "name": "farmerName",
                                        "type": "string"
                                },
                                {
                                        "internalType": "enum DurianContract.UserState",
                                        "name": "userState",
                                        "type": "uint8"
                                },
                                {
                                        "internalType": "string",
                                        "name": "farmID",
                                        "type": "string"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "string",
                                        "name": "",
                                        "type": "string"
                                }
                        ],
                        "name": "farms",
                        "outputs": [
                                {
                                        "internalType": "string",
                                        "name": "farmID",
                                        "type": "string"
                                },
                                {
                                        "internalType": "string",
                                        "name": "farmName",
                                        "type": "string"
                                },
                                {
                                        "internalType": "string",
                                        "name": "farmLocation",
                                        "type": "string"
                                },
                                {
                                        "internalType": "uint16",
                                        "name": "farmSize",
                                        "type": "uint16"
                                },
                                {
                                        "internalType": "uint16",
                                        "name": "numOfWorkers",
                                        "type": "uint16"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "getConsumerList",
                        "outputs": [
                                {
                                        "internalType": "address[]",
                                        "name": "",
                                        "type": "address[]"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "getDistributorList",
                        "outputs": [
                                {
                                        "internalType": "address[]",
                                        "name": "",
                                        "type": "address[]"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "getDurianList",
                        "outputs": [
                                {
                                        "internalType": "string[]",
                                        "name": "",
                                        "type": "string[]"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "getFarmList",
                        "outputs": [
                                {
                                        "internalType": "string[]",
                                        "name": "",
                                        "type": "string[]"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "getFarmerList",
                        "outputs": [
                                {
                                        "internalType": "address[]",
                                        "name": "",
                                        "type": "address[]"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "getRetailerList",
                        "outputs": [
                                {
                                        "internalType": "address[]",
                                        "name": "",
                                        "type": "address[]"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "userAddress",
                                        "type": "address"
                                },
                                {
                                        "internalType": "string",
                                        "name": "user",
                                        "type": "string"
                                }
                        ],
                        "name": "login",
                        "outputs": [
                                {
                                        "internalType": "uint8",
                                        "name": "",
                                        "type": "uint8"
                                }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "userAddress",
                                        "type": "address"
                                }
                        ],
                        "name": "logout",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "onlyOwner",
                        "outputs": [
                                {
                                        "internalType": "bool",
                                        "name": "",
                                        "type": "bool"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                }
                        ],
                        "name": "owner",
                        "outputs": [
                                {
                                        "internalType": "address",
                                        "name": "ownerAddress",
                                        "type": "address"
                                },
                                {
                                        "internalType": "string",
                                        "name": "companyName",
                                        "type": "string"
                                },
                                {
                                        "internalType": "enum DurianContract.UserState",
                                        "name": "userState",
                                        "type": "uint8"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "string",
                                        "name": "id",
                                        "type": "string"
                                },
                                {
                                        "internalType": "uint8",
                                        "name": "tasteRate",
                                        "type": "uint8"
                                },
                                {
                                        "internalType": "uint8",
                                        "name": "fragnanceRate",
                                        "type": "uint8"
                                },
                                {
                                        "internalType": "uint8",
                                        "name": "creaminessRate",
                                        "type": "uint8"
                                }
                        ],
                        "name": "rateDurian",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "string[]",
                                        "name": "id",
                                        "type": "string[]"
                                },
                                {
                                        "internalType": "uint256",
                                        "name": "time",
                                        "type": "uint256"
                                }
                        ],
                        "name": "recordDurianFromDistributor",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "string[]",
                                        "name": "id",
                                        "type": "string[]"
                                },
                                {
                                        "internalType": "uint256",
                                        "name": "time",
                                        "type": "uint256"
                                }
                        ],
                        "name": "recordDurianFromFarmer",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "string[]",
                                        "name": "id",
                                        "type": "string[]"
                                },
                                {
                                        "internalType": "address",
                                        "name": "_retailerAddress",
                                        "type": "address"
                                },
                                {
                                        "internalType": "uint16[]",
                                        "name": "weight",
                                        "type": "uint16[]"
                                }
                        ],
                        "name": "recordDurianToRetailer",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "uint256",
                                        "name": "date",
                                        "type": "uint256"
                                },
                                {
                                        "internalType": "string",
                                        "name": "_type",
                                        "type": "string"
                                },
                                {
                                        "internalType": "uint16",
                                        "name": "weight",
                                        "type": "uint16"
                                },
                                {
                                        "internalType": "string",
                                        "name": "_farmID",
                                        "type": "string"
                                }
                        ],
                        "name": "recordHarvestDurian",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "_address",
                                        "type": "address"
                                },
                                {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                }
                        ],
                        "name": "registerConsumer",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "retailerCount",
                        "outputs": [
                                {
                                        "internalType": "uint8",
                                        "name": "",
                                        "type": "uint8"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "uint256",
                                        "name": "",
                                        "type": "uint256"
                                }
                        ],
                        "name": "retailerList",
                        "outputs": [
                                {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                }
                        ],
                        "name": "retailers",
                        "outputs": [
                                {
                                        "internalType": "address",
                                        "name": "retailerAddress",
                                        "type": "address"
                                },
                                {
                                        "internalType": "string",
                                        "name": "retailerName",
                                        "type": "string"
                                },
                                {
                                        "internalType": "string",
                                        "name": "retailerLocation",
                                        "type": "string"
                                },
                                {
                                        "internalType": "enum DurianContract.UserState",
                                        "name": "userState",
                                        "type": "uint8"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                }
        ];

        const Address_Durian = "0xeBE9Bb54278AdFCd3403BdE181031714F80C950b";

        const ABI_Record = [
                {
                        "inputs": [
                                {
                                        "internalType": "address",
                                        "name": "durianContractAddress",
                                        "type": "address"
                                }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "constructor"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "string",
                                        "name": "durianId",
                                        "type": "string"
                                }
                        ],
                        "name": "traceDurianProcess",
                        "outputs": [
                                {
                                        "components": [
                                                {
                                                        "internalType": "string",
                                                        "name": "batchID",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "uint256",
                                                        "name": "arriveAtDistributorTime",
                                                        "type": "uint256"
                                                },
                                                {
                                                        "internalType": "string",
                                                        "name": "distributorName",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "uint256",
                                                        "name": "arriveAtRetailerTime",
                                                        "type": "uint256"
                                                },
                                                {
                                                        "internalType": "string",
                                                        "name": "retailerName",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "string",
                                                        "name": "retailerLocation",
                                                        "type": "string"
                                                }
                                        ],
                                        "internalType": "struct RecordContract.DurianProcess",
                                        "name": "",
                                        "type": "tuple"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [
                                {
                                        "internalType": "string",
                                        "name": "durianId",
                                        "type": "string"
                                }
                        ],
                        "name": "traceDurianProvenance",
                        "outputs": [
                                {
                                        "components": [
                                                {
                                                        "internalType": "string",
                                                        "name": "batchID",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "string",
                                                        "name": "farmName",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "string",
                                                        "name": "farmLocation",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "uint256",
                                                        "name": "harvestDate",
                                                        "type": "uint256"
                                                },
                                                {
                                                        "internalType": "string",
                                                        "name": "durianType",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "uint16",
                                                        "name": "weightInKg",
                                                        "type": "uint16"
                                                },
                                                {
                                                        "components": [
                                                                {
                                                                        "internalType": "uint8",
                                                                        "name": "taste",
                                                                        "type": "uint8"
                                                                },
                                                                {
                                                                        "internalType": "uint8",
                                                                        "name": "fragnance",
                                                                        "type": "uint8"
                                                                },
                                                                {
                                                                        "internalType": "uint8",
                                                                        "name": "creaminess",
                                                                        "type": "uint8"
                                                                },
                                                                {
                                                                        "internalType": "address",
                                                                        "name": "rateBy",
                                                                        "type": "address"
                                                                },
                                                                {
                                                                        "internalType": "uint8",
                                                                        "name": "rateCount",
                                                                        "type": "uint8"
                                                                }
                                                        ],
                                                        "internalType": "struct DurianContract.Rating",
                                                        "name": "rating",
                                                        "type": "tuple"
                                                }
                                        ],
                                        "internalType": "struct RecordContract.DurianDetails",
                                        "name": "",
                                        "type": "tuple"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "viewConsumerAcc",
                        "outputs": [
                                {
                                        "components": [
                                                {
                                                        "internalType": "address",
                                                        "name": "consumerAddress",
                                                        "type": "address"
                                                },
                                                {
                                                        "internalType": "string",
                                                        "name": "consumerName",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "enum DurianContract.UserState",
                                                        "name": "userState",
                                                        "type": "uint8"
                                                }
                                        ],
                                        "internalType": "struct DurianContract.Consumer[]",
                                        "name": "",
                                        "type": "tuple[]"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "viewDistributorAcc",
                        "outputs": [
                                {
                                        "components": [
                                                {
                                                        "internalType": "address",
                                                        "name": "distributorAddress",
                                                        "type": "address"
                                                },
                                                {
                                                        "internalType": "string",
                                                        "name": "distributorName",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "enum DurianContract.UserState",
                                                        "name": "userState",
                                                        "type": "uint8"
                                                }
                                        ],
                                        "internalType": "struct DurianContract.Distributor[]",
                                        "name": "",
                                        "type": "tuple[]"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "viewDurianDetails",
                        "outputs": [
                                {
                                        "components": [
                                                {
                                                        "internalType": "string",
                                                        "name": "batchID",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "uint256",
                                                        "name": "harvestDate",
                                                        "type": "uint256"
                                                },
                                                {
                                                        "internalType": "string",
                                                        "name": "durianType",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "uint16",
                                                        "name": "weightInKg",
                                                        "type": "uint16"
                                                },
                                                {
                                                        "internalType": "string",
                                                        "name": "farmID",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "enum DurianContract.DurianStatus",
                                                        "name": "durianStatus",
                                                        "type": "uint8"
                                                },
                                                {
                                                        "internalType": "uint256",
                                                        "name": "arriveAtDistributorTime",
                                                        "type": "uint256"
                                                },
                                                {
                                                        "internalType": "address",
                                                        "name": "distributorAddress",
                                                        "type": "address"
                                                },
                                                {
                                                        "components": [
                                                                {
                                                                        "internalType": "uint8",
                                                                        "name": "taste",
                                                                        "type": "uint8"
                                                                },
                                                                {
                                                                        "internalType": "uint8",
                                                                        "name": "fragnance",
                                                                        "type": "uint8"
                                                                },
                                                                {
                                                                        "internalType": "uint8",
                                                                        "name": "creaminess",
                                                                        "type": "uint8"
                                                                },
                                                                {
                                                                        "internalType": "address",
                                                                        "name": "rateBy",
                                                                        "type": "address"
                                                                },
                                                                {
                                                                        "internalType": "uint8",
                                                                        "name": "rateCount",
                                                                        "type": "uint8"
                                                                }
                                                        ],
                                                        "internalType": "struct DurianContract.Rating",
                                                        "name": "rating",
                                                        "type": "tuple"
                                                }
                                        ],
                                        "internalType": "struct DurianContract.DurianBatch[]",
                                        "name": "",
                                        "type": "tuple[]"
                                },
                                {
                                        "components": [
                                                {
                                                        "internalType": "string",
                                                        "name": "batchID",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "address",
                                                        "name": "retailerAddress",
                                                        "type": "address"
                                                },
                                                {
                                                        "internalType": "uint256",
                                                        "name": "arriveAtRetailerTime",
                                                        "type": "uint256"
                                                },
                                                {
                                                        "internalType": "uint16",
                                                        "name": "distributedWeight",
                                                        "type": "uint16"
                                                }
                                        ],
                                        "internalType": "struct DurianContract.DurianRetailer[]",
                                        "name": "",
                                        "type": "tuple[]"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "viewFarmDetails",
                        "outputs": [
                                {
                                        "components": [
                                                {
                                                        "internalType": "string",
                                                        "name": "farmID",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "string",
                                                        "name": "farmName",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "string",
                                                        "name": "farmLocation",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "uint16",
                                                        "name": "farmSize",
                                                        "type": "uint16"
                                                },
                                                {
                                                        "internalType": "uint16",
                                                        "name": "numOfWorkers",
                                                        "type": "uint16"
                                                }
                                        ],
                                        "internalType": "struct DurianContract.Farm[]",
                                        "name": "",
                                        "type": "tuple[]"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "viewFarmerAcc",
                        "outputs": [
                                {
                                        "components": [
                                                {
                                                        "internalType": "address",
                                                        "name": "farmerAddress",
                                                        "type": "address"
                                                },
                                                {
                                                        "internalType": "string",
                                                        "name": "farmerName",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "enum DurianContract.UserState",
                                                        "name": "userState",
                                                        "type": "uint8"
                                                },
                                                {
                                                        "internalType": "string",
                                                        "name": "farmID",
                                                        "type": "string"
                                                }
                                        ],
                                        "internalType": "struct DurianContract.Farmer[]",
                                        "name": "",
                                        "type": "tuple[]"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                },
                {
                        "inputs": [],
                        "name": "viewRetailerAcc",
                        "outputs": [
                                {
                                        "components": [
                                                {
                                                        "internalType": "address",
                                                        "name": "retailerAddress",
                                                        "type": "address"
                                                },
                                                {
                                                        "internalType": "string",
                                                        "name": "retailerName",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "string",
                                                        "name": "retailerLocation",
                                                        "type": "string"
                                                },
                                                {
                                                        "internalType": "enum DurianContract.UserState",
                                                        "name": "userState",
                                                        "type": "uint8"
                                                }
                                        ],
                                        "internalType": "struct DurianContract.Retailer[]",
                                        "name": "",
                                        "type": "tuple[]"
                                }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                }
        ];

        const Address_Record = "0x2c5b20a479539ec8550Ab3B6562Fc3A1F115d5Ac";

        window.web3 = await new Web3(window.ethereum); //how to access to smart contract 

        window.contract = await new window.web3.eth.Contract(ABI_Durian, Address_Durian); //how you create an instance of that contract by using the abi and address  
        durianContract = window.contract;
        console.log(durianContract);

        window.contract = await new window.web3.eth.Contract(ABI_Record, Address_Record); //how you create an instance of that contract by using the abi and address  
        recordContract = window.contract;
        console.log(recordContract);

}

//3-read data from smart contract
const readfromContract = async () => {
        const data = await window.contract.methods.getFarm().call();
        console.log(data);
        document.getElementById("ownerProduct").innerHTML = `Owner Product information:<br> Product Name: ${data[0]},<br> Price(wei): ${data[1]} <br>Owner Address: ${data[2]}`;
        document.getElementById("dataArea0").innerHTML = data;
        // document.getElementById("dataArea1").innerHTML = data[1];
        // document.getElementById("dataArea2").innerHTML = data[2];
}

//4- buyer buy the product, transfer wei, update the ownership
const BuyerBuyProduct = async () => {
        //need to retrieve product data from the contract
        const data = await window.contract.methods.getInitialProduct().call();
        const price = data[1];
        const ownerAddress = data[2];
        await window.contract.methods.buyProduct(ownerAddress).send({ from: account, value: price });
}

//5- set new product- product name and price, owner address				
const setNewProduct = async () => {
        const ProductName = document.getElementById("Pname").value;
        const ProductPrice = document.getElementById("Pprice").value;
        await window.contract.methods.setProduct(ProductName, ProductPrice).send({ from: account });
        document.getElementById("Pname").value = "";
        document.getElementById("Pprice").value = "";
}




// Owner Function
const addNewFarmer = async () => {

        const accounts = await window.web3.eth.getAccounts();
        const currentUserAddress = accounts[0];
        console.log(`Current user address is ${currentUserAddress}`);


        const name = document.getElementById("farmerName").value;
        const address = document.getElementById("farmerAddress").value;
        const id = document.getElementById("farmerFarm").value;
        durianContract = await durianContract.methods.addFarmer(address, name, id).send({ from: currentUserAddress });
        window.alert("Farmer  : " + name +
                "\nAddress : " + address +
                "\nFarm ID : " + id + "\n\nAdded Successfully!")
        document.getElementById("farmerName").value = "";
        document.getElementById("farmerAddress").value = "";
        document.getElementById("farmerFarm").value = "";
        console.log(durianContract)
}

const addNewDistributor = async () => {
        const name = document.getElementById("distributorName").value;
        const address = document.getElementById("distributorAddress").value;
        await durianContract.methods.addDistributor(address, name).send({ from: account });
        window.alert("Distributor  : " + name +
                "\nAddress      : " + address +
                "\n\nAdded Successfully!")
        document.getElementById("distributorName").value = "";
        document.getElementById("distributorAddress").value = "";
}

const addNewRetailer = async () => {
        const name = document.getElementById("retailerName").value;
        const address = document.getElementById("retailerAddress").value;
        const location = document.getElementById("retailerLocation").value;
        await durianContract.methods.addRetailer(address, name, location).send({ from: account });
        window.alert("Retailer : " + name +
                "\nAddress  : " + address +
                "\nLocation : " + location + "\n\nAdded Successfully!")
        document.getElementById("retailerName").value = "";
        document.getElementById("retailerAddress").value = "";
        document.getElementById("retailerLocation").value = "";
}

const addNewFarm = async () => {
        const farmname = document.getElementById("farmName").value;
        const farmLocation = document.getElementById("farmLocation").value;
        const farmSize = parseInt(document.getElementById("farmSize").value);
        const farmNumOfWorkers = parseInt(document.getElementById("farmNumOfWorkers").value);
        await durianContract.methods.addFarm(farmname, farmLocation, farmSize, farmNumOfWorkers).send({ from: account });
        window.alert("Name      : " + farmname +
                "\nLocation   : " + farmLocation +
                "\nFarm Size  : " + farmSize +
                "\nNumber Of Workers : " + farmNumOfWorkers + "\n\nAdded Successfully!")
        document.getElementById("farmName").value = "";
        document.getElementById("farmLocation").value = "";
        document.getElementById("farmSize").value = "";
        document.getElementById("farmNumOfWorkers").value = "";
}

const editFarm = async () => {
        const farmID = document.getElementById("farmId").value;
        const farmname = document.getElementById("farmName").value;
        const farmLocation = document.getElementById("farmLocation").value;
        const farmSize = parseInt(document.getElementById("farmSize").value);
        const farmNumOfWorkers = parseInt(document.getElementById("farmNumOfWorkers").value);
        await durianContract.methods.editFarm(farmID, farmname, farmLocation, farmSize, farmNumOfWorkers).send({ from: account });
        window.alert("ID        : " + farmID +
                "\nName      : " + farmname +
                "\nLocation  : " + farmLocation +
                "\nFarm Size : " + farmSize +
                "\nNumber Of Workers : " + farmNumOfWorkers + "\n\nEdited Successfully!")
        document.getElementById("farmId").value = "";
        document.getElementById("farmName").value = "";
        document.getElementById("farmLocation").value = "";
        document.getElementById("farmSize").value = "";
        document.getElementById("farmNumOfWorkers").value = "";
}

const deactivateUser = async () => {
        const userAddress = document.getElementById("userAddress").value;
        await durianContract.methods.deactivateAccount(userAddress).send({ from: account });
        window.alert("ID        : " + userAddress +
                "\n\nDeactivate Account Successfully!")
        document.getElementById("userAddress").value = "";
}


//TODO: View Record

var showFarmID = true;

const validateFields7 = async () => {
        var durianHarvestDate = document.getElementById("durianHarvestDate").value;
        var durianType = document.getElementById("durianType").value;
        var durianWeight = document.getElementById("durianWeight").value;

        if (durianHarvestDate === "" || durianType === "" || durianWeight === "" || !showFarmID) {
                document.getElementById("cbutton").disabled = true;
        } else {
                document.getElementById("cbutton").disabled = false;
        }
}

// Farmer Function
const showFarmList = async () => {
        var options = await durianContract.methods.getFarmList().call();

        if (options.length !== 0) {
                // create a select element
                var selectElement = document.createElement("select");
                selectElement.setAttribute("id", "mySelect");


                // iterate over the options array and create an option element for each item
                for (var i = 0; i < options.length; i++) {
                        var option = document.createElement("option");
                        option.text = options[i];
                        option.value = options[i];
                        selectElement.add(option);
                }


                // get the div element
                var divElement = document.getElementById("farmidField");

                // add the select element to the div element
                divElement.appendChild(selectElement);

                // define a CSS class with the desired properties
                var selectClass = "my-select-class";
                var selectClassCSS = `
    padding: 10px;
    border-radius: 5px;
    background-color: #f2f2f2;
    color: #333;
`;

                // create a style element and add the CSS class to it
                var styleElement = document.createElement("style");
                styleElement.innerHTML = `.${selectClass} {${selectClassCSS}}`;
                document.head.appendChild(styleElement);

                // add the CSS class to the select element
                selectElement.classList.add(selectClass);

                showFarmID = true;
        }
        else {
                // get the div element
                var divElement = document.getElementById("farmidField");
                const error = document.createElement("p");
                error.innerHTML = "No Farm ID found. Please check your entry or try adding a new ID.";
                error.style.color = "red";
                error.style.fontFamily = "Arial";
                divElement.appendChild(error);
                showFarmID = false;
        }



}

const recordHarvestDurian = async () => {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        account = accounts[0];

        // convert the string value to uint256
        const durianHarvestDate = document.getElementById("durianHarvestDate").value;
        const timestamp = Date.parse(durianHarvestDate) / 1000;
        console.log(typeof (timestamp))
        const durianType = document.getElementById("durianType").value;
        const durianWeight = document.getElementById("durianWeight").value;


        var farmID = document.getElementById("mySelect").value;

        console.log(timestamp)
        console.log(durianType)
        console.log(durianWeight)
        console.log(farmID)

        await durianContract.methods.recordHarvestDurian(timestamp, durianType, durianWeight, farmID).send({ from: account });
        window.alert("Durian Harvest Date : " + durianHarvestDate +
                "\nDurianType          : " + durianType +
                "\nDurianWeight        : " + durianWeight +
                "\nFarmID              : " + farmID + "\n\nAdded Successfully!")
        document.getElementById("durianHarvestDate").value = "";
        document.getElementById("durianType").value = "";
        document.getElementById("durianWeight").value = "";
        document.getElementById("farmID").value = "";
        console.log(durianContract)
        recordDurian = true;
        window.location.reload()
}

//TODO: View Record

var recordFromFarmer = true;
var recordFromDistributor = true;
var recordToRetailer = true;
var recordDurian = true;
var traceDurianRecord = true;

const validateFields = async () => {
        var distributorReceiveDurianTime = document.getElementById("distributorReceiveDurianTime").value;

        if (distributorReceiveDurianTime === "" || !recordFromFarmer) {
                document.getElementById("cbutton").disabled = true;
        } else {
                document.getElementById("cbutton").disabled = false;
        }
}

const validateFields2 = async () => {
        var distributorReceiveDurianTime = document.getElementById("retailerReceiveDurianTime").value;

        if (distributorReceiveDurianTime === "" || !recordFromDistributor) {
                document.getElementById("cbutton").disabled = true;
        } else {
                document.getElementById("cbutton").disabled = false;
        }
}

const validateFields4 = async () => {
        var retailerAddress = document.getElementById("retailerAddress").value;

        if (retailerAddress === "" || !recordToRetailer) {
                document.getElementById("cbutton").disabled = true;
        } else {
                document.getElementById("cbutton").disabled = false;
        }
}

const validateFields5 = async () => {
        var durianHarvestDate = document.getElementById("durianHarvestDate").value;
        var durianType = document.getElementById("durianType").value;
        var durianWeight = document.getElementById("durianWeight").value;

        if (durianHarvestDate === "" || durianType === "" || durianWeight === "" || !recordDurian) {
                document.getElementById("cbutton").disabled = true;
        } else {
                document.getElementById("cbutton").disabled = false;
        }
}

const validateFields6 = async () => {
        var consumerRateDurianID = document.getElementById("consumerRateDurianID").value;

        if (consumerRateDurianID === "" || !traceDurianRecord) {
                document.getElementById("traceDurianBtn").disabled = true;
        } else {
                document.getElementById("traceDurianBtn").disabled = false;
        }
}







//Distributor
const receivedFromFarmer = async () => {

        // get a reference to the table element
        var table = document.getElementById("farmerTable");
        // console.log(table)
        // console.log(table.rows.length)

        var id = [];

        // loop through all the rows in the table
        for (var i = 1; i < table.rows.length; i++) {
                // get a reference to the checkbox in this row
                var checkbox = table.rows[i].cells[5].querySelector("input[type=checkbox]");

                // check if the checkbox is checked
                if (checkbox.checked) {
                        // get the value of the batch ID from the corresponding row
                        var batchId = table.rows[i].cells[0].textContent;
                        id.push(batchId);

                }
        }

        console.log(id)

        const distributorReceiveDurianTime = new Date(document.getElementById("distributorReceiveDurianTime").value);
        console.log(distributorReceiveDurianTime)

        // Convert the distributorReceiveDurianTime value to a uint256 integer
        const timestamp = distributorReceiveDurianTime.getTime() / 1000;
        const timeUint256 = web3.utils.toBN(timestamp.toString());
        window.alert(timeUint256)
        await durianContract.methods.recordDurianFromFarmer(id, timeUint256).send({ from: account });
        window.alert("Successful");
        window.location.reload();
}

const takeDurianFromFarmer = async () => {
        const data = await durianContract.methods.getDurianList().call();
        console.log(data)
        let length = data.length;
        console.log(length)
        let value = [];
        let temp = [];
        let j = 0;
        for (let i = 0; i < length; i++) {

                temp[i] = await durianContract.methods.durianBatch(data[i]).call();
                console.log("i:" + i)
                console.log(temp[i]);
                console.log(temp[i][5])
                console.log(typeof (temp[i][5]))
                if (temp[i][5] == "0") {
                        console.log("hahaha")
                        value[j] = temp[i];
                        j++;
                }
        }
        console.log("Value \n" + value);

        const tableContainer = document.getElementById("fromFarmerTable");

        if (value.length == 0) {
                const error = document.createElement("p");
                error.innerHTML = "No records found.";
                tableContainer.appendChild(error);
                document.getElementById("cbutton").disabled = true;
                recordFromFarmer = false;
        }
        else {
                // create a new table element
                var table = document.createElement("table");
                table.id = "farmerTable";
                table.setAttribute("cellpadding", "10 2");


                // create a header row
                var headerRow = document.createElement("tr");

                // create header cells
                var headerCell1 = document.createElement("th");
                headerCell1.setAttribute("id", "farmerTableHeaderData");
                headerCell1.textContent = "Batch ID";

                var headerCell2 = document.createElement("th");
                headerCell2.setAttribute("id", "farmerTableHeaderData");
                headerCell2.textContent = "Type";

                var headerCell3 = document.createElement("th");
                headerCell3.setAttribute("id", "farmerTableHeaderData");
                headerCell3.textContent = "Harvest Date";

                var headerCell4 = document.createElement("th");
                headerCell4.setAttribute("id", "farmerTableHeaderData");
                headerCell4.textContent = "Harvest Weight (Kg)";

                var headerCell5 = document.createElement("th");
                headerCell5.setAttribute("id", "farmerTableHeaderData");
                headerCell5.textContent = "Farm ID";

                var headerCell6 = document.createElement("th");
                headerCell6.setAttribute("id", "farmerTableHeaderData");
                headerCell6.textContent = "Check";

                // append header cells to header row
                headerRow.appendChild(headerCell1);
                headerRow.appendChild(headerCell2);
                headerRow.appendChild(headerCell3);
                headerRow.appendChild(headerCell4);
                headerRow.appendChild(headerCell5);
                headerRow.appendChild(headerCell6);

                // append header row to table
                table.appendChild(headerRow);

                for (let i = 0; i < value.length; i++) {
                        // value[i] = await durianContract.methods.durianBatch(data[i]).call();
                        // console.log("i:" + i)
                        // console.log(value[i]);
                        // create a data row

                        console.log(i + ": " + value[i]);

                        var dataRow = document.createElement("tr");

                        // create data cells
                        var dataCell1 = document.createElement("td");
                        dataCell1.textContent = value[i][0];
                        console.log(value[i][0]);

                        var dataCell2 = document.createElement("td");
                        dataCell2.textContent = value[i][2];

                        let date = new Date(value[i][1] * 1000);
                        let formattedDate = date.toLocaleDateString("en-GB"); // output: "09/05/2021"
                        var dataCell3 = document.createElement("td");
                        dataCell3.textContent = formattedDate;

                        var dataCell4 = document.createElement("td");
                        dataCell4.textContent = value[i][3];

                        var dataCell5 = document.createElement("td");
                        dataCell5.textContent = value[i][4];

                        // create checkbox cell and element
                        var checkboxCell = document.createElement("td");
                        var checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        checkboxCell.appendChild(checkbox);

                        // append data cells to data row
                        dataRow.appendChild(dataCell1);
                        dataRow.appendChild(dataCell2);
                        dataRow.appendChild(dataCell3);
                        dataRow.appendChild(dataCell4);
                        dataRow.appendChild(dataCell5);
                        dataRow.appendChild(checkboxCell);

                        // append data row to table
                        table.appendChild(dataRow);
                }
                tableContainer.appendChild(table);

                recordFromFarmer = true;
        }
}


//Distributor
const sendToRetailer = async () => {

        // get a reference to the table element
        var table = document.getElementById("retailerTable");
        console.log(table)
        console.log(table.rows.length)

        var id = [];
        var weight = [];
        var continueState = true;

        // loop through all the rows in the table
        for (var i = 1; i < table.rows.length; i++) {
                // get a reference to the checkbox in this row
                var disWeight = table.rows[i].cells[5].querySelector("input[type=number]");
                var value = parseInt(disWeight.value)
                if (value !== 0) {
                        // get the value of the batch ID from the corresponding row
                        var batchId = table.rows[i].cells[0].textContent;

                        if (value > parseInt(table.rows[i].cells[4].textContent)) {
                                alert("The distributed weight cannot exceed the harvest weight!!")
                                continueState = false;
                                break;
                        }
                        id.push(batchId);
                        weight.push(value);

                }
        }
        if (continueState) {
                console.log(id)
                console.log(weight)

                const retAddress = document.getElementById("retailerAddress").value;

                console.log(id, retAddress, weight);

                await durianContract.methods.recordDurianToRetailer(id, retAddress, weight).send({ from: account });
                window.alert("Successful operation");
                window.location.reload();
                window.location.href = "../distributor.html"
        }


}

const sendDurianToRetailer = async () => {
        const data = await durianContract.methods.getDurianList().call();
        console.log(data)
        let length = data.length;
        console.log(length)
        let value = [];
        let temp = [];
        let j = 0;

        for (let i = 0; i < length; i++) {

                temp[i] = await durianContract.methods.durianBatch(data[i]).call();
                console.log("i:" + i)
                console.log(temp[i]);

                if (temp[i][5] === "1") {
                        value[i] = temp[i];

                        
                }
        }

        const tableContainer = document.getElementById("toRetailerTable");


        if (value.length == 0) {
                const error = document.createElement("p");
                error.innerHTML = "No records found.";
                //document.getElementById("tableRecord").style.fontFamily = "abel";
                // document.getElementById("tableRecord").style.border = "none";
                // document.getElementById("tableRecord").style.transform = "translate(50px)";
                // document.getElementById("tableRecord").style.fontSize = "30px";
                tableContainer.appendChild(error);
                document.getElementById("cbutton").disabled = true;
                recordToRetailer = false;
        } else {
                // document.getElementById("tableRecord").style.transform = "none";
                // create a new table element
                var table = document.createElement("table");
                table.setAttribute("id", "retailerTable");
                // table.setAttribute("class", "recorData");
                table.setAttribute("cellpadding", "10 2");

                // create a header row
                var headerRow = document.createElement("tr");

                // create header cells
                var headerCell1 = document.createElement("th");
                headerCell1.setAttribute("id", "retailerTableHeaderData");
                headerCell1.textContent = "Batch ID";

                var headerCell2 = document.createElement("th");
                headerCell2.setAttribute("id", "retailerTableHeaderData");
                headerCell2.textContent = "Type";

                var headerCell3 = document.createElement("th");
                headerCell3.setAttribute("id", "retailerTableHeaderData");
                headerCell3.textContent = "Harvest Date";

                var headerCell4 = document.createElement("th");
                headerCell4.setAttribute("id", "retailerTableHeaderData");
                headerCell4.textContent = "Farm ID";

                var headerCell5 = document.createElement("th");
                headerCell5.setAttribute("id", "retailerTableHeaderData");
                headerCell5.textContent = "Harvest Weight (Kg)";

                var headerCell6 = document.createElement("th");
                headerCell6.setAttribute("id", "retailerTableHeaderData");
                headerCell6.textContent = "Distributed Weight (Kg)";

                // append header cells to header row
                headerRow.appendChild(headerCell1);
                headerRow.appendChild(headerCell2);
                headerRow.appendChild(headerCell3);
                headerRow.appendChild(headerCell4);
                headerRow.appendChild(headerCell5);
                headerRow.appendChild(headerCell6);

                // append header row to table
                table.appendChild(headerRow);

                for (let i = 0; i < length; i++) {

                        value[i] = await durianContract.methods.durianBatch(data[i]).call();

                        console.log("i:" + i);
                        console.log(value[i]);

                        // create a data row
                        var dataRow = document.createElement("tr");

                        // create data cells
                        var dataCell1 = document.createElement("td");
                        dataCell1.textContent = value[i][0];

                        var dataCell2 = document.createElement("td");
                        dataCell2.textContent = value[i][2];

                        let date = new Date(value[i][1] * 1000);
                        let formattedDate = date.toLocaleDateString("en-GB"); // output: "09/05/2021"
                        var dataCell3 = document.createElement("td");
                        dataCell3.textContent = formattedDate;

                        var dataCell4 = document.createElement("td");
                        dataCell4.textContent = value[i][4];

                        var dataCell5 = document.createElement("td");
                        dataCell5.textContent = value[i][3];

                        // create weight cell and element
                        var weightCell = document.createElement("td");
                        var weightInput = document.createElement("input");
                        weightInput.type = "number";
                        weightInput.min = 0;
                        weightInput.max = value[i][3];
                        weightInput.value = 0;
                        weightCell.appendChild(weightInput);

                        // append data cells to data row
                        dataRow.appendChild(dataCell1);
                        dataRow.appendChild(dataCell2);
                        dataRow.appendChild(dataCell3);
                        dataRow.appendChild(dataCell4);
                        dataRow.appendChild(dataCell5);
                        dataRow.appendChild(weightCell);

                        // append data row to table
                        table.appendChild(dataRow);
                }

                tableContainer.appendChild(table);
                recordToRetailer = true;

        }
}

const receivedFromDistributor = async () => {

        // get a reference to the table element
        var table = document.getElementById("distributorTable");
        console.log(table)
        console.log(table.rows.length)

        var id = [];

        // loop through all the rows in the table
        for (var i = 1; i < table.rows.length; i++) {
                // get a reference to the checkbox in this row
                var checkbox = table.rows[i].cells[5].querySelector("input[type=checkbox]");

                // check if the checkbox is checked
                if (checkbox.checked) {
                        // get the value of the batch ID from the corresponding row
                        var batchId = table.rows[i].cells[0].textContent;
                        id.push(batchId);

                }
        }

        console.log(id)

        const distributorReceiveDurianTime = new Date(document.getElementById("retailerReceiveDurianTime").value);
        console.log(distributorReceiveDurianTime)

        // Convert the distributorReceiveDurianTime value to a uint256 integer
        const timestamp = distributorReceiveDurianTime.getTime() / 1000;
        const timeUint256 = web3.utils.toBN(timestamp.toString());
        await durianContract.methods.recordDurianFromDistributor(id, timeUint256).send({ from: account });
        window.alert("Successful record");
        // Reload the current page
        window.location.reload();
        takeDurianFromDistributor();
}

const takeDurianFromDistributor = async () => {
        const data = await durianContract.methods.getDurianList().call();
        console.log(data)
        let length = data.length;
        console.log(length)
        let value = [];
        let temp = [];
        let durianRetailer = [];
        let j = 0;


        for (let i = 0; i < length; i++) {

                temp[i] = await durianContract.methods.durianBatch(data[i]).call();


                console.log("i:" + i)
                console.log(temp[i]);

                console.log(temp[i][5]);
                if (temp[i][5] === "2") {
                        value[j] = temp[i];
                        durianRetailer[j] = await durianContract.methods.durianRetailer(data[i]).call();
                        j++;
                }
        }

        const tableContainer = document.getElementById("fromDistributorTable");


        if (length == 0) {
                const error = document.createElement("p");
                error.innerHTML = "No records found.";
                document.getElementById("tableRecord").style.fontFamily = "abel";
                // document.getElementById("tableRecord").style.border = "none";
                // document.getElementById("tableRecord").style.transform = "translate(50px)";
                // document.getElementById("tableRecord").style.fontSize = "30px";
                tableContainer.appendChild(error);
                document.getElementById("cbutton").disabled = true;
                recordFromDistributor = false;
        } else {
                // document.getElementById("tableRecord").style.transform = "none";
                // create a new table element
                var table = document.createElement("table");
                table.setAttribute("id", "distributorTable");
                // table.setAttribute("class", "recorData");
                table.setAttribute("cellpadding", "10 2");

                // create a header row
                var headerRow = document.createElement("tr");

                // create header cells
                var headerCell1 = document.createElement("th");
                headerCell1.setAttribute("id", "distributorTableHeaderData");
                headerCell1.textContent = "Batch ID";

                var headerCell2 = document.createElement("th");
                headerCell2.setAttribute("id", "distributorTableHeaderData");
                headerCell2.textContent = "Type";

                var headerCell3 = document.createElement("th");
                headerCell3.setAttribute("id", "distributorTableHeaderData");
                headerCell3.textContent = "Harvest Date";

                var headerCell4 = document.createElement("th");
                headerCell4.setAttribute("id", "distributorTableHeaderData");
                headerCell4.textContent = "Distributed Weight (Kg)";

                var headerCell5 = document.createElement("th");
                headerCell5.setAttribute("id", "distributorTableHeaderData");
                headerCell5.textContent = "Farm ID";

                var headerCell6 = document.createElement("th");
                headerCell6.setAttribute("id", "distributorTableHeaderData");
                headerCell6.textContent = "Check";

                // append header cells to header row
                headerRow.appendChild(headerCell1);
                headerRow.appendChild(headerCell2);
                headerRow.appendChild(headerCell3);
                headerRow.appendChild(headerCell4);
                headerRow.appendChild(headerCell5);
                headerRow.appendChild(headerCell6);

                // append header row to table
                table.appendChild(headerRow);

                for (let i = 0; i < value.length; i++) {

                        value[i] = await durianContract.methods.durianBatch(data[i]).call();

                        console.log("i:" + i);
                        console.log(value[i]);

                        // create a data row
                        var dataRow = document.createElement("tr");

                        // create data cells
                        var dataCell1 = document.createElement("td");
                        dataCell1.textContent = value[i][0];

                        var dataCell2 = document.createElement("td");
                        dataCell2.textContent = value[i][2];

                        let date = new Date(value[i][1] * 1000);
                        let formattedDate = date.toLocaleDateString("en-GB"); // output: "09/05/2021"
                        var dataCell3 = document.createElement("td");
                        dataCell3.textContent = formattedDate;

                        var dataCell4 = document.createElement("td");
                        dataCell4.textContent = value[i][3];

                        var dataCell5 = document.createElement("td");
                        dataCell5.textContent = value[i][4];

                        // create checkbox cell and element
                        var checkboxCell = document.createElement("td");
                        var checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        checkboxCell.appendChild(checkbox);

                        // append data cells to data row
                        dataRow.appendChild(dataCell1);
                        dataRow.appendChild(dataCell2);
                        dataRow.appendChild(dataCell3);
                        dataRow.appendChild(dataCell4);
                        dataRow.appendChild(dataCell5);
                        dataRow.appendChild(checkboxCell);

                        // append data row to table
                        table.appendChild(dataRow);
                }

                tableContainer.appendChild(table);
                recordToRetailer = true;

        }
}

//Consumer
const showDurianTable = async () => {
        var table = document.getElementById("durianTable");
        var idField = document.getElementById("consumerRateDurianID").value;
        console.log(idField)

        if (idField === "") {
                table.style.display = "none";

        }
}
const traceDurian = async () => {
        console.log("halo")
        var durianID = document.getElementById("consumerRateDurianID").value;

        const durianProvenance = await recordContract.methods.traceDurianProvenance(durianID).call();
        const durianProcess = await recordContract.methods.traceDurianProcess(durianID).call();

        var table = document.getElementById("durianTable");

        table.rows[0].cells[1].textContent = durianProvenance[0];
        let date = new Date(durianProvenance[3] * 1000);
        let formattedDate = date.toLocaleDateString("en-GB");
        table.rows[1].cells[1].textContent = formattedDate;
        table.rows[2].cells[1].textContent = durianProvenance[4];
        table.rows[3].cells[1].textContent = durianProvenance[5];
        table.rows[4].cells[1].textContent = durianProvenance[1];
        table.rows[5].cells[1].textContent = durianProvenance[2];
        date = new Date(durianProcess[1] * 1000);
        formattedDate = date.toLocaleDateString("en-GB");
        table.rows[6].cells[1].textContent = formattedDate;
        table.rows[7].cells[1].textContent = durianProcess[2];
        date = new Date(durianProcess[3] * 1000);
        formattedDate = date.toLocaleDateString("en-GB");
        table.rows[8].cells[1].textContent = formattedDate;
        table.rows[9].cells[1].textContent = durianProcess[4];
        table.rows[10].cells[1].textContent = durianProcess[5];


        var rating = "Taste rate     : " + durianProvenance[6][0] + "/5 <br>" +
                "Fragnance rate : " + durianProvenance[6][1] + "/5 <br>" +
                "Creaminess rate: " + durianProvenance[6][2] + "/5 ";
        table.rows[11].cells[1].innerHTML = rating;


        document.getElementById("durianTable").style.display = "block";
        traceDurianRecord = true;
}

const rateDurian = async () => {
        function getCreaminessRate() {
                const radioButtons = document.getElementsByName("creaminessRate");

                for (let i = 0; i < radioButtons.length; i++) {
                        if (radioButtons[i].checked) {
                                return radioButtons[i].value;
                        }
                }

                return null; // return null if no radio button is selected
        }

        const durianCreaminessRate = getCreaminessRate();

        function getFragnanceRate() {
                const radioButtons = document.getElementsByName("fragnanceRate");

                for (let i = 0; i < radioButtons.length; i++) {
                        if (radioButtons[i].checked) {
                                return radioButtons[i].value;
                        }
                }

                return null; // return null if no radio button is selected
        }

        const durianFragnanceRate = getFragnanceRate();

        function getTasteRate() {
                const radioButtons = document.getElementsByName("tasteRate");

                for (let i = 0; i < radioButtons.length; i++) {
                        if (radioButtons[i].checked) {
                                return radioButtons[i].value;
                        }
                }

                return null; // return null if no radio button is selected
        }

        const durianTasteRate = getTasteRate();


        console.log(durianTasteRate, durianFragnanceRate, durianCreaminessRate);
        const consumerRateDurianID = document.getElementById("consumerRateDurianID").value;
        await durianContract.methods.rateDurian(consumerRateDurianID, durianTasteRate, durianFragnanceRate, durianCreaminessRate).send({ from: account });
        window.alert("ID         : " + consumerRateDurianID +
                "\nTaste      : " + durianTasteRate +
                "\nFragnance  : " + durianFragnanceRate +
                "\nCreaminess : " + durianCreaminessRate + "\n\nAdded Successfully!")
        document.getElementById("consumerRateDurianID").value = "";
        document.getElementById("durianTasteRate").value = "";
        document.getElementById("durianFragnanceRate").value = "";
        document.getElementById("durianCreaminessRate").value = "";

}

const registerAccount = async () => {
        const consumerAddress = document.getElementById("consumerAddress").value;
        const consumerName = document.getElementById("consumerName").value;
        console.log(consumerAddress, consumerName);
        await durianContract.methods.registerConsumer(consumerAddress, consumerName).send({ from: account });
        window.alert("Address : " + consumerAddress +
                "\nName    : " + consumerName + "\n\nAdded Successfully!")
        document.getElementById("consumerAddress").value = "";
        document.getElementById("consumerName").value = "";

}

const farmerRecord = async () => {
        const result = await recordContract.methods.viewFarmerAcc().call();
        let length = result.length;
        let value = [];

        for (let i = 0; i < length; i++) {
                value[i] = result[i];
        }

        const tableContainer = document.getElementById("tableRecord");


        if (length == 0) {
                const error = document.createElement("p");
                error.innerHTML = "No records found.";
                document.getElementById("tableRecord").style.fontFamily = "abel";
                document.getElementById("tableRecord").style.border = "none";
                document.getElementById("tableRecord").style.transform = "translate(50px)";
                document.getElementById("tableRecord").style.fontSize = "30px";
                tableContainer.appendChild(error);
        } else {
                document.getElementById("tableRecord").style.transform = "none";
                // create a new table element
                var table = document.createElement("table");
                table.setAttribute("id", "tableData");
                table.setAttribute("class", "recorData");
                table.setAttribute("cellpadding", "10 2");

                // create a header row
                var headerRow = document.createElement("tr");

                // create header cells
                var headerCell1 = document.createElement("th");
                headerCell1.setAttribute("id", "tableHeaderData");
                headerCell1.textContent = "Address";

                var headerCell2 = document.createElement("th");
                headerCell2.setAttribute("id", "tableHeaderData");
                headerCell2.textContent = "Name";

                var headerCell3 = document.createElement("th");
                headerCell3.setAttribute("id", "tableHeaderData");
                headerCell3.textContent = "Location";

                var headerCell4 = document.createElement("th");
                headerCell4.setAttribute("id", "tableHeaderData");
                headerCell4.textContent = "User State";

                // append header cells to header row
                headerRow.appendChild(headerCell1);
                headerRow.appendChild(headerCell2);
                headerRow.appendChild(headerCell3);
                headerRow.appendChild(headerCell4);

                // append header row to table
                table.appendChild(headerRow);

                for (let i = 0; i < length; i++) {
                        value[i] = result[i];
                        console.log("i:" + i);
                        console.log(value[i]);
                        console.log(value[i][0]);
                        // create a data row
                        var dataRow = document.createElement("tr");

                        // create data cells
                        var dataCell1 = document.createElement("td");
                        dataCell1.textContent = value[i][0];

                        var dataCell2 = document.createElement("td");
                        dataCell2.textContent = value[i][1];

                        var dataCell3 = document.createElement("td");
                        dataCell3.textContent = value[i][3];

                        var dataCell4 = document.createElement("td");
                        let valueDisplay;
                        if (value[i][2] === "0") {
                                valueDisplay = "Logged In";
                        }
                        else if (value[i][2] === "1") {
                                valueDisplay = "Logged Out";
                        }
                        else if (value[i][2] === "2") {
                                valueDisplay = "Deactivated";
                        }
                        dataCell4.textContent = valueDisplay;

                        // append data cells to data row
                        dataRow.appendChild(dataCell1);
                        dataRow.appendChild(dataCell2);
                        dataRow.appendChild(dataCell3);
                        dataRow.appendChild(dataCell4);

                        // append data row to table
                        table.appendChild(dataRow);
                }

                tableContainer.appendChild(table);
                // document.getElementById("tableRecord").style.border = "1px solid black";
        }
}

const farmRecord = async () => {
        const result = await recordContract.methods.viewFarmDetails().call();
        let length = result.length;
        let value = [];

        for (let i = 0; i < length; i++) {
                value[i] = result[i];
        }

        const tableContainer = document.getElementById("tableRecord");


        if (length == 0) {
                const error = document.createElement("p");
                error.innerHTML = "No records found.";
                document.getElementById("tableRecord").style.fontFamily = "abel";
                document.getElementById("tableRecord").style.border = "none";
                document.getElementById("tableRecord").style.transform = "translate(50px)";
                document.getElementById("tableRecord").style.fontSize = "30px";
                tableContainer.appendChild(error);
        } else {
                document.getElementById("tableRecord").style.transform = "none";
                // create a new table element
                var table = document.createElement("table");
                table.setAttribute("id", "tableData");
                table.setAttribute("class", "farmerData");
                table.setAttribute("cellpadding", "10 2");

                // create a header row
                var headerRow = document.createElement("tr");

                // create header cells
                var headerCell1 = document.createElement("th");
                headerCell1.setAttribute("id", "tableHeaderData");
                headerCell1.textContent = "Farm ID";

                var headerCell2 = document.createElement("th");
                headerCell2.setAttribute("id", "tableHeaderData");
                headerCell2.textContent = "Name";

                var headerCell3 = document.createElement("th");
                headerCell3.setAttribute("id", "tableHeaderData");
                headerCell3.textContent = "Location";

                var headerCell4 = document.createElement("th");
                headerCell4.setAttribute("id", "tableHeaderData");
                headerCell4.textContent = "Size (Acres)";

                var headerCell5 = document.createElement("th");
                headerCell5.setAttribute("id", "tableHeaderData");
                headerCell5.textContent = "Number of Workers";

                // append header cells to header row
                headerRow.appendChild(headerCell1);
                headerRow.appendChild(headerCell2);
                headerRow.appendChild(headerCell3);
                headerRow.appendChild(headerCell4);
                headerRow.appendChild(headerCell5);

                // append header row to table
                table.appendChild(headerRow);

                for (let i = 0; i < length; i++) {
                        value[i] = result[i];
                        console.log("i:" + i);
                        console.log(value[i]);
                        console.log(value[i][0]);
                        // create a data row
                        var dataRow = document.createElement("tr");

                        // create data cells
                        var dataCell1 = document.createElement("td");
                        dataCell1.textContent = value[i][0];

                        var dataCell2 = document.createElement("td");
                        dataCell2.textContent = value[i][1];

                        var dataCell3 = document.createElement("td");
                        dataCell3.textContent = value[i][2];

                        var dataCell4 = document.createElement("td");
                        dataCell4.textContent = value[i][3];

                        var dataCell5 = document.createElement("td");
                        dataCell5.textContent = value[i][4];


                        // append data cells to data row
                        dataRow.appendChild(dataCell1);
                        dataRow.appendChild(dataCell2);
                        dataRow.appendChild(dataCell3);
                        dataRow.appendChild(dataCell4);
                        dataRow.appendChild(dataCell5);

                        // append data row to table
                        table.appendChild(dataRow);
                }

                tableContainer.appendChild(table);
        }
}

const farmRecordByFarmer = async () => {

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        account = accounts[0];

        const farmerAcc = await durianContract.methods.farmers(account).call();
        const farmID = farmerAcc[3];

        const farm = await durianContract.methods.farms(farmID).call();



        // const result = await recordContract.methods.viewFarmDetails().call();
        // let length = result.length;
        // let value = [];





        // for (let i = 0; i < length; i++) {
        //         value[i] = result[i];
        // }

        const tableContainer = document.getElementById("tableRecord");


        if (farm.length == 0) {
                const error = document.createElement("p");
                error.innerHTML = "No records found.";
                document.getElementById("tableRecord").style.fontFamily = "abel";
                document.getElementById("tableRecord").style.border = "none";
                document.getElementById("tableRecord").style.transform = "translate(50px)";
                document.getElementById("tableRecord").style.fontSize = "30px";
                tableContainer.appendChild(error);
        } else {
                document.getElementById("tableRecord").style.transform = "none";
                // create a new table element
                var table = document.createElement("table");
                table.setAttribute("id", "tableData");
                table.setAttribute("class", "farmerData");
                table.setAttribute("cellpadding", "10 2");

                // create a header row
                var headerRow = document.createElement("tr");

                // create header cells
                var headerCell1 = document.createElement("th");
                headerCell1.setAttribute("id", "tableHeaderData");
                headerCell1.textContent = "Farm ID";

                var headerCell2 = document.createElement("th");
                headerCell2.setAttribute("id", "tableHeaderData");
                headerCell2.textContent = "Name";

                var headerCell3 = document.createElement("th");
                headerCell3.setAttribute("id", "tableHeaderData");
                headerCell3.textContent = "Location";

                var headerCell4 = document.createElement("th");
                headerCell4.setAttribute("id", "tableHeaderData");
                headerCell4.textContent = "Size (Acres)";

                var headerCell5 = document.createElement("th");
                headerCell5.setAttribute("id", "tableHeaderData");
                headerCell5.textContent = "Number of Workers";

                // append header cells to header row
                headerRow.appendChild(headerCell1);
                headerRow.appendChild(headerCell2);
                headerRow.appendChild(headerCell3);
                headerRow.appendChild(headerCell4);
                headerRow.appendChild(headerCell5);

                // append header row to table
                table.appendChild(headerRow);


                // create a data row
                var dataRow = document.createElement("tr");

                // create data cells
                var dataCell1 = document.createElement("td");
                dataCell1.textContent = farm[0];
                var dataCell2 = document.createElement("td");
                dataCell2.textContent = farm[1];

                var dataCell3 = document.createElement("td");
                dataCell3.textContent = farm[2];
                var dataCell4 = document.createElement("td");
                dataCell4.textContent = farm[3];

                var dataCell5 = document.createElement("td");
                dataCell5.textContent = farm[4];


                // append data cells to data row
                dataRow.appendChild(dataCell1);
                dataRow.appendChild(dataCell2);
                dataRow.appendChild(dataCell3);
                dataRow.appendChild(dataCell4);
                dataRow.appendChild(dataCell5);

                // append data row to table
                table.appendChild(dataRow);
        }

        tableContainer.appendChild(table);
}


const distributorRecord = async () => {
        const result = await recordContract.methods.viewDistributorAcc().call();
        let length = result.length;
        let value = [];

        for (let i = 0; i < length; i++) {
                value[i] = result[i];
        }

        const tableContainer = document.getElementById("tableRecord");

        if (length == 0) {
                const error = document.createElement("p");
                error.innerHTML = "No records found.";
                document.getElementById("tableRecord").style.fontFamily = "abel";
                document.getElementById("tableRecord").style.border = "none";
                document.getElementById("tableRecord").style.transform = "translate(50px)";
                document.getElementById("tableRecord").style.fontSize = "30px";
                tableContainer.appendChild(error);
        } else {
                document.getElementById("tableRecord").style.transform = "none";
                // create a new table element
                var table = document.createElement("table");
                table.setAttribute("id", "tableData");
                table.setAttribute("class", "farmerData");
                table.setAttribute("cellpadding", "10 2");

                // create a header row
                var headerRow = document.createElement("tr");

                // create header cells
                var headerCell1 = document.createElement("th");
                headerCell1.setAttribute("id", "tableHeaderData");
                headerCell1.textContent = "Address";

                var headerCell2 = document.createElement("th");
                headerCell2.setAttribute("id", "tableHeaderData");
                headerCell2.textContent = "Name";

                var headerCell3 = document.createElement("th");
                headerCell3.setAttribute("id", "tableHeaderData");
                headerCell3.textContent = "User State";

                // append header cells to header row
                headerRow.appendChild(headerCell1);
                headerRow.appendChild(headerCell2);
                headerRow.appendChild(headerCell3);

                // append header row to table
                table.appendChild(headerRow);

                for (let i = 0; i < length; i++) {
                        value[i] = result[i];
                        console.log("i:" + i);
                        console.log(value[i]);
                        console.log(value[i][0]);
                        // create a data row
                        var dataRow = document.createElement("tr");

                        // create data cells
                        var dataCell1 = document.createElement("td");
                        dataCell1.textContent = value[i][0];

                        var dataCell2 = document.createElement("td");
                        dataCell2.textContent = value[i][1];

                        var dataCell3 = document.createElement("td");
                        let valueDisplay;
                        if (value[i][2] === "0") {
                                valueDisplay = "Logged In";
                        }
                        else if (value[i][2] === "1") {
                                valueDisplay = "Logged Out";
                        }
                        else if (value[i][2] === "2") {
                                valueDisplay = "Deactivated";
                        }
                        dataCell3.textContent = valueDisplay;

                        // append data cells to data row
                        dataRow.appendChild(dataCell1);
                        dataRow.appendChild(dataCell2);
                        dataRow.appendChild(dataCell3);

                        // append data row to table
                        table.appendChild(dataRow);
                }

                tableContainer.appendChild(table);
                // document.getElementById("tableRecord").style.border = "1px solid black";
        }
}

const retailerRecord = async () => {
        const result = await recordContract.methods.viewRetailerAcc().call();
        let length = result.length;
        let value = [];

        for (let i = 0; i < length; i++) {
                value[i] = result[i];
        }

        const tableContainer = document.getElementById("tableRecord");

        if (length == 0) {
                const error = document.createElement("p");
                error.innerHTML = "No records found.";
                document.getElementById("tableRecord").style.fontFamily = "abel";
                document.getElementById("tableRecord").style.border = "none";
                document.getElementById("tableRecord").style.transform = "translate(50px)";
                document.getElementById("tableRecord").style.fontSize = "30px";
                tableContainer.appendChild(error);
        } else {
                document.getElementById("tableRecord").style.transform = "none";
                // create a new table element
                var table = document.createElement("table");
                table.setAttribute("id", "tableData");
                table.setAttribute("class", "farmerData");
                table.setAttribute("cellpadding", "10 2");

                // create a header row
                var headerRow = document.createElement("tr");

                // create header cells
                var headerCell1 = document.createElement("th");
                headerCell1.setAttribute("id", "tableHeaderData");
                headerCell1.textContent = "Address";

                var headerCell2 = document.createElement("th");
                headerCell2.setAttribute("id", "tableHeaderData");
                headerCell2.textContent = "Name";

                var headerCell3 = document.createElement("th");
                headerCell3.setAttribute("id", "tableHeaderData");
                headerCell3.textContent = "Location";

                var headerCell4 = document.createElement("th");
                headerCell4.setAttribute("id", "tableHeaderData");
                headerCell4.textContent = "User State";

                // append header cells to header row
                headerRow.appendChild(headerCell1);
                headerRow.appendChild(headerCell2);
                headerRow.appendChild(headerCell3);
                headerRow.appendChild(headerCell4);

                // append header row to table
                table.appendChild(headerRow);

                for (let i = 0; i < length; i++) {
                        value[i] = result[i];
                        console.log("i:" + i);
                        console.log(value[i]);
                        console.log(value[i][0]);
                        // create a data row
                        var dataRow = document.createElement("tr");

                        // create data cells
                        var dataCell1 = document.createElement("td");
                        dataCell1.textContent = value[i][0];

                        var dataCell2 = document.createElement("td");
                        dataCell2.textContent = value[i][1];

                        var dataCell3 = document.createElement("td");
                        dataCell3.textContent = value[i][2];

                        var dataCell4 = document.createElement("td");
                        let valueDisplay;
                        if (value[i][3] === "0") {
                                valueDisplay = "Logged In";
                        }
                        else if (value[i][3] === "1") {
                                valueDisplay = "Logged Out";
                        }
                        else if (value[i][3] === "2") {
                                valueDisplay = "Deactivated";
                        }
                        dataCell4.textContent = valueDisplay;

                        // append data cells to data row
                        dataRow.appendChild(dataCell1);
                        dataRow.appendChild(dataCell2);
                        dataRow.appendChild(dataCell3);
                        dataRow.appendChild(dataCell4);

                        // append data row to table
                        table.appendChild(dataRow);
                }

                tableContainer.appendChild(table);
        }
}

const consumerRecord = async () => {
        const result = await recordContract.methods.viewConsumerAcc().call();
        let length = result.length;
        let value = [];

        for (let i = 0; i < length; i++) {
                value[i] = result[i];
        }

        const tableContainer = document.getElementById("tableRecord");

        if (length == 0) {
                const error = document.createElement("p");
                error.innerHTML = "No records found.";
                document.getElementById("tableRecord").style.fontFamily = "abel";
                document.getElementById("tableRecord").style.border = "none";
                document.getElementById("tableRecord").style.transform = "translate(50px)";
                document.getElementById("tableRecord").style.fontSize = "30px";
                tableContainer.appendChild(error);
        } else {
                document.getElementById("tableRecord").style.transform = "none";
                // create a new table element
                var table = document.createElement("table");
                table.setAttribute("id", "tableData");
                table.setAttribute("class", "farmerData");
                table.setAttribute("cellpadding", "10 2");

                // create a header row
                var headerRow = document.createElement("tr");

                // create header cells
                var headerCell1 = document.createElement("th");
                headerCell1.setAttribute("id", "tableHeaderData");
                headerCell1.textContent = "Address";

                var headerCell2 = document.createElement("th");
                headerCell2.setAttribute("id", "tableHeaderData");
                headerCell2.textContent = "Name";

                var headerCell3 = document.createElement("th");
                headerCell3.setAttribute("id", "tableHeaderData");
                headerCell3.textContent = "User State";

                // append header cells to header row
                headerRow.appendChild(headerCell1);
                headerRow.appendChild(headerCell2);
                headerRow.appendChild(headerCell3);

                // append header row to table
                table.appendChild(headerRow);

                for (let i = 0; i < length; i++) {
                        value[i] = result[i];
                        console.log("i:" + i);
                        console.log(value[i]);
                        console.log(value[i][0]);
                        // create a data row
                        var dataRow = document.createElement("tr");

                        // create data cells
                        var dataCell1 = document.createElement("td");
                        dataCell1.textContent = value[i][0];

                        var dataCell2 = document.createElement("td");
                        dataCell2.textContent = value[i][1];

                        var dataCell3 = document.createElement("td");
                        let valueDisplay;
                        if (value[i][2] === "0") {
                                valueDisplay = "Logged In";
                        }
                        else if (value[i][2] === "1") {
                                valueDisplay = "Logged Out";
                        }
                        else if (value[i][2] === "2") {
                                valueDisplay = "Deactivated";
                        }
                        dataCell3.textContent = valueDisplay;

                        // append data cells to data row
                        dataRow.appendChild(dataCell1);
                        dataRow.appendChild(dataCell2);
                        dataRow.appendChild(dataCell3);

                        // append data row to table
                        table.appendChild(dataRow);
                }

                tableContainer.appendChild(table);
        }
}

const durianRecord = async () => {
        const result = await recordContract.methods.viewDurianDetails().call();
        var value1 = result[0];
        var value2 = result[1];


        // window.alert(length);
        // window.alert(value[0].length);


        const tableContainer = document.getElementById("tableRecord");

        if (value1.length == 0) {
                const error = document.createElement("p");
                error.innerHTML = "No records found.";
                document.getElementById("tableRecord").style.fontFamily = "abel";
                document.getElementById("tableRecord").style.border = "none";
                document.getElementById("tableRecord").style.transform = "translate(50px)";
                document.getElementById("tableRecord").style.fontSize = "30px";
                tableContainer.appendChild(error);
        } else {

                document.getElementById("tableRecord").style.transform = "none";
                // create a new table element
                var table = document.createElement("table");
                table.setAttribute("id", "tableData");
                table.setAttribute("class", "farmerData");
                table.setAttribute("cellpadding", "10 2");

                // create a header row
                var headerRow = document.createElement("tr");

                // create header cells
                var headerCell1 = document.createElement("th");
                headerCell1.setAttribute("id", "tableHeaderData");
                headerCell1.textContent = "Batch ID";

                var headerCell2 = document.createElement("th");
                headerCell2.setAttribute("id", "tableHeaderData");
                headerCell2.textContent = "Harvest Date";

                var headerCell3 = document.createElement("th");
                headerCell3.setAttribute("id", "tableHeaderData");
                headerCell3.textContent = "Type";

                var headerCell4 = document.createElement("th");
                headerCell4.setAttribute("id", "tableHeaderData");
                headerCell4.textContent = "Weight (Kg)";

                var headerCell5 = document.createElement("th");
                headerCell5.setAttribute("id", "tableHeaderData");
                headerCell5.textContent = "Farm ID";

                var headerCell6 = document.createElement("th");
                headerCell6.setAttribute("id", "tableHeaderData");
                headerCell6.textContent = "Status";

                var headerCell7 = document.createElement("th");
                headerCell7.setAttribute("id", "tableHeaderData");
                headerCell7.textContent = "Arrival Time at Distributor";

                var headerCell8 = document.createElement("th");
                headerCell8.setAttribute("id", "tableHeaderData");
                headerCell8.textContent = "Distributor Name";

                var headerCell9 = document.createElement("th");
                headerCell9.setAttribute("id", "tableHeaderData");
                headerCell9.textContent = "Rating";


                // append header cells to header row
                headerRow.appendChild(headerCell1);
                headerRow.appendChild(headerCell2);
                headerRow.appendChild(headerCell3);
                headerRow.appendChild(headerCell4);
                headerRow.appendChild(headerCell5);
                headerRow.appendChild(headerCell6);
                headerRow.appendChild(headerCell7);
                headerRow.appendChild(headerCell8);
                headerRow.appendChild(headerCell9);

                // append header row to table
                table.appendChild(headerRow);

                console.log("hi");
                console.log(result[0][1]);

                for (let i = 0; i < value1.length; i++) {
                        // value[i] = result[i];
                        // console.log("i:" + i);
                        // // console.log(value[i]);
                        // console.log(value[0][i]);

                        // create a data row
                        var dataRow = document.createElement("tr");

                        // create data cells
                        var dataCell1 = document.createElement("td");
                        headerCell1.setAttribute("id", "tableHeaderData");
                        dataCell1.textContent = value1[i][0];

                        var dataCell2 = document.createElement("td");
                        headerCell2.setAttribute("id", "tableHeaderData");
                        let date = new Date(value1[i][1] * 1000);
                        let formattedDate = date.toLocaleDateString("en-GB");
                        dataCell2.textContent = formattedDate;

                        var dataCell3 = document.createElement("td");
                        headerCell3.setAttribute("id", "tableHeaderData");
                        dataCell3.textContent = value1[i][2];

                        var dataCell4 = document.createElement("td");
                        headerCell4.setAttribute("id", "tableHeaderData");
                        dataCell4.textContent = value1[i][3];

                        var dataCell5 = document.createElement("td");
                        headerCell5.setAttribute("id", "tableHeaderData");
                        dataCell5.textContent = value1[i][4];

                        var statusMessage;
                        if (value1[i][5] == "0") {
                                statusMessage = "Harvested"
                        } else if (value1[i][5] == "1") {
                                statusMessage = "Arrived at distributor";
                        } else if (value1[i][5] == "2") {
                                statusMessage = "Sent to retailer";
                        } else {
                                statusMessage = "Arrived at retailer"
                        }
                        var dataCell6 = document.createElement("td");
                        headerCell6.setAttribute("id", "tableHeaderData");
                        dataCell6.textContent = statusMessage;

                        if (value1[i][6] !== "0") {
                                var dataCell7 = document.createElement("td");
                                date = new Date(value1[i][6] * 1000);
                                formattedDate = date.toLocaleDateString("en-GB");
                                dataCell7.textContent = formattedDate;

                                var distributorList = await durianContract.methods.distributors(value1[i][7]).call();
                                var disName = distributorList[1];

                                var dataCell8 = document.createElement("td");
                                headerCell8.setAttribute("id", "tableHeaderData");
                                dataCell8.textContent = disName;
                        } else {
                                var dataCell7 = document.createElement("td");
                                headerCell5.setAttribute("id", "tableHeaderData");
                                dataCell7.textContent = "-";

                                var dataCell8 = document.createElement("td");
                                headerCell8.setAttribute("id", "tableHeaderData");
                                dataCell8.textContent = "-";

                        }




                        var dataCell9 = document.createElement("td");
                        headerCell9.setAttribute("id", "tableHeaderData");


                        var rating = "Taste rate     : " + value1[i][8][0] + "/5 <br>" +
                                "Fragnance rate : " + value1[i][8][1] + "/5 <br>" +
                                "Creaminess rate: " + value1[i][8][2] + "/5 ";

                        dataCell9.innerHTML = rating;

                        // append data cells to data row
                        dataRow.appendChild(dataCell1);
                        dataRow.appendChild(dataCell2);
                        dataRow.appendChild(dataCell3);
                        dataRow.appendChild(dataCell4);
                        dataRow.appendChild(dataCell5);
                        dataRow.appendChild(dataCell6);
                        dataRow.appendChild(dataCell7);
                        dataRow.appendChild(dataCell8);
                        dataRow.appendChild(dataCell9);

                        // append data row to table
                        table.appendChild(dataRow);
                }

                tableContainer.appendChild(table);
        }
}

const durianRecordByRetailer = async () => {
        const data = await durianContract.methods.getDurianList().call();
        console.log(data)
        let length = data.length;
        console.log(length)
        let value = [];
        let temp = [];
        let durianRetailer = [];
        let j = 0;


        for (let i = 0; i < length; i++) {

                temp[i] = await durianContract.methods.durianBatch(data[i]).call();


                console.log("i:" + i)
                console.log(temp[i]);

                console.log(temp[i][5]);
                console.log("type:" + typeof (temp[i][5]));
                if (temp[i][5] === '3') {
                        value[j] = temp[i];
                        durianRetailer[j] = await durianContract.methods.durianRetailer(data[i]).call();
                        j++;
                }

        }
        console.log("halo");
        console.log(value);
        const tableContainer = document.getElementById("tableRecord");


        if (length == 0) {
                const error = document.createElement("p");
                error.innerHTML = "No records found.";
                document.getElementById("tableRecord").style.fontFamily = "abel";
                document.getElementById("tableRecord").style.border = "none";
                document.getElementById("tableRecord").style.transform = "translate(50px)";
                document.getElementById("tableRecord").style.fontSize = "30px";
                tableContainer.appendChild(error);
                document.getElementById("cbutton").disabled = true;
                recordFromDistributor = false;
        } else {
                document.getElementById("tableRecord").style.transform = "none";
                // create a new table element
                var table = document.createElement("table");
                table.setAttribute("id", "tableData");
                table.setAttribute("class", "recorData");
                table.setAttribute("cellpadding", "10 2");

                // create a header row
                var headerRow = document.createElement("tr");

                // create header cells
                var headerCell1 = document.createElement("th");
                headerCell1.setAttribute("id", "tableHeaderData");
                headerCell1.textContent = "Batch ID";

                var headerCell2 = document.createElement("th");
                headerCell2.setAttribute("id", "tableHeaderData");
                headerCell2.textContent = "Type";

                var headerCell3 = document.createElement("th");
                headerCell3.setAttribute("id", "tableHeaderData");
                headerCell3.textContent = "Harvest Date";

                var headerCell4 = document.createElement("th");
                headerCell4.setAttribute("id", "tableHeaderData");
                headerCell4.textContent = "Distributed Weight (Kg)";

                var headerCell5 = document.createElement("th");
                headerCell5.setAttribute("id", "tableHeaderData");
                headerCell5.textContent = "Farm ID";

                var headerCell6 = document.createElement("th");
                headerCell6.setAttribute("id", "tableHeaderData");
                headerCell6.textContent = "Arrival Time at Distributor";

                var headerCell7 = document.createElement("th");
                headerCell7.setAttribute("id", "tableHeaderData");
                headerCell7.textContent = "Arrival Time at Retailer";

                // append header cells to header row
                headerRow.appendChild(headerCell1);
                headerRow.appendChild(headerCell2);
                headerRow.appendChild(headerCell3);
                headerRow.appendChild(headerCell4);
                headerRow.appendChild(headerCell5);
                headerRow.appendChild(headerCell6);
                headerRow.appendChild(headerCell7);

                // append header row to table
                table.appendChild(headerRow);

                for (let i = 0; i < value.length; i++) {

                        // value[i] = await durianContract.methods.durianBatch(data[i]).call();

                        // console.log("i:" + i);
                        // console.log(value[i]);

                        // create a data row
                        var dataRow = document.createElement("tr");

                        // create data cells
                        var dataCell1 = document.createElement("td");
                        dataCell1.textContent = value[i][0];

                        var dataCell2 = document.createElement("td");
                        dataCell2.textContent = value[i][2];

                        let date = new Date(value[i][1] * 1000);
                        let formattedDate = date.toLocaleDateString("en-GB"); // output: "09/05/2021"
                        var dataCell3 = document.createElement("td");
                        dataCell3.textContent = formattedDate;

                        var dataCell4 = document.createElement("td");
                        dataCell4.textContent = value[i][3];

                        var dataCell5 = document.createElement("td");
                        dataCell5.textContent = value[i][4];

                        var dataCell6 = document.createElement("td");
                        date = new Date(value[i][6] * 1000);
                        formattedDate = date.toLocaleDateString("en-GB");
                        dataCell6.textContent = formattedDate;

                        var dataCell7 = document.createElement("td");
                        date = new Date(durianRetailer[i][2] * 1000);
                        formattedDate = date.toLocaleDateString("en-GB");
                        dataCell7.textContent = formattedDate;

                        // append data cells to data row
                        dataRow.appendChild(dataCell1);
                        dataRow.appendChild(dataCell2);
                        dataRow.appendChild(dataCell3);
                        dataRow.appendChild(dataCell4);
                        dataRow.appendChild(dataCell5);
                        dataRow.appendChild(dataCell6);
                        dataRow.appendChild(dataCell7);

                        // append data row to table
                        table.appendChild(dataRow);
                }

                tableContainer.appendChild(table);

        }
}

const durianRecordByDistributor = async () => {

        const data = await durianContract.methods.getDurianList().call();
        console.log(data)
        let length = data.length;
        console.log(length)
        let value = [];
        let temp = [];
        let j = 0;
        for (let i = 0; i < length; i++) {

                temp[i] = await durianContract.methods.durianBatch(data[i]).call();
                console.log("i:" + i)
                console.log(temp[i]);
                console.log(temp[i][5])
                console.log(typeof (temp[i][5]))
                if (temp[i][5] !== "0") {
                        console.log("hahaha")
                        value[j] = temp[i];
                        j++;
                }
        }
        console.log("Value \n" + value);

        const tableContainer = document.getElementById("tableRecord");

        if (value.length == 0) {
                const error = document.createElement("p");
                error.innerHTML = "No records found.";
                document.getElementById("tableRecord").style.fontFamily = "abel";
                document.getElementById("tableRecord").style.border = "none";
                document.getElementById("tableRecord").style.transform = "translate(50px)";
                document.getElementById("tableRecord").style.fontSize = "30px";
                tableContainer.appendChild(error);
        }
        else {
                document.getElementById("tableRecord").style.transform = "none";
                // create a new table element
                var table = document.createElement("table");
                table.setAttribute("id", "tableData");
                table.setAttribute("class", "recorData");
                table.setAttribute("cellpadding", "10 2");


                // create a header row
                var headerRow = document.createElement("tr");

                // create header cells
                var headerCell1 = document.createElement("th");
                headerCell1.setAttribute("id", "tableHeaderData");
                headerCell1.textContent = "Batch ID";

                var headerCell2 = document.createElement("th");
                headerCell2.setAttribute("id", "tableHeaderData");
                headerCell2.textContent = "Type";

                var headerCell3 = document.createElement("th");
                headerCell3.setAttribute("id", "tableHeaderData");
                headerCell3.textContent = "Harvest Date";

                var headerCell4 = document.createElement("th");
                headerCell4.setAttribute("id", "tableHeaderData");
                headerCell4.textContent = "Harvest Weight (Kg)";

                var headerCell5 = document.createElement("th");
                headerCell5.setAttribute("id", "tableHeaderData");
                headerCell5.textContent = "Farm ID";

                var headerCell6 = document.createElement("th");
                headerCell6.setAttribute("id", "tableHeaderData");
                headerCell6.textContent = "Arrival Time at Distributor";

                // append header cells to header row
                headerRow.appendChild(headerCell1);
                headerRow.appendChild(headerCell2);
                headerRow.appendChild(headerCell3);
                headerRow.appendChild(headerCell4);
                headerRow.appendChild(headerCell5);
                headerRow.appendChild(headerCell6);

                // append header row to table
                table.appendChild(headerRow);

                for (let i = 0; i < value.length; i++) {
                        // value[i] = await durianContract.methods.durianBatch(data[i]).call();
                        // console.log("i:" + i)
                        // console.log(value[i]);
                        // create a data row
                        console.log(value[i])
                        if (value[i] !== null) {
                                console.log(i + ": " + value[i]);

                                var dataRow = document.createElement("tr");

                                // create data cells
                                var dataCell1 = document.createElement("td");
                                dataCell1.textContent = value[i][0];
                                console.log(value[i][0]);

                                var dataCell2 = document.createElement("td");
                                dataCell2.textContent = value[i][2];

                                let date = new Date(value[i][1] * 1000);
                                let formattedDate = date.toLocaleDateString("en-GB"); // output: "09/05/2021"
                                var dataCell3 = document.createElement("td");
                                dataCell3.textContent = formattedDate;

                                var dataCell4 = document.createElement("td");
                                dataCell4.textContent = value[i][3];

                                var dataCell5 = document.createElement("td");
                                dataCell5.textContent = value[i][4];

                                date = new Date(value[i][6] * 1000);
                                formattedDate = date.toLocaleDateString("en-GB"); // output: "09/05/2021"
                                var dataCell6 = document.createElement("td");
                                dataCell6.textContent = formattedDate;


                                // append data cells to data row
                                dataRow.appendChild(dataCell1);
                                dataRow.appendChild(dataCell2);
                                dataRow.appendChild(dataCell3);
                                dataRow.appendChild(dataCell4);
                                dataRow.appendChild(dataCell5);
                                dataRow.appendChild(dataCell6);

                                // append data row to table
                                table.appendChild(dataRow);

                                console.log(table);
                        }


                }
                tableContainer.appendChild(table);
        }
}

const durianRecordRetail = async () => {
        const result = await recordContract.methods.viewDurianDetails().call();
        var value1 = result[0];
        var value2 = result[1];


        // window.alert(length);
        // window.alert(value[0].length);


        const tableContainer = document.getElementById("tableRecord");

        if (value2.length == 0) {
                const error = document.createElement("p");
                error.innerHTML = "No records found.";
                document.getElementById("tableRecord").style.fontFamily = "abel";
                document.getElementById("tableRecord").style.border = "none";
                document.getElementById("tableRecord").style.transform = "translate(50px)";
                document.getElementById("tableRecord").style.fontSize = "30px";
                tableContainer.appendChild(error);
        } else {

                document.getElementById("tableRecord").style.transform = "none";
                // create a new table element
                var table = document.createElement("table");
                table.setAttribute("id", "tableData");
                table.setAttribute("class", "farmerData");
                table.setAttribute("cellpadding", "10 2");

                // create a header row
                var headerRow = document.createElement("tr");

                // create header cells
                var headerCell1 = document.createElement("th");
                headerCell1.setAttribute("id", "tableHeaderData");
                headerCell1.textContent = "Batch ID";

                var headerCell2 = document.createElement("th");
                headerCell2.setAttribute("id", "tableHeaderData");
                headerCell2.textContent = "Retailer Name";

                var headerCell3 = document.createElement("th");
                headerCell3.setAttribute("id", "tableHeaderData");
                headerCell3.textContent = "Retailer Address";

                var headerCell4 = document.createElement("th");
                headerCell4.setAttribute("id", "tableHeaderData");
                headerCell4.textContent = "Arrival Time at Retailer";

                var headerCell5 = document.createElement("th");
                headerCell5.setAttribute("id", "tableHeaderData");
                headerCell5.textContent = "Distributed Weight (Kg)";




                // append header cells to header row
                headerRow.appendChild(headerCell1);
                headerRow.appendChild(headerCell2);
                headerRow.appendChild(headerCell3);
                headerRow.appendChild(headerCell4);
                headerRow.appendChild(headerCell5);


                // append header row to table
                table.appendChild(headerRow);

                console.log("hi");
                console.log(result[0][1]);

                for (let i = 0; i < value1.length; i++) {
                        // value[i] = result[i];
                        // console.log("i:" + i);
                        // // console.log(value[i]);
                        // console.log(value[0][i]);
                        if (value2[i][0] == "") {
                                break;
                        }
                        var retailerList = await durianContract.methods.retailers(value2[i][1]).call();
                        var retailerName = retailerList[1];

                        // create a data row
                        var dataRow = document.createElement("tr");

                        // create data cells
                        var dataCell1 = document.createElement("td");
                        headerCell1.setAttribute("id", "tableHeaderData");
                        dataCell1.textContent = value2[i][0];

                        var dataCell2 = document.createElement("td");
                        headerCell2.setAttribute("id", "tableHeaderData");
                        dataCell2.textContent = retailerName;

                        var dataCell3 = document.createElement("td");
                        headerCell3.setAttribute("id", "tableHeaderData");
                        dataCell3.textContent = value2[i][1];

                        let date = new Date(value2[2][2] * 1000);
                        let formattedDate = date.toLocaleDateString("en-GB");
                        var dataCell4 = document.createElement("td");
                        headerCell4.setAttribute("id", "tableHeaderData");
                        dataCell4.textContent = formattedDate;

                        var dataCell5 = document.createElement("td");
                        headerCell5.setAttribute("id", "tableHeaderData");
                        dataCell5.textContent = value2[i][3];



                        // append data cells to data row
                        dataRow.appendChild(dataCell1);
                        dataRow.appendChild(dataCell2);
                        dataRow.appendChild(dataCell3);
                        dataRow.appendChild(dataCell4);
                        dataRow.appendChild(dataCell5);


                        // append data row to table
                        table.appendChild(dataRow);
                }

                tableContainer.appendChild(table);
        }
}

const durianRecordByFarmer = async () => {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        account = accounts[0];

        const farmerAcc = await durianContract.methods.farmers(account).call();
        const farmID = farmerAcc[3];

        const durianList = await durianContract.methods.getDurianList().call();

        const durianLength = durianList.length;

        const durianArray = [];
        var j = 0;

        for (let i = 0; i< durianLength; i++){
                const durian = await durianContract.methods.durianBatch(durianList[i]).call();

                if (durian[4] === farmID){
                        durianArray[j] = durian;
                        j++ 
                }
        }

        console.log(durianArray);


        const tableContainer = document.getElementById("tableRecord");

        if (durianArray.length == 0) {
                const error = document.createElement("p");
                error.innerHTML = "No records found.";
                document.getElementById("tableRecord").style.fontFamily = "abel";
                document.getElementById("tableRecord").style.border = "none";
                document.getElementById("tableRecord").style.transform = "translate(50px)";
                document.getElementById("tableRecord").style.fontSize = "30px";
                tableContainer.appendChild(error);
        } else {

                document.getElementById("tableRecord").style.transform = "none";
                // create a new table element
                var table = document.createElement("table");
                table.setAttribute("id", "tableData");
                table.setAttribute("class", "farmerData");
                table.setAttribute("cellpadding", "10 2");

                // create a header row
                var headerRow = document.createElement("tr");

                // create header cells
                var headerCell1 = document.createElement("th");
                headerCell1.setAttribute("id", "tableHeaderData");
                headerCell1.textContent = "Batch ID";

                var headerCell2 = document.createElement("th");
                headerCell2.setAttribute("id", "tableHeaderData");
                headerCell2.textContent = "Harvest Date";

                var headerCell3 = document.createElement("th");
                headerCell3.setAttribute("id", "tableHeaderData");
                headerCell3.textContent = "Type";

                var headerCell4 = document.createElement("th");
                headerCell4.setAttribute("id", "tableHeaderData");
                headerCell4.textContent = "Weight (Kg)";

                var headerCell5 = document.createElement("th");
                headerCell5.setAttribute("id", "tableHeaderData");
                headerCell5.textContent = "Farm ID";


                // append header cells to header row
                headerRow.appendChild(headerCell1);
                headerRow.appendChild(headerCell2);
                headerRow.appendChild(headerCell3);
                headerRow.appendChild(headerCell4);
                headerRow.appendChild(headerCell5);

                // append header row to table
                table.appendChild(headerRow);

                for (let i = 0; i < durianArray.length; i++) {
                        
                        // create a data row
                        var dataRow = document.createElement("tr");

                        // create data cells
                        var dataCell1 = document.createElement("td");
                        headerCell1.setAttribute("id", "tableHeaderData");
                        dataCell1.textContent = durianArray[i][0];

                        var dataCell2 = document.createElement("td");
                        headerCell2.setAttribute("id", "tableHeaderData");
                        dataCell2.textContent = durianArray[i][1];

                        var dataCell3 = document.createElement("td");
                        headerCell3.setAttribute("id", "tableHeaderData");
                        dataCell3.textContent = durianArray[i][2];

                        var dataCell4 = document.createElement("td");
                        headerCell4.setAttribute("id", "tableHeaderData");
                        dataCell4.textContent = durianArray[i][3];

                        var dataCell5 = document.createElement("td");
                        headerCell5.setAttribute("id", "tableHeaderData");
                        dataCell5.textContent = durianArray[i][4];

                        


                        // append data cells to data row
                        dataRow.appendChild(dataCell1);
                        dataRow.appendChild(dataCell2);
                        dataRow.appendChild(dataCell3);
                        dataRow.appendChild(dataCell4);
                        dataRow.appendChild(dataCell5);

                        // append data row to table
                        table.appendChild(dataRow);
                }

                tableContainer.appendChild(table);
        }
}

const noRecord = async () => {
        document.getElementById("tableRecord").style.border = "none";


}

// const consumerRecord = async () => {
// const result = await recordContract.methods.viewConsumerAcc().call();
// let length = result.length;
// let value = [];

// for (let i = 0; i < length; i++) {
//         value[i] = result[i];
// }

// const tableContainer = document.getElementById("tableRecord");

// if (length == 0) {
//         const error = document.createElement("p");
//         error.innerHTML = "No records found.";
//         tableContainer.appendChild(error);
// } else {
//         // create a new table element
//         var table = document.createElement("table");
//         table.setAttribute("id", "tableData");
//         table.setAttribute("class", "farmerData");
//         table.setAttribute("cellpadding", "10 2");
//         table.setAttribute("border", "1");

//         // create a header row
//         var headerRow = document.createElement("tr");

//         // create header cells
//         var headerCell1 = document.createElement("th");
//         headerCell1.textContent = "Address";

//         var headerCell2 = document.createElement("th");
//         headerCell2.textContent = "Name";

//         var headerCell3 = document.createElement("th");
//         headerCell3.textContent = "User State";

//         // append header cells to header row
//         headerRow.appendChild(headerCell1);
//         headerRow.appendChild(headerCell2);
//         headerRow.appendChild(headerCell3);

//         // append header row to table
//         table.appendChild(headerRow);

//         for (let i = 0; i < length; i++) {
//                 value[i] = result[i];
//                 console.log("i:" + i);
//                 console.log(value[i]);
//                 console.log(value[i][0]);
//                 // create a data row
//                 var dataRow = document.createElement("tr");

//                 // create data cells
//                 var dataCell1 = document.createElement("td");
//                 dataCell1.textContent = value[i][0];

//                 var dataCell2 = document.createElement("td");
//                 dataCell2.textContent = value[i][1];

//                 var dataCell3 = document.createElement("td");
//                 dataCell3.textContent = value[i][2];

//                 // append data cells to data row
//                 dataRow.appendChild(dataCell1);
//                 dataRow.appendChild(dataCell2);
//                 dataRow.appendChild(dataCell3);

//                 // append data row to table
//                 table.appendChild(dataRow);
//         }

//         tableContainer.appendChild(table);
// }
// }

// const testing = async () => {
//         //accessToContract();
//         console.log("Halo iam here")
//         console.log(durianContract)
//         const data = await durianContract.methods.getDurianList().call();
//         console.log(data)
//         let length = data.length;
//         console.log(length)
//         let value = [];

//         for (let i = 0; i < length; i++) {
//                 value[i] = await durianContract.methods.durianBatch(data[i]).call();
//                 console.log("i:" + i)
//                 console.log(value[i]);
//                 console.log(value[i][0]);
//         }

//         const tableContainer = document.getElementById("fromFarmerTable");

//         if (length == 0) {
//                 const error = document.createElement("p");
//                 error.innerHTML = "No records found.";
//                 tableContainer.appendChild(error);
//         }
//         else {
//                 // create a new table element
//                 var table = document.createElement("table");

//                 // create a header row
//                 var headerRow = document.createElement("tr");

//                 // create header cells
//                 var headerCell1 = document.createElement("th");
//                 headerCell1.textContent = "Batch ID";

//                 var headerCell2 = document.createElement("th");
//                 headerCell2.textContent = "Type";

//                 var headerCell3 = document.createElement("th");
//                 headerCell3.textContent = "Harvest Date";

//                 var headerCell4 = document.createElement("th");
//                 headerCell4.textContent = "Weight";

//                 var headerCell5 = document.createElement("th");
//                 headerCell5.textContent = "Farm ID";


//                 // append header cells to header row
//                 headerRow.appendChild(headerCell1);
//                 headerRow.appendChild(headerCell2);
//                 headerRow.appendChild(headerCell3);
//                 headerRow.appendChild(headerCell4);
//                 headerRow.appendChild(headerCell5);


//                 // append header row to table
//                 table.appendChild(headerRow);



//                 for (let i = 0; i < length; i++) {
//                         value[i] = await durianContract.methods.durianBatch(data[i]).call();
//                         console.log("i:" + i)
//                         console.log(value[i]);
//                         // create a data row
//                         var dataRow = document.createElement("tr");

//                         // create data cells
//                         var dataCell1 = document.createElement("td");
//                         dataCell1.textContent = value[i][0];

//                         var dataCell2 = document.createElement("td");
//                         dataCell2.textContent = value[i][2];

//                         var dataCell3 = document.createElement("td");
//                         dataCell3.textContent = value[i][1];

//                         var dataCell4 = document.createElement("td");
//                         dataCell4.textContent = value[i][3];

//                         var dataCell5 = document.createElement("td");
//                         dataCell5.textContent = value[i][4];

//                         // append data cells to data row
//                         dataRow.appendChild(dataCell1);
//                         dataRow.appendChild(dataCell2);
//                         dataRow.appendChild(dataCell3);
//                         dataRow.appendChild(dataCell4);
//                         dataRow.appendChild(dataCell5);

//                         // append data row to table
//                         table.appendChild(dataRow);
//                 }
//                 tableContainer.appendChild(table);
//         }
// }

const login = async (user) => {
        let returnValue;

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        account = accounts[0];

        console.log("user:" + user)
        const tx = await durianContract.methods.login(account, user).send({ from: account });

        // Wait for the transaction to be mined
        const receipt = await web3.eth.getTransactionReceipt(tx.transactionHash);
        console.log(receipt)

        console.log(web3.eth)
        if (receipt.logs.length > 0) {
                // Fetch the event logs for the transaction
                const logs = web3.eth.abi.decodeLog(
                        [
                                { type: 'uint8', name: 'status' }
                        ],
                        receipt.logs[0].data,
                        receipt.logs[0].topics.slice(1)
                );

                console.log(logs); // { success: true, message: "Successful login. Access granted." }

                // Get the return value from the event log
                returnValue = {
                        status: logs.status,
                };
        } else {
                console.log('No logs found for transaction');
                returnValue = {
                        status: 1,
                }
        }



        let deactivateMsg = "Your account has been deactivated. Please contact the owner for more information.";
        let loginMsg = "Successful login. Access granted.";
        let accessDeniedMsg = "Access denied: You do not have the necessary permissions to perform this action.";

        if (returnValue.status == 0) {
                alert(loginMsg);
                switch (user) {
                        case 'Owner':
                                window.location.href = "owner.html";
                                break;
                        case 'Farmer':
                                window.location.href = "farmer.html";
                                break;
                        case 'Distributor':
                                window.location.href = "distributor.html";
                                break;
                        case 'Retailer':
                                window.location.href = "retailer.html";
                                break;
                        case 'Consumer':
                                window.location.href = "consumer/consumerLogin.html";
                                break;
                }
        } else if (returnValue.status == 1) {
                alert(accessDeniedMsg);
        }
        else {
                alert(deactivateMsg);
        }
}

const logout = async () => {
        let logoutMsg = "Logout successful. Thanks for using our service!";

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        account = accounts[0];

        await durianContract.methods.logout(account).send({ from: account });
        console.log(durianContract);

        alert(logoutMsg);
        window.location.href = "index.html";

}

const logoutConsumer = async () => {
        let logoutMsg = "Logout successful. Thanks for using our service!";

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        account = accounts[0];

        await durianContract.methods.logout(account).send({ from: account });
        console.log(durianContract);

        alert(logoutMsg);
        window.location.href = "../index.html";

}

const back = async () => {

        window.location.href = "index.html";

}


