// Mostly stuff that the client takes care of on BGA

var board = document.getElementById('board');

function piece_clicked(node){
    if(!node.classList.contains('selectable')){
        return;
    }
    console.log('clicked',node);
}

function stack_clicked(node){
    if(!node.classList.contains('selectable')){
        return;
    }

    var piece = node.children[0];

    if(state == STATE.CREATE_STAR){
        var home = document.querySelector('.system[homeplayer_id="'+on_move+'"]');
        if(home == null){
            // This is the first star
            home = build_system(piece,'Home '+on_move,on_move);
            board.appendChild(home);
        }
        else{
            // This is the second star
            var star_box = home.querySelector('.star_container');
            star_box.appendChild(piece);
            piece.classList.remove('banked');
            piece.classList.add('star');
            state = STATE.CREATE_SHIP;
        }
    }
    else if(state == STATE.CREATE_SHIP){
        var home = document.querySelector('.system[homeplayer_id="'+on_move+'"]');
        home.appendChild(piece);
        piece.classList.remove('banked');
        piece.classList.add('ship');
        piece.classList.add('friendly');
        end_turn();
    }
}


function build_system(star,name,homeplayer=null){
    var system    = document.createElement('div');
    var star_box  = document.createElement('div');
    var label     = document.createElement('div');

    system.id = 'system_'+num_systems;
    num_systems++;

    system.setAttribute('class','system');
    star_box.setAttribute('class','star_container');
    label.setAttribute('class','system_label');

    label.innerHTML = name;

    star.classList.remove('banked');
    star.classList.add('star');

    system.appendChild(star_box);
    star_box.appendChild(label);
    star_box.appendChild(star);

    if(homeplayer != null){
        system.setAttribute('homeplayer_id',homeplayer);

    }
    return system;
}


