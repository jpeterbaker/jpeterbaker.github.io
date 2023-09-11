
/*
Here's a cheatsheet for the structure of systems and pieces

jstpl_homesystem
<div class='HWsystem' id='HWsystem_${system_id}' homeplayer_id='${homeplayer_id}'>
    <div class='HWstar_container'>
        <div class='HWsystem_label'>
            Homeworld so-and-so
        </div>
    </div>
</div>

jstpl_system
<div class='HWsystem' id='HWsystem_${system_id}' homeplayer_id='none'>
    <div class='HWstar_container'>
        <div class='HWsystem_label'>
            System name
        </div>
    </div>
</div>

jstpl_piece
<div class='HWpiece HW${colorname} HW${pipsname} ${more_classes}' id='HWpiece_${piece_id}' ptype='${colornum}_${pipsnum}'>
    <div class='HWcolor_symbol HWsymbol_${colorname}'>
    </div>
</div>

jstpl_legend_label
${colorname_local}<div class='HWcolor_symbol HWsymbol_${colorname_eng}'>
</div>
<br>
${actionname};
*/

STATE = {
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

sac_color = 0;
sac_actions = 0;
used_free = 0;

state = STATE.CREATE;


function piece_clicked(node){
    console.log('clicked',node)
}
