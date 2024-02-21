
    setup: function(gamedatas)
    // Put pieces on board
    // Connect pieces, stacks, and token to functions

    setup_action_buttons: function(){
    /*
    Connect action buttons to their functions
    'HWcatastropheButton'
    'HWsacrificeButton'  
    'HWpassButton'       
    'HWdrawButton'       
    'HWrestartButton'    
    'HWcancelButton'     
    */
    }
    setup_pieces: function(gamedatas){
        // Create the systems and piece nodes

        // If colonies already existed,
        // they were placed according to old colony assignments
        // It's not enough to just remake colony assignments
        this.arrange_colonies();
    },

    arrange_colonies: function(){
        // Rearrange colonies when home system connectivity may have changed
        this.setup_colony_assignments();
        // Put systems in correct colony rows
    }

    clear_all: function(){
        // Delete all pieces and systems
    },

    onEntering_want_creation: function(args){
        // Make stacks selectable
    },

    onEntering_client_want_creation_ship: function(args){
        // Make stacks selectable
    },

    onEntering_client_want_creation_confirmation: function(args){
        // Start animating token
    },

    onEntering_want_free: function(args){
        // Make friendly ships and capturable enemy ships selectable
    },

    onEntering_want_sacrifice_action: function(args){
        // Make friendly ships selectable
        // (and capturable enemy ships if the power is red)
    },

    onEntering_client_want_power: function(args){
        // In system of empowered ships, make star and friendly ships selectable
    },

    onEntering_want_restart_turn: function(args){
        // Start animating turn token
    },

    onEntering_client_want_target: function(args){
        // Find empowered ship at the selected power
        // Make valid targets selectable
        // Red: no-larger enemy ships in same system
        // Yellow: connected systems
        // Blue: non-empty stacks of same-size but different-colored ships
    },

    onEntering_client_want_catastrophe_target: function(args){
        // Make overpopulated ships selectable and jiggly
    },

    power_targets: function(activatednode,power){
        // Get valid targets targets 
    },

    accept_one_click_capture: function(){
        // Is one-click capture on?
    },

    prep_quick_capturables: function(){
        // Make all capturable enemy ships selectable
    },

    get_captures: function(){
        // Get NodeList of capturable ships
        // In want_free state, check ship ownership, size, and access to red power
        // In want_sacrifice_action state, check ship ownership and size
        // In want_target state, check ship ownership and size in that system
    },

    get_overpopulated_pieces: function(){
        // Get a list of overpopulated pieces
    },

    onLeaving_client_want_creation_confirmation: function(){
        // Stop highlighting token
    },
    onLeaving_client_want_creation_ship: function(){
        this.deselect_all();
    },
    onLeaving_want_free: function(){
        this.deselect_all();
    },
    onLeaving_want_sacrifice_action: function(){
        this.deselect_all();
    },
    onLeaving_client_want_power: function(){
        this.deselect_all();
        // Hide power buttons
    },
    onLeaving_client_want_target: function(){
        this.deselect_all();
        this.deactivate_all();
    },
    onLeaving_client_want_catastrophe_target: function(args){
        this.deselect_all();
        // Remove overpopulated class
    },
    onLeaving_want_restart_turn: function(){
        this.deselect_all();
        // Stop highlighting token
    },

    // onUpdateActionButtons:
    // in this method you can manage "action buttons" that are displayed in the
    // action status bar (ie: the HTML links in the status bar).

    onUpdateActionButtons: function( state_name, args ) {
        // This function gets called just before onEnteringState with the same parameters.
        // Lots of cases for setting up buttons to cancel, pass, draw, etc.
    },

    setup_draw_button: function(args){
        // Put "offer draw" or "cancel draw offer" or "accept draw" on the button
    },

    show_button_box: function(){
        // Show the power button box and make every button's state
        // correspond to its availability in the system
    },

    power_button_clicked: function(evt){
        // Check for availability and then...
        this.power_selected(color);
    },

    ///////////////////////////////////////////////////
    //// Utility methods

    get_color: function(piecenode)
    get_size: function(piecenode)
    get_id: function(piecenode)
    get_system: function(piecenode){
        // Get the system node containing this piece

    get_largest_friendly: function(system){
        // Largest friendly ship node in the system
        // null if there are no friendly ships in the system

    get_captures_local: function(system,size){
        // Hostile ships no bigger than size in system

    setup_colony_assignments: function(){
        // Set up the global variable this.colony_assignments
        // Complex function with lots of loops and cases

    set_turn_checkpoint: function(args,state_name){
        // Remember server state for easy partial action canceling

    get_piece_in_stack: function(stacknode){
        /*
        Return a piecenode in this stack node
        The piece is NOT removed from the stack
        For consistency, the lowest-index piece is returned
        (this can prevent soft-lock during tutorials).
        */

    put_in_bank: function(piecenode){
        // Return the piece to the bank

    setup_system: function(system){
        // Make a system at setup from JSON object (creating new pieces)

    setup_piece: function(piece,more_classes,container){
        // Create new piece node

    ajaxcallwrapper: function(action, args, err_handler) {
        // this allows to skip args parameter for action which do not require them

    place_animation_marker: function(piecenode,old=true){
        /*
        Create and return an un-displayed node that is in the location of the given node.
        The given node can then be moved in the DOM tree and then animated to/from
        the un-displayed node to its new location

        If old is set to true, piecenode is going to be taken from the DOM tree,
        so the marker needs to save the spot in the DOM tree.
        If old is false, the piecenode is already in the new place in the DOM tree,
        so the marker needs to save the new display location and its place in the DOM tree doesn't matter.

        The markers should be destroyed when unneeded to avoid (small) memory leaks.
        Destruction will be performed by slide_between if marker is passed
        */

    slide_between: function(node,origin,target,delay=0,remove_markers=true){
        /*
        Run an animation moving a node from origin (a node) to target (a node)
        The moving node should already be in the desired place in the DOM tree

        origin and target nodes will be deleted when animation is complete
        */

    place_ship: function(piecenode,targetnode,owner_id=null){
        /*
        Place a ship in a system and update classes as appropriate
        piecenode: the piece node that should be placed as a ship
        targetnode: the node where piecenode should be placed
            If this is a system, piecenode will become a child of targetnode
            If this is a ship, piecenode will be placed before targetnode as a sibling 
            (this parameter is not used if neighbor is provided)
            (if neighbor is not provided, then systemnode must be)
        owner_id: the ID of the player who should own the ship
            (if null, the HWfriendly and HWhostile classes will not be modified)
        */

    place_star: function(piecenode,systemnode){
        // Place the given piece as a star in the given system

    place_system: function(system_id,system_name,homeplayer_id=null,star_size=null){
        // Create a system node in the correct container and connect system click function

    on_system_change:function(systemnode){
        // Make sure the correct friendly/hostile class is in place for each system

    selectablize_token: function(){
        // Make token selectable

    update_token: function(){
        // Move the token to the NEXT player
        // This should be called before the state transition
        // (e.g. by the pass notification)
        // because the player AFTER the active player gets the token

    connected_systems: function(systemnode){
        // Get an array of connected system nodes

    connected_stacks: function(systemnode){
        // Get an array of bank stacks that are not empty
        // and whose pieces are connected to the given system

    get_bot_player: function(){
    get_top_player: function(){

    deselect_all: function(){
        // Remove selectable class from everything

    deactivate_all: function(){
        // Remove activate attribute from everything

    ///////////////////////////////////////////////////
    //// Player's action

    // Graphical elements clicked, determine action by current state
    piece_clicked: function(evt){
        // According to current state call one of
        this.activate_ship(node);
        this.power_selected(this.get_color(node));
        this.target_selected(node);
        this.activate_ship(node,color);
        this.catastrophe_target_selected(node);

    stack_clicked: function(evt){
        // According to current state call one of
        this.stack_selected_star_creation(node);
        this.stack_selected_ship_creation(node);
        this.target_selected(node);

    system_clicked: function(evt){
        // Check for want-target state and then
        this.target_selected(node);

    token_clicked: function(evt){
        this.pass_button_selected();

    stack_selected_star_creation: function(stacknode){
        // Find or create player's home system and add the star

    stack_selected_ship_creation: function(stacknode){
        // Find player's home system and add the ship

    finalize_creation: function(){
        // Send creation action to server

    restart_creation: function(){
        // Put pieces back, return to star selection

    cancel_action: function(){
        this.deselect_all();
        this.deactivate_all();
        // Put pieces how they were at the start of the turn

    activate_ship: function(shipnode,color=null){
        // "Activating" a hostile ship means they're trying to capture it
        // If in free state, prepare to ask which power they want
        // If a ship has been sacrificed, give that power to this ship
        // (asking for target is usually next)

    power_selected: function(color){
        // Give the selected power to the ship
        // Go to want_target state, unless the power is green
        // in which case, just perform the build

    catastrophe_target_selected: function(targetnode){
        // Send the catastrophe to the server

    target_selected: function(targetnode){
        // Send the action on the target to the server

    sacrifice_button_selected: function(){
        // Send sacrifice to the server

    catastrophe_button_selected: function(){
        // Send catastrophe to the server

    sacrifice_choice_available: function(){
        // This is called when player tries to pass with sacrifice actions left
        // Return true if there are places to use those actions.
        // Return false if the actions can't be used
        // (Only actually implemented for red, since it is by far the most
        // common color to not be able to use)

    pass_button_selected: function(){
        // Complex function with lots of cases
        // If there's an issue (like a weird homeworld or actions still available),
        // then give a warning and ask for confirmation
        // Then send the end-turn signal to the server
        // Uses end_turn_with_self_elim_check

    end_turn_with_self_elim_check: function(){
        // Check for self-elimination and call server if approved

    restart_button_selected: function(){
        // Send restart signal to server

    draw_button_selected: function(){
        // Complex function with lots of cases
        // Send draw, offer, or cancel-draw signal to server

    ///////////////////////////////////////////////////
    //// Reaction to cometD notifications

    setupNotifications: function() {
        /*
        setupNotifications:

        In this method, you associate each of your game notifications
        with your local method to handle it.

        Note: game notification names correspond to
        "notifyAllPlayers" and "notifyPlayer" calls in
        your homeworlds.game.php file.
        */

    ignore_notif: function(notif){
        // Just nothing, literally an empty function body

    // Carry out the action indicated by the notif
    create_from_notif: function(notif){
    fade_from_notif: function(notif){
    move_from_notif: function(notif){
    discover_from_notif: function(notif){
    build_from_notif: function(notif){
    trade_from_notif: function(notif){
    sacrifice_from_notif: function(notif){
    catastrophe_from_notif: function(notif){
    restart_from_notif: function(notif){

