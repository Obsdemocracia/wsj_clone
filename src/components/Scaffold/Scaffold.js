import React, { useState, useEffect } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import InfiniteScroll from 'react-infinite-scroll-component';
import shuffle from '../../utils/shuffle';

import './Scaffold.scss';

const Scaffold = ({ data, title, leaning, filter }) => {
  const PAGE_SIZE = 5;
  
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    shuffle(data);
    setTweets(data.slice(0, PAGE_SIZE));
  }, [filter]);

  const getMoreTweets = () => {
    console.log('Getting more tweets...');
    setTweets(data.slice(0, tweets.length + PAGE_SIZE));
  };
  
  const renderTweets = () => {
    if (tweets.length > 0) {
      return(
        <InfiniteScroll
          dataLength={tweets.length}
          next={getMoreTweets}
          hasMore={true}
          loader={<p> Cargando tweets </p>}
          scrollableTarget="scrollableDiv"
        >
          <h4 id="name"> {title} </h4>
          {tweets.map((tweet, idx) => {
            let tweetId = tweet['id'];

            return (
              <div className='px-5 py-1' key={idx}>
                <TwitterTweetEmbed tweetId={tweetId} key={tweetId}/>
              </div>
            );
          })}
        </InfiniteScroll>
      );
    }

    return(
      <p> Cargando tuits... </p>
    );
  };

  return(
    <div id="scrollableDiv">
      <div id={`tower-${leaning}`}>
        {renderTweets()}
      </div>
    </div>
  );
};

export default Scaffold;
