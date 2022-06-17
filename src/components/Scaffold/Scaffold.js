import React, { useState, useEffect } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import InfiniteScroll from 'react-infinite-scroll-component';

const Scaffold = ({ data, filter, title }) => {
  const PAGE_SIZE = 5;
  
  const [filtered, setFiltered] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setFiltered(data.filter(element => element[filter] === 1));
    setIndex(PAGE_SIZE);
    let tweets = filtered.slice(0, index);
    setTweets(tweets);
    console.log(tweets);
  }, [filter]);

  const getMoreTweets = () => {
    setTweets(filtered.slice(0, index + PAGE_SIZE));
  };
  
  const show = () => {
    console.log('Entering show() function...');
    console.log('Tweets currently are: ', tweets);
    if (tweets.length > 0) {
      return (
        <div
          id="scrollableDiv"
          style={{
            height: 300,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
        >
          <InfiniteScroll
            dataLength={tweets.length}
            next={getMoreTweets}
            style={{ display: 'flex', flexDirection: 'column-reverse' }}
            inverse={true}
            hasMore={true}
            loader={<h4> Cargando más tuits... </h4>}
            scrollableTarget="scrollableDiv"
          >
            {tweets.map((tweet, idx) => {
              <div className="px-5 py-1" key={idx}>
                <TwitterTweetEmbed tweetId={tweet.id}/>
              </div>;
            })}
          </InfiniteScroll>
        </div>
      );
    } else {
      return (
        <h4> Cargando tuits... </h4>
      );
    }
  };

  return (
    <>
      <h2>
        {title}
      </h2>
      {show()}
    </>
  );
};

export default Scaffold;
