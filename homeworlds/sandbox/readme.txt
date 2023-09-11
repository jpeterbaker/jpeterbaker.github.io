This is meant to be a grand, glorious sandbox and position exploration tool.
This file has plans and design notes

Expected features:

Sandbox mode
    Free piece placement
    Rules ignored
Exploration mode
    BGA-like experience
    Rules enforced
    Recorded game history
        Any position may be revisited
        Memory of all tried alternatives
            Manual position removal possible
        Text area for writing notes on each position
        Option to designate each move as
            Text move, what "actually" happened
                If set in bold, it would follow chess custom
            Good play (!) or "good departure from text"
            Poor play (?) or "weak departure from text"
            Brilliant play (!!)
            Blunder (??)
            Dubious play (?!)
                Seems weak, but hard to be sure
                Technically bad but hard to refute
            Interesting play (!?)
                John Cooper's specialty ;-)
                Probably not the best, but mixes things up
            None of the above
Hotseat play mode (maybe this one isn't needed)
    Rules enforced
    No undo
    Optional timer
        Lots of configurations (I'm weirdly interested in game timers)
Copy-text exports and imports
    Position
        My own format
        HWL format
    History
        My own format
            Includes alternatives and comments
            Can use any position as starting point
        HWL format
            Would require that initial position be empty
        SDG format
        BGA format
        AP format

Logic outline

A global variable will track the current "mode"
    sandbox, exploration, or hotseat
A global variable will track the current "state"
    Like in BGA:
        Expecting star creation
        Expecting ship creation
        Expecting empower selection
        Expecting power
        Expecting target
        Expecting sacrifice action
        Expecting catastrophe selection
        Expecting turn end or restart
In explore mode, a global variable will track past states and their alternatives


modules
    setup.js
        put pieces in place and attach functions on page load and mode change
    turn_entry.js
        like client-side for BGA
        click handling for turn entry
        modify piece attributes like "selectable" to guide user
        create a "turn" structure that can be carried out elsewhere
    perform_turn.js
        take turn structure and carry it out
        update html tree
        perform animations
        modify piece attributes like "friendly" and "banked" to update graphics

