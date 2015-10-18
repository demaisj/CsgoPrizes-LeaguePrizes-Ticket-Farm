// ==UserScript==
// @name         CsgoPrizes & LeaguePrizes Ticket Farm
// @namespace    https://github.com/DeathMiner/CsgoPrizes-Ticket-Farm
// @version      1.0
// @description  Hey lazy man! D'you want some help to farm your tickets?
// @author       Death_Miner
// @license      MIT
// @run-at       document-start
// @match        http://csgoprizes.com/get-tickets
// @match        http://leagueprizes.com/get-tickets
// @grant        none
// @updateURL    https://github.com/DeathMiner/CsgoPrizes-Ticket-Farm/raw/master/csgoprizes-ticket-farm.user.js
// @downloadURL  https://github.com/DeathMiner/CsgoPrizes-Ticket-Farm/raw/master/csgoprizes-ticket-farm.user.js
// @supportURL   https://github.com/DeathMiner/CsgoPrizes-Ticket-Farm/issues
// ==/UserScript==

(function(window, document){
    /**
     * CP-FARM v1.0
     * Automatic ticket farm system.
     * By Death_Miner, MIT licensied
     *
     * https://github.com/DeathMiner/CsgoPrizes-Ticket-Farm
     **/

    /*
     * names: All farm names depending on the current website
     * name:  The current farm name
     * title: Sets the title of the page
     * popup: Shows a popup on the page
     */
    var names = {
            "csgoprizes.com": "CP-FARM",
            "leagueprizes.com": "LP-FARM"
        },
        name = names[window.location.host],
        title = function(text){
            document.title = "["+name+"] "+text;
            console.log("["+name+"] "+text);
        },
        popup = function(type, reason){
            var wrapper = document.createElement("div"),
                titles = {
                    "error": "Error:",
                    "success": "Success!"
                },
                backgrounds = {
                    "error": "#D83C3C",
                    "success": "#28AB38"
                };

            // Generate popup container & html
            wrapper.innerHTML = '<div class="popup" style="position:absolute;top:50%;left:50%;width:500px;height:200px;margin-top:-100px;margin-left:-250px;background:'+backgrounds[type]+';z-index:9999;border-radius:20px;color:#FFF;text-transform:uppercase;font-size:30px;text-align:center;padding:47px 20px;box-shadow:#000 0 5px 10px 0;"><strong>'+titles[type]+'</strong><br>'+reason+'</div><div class="backdrop" style="background:rgba(0, 0, 0, 0.8);position:absolute;top:65px;left:0;width:100%;height:100%;z-index:9998;"></div>';
            wrapper.id = name+"-POPUP";

            // Add popup to page
            document.body.appendChild(wrapper);
        };

    // Show the page is loading
    title("Loading page...");

    // Wait for DOM
    window.addEventListener("DOMContentLoaded", function(){

        // Show the page is loaded
        title("Page loaded!");

        // Check if we can add Tickets
        if(typeof addTicket === "function"){

            // Show we are initializing
            title("Initializing...")

            /*
             * shit:             All shitty elements to remove from the page
             * additionnal_time: How much we wait after countdown is finished
             * reloading:        If we are already reloading
             * start:            Start time (number of seconds)
             * update:           Runs every second to "spam" the server
             * refresh:          Refreshes the page
             */
            var shit = document.querySelectorAll("#content iframe, #content #pub, #content #karambit-ads-contest"),
                additionnal_time = 10,
                reloading = false,
                start = false,
                update = function(){

                    // "Spamming" only if we don't reload
                    if(reloading === false){
                        
                        // Get the current second (managed by the website's ticket script)
                        var sec = parseInt(document.querySelector("#ticketTimer").innerText, 10);
                        
                        // If start time not defined, define it!
                        if(start == false){
                            start = sec+1;
                        }
                        
                        // Check if additional time is needed
                        if(sec === 0){

                            // Show counter
                            title("-"+additionnal_time+"/"+start);
                            
                            // If additional time finished, reload to avoid big wait times
                            if(additionnal_time <= 0){
                                title("Server not responding...");
                                popup("error", "The ticket server is not responding, reloading...");
                                refresh();
                            }

                            // Increment counter
                            additionnal_time -= 1;
                        }
                        else{

                            // Show normal counter
                            title(sec+"/"+start);
                        }
                        
                        // If this element is hidden, 3 tickets has been added
                        if(document.querySelector(".bouton_get_tickets .cover").style.display == "none"){

                            // Reload
                            title("+3 tickets, reloading...");
                            popup("success", "3 tickets added, reloading page...");
                            refresh();
                        }
                        
                        // "Spam" the server to be the most ticket productive
                        addTicket();
                    }
                },
                refresh = function(){

                    // Set we are reloading
                    reloading = true;
                    window.location.reload();
                };

            // Remove each shit
            for (var i = shit.length - 1; i >= 0; i--) {
                shit[i].remove();
            };

            // Check if user is logged
            if(document.querySelectorAll("#steam-log").length == 0){

                // Start farm
                setInterval(update, 1000);
                title("Started!");
            }
            else{
                // Tell user to login
                title("Please login");
                popup("error", "Please login to continue farming...");
            }
        }
        else{
            // We can't add tickets, so the website's ticket script has not loaded
            // Check if it is a CF-DDOS Check
            if(document.querySelectorAll(".cf-browser-verification").length > 0){

                // Show it
                title("CF-DDOS Security, waiting...");
            }
            else{

                // Show the fatal error
                title("Fatal error, farm cannot work...");
                popup("error", "The farm cannot work on this page...");
            }
        }
    }, false);
    



    // Block adblock-blockers (wow!) to ensure the ticket script is running
    // We can replace the fuckAdBlock window instance with "true" on the website cause the code is shit, but let's do something that might not break if they do it right

    /**
     * FUCK FUCKADBLOCK v2.0
     * Acts like FuckAdBlock.js but always says that no adblock was detected.
     * By Mechazawa, WTFPl licensied
     *
     * https://github.com/Mechazawa/FuckFuckAdblock
     **/
    var FuckAdBlock = function(options) {
        if(options !== undefined) 
            this.setOption(options);

        var self = this;
        window.addEventListener('load', function() {
            setTimeout(function() {
                if(self._options.checkOnLoad === true)
                    self.check(false);
            }, 1);
        }, false);
    }

    FuckAdBlock.prototype = {
        setOption : function(options, value) {
            if(value !== undefined) {
                var key = options;
                options = {};
                options[key] = value;
            }

            for(option in options)
                this._options[option] = options[option];

            return this;
        },

        _options : {
            checkOnLoad:    true,
            resetOnEnd:     true
        },

        _var : {
            triggers: []   
        },

        check : function(ignore) {
            this.emitEvent(false);
            return true;
        },

        clearEvent : function() {
            this._var.triggers = [];
        },

        emitEvent : function(detected) {
            if(detected === false) {
                var fns = this._var.triggers;
                for(i in fns)
                    fns[i]();

                if(this._options.resetOnEnd === true)
                    this.clearEvent();
            }
            return this;
        },

        on : function(detected, fn) {
            if(detected === false)
                this._var.triggers.push(fn);
            return this;
        },

        onDetected : function(fn) {
            return this;
        },

        onNotDetected : function(fn) {
            return this.on(false, fn);
        }
    };

    window.fuckAdBlock = new FuckAdBlock();
})(window, document);