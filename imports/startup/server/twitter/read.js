import {Meteor} from 'meteor/meteor'
import {HTTP} from 'meteor/http'
import client from './client'
import Enterprises from '../../../api/enterprises/enterprises'
import Twits from '../../../api/twits/twits'

Meteor.startup(function () {
  console.log('andando')
  // Create the stream with Twitter
  // Traer empresas
  const enterprises = Enterprises.find().fetch()
  for (const enterprise of enterprises) {
    console.log(enterprise)
    getTweets(enterprise)
  }
})

function getTweets (enterprise, from) {
  console.log('el From', from)
  let query = !from ? {q: enterprise.username, count: 100} : {q: enterprise.username, count: 100, max_id: from}
  console.log(query)
  client.get('search/tweets', query, Meteor.bindEnvironment(function (error, tweets, response) {
    if (error) throw error
    console.log('returning', tweets.statuses.length)
    if (tweets.statuses.length === 0) {
      return
    }
    // Remove replies, and shit, keep only spanish
    for (const twit of tweets.statuses) {
      console.log(twit.id)
      if (twit.retweeted_status || twit.quoted_status || twit.in_reply_to_user_id || twit.in_reply_to_screen_name || twit.in_reply_to_status_id || twit.lang !== 'es') {
        console.log('leaving...')
        continue
      }

      const headers = {
        'Ocp-Apim-Subscription-Key': 'bf04079888aa4090aee0744c77fe913c',
        'Content-Type': 'application/json'
      }

      // sentiment
      const options = {
        data: {
          'documents': [
            {
              'language': 'es',
              'id': twit.id,
              'text': twit.text
            }
          ]
        },
        headers: headers
      }

      const sentiment = HTTP.call('POST', 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment', options)

      // keywords
      const options2 = {
        data: {
          'documents': [
            {
              'language': 'es',
              'id': twit.id,
              'text': twit.text
            }
          ]
        },
        headers: headers
      }

      const keywords = HTTP.call('POST', 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases', options2)

      const tweet = {
        id: twit.id,
        text: twit.text,
        language: twit.lang,
        date: new Date(twit.created_at),
        enterprise: enterprise._id,
        sentiment: sentiment.data.documents[0].score,
        keywords: keywords.data.documents[0].keyPhrases
      }
      // bindEnvironment
      const dbtwit = Twits.findOne({id: twit.id})
      if (dbtwit) {
        console.log('repeated')
        continue
      }
      Twits.insert(tweet)
    }
    console.log(tweets.search_metadata)
    let next = tweets.search_metadata.next_results
    if (!next) {
      return
    }
    next = next.replace('?max_id=', '').replace(`&q=${tweets.search_metadata.query}&include_entities=1`, '')
    console.log(next)
    getTweets(enterprise, next)
  }))
}
