import 'babel-polyfill';
import Request from 'alexa-request';
import Skill from '../src/the-real-donald-trump';
import { expect } from 'chai';
import { stub } from 'sinon';
import { secrets } from '../config/secrets';

describe('TheRealDonaldTrump', () => {
    const session = { application: { applicationId: secrets.applicationId } };

    before(() => {
        stub(Math, 'random', () => {
          return 0.5;
        });
    });

    after(() => {
        Math.random.restore();
    });

    it('LaunchRequest', () => {
        const event = Request.session(session).launchRequest().build();
        return Skill(event).then(response => {
            expect(response).to.deep.equal({
              'response': {
                'card': {
                  'content': '... provides you with the daily wisdom.',
                  'title': '@realDonaldTrump',
                  'type': 'Simple'
                },
                'outputSpeech': {
                  'ssml': '<speak>This Alexa skill provides you with the daily wisdom by reading tweets from the real Donald Trump. Ask me for some wisdom now.</speak>',
                  'type': 'SSML'
                },
                'reprompt': {
                  'outputSpeech': {
                    'ssml': '<speak>Ask me for some wisdom!</speak>',
                    'type': 'SSML'
                  }
                },
                'shouldEndSession': false
              },
              'sessionAttributes': session,
              'version': '1.0'
            });
        });
    });

    it('Wisdom', () => {
        const event = Request.session(session).intent('Wisdom').build();
        return Skill(event).then(response => {
            expect(response).to.deep.equal({
              'response': {
                'card': {
                  'content': '... provides you with the daily wisdom.',
                  'title': '@realDonaldTrump',
                  'type': 'Simple'
                },
                'outputSpeech': {
                  'ssml': '<speak><say-as interpret-as=\"interjection\">as you wish</say-as><break time=\"2s\"/>Obama is, without question, the WORST EVER president. I predict he will now do something really bad and totally stupid to show manhood!</speak>',
                  'type': 'SSML'
                },
                'shouldEndSession': true
              },
              'sessionAttributes': session,
              'version': '1.0'
            });
        });
    });

    it('CancelIntent', () => {
        const event = Request.session(session).intent('AMAZON.CancelIntent').build();
        return Skill(event).then(response => {
            expect(response).to.deep.equal({
              'response': {
                'card': {
                  'content': '... provides you with the daily wisdom.',
                  'title': '@realDonaldTrump',
                  'type': 'Simple'
                },
                'outputSpeech': {
                  'ssml': '<speak>Roger that! Ask me for more wisdom.</speak>',
                  'type': 'SSML'
                },
                'reprompt': {
                  'outputSpeech': {
                    'ssml': '<speak>Ask me for more wisdom.</speak>',
                    'type': 'SSML'
                  }
                },
                'shouldEndSession': false
              },
              'sessionAttributes': session,
              'version': '1.0'
            });
        });
    });

    it('StopIntent', () => {
        const event = Request.session(session).intent('AMAZON.StopIntent').build();
        return Skill(event).then(response => {
            expect(response).to.deep.equal({
              'response': {
                'card': {
                  'content': '... provides you with the daily wisdom.',
                  'title': '@realDonaldTrump',
                  'type': 'Simple'
                },
                'outputSpeech': {
                  'ssml': '<speak>Ok, see you later!</speak>',
                  'type': 'SSML'
                },
                'shouldEndSession': true
              },
              'sessionAttributes': session,
              'version': '1.0'
            });
        });
    });
});
