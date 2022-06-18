import React, { useState, useEffect } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import InfiniteScroll from 'react-infinite-scroll-component';
import shuffle from '../../utils/shuffle';

import './Scaffold.scss';

const Scaffold = ({ data, title, leaning, filter }) => {
  const PAGE_SIZE = 7;
  
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    shuffle(data);
    setTweets(data.slice(0, PAGE_SIZE));
  }, [filter]);

  const getMoreTweets = () => {
    setTweets(data.slice(0, tweets.length + PAGE_SIZE));
  };
  
  const renderTweets = () => {
    if (tweets.length > 0) {
      return(
        <InfiniteScroll
          dataLength={tweets.length}
          next={getMoreTweets}
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
          hasMore={true}
          loader={<p> Cargando tweets </p>}
          scrollableTarget="scrollableDiv"
        >
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
    <div id={`tower-${leaning}`}>
      <h4 id="name"> {title} </h4>
      <div
        id="scrollableDiv"
        style={{
          height: 700,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {renderTweets()}
      </div>
    </div>
  );
};

export default Scaffold;
