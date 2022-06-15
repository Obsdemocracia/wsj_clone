import React, { useState, useEffect } from 'react';
import Tweet from '../Tweet/Tweet';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
// import Tweet from '../Tweet/Tweet';


// eslint-disable-next-line no-unused-vars
const Scaffold = ({ odd }) => {

  const PAGE_SIZE = 5;

  const [tweets, setTweets] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [index, setIndex] = useState(PAGE_SIZE);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  useEffect(() => {
    fetchTweets();
    console.log('Fetched tweets');
  }, []);

  const fetchTweets = async () => {
    fetch('https://gist.githubusercontent.com/favalosdev/be710f1fc60ff42ce8d3c59171f23c1b/raw/25cea926d46d7dc9e70def4f699c0437e04fb1c5/reduced_test_tweets.json')
      .then((response) => {
        response.json()
          .then((data) => {
            setFiltered(data['id']);
            setTweets(data['id'].slice(0, PAGE_SIZE));
            setTimeout(() => {
              setButtonEnabled(true);
            }, 3000);
          })
          .catch((e) => {
            console.log('error', e);
          });
      })
      .catch((e) => {
        console.log('error', e);
      });
  };

  function getMoreData() {
    setButtonEnabled(false);
    if (filtered && index < filtered.length) {
      setTweets(tweets.concat(filtered.slice(index, index + PAGE_SIZE)));
      if (index + PAGE_SIZE < filtered.length) {
        setIndex(index + PAGE_SIZE);
      } else {
        setIndex(filtered.length);
      }
    }
    setTimeout(() => {
      setButtonEnabled(true);
    }, 3000);
    console.log('Loaded', tweets);
  }

  function show() {
    if (tweets) {
      return (
        <div>
          {tweets.map((id, idx) => {
            return (
              <div className='px-5 py-1' key={idx}>
                <TwitterTweetEmbed
                  tweetId={id}
                />
              </div>
            );
          })}
        </div>
      );
    }
  }

  function boton() {
    if (buttonEnabled) {
      return (
        <button className='btn btn-primary my-2 mx-2' onClick={getMoreData}>
          Cargar más Tweets
        </button>
      );
    }
    else {
      return (
        <h3>Cargando...</h3>
      );
    }
  }

  return (
    <>{show()}{boton()}</>
  );
};

export default Scaffold;