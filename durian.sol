//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract DurianContract {
    //struct
    //Owner struct
    struct Owner {
        address ownerAddress;
        string companyName;
        UserState userState;
    }

    //Farm struct
    struct Farm {
        string farmID;
        string farmName;
        string farmLocation;
        uint256 farmSize;
        uint256 numOfWorkers;
    }

    //Farmer struct
    struct Farmer {
        address farmerAddress;
        string farmerName;
        UserState userState;
        string farmID; //same with farmID in Farm struct
    }

    //Durian struct
    struct Durian {
        string durianID;
        uint256 harvestDate; //timestamp
        string durianType; //such as Musang King, D24
        uint256 weightInGram;
        string treeID; //same with treeID in DurianTree struct
        uint256 arriveAtRetailerTime;
        uint256 arriveAtDistributorTime;
        DurianStatus durianStatus;
        Rating rating;
        address retailerAddress;
        address distributorAddress;
        uint256 soldPrice;
    }

    //Durian Tree struct
    struct DurianTree {
        string treeID;
        uint256 treeAge;
        uint256 treeHeight;
        string farmID; //same with farmID in Farm struct
    }

    //Rating struct
    struct Rating {
        uint8 taste;
        uint8 fragnance;
        uint8 creaminess;
        address rateBy; //consumer address
    }

    //Distributor struct
    struct Distributor {
        address distributorAddress;
        string distributorName;
        UserState userState;
    }

    //Retailer struct
    struct Retailer {
        address retailerAddress;
        string retailerName;
        string retailerLocation;
        UserState userState;
    }

    //Consumer struct
    struct Consumer {
        address consumerAddress;
        string consumerName;
        UserState userState;
    }

    //enum
    //User account status
    enum UserState {
        LoggedIn,
        LoggedOut,
        Deactivated
    }
    //Durian status
    enum DurianStatus {
        Harvested,
        AtDistributor,
        AtRetailer,
        Sold
    }

    //Mapping
    //Owner mapping
    mapping(address => Owner) owner;

    //Farmer mapping
    mapping(address => Farmer) farmers;

    //Farmworkers mapping - map farmID to a list of Farmer addresses
    mapping(string => address[]) public farmWorkers;

    //Farm mapping - map farmID to each farm
    mapping(string => Farm) farms;
    uint256 public farmCount = 0;

    //Durian mapping - map durianID to each durian
    mapping(string => Durian) durians;
    uint256 public durianCount = 0;

    //Durian tree mapping - map treeID to each tree
    mapping(string => DurianTree) durianTrees;
    uint256 public durianTreeCount = 0;

    //Distributor mapping
    mapping(address => Distributor) distributors;

    //Retailer mapping
    mapping(address => Retailer) retailers;

    //Consumer mapping
    mapping(address => Consumer) consumers;

    //Modifier
    //Owner modifier
    //Define a modifier that checks to see if msg.sender is owner
    modifier onlyOwner() {
        require(
            msg.sender == owner[msg.sender].ownerAddress,
            "Only the owner can call this function"
        );
        require(
            owner[msg.sender].userState == UserState.LoggedIn,
            "You need to log in to perform this function"
        );
        _;
    }

    //Farmer modifier
    //Define a modifier that checks to see if msg.sender is farmer
    modifier onlyFarmer() {
        require(
            msg.sender == farmers[msg.sender].farmerAddress,
            "Only the farmer can call this function"
        );
        require(
            farmers[msg.sender].userState == UserState.LoggedIn,
            "You need to log in to perform this function"
        );
        _;
    }

    //Distributor modifier
    //Define a modifier that checks to see if msg.sender is distributor
    modifier onlyDistributor() {
        require(
            msg.sender == distributors[msg.sender].distributorAddress,
            "Only the distributor can call this function"
        );
        require(
            distributors[msg.sender].userState == UserState.LoggedIn,
            "You need to log in to perform this function"
        );
        _;
    }

    //Retailer modifier
    //Define a modifier that checks to see if msg.sender is retailer
    modifier onlyRetailer() {
        require(
            msg.sender == retailers[msg.sender].retailerAddress,
            "Only the retailer can call this function"
        );
        require(
            retailers[msg.sender].userState == UserState.LoggedIn,
            "You need to log in to perform this function"
        );
        _;
    }

    //Consumer modifier
    //Define a modifier that checks to see if msg.sender is consumer
    modifier onlyConsumer() {
        require(
            msg.sender == consumers[msg.sender].consumerAddress,
            "Only the consumer can call this function"
        );
        require(
            consumers[msg.sender].userState == UserState.LoggedIn,
            "You need to log in to perform this function"
        );
        _;
    }

    //Constructor - add owner
    constructor(string memory _companyName) {
        owner[msg.sender].companyName = _companyName;
        owner[msg.sender].ownerAddress = msg.sender;
        owner[msg.sender].userState = UserState.LoggedOut;
    }

    //-----------------------------------------------------------------------------------------------------------------------------
    //Owner function
    //Add farmer
    function addFarmer(
        address _farmerAddress,
        string memory _farmerName,
        string memory _farmID
    ) public onlyOwner {
        Farmer memory newFarmer = Farmer({
            farmerAddress: _farmerAddress,
            farmerName: _farmerName,
            userState: UserState.LoggedOut,
            farmID: _farmID
        });
        farmers[_farmerAddress] = newFarmer;
        farmWorkers[_farmID].push(_farmerAddress);
    }

    //Add distributor
    function addDistributor(address _distributorAddress, string memory name)
        public
        onlyOwner
    {
        Distributor memory newDistributor = Distributor({
            distributorAddress: _distributorAddress,
            distributorName: name,
            userState: UserState.LoggedOut
        });

        distributors[_distributorAddress] = newDistributor;
    }

    //Add retailer
    function addRetailer(
        address retailerAddress,
        string memory retailerName,
        string memory retailerLocation
    ) public onlyOwner {
        Retailer memory newRetailer = Retailer(
            retailerAddress,
            retailerName,
            retailerLocation,
            UserState.LoggedOut
        );
        retailers[retailerAddress] = newRetailer;
    }

    //Add farm
    function addFarm(
        string memory name,
        string memory location,
        uint256 size,
        uint256 num
    ) public onlyOwner {
        farmCount++;
        string memory id = string(abi.encodePacked("F", farmCount));

        Farm memory newFarm = Farm({
            farmID: id,
            farmName: name,
            farmLocation: location,
            farmSize: size,
            numOfWorkers: num
        });
        farms[id] = newFarm;
    }

    // TODO: View record
    function getFarm() public pure returns(string memory){
        return "Hello world";
    }



    //-----------------------------------------------------------------------------------------------------------------------------
    //Farmer function
    //Add durian tree
    function addDurianTree(
        uint256 age,
        uint256 height,
        string memory _farmID
    ) public onlyFarmer {
        string memory _treeID = string(abi.encodePacked("T", durianTreeCount));

        DurianTree memory newDurianTree = DurianTree({
            treeID: _treeID,
            treeAge: age,
            treeHeight: height,
            farmID: _farmID
        });

        durianTrees[_treeID] = newDurianTree;
    }

    //Record harvest durian
    function recordHarvestDurian(
        uint256 date,
        string memory _type,
        uint256 weight,
        string memory _treeID
    ) public onlyFarmer {
        //Assign ID to each durian
        durianCount++;
        string memory id = string(abi.encodePacked("D", durianCount));

        Durian memory newDurian = Durian({
            durianID: id,
            harvestDate: date,
            durianType: _type,
            weightInGram: weight,
            treeID: _treeID,
            arriveAtRetailerTime: 0,
            arriveAtDistributorTime: 0,
            rating: Rating({taste: 1, fragnance: 1, creaminess: 1, rateBy: address(0)}),
            durianStatus: DurianStatus.Harvested,
            retailerAddress: address(0),
            distributorAddress: address(0),
            soldPrice: 0
        });

        durians[id] = newDurian;
    }

    //-----------------------------------------------------------------------------------------------------------------------------
    //Distributor function
    //Record received durian from farmer
    function recordDurianFromFarmer(string[] memory id, uint256 time)
        public
        onlyDistributor
    {
        for (uint256 i = 0; i < id.length; i++) {
            durians[id[i]].arriveAtDistributorTime = time;
            durians[id[i]].durianStatus = DurianStatus.AtDistributor;
            durians[id[i]].distributorAddress = msg.sender;
        }
    }

    //Record durian sent to retailer
    function recordDurianToRetailer(string[] memory id, address retailerAddress)
        public
        onlyDistributor
    {
        for (uint256 i = 0; i < id.length; i++) {
            durians[id[i]].retailerAddress = retailerAddress;
        }
    }

    //-----------------------------------------------------------------------------------------------------------------------------
    //Retailer function
    //Record received durian from distributor
    function recordDurianFromDistributor(string[] memory id, uint256 time)
        public
        onlyRetailer
    {
        for (uint256 i = 0; i < id.length; i++) {
            durians[id[i]].arriveAtRetailerTime = time;
            durians[id[i]].durianStatus = DurianStatus.AtRetailer;
        }
    }

    //Set price
    function setPrice(string memory durianID, uint256 durianPrice)
        public
        onlyRetailer
    {
        durians[durianID].soldPrice = durianPrice;
    }

    //Discard spoiled durian
    function deleteDurian(string memory durianID) public onlyRetailer {
        delete durians[durianID];
    }

    //Record durian sold 
    function recordDurianSold(string memory durianID) public onlyRetailer{
        durians[durianID].durianStatus = DurianStatus.Sold;
    }

    //-----------------------------------------------------------------------------------------------------------------------------
    //Consumer function
    //Trace durian provenance
    struct ConsumerStruct {
        string durianID;
        string farmName;
        string farmLocation;
        uint256 harvestDate;
        string durianType;
        uint256 weightInGram;
        uint256 arriveAtRetailerTime;
        uint256 arriveAtDistributorTime;
        uint256 soldPrice;
        uint256 treeAge;
        uint256 treeHeight;
        string distributorName;
        string retailerName;
        string retailerLocation;
    }

    function traceDurianProvenance(string memory durianID)
        public
        view
        onlyConsumer
        returns (ConsumerStruct memory)
    {
        string memory tempTreeID = durians[durianID].treeID;
        string memory tempFarmID = durianTrees[tempTreeID].farmID;
        address tempRetailerAddress = durians[durianID].retailerAddress;
        address tempDistributorAddress = durians[durianID].distributorAddress;

        ConsumerStruct memory consumerStruct = ConsumerStruct({
            durianID: durianID,
            farmName: farms[tempFarmID].farmName,
            farmLocation: farms[tempFarmID].farmLocation,
            harvestDate: durians[durianID].harvestDate,
            durianType: durians[durianID].durianType,
            weightInGram: durians[durianID].weightInGram,
            arriveAtRetailerTime: durians[durianID].arriveAtRetailerTime,
            arriveAtDistributorTime: durians[durianID].arriveAtDistributorTime,
            soldPrice: durians[durianID].soldPrice,
            treeAge: durianTrees[tempTreeID].treeAge,
            treeHeight: durianTrees[tempTreeID].treeHeight,
            distributorName: distributors[tempDistributorAddress]
                .distributorName,
            retailerName: retailers[tempRetailerAddress].retailerName,
            retailerLocation: retailers[tempRetailerAddress].retailerLocation
        });

        return consumerStruct;
    }

    //Rate durian
    function rateDurian(
        string memory durianID,
        uint8 tasteRate,
        uint8 fragnanceRate,
        uint8 creaminessRate
    ) public onlyConsumer {
        Rating memory newRating = Rating({
            taste: tasteRate,
            fragnance: fragnanceRate,
            creaminess: creaminessRate,
            rateBy: msg.sender
        });

        durians[durianID].rating = newRating;
    }
}
