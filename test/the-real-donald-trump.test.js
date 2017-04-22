import 'babel-polyfill';
import Request from 'alexa-request';
import Skill from '../src/the-real-donald-trump';
import chai from 'chai';
import sinon from 'sinon';
import { secrets } from '../config/secrets';

describe('TheRealDonaldTrump', function() {
    const session = { application: { applicationId: secrets.applicationId } };

    before(function() {
        sinon.stub(Math, 'random', function() {
          return 0.5;
        });
    });

    after(function() {
        Math.random.restore();
    });

    it('LaunchRequest', function() {
        const event = Request.session(session).launchRequest().build();
        return Skill(event).then(response => {
            chai.expect(response).to.deep.equal({
              'response': {
                'card': {
                  'content': '... provides you with the daily wisdom.',
                  'title': '@realDonaldTrump',
                  'type': 'Simple'
                },
                'outputSpeech': {
                  'ssml': '<speak>This Alexa skill provides you with the daily wisdom by reading tweets from the real donald trump. Ask me for some wisdom now.</speak>',
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

    it('Wisdom', function() {
        const event = Request.session(session).intent('Wisdom').build();
        return Skill(event).then(response => {
            chai.expect(response).to.deep.equal({
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

    it('CancelIntent', function() {
        const event = Request.session(session).intent('AMAZON.CancelIntent').build();
        return Skill(event).then(response => {
            chai.expect(response).to.deep.equal({
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

    it('StopIntent', function() {
        const event = Request.session(session).intent('AMAZON.StopIntent').build();
        return Skill(event).then(response => {
            chai.expect(response).to.deep.equal({
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
