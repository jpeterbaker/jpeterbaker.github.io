
function togglehist_button_clicked(button){
    var side = document.getElementById('side_panel');
    if(side.style.display == 'none')
        side.style.display = 'block';
    else
        side.style.display = 'none';
}

function pass_button_clicked(button){
    if(state == null || state == STATE.CREATE_STAR || state == STATE.CREATE_SHIP){
        set_message("You can't pass your first turn.");
        return;
    }
    end_turn();
}

