// Mostly stuff that the client takes care of on BGA
// Move pieces, create systems and related nodes

var board = document.getElementById('board');
var sbar = document.getElementById('status_bar');
var pbox = document.getElementById('power_box');

function piece_clicked(node){
    if(!node.classList.contains('selectable')){
        return;
    }
    if(state == STATE.EMPOWER){
        node.setAttribute('activate','pending');
        active_ship = node;
        change_state(STATE.POWER);
    }
}

function stack_clicked(node){
    if(!node.classList.contains('selectable')){
        return;
    }
    var piece = node.children[0];
//    console.log('clicked',node,'in state',state);

    if(state == STATE.CREATE_STAR){
        var home = document.querySelector('.system[homeplayer_id="'+on_move+'"]');
        if(home == null){
            // This is the first star
            home = build_system(piece,'Home '+on_move,on_move);
            board.appendChild(home);
            change_state(STATE.CREATE_STAR);
        }
        else{
            // This is the second star
            var star_box = home.querySelector('.star_container');
            star_box.appendChild(piece);
            piece.classList.remove('banked');
            piece.classList.add('star');
            change_state(STATE.CREATE_SHIP);
        }
    }
    else if(state == STATE.CREATE_SHIP){
        var home = document.querySelector('.system[homeplayer_id="'+on_move+'"]');
        home.appendChild(piece);
        piece.classList.remove('banked');
        piece.classList.add('ship');
        if(on_move)
            piece.classList.add('hostile');
        else
            piece.classList.add('friendly');
        change_state(STATE.DONE);
    }
}

function system_clicked(node){
    if(!node.classList.contains('selectable')){
        return;
    }
}

function build_system(star,name,homeplayer=null){
    var system    = document.createElement('div');
    var star_box  = document.createElement('div');
    var label     = document.createElement('div');

    system.id = 'system_'+num_systems;
    system.setAttribute('class','system');
    system.setAttribute('onclick','system_clicked(this)');
    system.appendChild(star_box);
    if(homeplayer != null){
        system.setAttribute('homeplayer_id',homeplayer);
    }

    star_box.setAttribute('class','star_container');
    star_box.appendChild(label);
    star_box.appendChild(star);

    label.setAttribute('class','system_label');
    label.innerHTML = name;

    star.classList.remove('banked');
    star.classList.add('star');

    num_systems++;

    return system;
}

function set_message(s){
    sbar.innerHTML = s;
}

function highlight_bank(on,size=null){
    console.log('bank');
    if(!on){
        for(var stack of stacks){
            stack.classList.remove('selectable');
        }
        return;
    }
    var selector = '.piece';
    if(size != null){
        selector = '.'+size;
    }
    console.log(selector);
    for(var stack of stacks){
        if(stack.querySelector(selector)){
            stack.classList.add('selectable');
        }
    }
}

