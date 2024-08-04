// Mostly stuff that the server takes care of on BGA
// Provide functions for the fsm to update variables, no interface stuff

var creation_complete = 0;
var sac_color = 0;
var sac_actions = 0;
var used_free = 0;
var on_move = 0;

// Number of systems created ever
var num_systems = 0;

function end_turn(){
    on_move = (on_move + 1) % num_players;
    if(!creation_complete && on_move!=0){
        // A creation just took place and there is at least one more to go
        change_state(STATE.CREATE_STAR);
    }
    else{
        change_state(STATE.EMPOWER);
    }
}

// Get the system containing this node, if any
function get_system(node){
    while(node != null && !node.classList.contains('system')){
        node = node.parentElement;
    }
    return node;
}

function get_size(piece){
    for(var size of sizes){
        if(piece.classList.contains(size)){
            return size;
        }
    }
    console.error(piece);
    alert('unknown size');
}

function get_size_complement(some_sizes){
    return sizes.filter(x => !some_sizes.includes(x));
}

function get_stars(system){
    return Array.from(system.querySelectorAll('.star'));
}

function get_star_sizes(system){
    return get_stars(system).map(get_size);
}

function get_connected_systems(system){
    var star_sizes = get_star_sizes(system);
    var systems = Array.from(document.querySelectorAll('.system'));
    var connected = [];
    var common;
    console.log('connectedness of',system);
    for(var sys of systems){
        // Star sizes in common
        common = star_sizes.filter(x => get_star_sizes(sys).includes(x));
        if(common.length == 0){
            systems.push(sys);
        }
        else
            console.log('not connected to ',sys,' due to ',common);
    }
    return connected;
}
