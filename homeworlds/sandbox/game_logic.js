
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

function piece_clicked(node){
    console.log('clicked',node)
}
