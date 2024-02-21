// Mostly stuff that the server takes care of on BGA
// but also client's state entry/exit functions

var STATE = {
    // Select a star during creation phase
    'CREATE_STAR':  0,
    // Select a ship during creation phase
    'CREATE_SHIP':  1,
    // Select a ship to empower or sacrifice
    // Catastrophe button available
    'EMPOWER':      2,
    // Waiting for power input (after selecting ship to empower)
    // Select a power for the empowered ship
    'POWER':        3,
    // Waiting for target input
    // Select the target of the power action, e.g., enemy ship
    'TARGET':       4,
    // Waiting for catastrophe input
    // Select an overpopulated piece to trigger catastrophe
    'CATASTROPHE':  5,
    'PASS':         6
};

var sac_color = 0;
var sac_actions = 0;
var used_free = 0;
var on_move = 0;

var state = STATE.CREATE_STAR;

// Number of systems created ever
var num_systems = 0;

function end_turn(){
    on_move = (on_move + 1) % num_players;
    if(state == STATE.CREATE_SHIP && on_move != 0){
        // A creation just took place and there is at least one more to go
        enter_create_star();
        state = STATE.CREATE_STAR;
    }
}

///////////////////////////
// State entry functions //
///////////////////////////

function enter_create_star(){
    for(var stack of stacks){
        stack.classList.add('selectable');
    }
}



