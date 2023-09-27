// Mostly stuff that the server takes care of on BGA

var STATE = {
    // Select a star during creation phase
    'CREATE_STAR':  0,
    // Select a ship during creation phase
    'CREATE_SHIP':  1,
    // Select a ship to empower or sacrifice
    // Catastrophe button available
    'EMPOWER':      2,
    // Select a power for the empowered ship
    'POWER':        3,
    // Select the target of the power action, e.g., enemy ship
    'TARGET':       4,
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

///////////////////////////
// State entry functions //
///////////////////////////

function enter_create_star(){
    for(var stack of stacks){
        stack.classList.add('selectable');
    }
}

