This is meant to be a grand, glorious sandbox and position exploration tool.

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
            Book (what "actually" happened)
            Good play
            Uncertain
            Blunder
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
        Creation
        Expecting empower selection
        Expecting power
        Expecting target
        Expecting sacrifice action
        Expecting catastrophe selection

