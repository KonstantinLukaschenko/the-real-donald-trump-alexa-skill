import { Skill, Intent, Launch, SessionEnded } from 'alexa-annotations';
import { say, ask } from 'alexa-response';
import ssml from 'ssml-jsx';
import { secrets } from '../config/secrets';

/**
 * The real donald trump class handling Alexa intents.
 */
@Skill({ logging: false, applicationId: secrets.applicationId })
export default class TheRealDonaldTrump {

    /**
     * Creates a new instance of the skill.
     * @type {object} attributes - the session attributes
     */
    constructor(attributes) {
      this.attributes = attributes || {};

      this.interjections = [
        'oh boy',
        'as you wish',
        'oh dear'
      ];

      this.tweets = [
        'President Obama - close down the flights from Ebola infected areas right now, before it is too late! What the hell is wrong with you?',
        'The U.S. cannot allow EBOLA infected people back. People that go to far away places to help out are great, but must suffer the consequences!',
        'If Obama resigns from office NOW, thereby doing a great service to the country. I will give him free lifetime golf at any one of my courses!',
        'Obama is, without question, the WORST EVER president. I predict he will now do something really bad and totally stupid to show manhood!',
        'MAKE AMERICA GREAT AGAIN!',
        'An extremely credible source has called my office and told me that Barack Obamas birth certificate is a fraud.',
        'I have never seen a thin person drinking Diet Coke.'
      ];

      this.card = {
          title: '@realDonaldTrump',
          content: '... provides you with the daily wisdom.',
      };
    }

    /**
     * Launch and help intent handler.
     */
    @Launch
    @Intent('AMAZON.HelpIntent', 'Unhandled')
    help() {
        return ask(
            <speak>
                This Alexa skill provides you with the daily wisdom by reading 
                tweets from the real Donald Trump. Ask me for some wisdom now.
            </speak>)
            .reprompt(
            <speak>
                Ask me for some wisdom!
            </speak>
            )
            .card(this.card)
            .build(this.attributes);
    }

     /**
     * The wisdom intent handler.
     */
    @Intent('Wisdom')
    wisdom() {
      return say(
          <speak>
              <say-as interpret-as="interjection">
                  {this.random(this.interjections)}
              </say-as>
              <break strength='strong' />
              {this.random(this.tweets)}
          </speak>)
          .card(this.card)
          .build(this.attributes);
    }

    /**
     * Intent handler for AMAZON.CancelIntent.
     */
    @Intent('AMAZON.CancelIntent')
    cancel() {
        return ask(
            <speak>
                Roger that! Ask me for more wisdom.
            </speak>)
            .reprompt(
            <speak>
                Ask me for more wisdom.
            </speak>)
            .card(this.card)
            .build(this.attributes);
    }

    /**
     * Intent handler for AMAZON.StopIntent.
     */
    @SessionEnded
    @Intent('AMAZON.StopIntent')
    stop() {
        return say(
            <speak>
                Ok, see you later!
            </speak>)
            .card(this.card)
            .build(this.attributes);
    }

    random(array) {
      return array[Math.floor(Math.random() * array.length)];
    }
}
