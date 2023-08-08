
/*
Functions to convert between the various formats

SDG and HWL are notationally similar.
However, HWL
    doesn't support system names,
    requires keeping track of individual pieces,
    and requires an actual game state model.
The easiest translation sequence seems to be BGA -> SDG -> HWL
    The first translation reduces BGA's multi-line turns to single lines
    The second translation throws away system names and plays through the game
    while keeping a game state that includes individual piece tracking.
*/


function run_bga_conversions(){
    // Get the reduced BGA record
    var bga_lines = get_condensed_bga();

    // Put the reduced BGA record in the BGA field
    var text = bga_lines.join('<br>');
    document.getElementById('output_bga').innerHTML = text;

    // Show SDG version
    var sdg_lines = bga_to_sdg(bga_lines);
    text = sdg_lines.join('<br>');
    document.getElementById('output_sdg').innerHTML = text;

    // Show HWL version
    var hwl_lines = sdg_to_hwl(sdg_lines);
    text = hwl_lines.join('<br>');
    document.getElementById('output_hwl').innerHTML = text;
}

function run_sdg_conversions(){
    // Warn that conversion to BGA isn't supported
    document.getElementById('output_bga').innerHTML = 'SDG -> BGA has not been implemented';

    // Get SDG version from box
    var text = document.getElementById('record_input').value;
    var sdg_lines = text.split('\n');

    sdg_text = sdg_lines.join('<br>');
    document.getElementById('output_sdg').innerHTML = sdg_text;

    // Show HWL version
    var hwl_lines = sdg_to_hwl(sdg_lines);
    text = hwl_lines.join('<br>');
    document.getElementById('output_hwl').innerHTML = text;
}

/////////
// BGA //
/////////

// Lines matching these patterns should be removed
var bad_pats = [
    /Move \d+ :$/,
    /Change my preferences\.$/,
    /\d:\d\d:\d\d [AP]M$/,
];
var bga_pat_restart = /restarts their turn\.$/;
var bga_pat_end     = /ends their turn\.$/;

function get_condensed_bga(){
    // Get the text from the input
    // Incomplete turns at the end are not recorded
    // This automatically leaves off any end-of-game type notifications at the end
    var text = document.getElementById('record_input').value;
    var lines = text.split('\n');

    // Lines that remain after processing
    var blines = [];
    buffer = [];

    var i,j,good,line,match,buffer;
    for(i=0;i<lines.length;i++){
        line = lines[i];
        // good remains 1 if this line should be kept
        good = 1;
        for(j=0;j<bad_pats.length;j++){
            match = bad_pats[j].exec(line);
            if(match != null){
                // This line is bad
                good = 0;
                break;
            }
        }
        if(!good)
            continue;

        match = bga_pat_restart.exec(line);
        if(match != null){
            // This line says to restart turn
            buffer = [];
            continue;
        }

        match = bga_pat_end.exec(line);
        if(match != null){
            // This line says to end the turn
            for(j=0;j<buffer.length;j++){
                blines.push(buffer[j]);
            }
            blines.push(line);
            buffer = [];
            continue;
        }
        // The turn didn't just restart or end,
        // so just save this line in the turn buffer
        buffer.push(line);
    }
    return blines;
}

function bga_to_sdg(lines){
    var sdg = [];
    var i=0;
    while(i<lines.length){
        i += add_sdg_turn(i,lines,sdg);
    }
    return sdg;
}

/////////
// SDG //
/////////

var bga_pat_create = /(.*?) establishes a homeworld with a (..) ship at (..) and (..) binary stars\.$/

var bga_pat_build   = /builds a (..) ship in (.*)\./
var bga_pat_trade   = /trades a (..) ship for a (..) ship in (.*)\./
var bga_pat_move    = /moves a (..) ship from (.*?) to (.*)\./
var bga_pat_capture = /captures a (..) ship in (.*)\./

var bga_pat_discover    = /discovers a (..) system named (.*)\./
var bga_pat_fade        = /is forgotten\./
var bga_pat_sacrifice   = /sacrifices a (..) ship in (.*)\./
var bga_pat_catastrophe = /triggers a (\w+) catastrophe in (.*)\./

function add_sdg_turn(i0,lines,sdg_lines){
    // Starting with lines[i], convert the next turn to SDG format
    // and push the line to sdg_lines
    // Return the number of lines that were used to make the turn
    // (including the "ended their turn" line)
    var inc = 0;
    // Strings of actions that should be semicolon-separated
    var actions = [];

    var line,match,match2;
    // If a sacrifice takes place, keep track of how many actions are taken
    // so any extras can be explicitly passed
    var sac_actions = 0;
    while(i0 + inc<lines.length){
        line = lines[i0+inc];
        inc++;

        // End turn
        match = bga_pat_end.exec(line);
        if(match != null)
            break;

        // Creation
        match = bga_pat_create.exec(line);
        if(match != null){
            actions.push('homeworld '+match[3]+' '+match[4]+' '+match[2]+' '+system_sanitize(match[1]));
            // There is no "end turn" after creation, and passing is detected with inc==1,
            // so we need to stop now in creation case to avoid a false positive
            sdg_lines.push(actions[0]);
            return inc;
        }

        // Build
        match = bga_pat_build.exec(line);
        if(match != null){
            actions.push('build '+match[1]+' '+system_sanitize(match[2]));
            if(sac_actions>0)
                sac_actions--;
            continue;
        }

        // Trade
        match = bga_pat_trade.exec(line);
        if(match != null){
            actions.push('trade '+match[1]+' '+match[2]+' '+system_sanitize(match[3]));
            if(sac_actions>0)
                sac_actions--;
            continue;
        }

        // Move
        match = bga_pat_move.exec(line);
        if(match != null){
            // Discovery actions handled later
            actions.push('move '+match[1]+' '+system_sanitize(match[2])+' '+system_sanitize(match[3]));
            if(sac_actions>0)
                sac_actions--;
            continue;
        }

        // Capture
        match = bga_pat_capture.exec(line);
        if(match != null){
            actions.push('attack '+match[1]+' '+system_sanitize(match[2]));
            if(sac_actions>0)
                sac_actions--;
            continue;
        }

        // Discover
        match = bga_pat_discover.exec(line);
        if(match != null){
            // Move command is given on the next line
            line = lines[i0+inc];
            inc++;

            match2 = bga_pat_move.exec(line);
            actions.push('discover '+match2[1]+' '+system_sanitize(match2[2])+' '+match[1]+' '+match[2]);
            if(sac_actions>0)
                sac_actions--;
            continue;
        }

        // Fade
        match = bga_pat_fade.exec(line);
        if(match != null){
            continue;
        }

        // Sacrifice
        match = bga_pat_sacrifice.exec(line);
        if(match != null){
            actions.push('sacrifice '+match[1]+' '+system_sanitize(match[2]));
            // Record the number of sacrifice actions available
            sac_actions = match[1][1];
            continue;
        }

        // Catastrophe
        match = bga_pat_catastrophe.exec(line);
        if(match != null){
            actions.push('catastrophe '+system_sanitize(match[2])+' '+match[1]);
            continue;
        }

        console.error('Unknown action:',line);
    }

    while(sac_actions>0){
        actions.push('pass');
        sac_actions--;
    }
    if(inc == 1){
        sdg_lines.push('pass');
    }
    else{
        sdg_lines.push(actions.join(';'));
    }
    return inc;
}

var pat_hw    = /^Homeworld /;
var pat_space = / /g;

function system_sanitize(name){
    // Remove spaces and "Homeworld" from system names
    return name.replace(pat_hw,'').replaceAll(pat_space,'');
}

/////////
// HWL //
/////////

var sdg_pat_create = /^homeworld (..) (..) (..) (.*)$/

var sdg_pat_build   = /^build (..) (.*)$/
var sdg_pat_trade   = /^trade (..) (..) (.*)$/
var sdg_pat_move    = /^move (..) ([^ ]*) (.*)$/
var sdg_pat_capture = /^attack (..) (.*)$/

var sdg_pat_discover    = /^discover (..) ([^ ]*) (..) (.*)$/
var sdg_pat_sacrifice   = /^sacrifice (..) (.*)$/
var sdg_pat_catastrophe = /^catastrophe (.*) (\w+)$/

var sdg_pat_pass = /^pass$/

function sdg_to_hwl(lines){
    var state = hwl_state();
    var systems = {};

    // I'm not going to make the winner part of the record for now
    var hwl_lines = ['','Winner: none'];
    var i,result;
    for(i=0;i<lines.length;i++){
        result = sdg_to_hwl_turn(lines[i],state,systems,1+(i%2));
        hwl_lines.push(result);
    }
    // Get the player names
    var players = [lines[0].split(' ')[4] , lines[1].split(' ')[4]] 
    hwl_lines[0] = 'Players: '+players[0]+','+players[1];
    return hwl_lines;
}

function sdg_to_hwl_turn(turn,state,systems,player){
    // turn is an sdg turn description
    // state is an hwl game state
    // systems is a dictionary mapping system names to numbers
    // player is 1 or 2 (which is also the number of the player's homeworld)
    var actions = turn.split(';');
    var hwl_actions = [];
    var i,result;
    for(i=0;i<actions.length;i++){
        result = sdg_to_hwl_action(actions[i],state,systems,player);
        hwl_actions.push(result);
    }
    // Explicit passes in SDG log will be carried over
    // When importing, HWL appears to allow unused sacrifice actions to be explicitly passed,
    // even though this is not HWL convention for exports
    return hwl_actions.join(';');
}

function sdg_to_hwl_action(action,state,systems,player){
    var match;

    match = sdg_pat_create.exec(action);
    if(match != null){
        var star1 = hwl_bank_selection(match[1],state);
        var star2 = hwl_bank_selection(match[2],state);
        var ship  = hwl_bank_selection(match[3],state);
        var name  = match[4];

        hwl_add_system(name,systems);
        var sys = systems[name];

        hwl_set_system(star1,sys,state);
        hwl_set_system(star2,sys,state);
        hwl_set_system(ship ,sys,state);
        hwl_set_owner(ship,player,state);

        return ['h',star1,star2,ship,sys].join(',');
    }

    match = sdg_pat_build.exec(action);
    if(match != null){
        var ship = hwl_bank_selection(match[1],state);
        var sys  = systems[match[2]];

        hwl_set_system(ship ,sys,state);
        hwl_set_owner(ship,player,state);

        return ['b',ship,sys].join(',');
    }

    match = sdg_pat_trade.exec(action);
    if(match != null){
        var sys   = systems[match[3]];
        var ship1 = hwl_board_selection(match[1],sys,player,state);
        var ship2 = hwl_bank_selection(match[2],state);

        hwl_put_in_bank(ship1,state);
        hwl_set_system(ship2,sys,state);
        hwl_set_owner(ship2,player,state);

        return ['t',ship1,ship2].join(',');
    }

    match = sdg_pat_move.exec(action);
    if(match != null){
        var sys1 = systems[match[2]];
        var sys2 = systems[match[3]];
        var ship = hwl_board_selection(match[1],sys1,player,state);

        hwl_set_system(ship,sys2,state);

        hwl_fade_check(sys1,state);

        return ['m',ship,sys2].join(',');
    }

    match = sdg_pat_capture.exec(action);
    if(match != null){
        var sys  = systems[match[2]];
        var ship = hwl_board_selection(match[1],sys,3-player,state);

        hwl_set_owner(ship,player,state);

        return ['x',ship].join(',');
    }

    match = sdg_pat_discover.exec(action);
    if(match != null){
        var sys1 = systems[match[2]];

        var name = match[4];
        hwl_add_system(name,systems);
        var sys2 = systems[name];

        var ship = hwl_board_selection(match[1],sys1,player,state);
        var star = hwl_bank_selection(match[3],state);

        hwl_set_system(ship,sys2,state);
        hwl_set_system(star,sys2,state);

        hwl_fade_check(sys1,state);

        return ['d',ship,star].join(',');
    }

    match = sdg_pat_sacrifice.exec(action);
    if(match != null){
        var sys  = systems[match[2]];
        var ship = hwl_board_selection(match[1],sys,player,state);

        hwl_put_in_bank(ship,state);
        hwl_fade_check(sys,state);

        return ['s',ship].join(',');
    }

    match = sdg_pat_catastrophe.exec(action);
    if(match != null){
        var sys = systems[match[1]];
        var color = match[2][0].toLowerCase();

        hwl_catastrophe(sys,color,state);
        hwl_fade_check(sys,state);

        return ['c',color,sys].join(',');
    }

    match = sdg_pat_pass.exec(action);
    if(match != null){
        return 'pass';
    }

    console.error('Unknown action:',action);

}

function hwl_state(){
    // Make a beginning HWL state with all pieces in bank
    // This will be a little different from the "map" used by the site itself:
    // If a piece is banked, its attribute will be {at:null,owner:null}
    // rather than simply null
    // and "homeworldData" is not included
    var colors  = 'rygb';
    var sizes   = '123';
    var letters = 'ABC';

    state = {};

    var i,j,k;
    var color,letter,size;
    for(i=0;i<colors.length;i++){
        color = colors[i];
        for(j=0;j<sizes.length;j++){
            size = sizes[j];
            for(k=0;k<letters.length;k++){
                letter = letters[k];
                state[color+size+letter] = {at:null,owner:null};
            }
        }
    }
    return state;
}

function hwl_add_system(name,systems){
    var n = 0;
    var sys;
    for(sys in systems){
        if(systems[sys] > n)
            n = systems[sys];
    }
    n++;
    systems[name] = n;
}

function hwl_bank_selection(piece,state){
    // piece is a piece name like r2
    // Return the full name (like r2C) of a piece with the given type that
    // is currently in the bank
    var letters = 'ABC';
    var i,lpiece;
    for(i=0;i<3;i++){
        lpiece = piece+letters[i];
        if(state[lpiece].at == null)
            return lpiece;
    }
    return null;
}

function hwl_board_selection(piece,system,owner,state){
    var letters = 'ABC';
    var i,lpiece;
    for(i=0;i<3;i++){
        lpiece = piece+letters[i];
        if(state[lpiece].at == system && state[lpiece].owner==owner)
            return lpiece;
    }
    return null;
}

function hwl_catastrophe(system,color,state){
    // Execute a catastrophe
    var letters = 'ABC';
    var sizes = '123';
    var lpiece;
    var i,j;
    for(i=0;i<sizes.length;i++){
        size = sizes[i];
        for(j=0;j<letters.length;j++){
            letter = letters[j];
            lpiece = color+size+letter;
            if(state[lpiece].at==system)
                hwl_put_in_bank(lpiece,state);
        }
    }
}

function hwl_fade_check(sys,state){
    // If the system is lacking ships or lacking stars,
    // return remaining pieces to the bank
    var stars = [];
    var ships = [];
    var piece;
    for(piece in state){
        if(state[piece].at == sys){
            // This piece is in this system
            if(state[piece].owner == null){
                // This is a star
                stars.push(piece);
            }
            else{
                // This is a ship
                ships.push(piece);
            }
        }
    }
    if(stars.length == 0 || ships.length == 0){
        // System lacks stars and/or ships
        // Put all remaining pieces in the bank
        var i;
        for(i=0;i<stars.length;i++)
            hwl_put_in_bank(stars[i],state);
        for(i=0;i<ships.length;i++)
            hwl_put_in_bank(ships[i],state);
    }
}

function hwl_set_owner(piece,owner,state){
    state[piece].owner = owner;
}

function hwl_set_system(piece,system,state){
    state[piece].at = system;
}

function hwl_put_in_bank(piece,state){
    state[piece].at = null;
    state[piece].owner = null;
}

////////////////////
// Connect button //
////////////////////

document.getElementById('bga_button').onclick = run_bga_conversions;
document.getElementById('sdg_button').onclick = run_sdg_conversions;

