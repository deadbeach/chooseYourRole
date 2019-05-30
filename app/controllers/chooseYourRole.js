/**
 *  chooseYourRole.js
 *
 *  The controller for the Choose Your Role quiz
 *
 *  @author  Dan McLoughlin <daniel@surfaceimprssion.digital>
 *  @package BHMM/chooseYourRole
 *  @version 1.0
 */

import ScoreBoard from 'chooseYourRole/scoreBoard';

// Encapsulate our code
(function( options ) {

    if ( application.state.guide == 'families' )
        $.sectionName.text = 'Families';

    $.roleQuestions.open();

    $.quiz.fetch( {
        success : ( collection, response, options ) => {

        	const questions = collection.where( { choose_your_role : 1 } );

            const scoreboard = new ScoreBoard( {
                canvas    : $.questionWrapper,
                questions : questions,
                cleanup   : cleanup,
            } );

            scoreboard.run();
        }
    } );

} )( arguments[ 0 ] || {} );

function cleanup() {

	$.destroy();
	$.off();

    $.getView().close();
}

$.cleanup = cleanup;
