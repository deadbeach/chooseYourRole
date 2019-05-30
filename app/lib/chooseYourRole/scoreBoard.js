/**
 *  Tracking the scoring for the `choose your role` quiz
 *
 *  @author  Dan McLoughlin <daniel@surfaceimpression.digital>
 *  @package BHMM/chooseYourRole
 *  @version 1.0
 */

import { application } from 'Application';

export default class Scoreboard {

    constructor( options ) {

        /**
         *  Pass a view to use as the canvas
         *
         *  @type {Object} Ti.UI.View
         */
        this.canvas = options.canvas;

        /**
         *  Pass the questions collection
         *
         *  @param {Array} The collection of questions
         */
        this.questions = options.questions;

        /**
         *  How many questions have been answered?
         *
         *  @param {Integer}
         */
        this.answeredQuestions = 0;

        /**
         *  Window management callback
         *
         *  @param {Function} cleanup The cleanup callback
         */
        this.cleanup = options.cleanup;

        /**
         *  Keep track of the weighting of the answers
         *
         *  How to read scoring...
         *
         *  {role} : {
         *      {question_number} : {
         *          0 : x,  // 0 == answered no,  x == score
         *          1 : y,  // 1 == answered yes, y == score
         *      }
         *  }
         *
         *  Using question 1 and `pilot` as example:
         *
         *  1 : { 0 : 7, 1 : 1, },
         *
         *  Question 1:
         *      No  : 7 points
         *      Yes : 1 points
         */
        this.scoring = {
            'pilot' : {
                1 : { 0 : 7, 1 : 1, },
                2 : { 0 : 1, 1 : 7, },
                3 : { 0 : 5, 1 : 3, },
                4 : { 0 : 7, 1 : 1, },
                5 : { 0 : 2, 1 : 6, },
                6 : { 0 : 6, 1 : 2, },
                7 : { 0 : 4, 1 : 4, },
                8 : { 0 : 3, 1 : 5, },
            },
            'ground_crew' : {
                1 : { 0 : 6, 1 : 2, },
                2 : { 0 : 2, 1 : 6, },
                3 : { 0 : 4, 1 : 4, },
                4 : { 0 : 1, 1 : 7, },
                5 : { 0 : 6, 1 : 2, },
                6 : { 0 : 3, 1 : 5, },
                7 : { 0 : 6, 1 : 2, },
                8 : { 0 : 1, 1 : 7, },
            },
            'fighter_plotter' : {
                1 : { 0 : 5, 1 : 3, },
                2 : { 0 : 3, 1 : 5, },
                3 : { 0 : 2, 1 : 6, },
                4 : { 0 : 7, 1 : 1, },
                5 : { 0 : 6, 1 : 2, },
                6 : { 0 : 1, 1 : 7, },
                7 : { 0 : 2, 1 : 6, },
                8 : { 0 : 7, 1 : 1, },
            },
            'intelligence_officer' : {
                1 : { 0 : 4, 1 : 4, },
                2 : { 0 : 6, 1 : 2, },
                3 : { 0 : 1, 1 : 7, },
                4 : { 0 : 6, 1 : 2, },
                5 : { 0 : 2, 1 : 6, },
                6 : { 0 : 4, 1 : 4, },
                7 : { 0 : 2, 1 : 6, },
                8 : { 0 : 5, 1 : 3, },
            },
            'communications_officer' : {
                1 : { 0 : 6, 1 : 2, },
                2 : { 0 : 4, 1 : 4, },
                3 : { 0 : 1, 1 : 7, },
                4 : { 0 : 5, 1 : 3, },
                5 : { 0 : 3, 1 : 5, },
                6 : { 0 : 2, 1 : 6, },
                7 : { 0 : 3, 1 : 5, },
                8 : { 0 : 7, 1 : 1, },
            },
            'deputy_controller' : {
                1 : { 0 : 4, 1 : 4, },
                2 : { 0 : 3, 1 : 5, },
                3 : { 0 : 5, 1 : 3, },
                4 : { 0 : 7, 1 : 1, },
                5 : { 0 : 1, 1 : 7, },
                6 : { 0 : 2, 1 : 6, },
                7 : { 0 : 1, 1 : 7, },
                8 : { 0 : 6, 1 : 2, },
            },
            'observer_corps' : {
                1 : { 0 : 6, 1 : 2, },
                2 : { 0 : 3, 1 : 5, },
                3 : { 0 : 7, 1 : 1, },
                4 : { 0 : 4, 1 : 4, },
                5 : { 0 : 3, 1 : 5, },
                6 : { 0 : 1, 1 : 7, },
                7 : { 0 : 5, 1 : 3, },
                8 : { 0 : 2, 1 : 6, },
            },
            'army_corporal' : {
                1 : { 0 : 1, 1 : 7, },
                2 : { 0 : 6, 1 : 2, },
                3 : { 0 : 4, 1 : 4, },
                4 : { 0 : 2, 1 : 6, },
                5 : { 0 : 5, 1 : 3, },
                6 : { 0 : 2, 1 : 6, },
                7 : { 0 : 7, 1 : 1, },
                8 : { 0 : 1, 1 : 7, },
            },
        };

        /**
         *  Track the scores for each role
         *
         *  Each time an answer is selected, the relevant
         *  score of the answer is added to the role
         */
        this.scoreBoard = {
            'pilot'                  : 0,
            'ground_crew'            : 0,
            'fighter_plotter'        : 0,
            'intelligence_officer'   : 0,
            'communications_officer' : 0,
            'deputy_controller'      : 0,
            'observer_corps'         : 0,
            'army_corporal'          : 0,
        };
    }

    /**
     *  Starts a self contained loop that will continue
     *  until all questions have been asked.
     *
     *  This is how it works:
     *
     *  The click handler is attached the the wrapper
     *  The handler waits for a click event bubbling up
     *  When it receives one, it records the answer and
     *      moves onto the next question
     *  If all questions have been answered, break out of
     *      the event and open the result window
     *
     */
    run( ) {

        let self = this;

        const clickLoop = this.coroutine( function* () {

            var event;

            while ( event = yield ) {

                if ( event.type != 'click' ) continue;

                // Ignore any clicks that are not hitting our targets
                if ( ! ( event.source.questionID || event.source.answer ) )
                    continue;

                // Should this go here?
                if ( ++self.answeredQuestions == self.questions.length ) break;

                self.updateScore( event.source.questionID, event.source.answer );
                self.buildQuestion( event.source.questionID ); //not zero indexed
            }

            /**
             *  After all the questions have been answered,
             *  close down and deallocate
             */

            let role = self.chooseRole();

            application.setState( 'role', role );

            application.windows.addWindow( 'school/findYourRoleResults', 'findYourRoleResults', {}, self.cleanup );

            self.canvas.removeEventListener( 'click', clickLoop );

            self.canvas = null;
            self = null;
        } );

        this.canvas.addListener( 'click', clickLoop );

        this.buildQuestion( 0 );
    }

    /**
     *  Builds the question, based on the passed ID
     *
     *  @param  {Object}  question The question
     *
     *  @return {Object}  The XML markup of the question /
     *                    The build views for the question
     */
    buildQuestion( questionID ) {

        // Zero indexed array
        const question = this.questions[ questionID ];

        // Make sure we have a question to ask...
        if ( typeof question == 'undefined' ) return;

        /**
         *  TODO: style better
         */
        const questionParentWrapper = Ti.UI.createView( {
            classes     : [ 'question-parent-wrapper' ],
            top         : 0,
            right       : 0,
            bottom      : 0,
            left        : 0,
            width       : Ti.UI.FILL,
            height      : Ti.UI.FILL
        } );

        const questionLabel = Ti.UI.createLabel( {
            top     : 0,
            height  : Ti.UI.SIZE,
            text    : question.get( 'choose_your_role_order' ) + ': ' + question.get( 'post_title' ),
            classes : [ 'question' ],
            color   : Alloy.Globals.green,
            font    : {
                fontSize   : Alloy.Globals.headingSize,
                fontFamily : Alloy.Globals.schoolsFontBold,
            },
        } );

        const answerWrapper = Ti.UI.createView( {
            classes : [ 'answer-wrapper' ],
            right   : 0,
            left    : 0,
            bottom  : 0,
            layout  : 'horizontal',
            width   : Ti.UI.FILL,
            height  : Ti.UI.SIZE,
        } );

        const yesButton = Ti.UI.createLabel( {
            width        : '40%',
            left         : "5%",
            height       : 50,
            text         : 'Yes',
            color        : '#000',
            answer       : 1,
            questionID   : question.get( 'choose_your_role_order' ),
            textAlign    : "center",
            top          : 0,
            borderWidth  : 2,
            borderColor  : "#000",
            borderRadius : 500,
            font         : {
                fontFamily: Alloy.Globals.gillSans,
                fontSize  : Alloy.Globals.introSize
            }
        } );

        const noButton = Ti.UI.createLabel( {
            width        : '40%',
            left         : "10%",
            height       : 50,
            text         : 'No',
            color        : '#000',
            answer       : 0,
            questionID   : question.get( 'choose_your_role_order' ),
            textAlign    : "center",
            top          : 0,
            borderWidth  : 2,
            borderColor  : "#000",
            borderRadius : 500,
            font         : {
                fontFamily : Alloy.Globals.gillSans,
                fontSize   : Alloy.Globals.introSize
            }
        } );

        answerWrapper.add( yesButton );
        answerWrapper.add( noButton );

        questionParentWrapper.add( questionLabel );
        questionParentWrapper.add( answerWrapper );

        // TODO: add a transition...
        // Remove the contents of the previous question:
        if ( this.canvas.children ) {

            this.canvas.removeAllChildren();
        }

        this.canvas.add( questionParentWrapper );
    }

    /**
     *  Updates the score based on the answered question
     *
     *  @param {Integer} questionID The ID of the question
     *  @param {Integer} answer     The index of the answer
     */
    updateScore( questionID, answer ) {

        if ( ! ( 0 === answer || 1 === answer ) ) answer = ( !! answer ) ? 1 : 0;

        for ( let role in this.scoring ) {

            this.scoreBoard[ role ] += this.scoring[ role ][ questionID ][ answer ];
        }

        console.log( '<< scoreBoard::updateScore >>' );
        console.log( this.scoreBoard );
        console.log( '<< // scoreBoard::updateScore >>' );
    }

    /**
     *  Return the role with the highest score
     *
     *  TODO: handle tied roles and scores?
     *
     *  @return {String} role
     */
    chooseRole(  ) {

        // look at $.tallest() for concise code ideas

        let chosenRole   = '';
        let highestScore = 0;

        let tiedRoles = [];

        for ( let role in this.scoreBoard ) {

            if ( this.scoreBoard[ role ] > highestScore ) {

                highestScore = this.scoreBoard[ role ];
                chosenRole   = role;
            }
        }

        return chosenRole;
    }

    /**
     *  A coroutine wrapper
     *
     *  @param  {Function} f The coroutine function
     *  @return {Function}   A wrapper for `next()`
     */
    coroutine( f ) {

        // instantiate the coroutine
        let o = f();

        // execute until the first `yield`
        o.next();

        return function( x ) {

            // executes until the next `yeild`
            o.next( x );
        }
    }
}
