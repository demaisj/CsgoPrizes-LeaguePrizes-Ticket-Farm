// ==UserScript==
// @name         CsgoPrizes Ticket Farm [CP-FARM]
// @namespace    https://github.com/DeathMiner/CsgoPrizes-Ticket-Farm
// @version      0.2
// @description  Hey lazy man! D'you want some help to farm your tickets?
// @author       Death_Miner
// @match        http://csgoprizes.com/get-tickets
// @grant        unsafeWindow
// ==/UserScript==

try{
console.log("Starting CP-FARM...");
document.title = "[CP-FARM] Loading page...";
(function($){
    
    $(function(){
        console.log("Initializing...");
        document.title = "[CP-FARM] Initializing farm...";
        
        var additionnal_time = 10,
            reloading = false,
            start = -1;

        function update(){
            
            if(reloading === false){
            
                var sec = $("#ticketTimer").text();
                
                if(start == -1){
                    start = parseInt(sec, 10)+1;
                }
            
                if(sec == "0"){
                    console.log("Timer finished. Still trying to force-add ticket. "+additionnal_time+" seconds left.");
                    document.title = "[CP-FARM] -"+additionnal_time+"/"+start;
                    if(additionnal_time <= 0){
                        console.log("No response, forcing-reloading...");
                        document.title = "[CP-FARM] Error, reloading...";
                        reloading = true;
                        window.location.reload();
                    }
                    additionnal_time -= 1;
                }
                else{
                     console.log("Stil waiting, "+sec+" seconds left.");
                     document.title = "[CP-FARM] "+sec+"/"+start;
                }
            
                if(!$(".bouton_get_tickets .cover").is(":visible")){
                    console.log("The ticket has been added, reloading...");
                    document.title = "[CP-FARM] +3 tickets, reloading...";
                    reloading = true;
                    window.location.reload();
                }
            
                addTicket();
            }
            else{
                document.title = "[CP-FARM] Reloading...";
            }
        }
        
        setInterval(update, 1000);
        console.log("CP-FARM successfully started.");
        document.title = "[CP-FARM] Started.";
    });
})(jQuery);
}
catch(e){
    console.error("Cannot start CP-FARM...");
    if (e.message && e.stack) {console.error("ERROR: " + e.message);console.log(e.stack.replace(/(\\(eval at )?<anonymous>[: ]?)|([\s.]*at TM_mEval[\s\S.]*)/g, ""));} else {console.error(e);}
    
    if (document.querySelectorAll(".cf-browser-verification").length > 0){
        console.log("Cloudflare Anti-DDOS Security, waiting...");
        document.title = "[CP-FARM] CF-DDOS Security";
    }
    else{
        console.log("Reloading...");
        document.title = "[CP-FARM] Error, reloading...";
        window.location.reload();
    }
}
