require('dotenv').config();
const request = require('postman-request');

const tmi = require('tmi.js');
const client = new tmi.Client({
	
	identity: {
		username: process.env.TWITCH_USERNAME,
		password: process.env.TWITCH_PASSWORD
	},
	channels: [ 'spikan', 'spiibot' ]
});
client.connect().catch(console.error);

client.on('message', (channel, tags, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '$spibot_run') {
		client.say(channel, 'Bot is on !');
    }
    
    if(message.toUpperCase().startsWith('$DMCA') && message.split(' ')[1] != undefined) {
        var input = message.split(' ')[1];
        
        if (input.startsWith('https://www.youtube.com') || input.startsWith('https://youtu.be')){

            request.post({url:'https://eproves.com/', form: {'searchBy':input}}, function (error, response, body) {
                //console.log('error:', error); // Print the error if one occurred
                //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                //console.log('body:', body); // Print the HTML for the Google homepage.

                let bodyResponseIndex = body.indexOf('permission__caption');

                let resultBegin = body.indexOf('>', bodyResponseIndex);
                let resultEnd = body.indexOf('<', bodyResponseIndex);
                let result = body.substring(resultBegin+1, resultEnd).trim()

                client.say(channel, result);
            });

        } else {
            return;
        }
        
		
	}
});