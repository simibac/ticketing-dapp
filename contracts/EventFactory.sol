pragma solidity ^0.5.0;

contract EventFactory{
    
    mapping (uint => Event) public events;
    uint public eventIndex;

    struct Ticket{
        address payable owner;
        uint ticketId;
        uint eventId;
    }
    
    struct Event{
        address payable owner;
        uint eventId;
        string name;
        uint date;
        uint numTickets;
        uint ticketPrice;
        uint ticketIndex;
        uint sellingQueueHead;
        uint sellingQueueTail;
        uint buyingQueueHead;
        uint buyingQueueTail;
        mapping (uint => Ticket) sellingQueue;
        mapping (uint => Ticket) tickets;
        mapping (uint => address payable) buyingQueue;
        // location
        // websiteUrl
        // imageUrl
        // Organizer
        // Description
    }
    
    function createEvent(string memory _name, uint _date, uint _numTickets, uint _ticketPrice) public{
        events[eventIndex] = Event({
            owner: msg.sender, 
            eventId: eventIndex, 
            name: _name, 
            date: _date, 
            numTickets: _numTickets, 
            ticketPrice: _ticketPrice, 
            ticketIndex: 0, 
            sellingQueueHead: 0,
            sellingQueueTail:0,
            buyingQueueHead: 0,
            buyingQueueTail: 0
        });
        eventIndex++;
    }
    
    function buyTicket(uint _eventId) public payable{
        Event storage e = events[_eventId];
        require(msg.value == e.ticketPrice, "The value does not match the ticket price.");
        
        // if not all tickets have been issued, the buyer automatically buys from the event owner
        if(e.ticketIndex < e.numTickets){
            issueTicket(e, msg.sender);
        }
        
        // if people want to sell tickets, the buyer automatically buys from the earliest seller
        else if(e.sellingQueueTail != e.sellingQueueHead){
            buyFromSellingQueue(e, msg.sender);
        }
        
        // if nobody wants to sell yet, the buyer joins the buying queue
        else{
            joinBuyingQueue(e, msg.sender);
        }
    }
    
    function issueTicket(Event storage e, address payable owner) internal {
            // issue the ticket
            Ticket storage t = e.tickets[e.ticketIndex];
            t.eventId = e.eventId;
            t.owner = owner;
            t.ticketId = e.ticketIndex;
            e.tickets[e.ticketIndex] = t;
            e.ticketIndex++;
            
            // send ticket price to the event owner
            (e.owner).transfer(msg.value);
    }
    
    function buyFromSellingQueue(Event storage e, address payable newOwner) internal{
        // transfer money
        (e.sellingQueue[e.sellingQueueHead].owner).transfer(e.ticketPrice);
        
        // transfer ownership
        e.tickets[e.sellingQueue[e.sellingQueueHead].ticketId].owner = newOwner;
        
        // remove user from the queue
        delete e.sellingQueue[e.sellingQueueHead];
        e.sellingQueueHead++;
    }
    
    function sellTicket(uint _eventId, uint _ticketId) public{
        Event storage e = events[_eventId];
        
        require(msg.sender == e.tickets[_ticketId].owner);
        
        // if people are in the waiting queue for buying tickets
        if(e.buyingQueueTail != e.buyingQueueHead){
            // transfer money
            (msg.sender).transfer(e.ticketPrice);
            
            // transfer ownership
            e.tickets[_ticketId].owner = e.buyingQueue[e.buyingQueueHead];
            
            // remove user from the queue
            delete e.buyingQueue[e.buyingQueueHead];
            e.buyingQueueHead++;
        }
        
        // else join selling queue
        else{
            e.sellingQueue[e.sellingQueueTail] = e.tickets[_ticketId];
            e.sellingQueueTail++;
        }
    }
    
    function joinBuyingQueue(Event storage e, address payable owner) internal{
        e.buyingQueue[e.buyingQueueTail] = owner;
        e.buyingQueueTail++;
    }
    
    function getTicketOwner(uint _eventId, uint _ticketId) public view returns(address){
        return events[_eventId].tickets[_ticketId].owner;
    }
    
    function getTicketPrice(uint _eventId) public view returns(uint){
        return events[_eventId].ticketPrice;
    }
    
    function getBuyingQueueTail(uint _eventId) public view returns(uint){
        return events[_eventId].buyingQueueTail;
    }
    
    function getBuyingQueueHead(uint _eventId) public view returns(uint){
        return events[_eventId].buyingQueueHead;
    }
    
    function getSellingQueueHead(uint _eventId) public view returns(uint){
        return events[_eventId].sellingQueueHead;
    }
    
    function getSellingQueueTail(uint _eventId) public view returns(uint){
        return events[_eventId].sellingQueueTail;
    }

    // // as we cannot return an array of structs in solidity we return two arrays
    // function getTickets(uint _eventId) public view returns(uint[] memory _ticketIds, address[] memory _addresses){
    //     _ticketIds = new uint[](events[_eventId].ticketIndex);
    //     _addresses = new address[](events[_eventId].ticketIndex);

    //     for(uint256 i = 0; i < events[_eventId].ticketIndex; i++){
    //         _ticketIds[i] = events[_eventId].tickets[i].ticketId;
    //         _addresses[i] = events[_eventId].tickets[i].owner;

    //     }
    //     return (_ticketIds, _addresses);
    // }
}