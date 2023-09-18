// Mostly stuff that the client takes care of on BGA

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
    if(state == STATE.CREATE_STAR){
        var home = document.querySelector('.system[homeplayer_id="'+on_move+'"]');
        if(home == null){
            // This is the first star
            add_system(node,'Home '+on_move,on_move);
        }
    }
}

function add_system(star,name,homeplayer=null){
    console.log('Creating system',name)
    console.log('with star',star)
    console.log('and homeplayer',homeplayer)
}


