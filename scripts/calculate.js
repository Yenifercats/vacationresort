/*
// OLD SCHOOL INIT - works only if its the only listener to the onload event
function init(){
    //all deferred code here
}
window.onload = init;// wait until body content/html loaded into the window.
*/

function isDateInHighSeason(checkinginDate){
    const date = new Date(checkinginDate + "12:00am");
    const year = date.getFullYear();
    const seasonStart = new Date("Jun 1 " + year);
    const seasonEnd = new Date("Aug 31 " + year);
    return ((date >= seasonStart) && (date <= seasonEnd));
}

function getRoomRate(checkinDate, queen, king, suite){
    let roomPrice= 0;
    if(isDateInHighSeason(checkingDate)){
        if (queen || king) {
            roomPrice = 250;
        } else if (suite) {
            roomPrice = 350;
        }
    }else{ //LOW SEASON
    if (queen || king){
        roomPrice = 150;
    }else if (suite) {
        roomPrice = 210;
    }
    }
    return roomPrice;
}
document.addEventListener("DOMContentLoaded", ()=>{ //BEGIN ANONYMOUS
    //INIT CODE GOES HERE
    document.getElementById("calculate").addEventListener("click", () => {

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const checkinDate = document.getElementById("checkinDate").value;
        const nights = document.getElementById("nights").value;
        const adults = document.getElementById("adults").value;
        const children = document.getElementById("children").value;
        

        const queen = document.getElementById("queen").value;
        const king = document.getElementById("king").value;
        const suite = document.getElementById("suite").value;

        const military = document.getElementById("military").value;
        const senior = document.getElementById("senior").value;
        const none = document.getElementById("none").value;

        let occupancy = 0;
        if (queen) {
            occupancy = 5;
        } else if (king) {
        occupancy = 2;
        } else if (suite) {
            occupancy = 7;
        } else {
            console.log("invalid room type.")
            return false;
        }

        let guest = Number(adults) + Number(children);

        const messageDiv = document.getElementById("messageDiv");
        if(guest > occupancy){
            messageDiv.innerHTML = "The room you selected will not hold your party, please submit appropriate party size.";
        } else {
            messageDiv.dispatchEvent.innerHTML = "";
        }

        //DISCOUNT
        let discount = 0
        if (senior) {
            discount = roomPrice * 0.10
        } else if (military){
            discount = roomPrice *0.20
        }

        let discountedPrice = roomPrice - discount; //APPLY DISCOUNT
        let tax = discountedPrice * 0.12
        let withTax = discountedPrice + tax
        let total = withTax * nights;

        document.getElementById("original").innerHTML = roomPrice.toFixed(2);
        document.getElementById("room").innerHTML = discountedPrice.toFixed(2);
        document.getElementById("discount").innerHTML = discount.toFixed(2);
        document.getElementById("tax").innerHTML = tax.toFixed(2);
        document.getElementById("total").innerHTML = total.toFixed(2);
    });
});