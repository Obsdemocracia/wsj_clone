import React, { useState, useEffect } from 'react';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
// import Tweet from '../Tweet/Tweet';


// eslint-disable-next-line no-unused-vars
const Scaffold = ({ data, filter, column, title }) => {

  const PAGE_SIZE = 5;

  const [tweets, setTweets] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [index, setIndex] = useState(PAGE_SIZE);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    let preFiltered = data.filter(element => { return element[filter] == 1 && element['apoyo'] == column; });
    setFiltered(preFiltered);
    setIndex(PAGE_SIZE);
    setButtonEnabled(false);
    if (tweets){
      setTweets(null);
      setTimeout(() => {
        setTweets(preFiltered.slice(0, PAGE_SIZE));
      }, 500);
    }
    else{
      setTweets(preFiltered.slice(0, PAGE_SIZE));
    }
    setTimeout(() => {
      setButtonEnabled(true);
    }, 3500);
    console.log('Cambio categoria', tweets);
  }, [filter]);


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
        tweets.map((tweet, idx) => {
          return (
            <div className='px-5 py-1' key={idx}>
              <TwitterTweetEmbed
                tweetId={tweet.id}
              />
            </div>
          );
        })
      );
    }
    else{
      return <></>;
    }
  }

  function boton() {
    if (filtered && index >= filtered.length) {
      return (
        <h4>Se han cargado todos los Tweets</h4>
      );
    }
    else if (buttonEnabled) {
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
    <><h2>{title}</h2>{show()}{boton()}</>
  );
};

export default Scaffold;