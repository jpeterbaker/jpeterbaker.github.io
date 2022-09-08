
javascript:(function(){
    /* Start with defining helper functions and variables */

    /*///////
    // BGA //
    ///////*/

    /* Lines matching these patterns should be removed */
    var bad_pats = [
        /Move \d+ :$/,
        /Change my preferences\.$/,
        /\d:\d\d:\d\d [AP]M$/,
    ];
    var bga_pat_restart = /restarts their turn\.$/;
    var bga_pat_end     = /ends their turn\.$/;

    function get_condensed_bga(text){
        /* Get the text from the input
        Incomplete turns at the end are not recorded
        This automatically leaves off any end-of-game type notifications at the end */
        var lines = text.split('\n');

        /* Lines that remain after processing */
        var blines = [];
        buffer = [];

        var i,j,good,line,match,buffer;
        for(i=0;i<lines.length;i++){
            line = lines[i];
            /* good remains 1 if this line should be kept */
            good = 1;
            for(j=0;j<bad_pats.length;j++){
                match = bad_pats[j].exec(line);
                if(match != null){
                    /* This line is bad */
                    good = 0;
                    break;
                }
            }
            if(!good)
                continue;

            match = bga_pat_restart.exec(line);
            if(match != null){
                /* This line says to restart turn */
                buffer = [];
                continue;
            }

            match = bga_pat_end.exec(line);
            if(match != null){
                /* This line says to end the turn */
                for(j=0;j<buffer.length;j++){
                    blines.push(buffer[j]);
                }
                blines.push(line);
                buffer = [];
                continue;
            }
            /* The turn didn't just restart or end,
            so just save this line in the turn buffer */
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

    /*///////
    // SDG //
    ///////*/

    var bga_pat_create = /(.*?) establishes a homeworld with a (..) ship at (..) and (..) binary stars\.$/;

    var bga_pat_build   = /builds a (..) ship in (.*)\./;
    var bga_pat_trade   = /trades a (..) ship for a (..) ship in (.*)\./;
    var bga_pat_move    = /moves a (..) ship from (.*?) to (.*)\./;
    var bga_pat_capture = /captures a (..) ship in (.*)\./;

    var bga_pat_discover    = /discovers a (..) system named (.*)\./;
    var bga_pat_fade        = /is forgotten\./;
    var bga_pat_sacrifice   = /sacrifices a (..) ship in (.*)\./;
    var bga_pat_catastrophe = /triggers a (\w+) catastrophe in (.*)\./;

    function add_sdg_turn(i0,lines,sdg_lines){
        /* Starting with lines[i], convert the next turn to SDG format
        and push the line to sdg_lines
        Return the number of lines that were used to make the turn
        (including the "ended their turn" line) */
        var inc = 0;
        /* Strings of actions that should be semicolon-separated */
        var actions = [];

        var line,match,match2;
        /* If a sacrifice takes place, keep track of how many actions are taken
        so any extras can be explicitly passed */
        var sac_actions = 0;
        while(i0 + inc<lines.length){
            line = lines[i0+inc];
            inc++;

            /* End turn */
            match = bga_pat_end.exec(line);
            if(match != null)
                break;

            /* Creation */
            match = bga_pat_create.exec(line);
            if(match != null){
                actions.push('homeworld '+match[3]+' '+match[4]+' '+match[2]+' '+match[1]);
                /* There is no "end turn" after creation, and passing is detected with inc==1,
                so we need to stop now in creation case to avoid a false positive */
                sdg_lines.push(actions[0]);
                return inc;
            }

            /* Build */
            match = bga_pat_build.exec(line);
            if(match != null){
                actions.push('build '+match[1]+' '+system_sanitize(match[2]));
                if(sac_actions>0)
                    sac_actions--;
                continue;
            }

            /* Trade */
            match = bga_pat_trade.exec(line);
            if(match != null){
                actions.push('trade '+match[1]+' '+match[2]+' '+system_sanitize(match[3]));
                if(sac_actions>0)
                    sac_actions--;
                continue;
            }

            /* Move */
            match = bga_pat_move.exec(line);
            if(match != null){
                /* Discovery actions handled later */
                actions.push('move '+match[1]+' '+system_sanitize(match[2])+' '+system_sanitize(match[3]));
                if(sac_actions>0)
                    sac_actions--;
                continue;
            }

            /* Capture */
            match = bga_pat_capture.exec(line);
            if(match != null){
                actions.push('attack '+match[1]+' '+system_sanitize(match[2]));
                if(sac_actions>0)
                    sac_actions--;
                continue;
            }

            /* Discover */
            match = bga_pat_discover.exec(line);
            if(match != null){
                /* Move command is given on the next line */
                line = lines[i0+inc];
                inc++;

                match2 = bga_pat_move.exec(line);
                actions.push('discover '+match2[1]+' '+system_sanitize(match2[2])+' '+match[1]+' '+match[2]);
                if(sac_actions>0)
                    sac_actions--;
                continue;
            }

            /* Fade */
            match = bga_pat_fade.exec(line);
            if(match != null){
                continue;
            }

            /* Sacrifice */
            match = bga_pat_sacrifice.exec(line);
            if(match != null){
                actions.push('sacrifice '+match[1]+' '+system_sanitize(match[2]));
                /* Record the number of sacrifice actions available */
                sac_actions = match[1][1];
                continue;
            }

            /* Catastrophe */
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
        /* Remove spaces and "Homeworld" from system names */
        return name.replace(pat_hw,'').replaceAll(pat_space,'');
    }

    var logdiv = document.querySelector('#gamelogs');
    if(logdiv == null){
        logdiv = document.querySelector('#replaylogs');
    }
    if(logdiv == null){
        /* Helpful error message */
        alert("It doesn't look like you're on a BGA replay page");
    }

    var bga_lines = get_condensed_bga(logdiv.innerText);
    var sdg_lines = bga_to_sdg(bga_lines);

    navigator.clipboard.writeText(sdg_lines.join('\n'));

    return false;
}
)();

