    //SPDX-License-Identifier: MIT
    pragma solidity >=0.4.16 <0.9.0;

    //Declare State Variables 
    contract NeftexFund {
        address public owner;
        uint public campaignFee;
        uint public numOfCampaign;
        uint public balance;
        countsStruct public counts;
        campaignStruct[] campaigns;
 
    //Create a mapping that will point to the campaign object
        mapping(address => campaignStruct[]) _campaigns;
        mapping(uint => supporterStruct[]) _supporters;
        mapping(uint => bool) public availableCampaign;

        constructor(uint _campaignFee) {
            owner = msg.sender;
            campaignFee = _campaignFee;
        }


        enum checkState {
            RUN,
            CONFIRMED,
            REVERSED,
            TERMINATED,
            WITHDRAWN
        }
    //create an object for the NeftexFund that specify the type value of campaigns, supports and fundings
        struct countsStruct {
            uint totalNumOfCampaigns;
            uint totalNumOfSupports;
            uint totalNumOfFundings;
        }

    //create a Campaign object for the NeftexFund and specify its types (struct)
        struct campaignStruct {
            uint id;
            address owner;
            string title;
            string description;
            string imageURL;
            uint amount;
            uint amountAccrued;
            uint timestamp;
            uint deadline;
            uint _supporters;
            checkState check;
        }

        struct supporterStruct {
            address owner;
            uint participation;
            uint timestamp;
            bool refunded;
        }

        

        modifier ownerOnly(){
            require(msg.sender == owner, "This is specifically restricted to the owner");
            _;
        }

        event Action (
            uint256 id,
            string actionType,
            address indexed performer,
            uint256 timestamp
        );

        //Create a function to Start Campaign
        function startcampaign(
            string memory title,
            string memory description,
            string memory imageURL,
            uint amount,
            uint deadline
        ) public returns (bool) {
            require(bytes(title).length > 0, "Kindly write the title of the campaign");
            require(bytes(description).length > 0, "Kindly write the description of the campaign");
            require(bytes(imageURL).length > 0, "Kindly include the ImageURL of the campaign");
            require(amount > 0 ether, "Kindly write the amount in ETH for the campaign");

            campaignStruct memory campaign;
            campaign.id = numOfCampaign;
            campaign.owner = msg.sender;
            campaign.title = title;
            campaign.description = description;
            campaign.imageURL = imageURL;
            campaign.amount = amount;
            campaign.timestamp = block.timestamp;
            campaign.deadline = deadline;

            campaigns.push(campaign);
            availableCampaign[numOfCampaign] = true;
            _campaigns[msg.sender].push(campaign);
            counts.totalNumOfCampaigns += 1;

            emit Action (
                numOfCampaign++,
                "campaign CREATED",
                msg.sender,
                block.timestamp
            );
            return true;
        }
     //Create a function for reviewCampaign
        function reviewcampaign(
            uint id,
            string memory title,
            string memory description,
            string memory imageURL,
            uint deadline
        ) public returns (bool) {
            require(msg.sender == campaigns[id].owner, "Sorry!, Unauthorized Owner");
            require(bytes(title).length > 0, "Kindly write the title of the campaign");
            require(bytes(description).length > 0, "Kindly write the description of the campaign");
            require(bytes(imageURL).length > 0, "Kindly include the ImageURL of the campaign");

            campaigns[id].title = title;
            campaigns[id].description = description;
            campaigns[id].imageURL = imageURL;
            campaigns[id].deadline = deadline;

            emit Action (
                id,
                "campaign REVEIWED",
                msg.sender,
                block.timestamp
            );

            return true;
        }

     //Create a function for terminate or close Campaign
        function terminatecampaign (uint id) public returns (bool) {
            require(campaigns[id].check == checkState.RUN, "Sorry!, campaign is no longer Running");
            require(msg.sender == campaigns[id].owner, "Sorry!, Unauthorized Owner");

            campaigns[id].check = checkState.TERMINATED;
            commenceRefund (id);

            emit Action (
                id,
                "campaign TERMINATED",
                msg.sender,
                block.timestamp
            );

            return true;
        }
     //Create a function to commence Refund
        function commenceRefund (uint id) internal {
            for(uint i = 0; i < _supporters[id].length; i++) {
                address _owner = _supporters[id][i].owner;
                uint _participation = _supporters[id][i].participation;
                
                _supporters[id][i].refunded = true;
                _supporters[id][i].timestamp = block.timestamp;
                withdrawTo(_owner, _participation);

                counts.totalNumOfSupports -= 1;
                counts.totalNumOfFundings -= _participation;
            }
        }
     //Create a function for support campaign
        function supportcampaign(uint id) public payable returns (bool) {
            require(msg.value > 0 ether, "Sorry! the amount of ether must be greater than zero");
            require(availableCampaign[id], "Sorry!, can't find campaign");
            require(campaigns[id].check == checkState.RUN, "Sorry!, campaign is no longer Running");

            counts.totalNumOfSupports += 1;
            counts.totalNumOfFundings += msg.value;
            campaigns[id].amountAccrued += msg.value;
            campaigns[id]._supporters= 1;

            _supporters[id].push(
                supporterStruct(
                    msg.sender,
                    msg.value,
                    block.timestamp,
                    false
                )
            );

            emit Action (
                id,
                "campaign SUPPORTED",
                msg.sender,
                block.timestamp
            );

            if(campaigns[id].amountAccrued >= campaigns[id].amount) {
                campaigns[id].check = checkState.CONFIRMED;
                balance += campaigns[id].amountAccrued;
                commenceWithdrawal(id);
                return true;
            }

            if(block.timestamp >= campaigns[id].deadline) {
                campaigns[id].check = checkState.REVERSED;
                commenceRefund (id);
                return true;
            }

            return true;
        }
     //Create a function to commence Withdrawal
        function commenceWithdrawal(uint id) internal {
            uint amountAccrued = campaigns[id].amountAccrued;
            uint fee = (amountAccrued * campaignFee) / 100;

            campaigns[id].check = checkState.WITHDRAWN;

            withdrawTo(campaigns[id].owner, (amountAccrued - fee));
            withdrawTo(owner, fee);

            balance -= campaigns[id].amountAccrued;

            emit Action (
                id,
                "campaign WITHDRAWN",
                msg.sender,
                block.timestamp
            );
        }
     //Create a function for demand refund
        function demandRefund(uint id) public returns (bool) {
            require(
                campaigns[id].check != checkState.REVERSED ||
                campaigns[id].check != checkState.TERMINATED,
                "Sorry!, campaign is not classified as reversed or terminated"
            );
            
            campaigns[id].check = checkState.REVERSED;
            commenceRefund (id);
            return true;
        }
     //Create a function for withdrawal of Campaign funds
        function withdrawcampaign(uint id) public returns (bool) {
            require(campaigns[id].check == checkState.CONFIRMED, "campaign not CONFIRMED");
            require(
                msg.sender == campaigns[id].owner ||
                msg.sender == owner,
                "Sorry!, Unauthorized Owner"
            );

            commenceWithdrawal(id);
            return true;
        }
     //Create a function for ReviewCampaign fee only accesible by the owner
        function ReviewFee(uint _fee) external ownerOnly {
            campaignFee = _fee;
        }

     //Create a function that gets all Campaigns
        function getcampaigns() public view returns (campaignStruct[] memory) {
            return campaigns;
        }
     //Create a function that gets a Campaign
        function getcampaign(uint id) public view returns (campaignStruct memory) {
            require(availableCampaign[id], "Sorry!, can't find campaign");

            return campaigns[id];
        }
        
      //Create a function that gets the supporters of a Campaigns   
        function getsupporters(uint id) public view returns (supporterStruct[] memory) {
            return _supporters[id];
        }

     //Create a function that withdraws the funds generated in a Campaigns
        function withdrawTo(address to, uint256 amount) internal {
            (bool success, ) = payable(to).call{value: amount}("");
            require(success);
        }
    }