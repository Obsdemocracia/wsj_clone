import React, { useState, useEffect } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import InfiniteScroll from 'react-infinite-scroll-component';
import shuffle from '../../utils/shuffle';

import './Scaffold.scss';

const Scaffold = ({ data, filter, title, leaning }) => {
  const PAGE_SIZE = 5;
  
  const [filtered, setFiltered] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let preFiltered = data.filter(element => element[filter] === 1);
    shuffle(preFiltered);
    setFiltered(preFiltered);
    setIndex(PAGE_SIZE);
    setTweets(preFiltered.slice(0, PAGE_SIZE));
  }, [filter]);

  const getMoreTweets = () => {
    console.log('Getting more tweets...');
    setTimeout(() => {
      setTweets(filtered.slice(0, index + PAGE_SIZE));
      setIndex(index + PAGE_SIZE);
    }, 1000);
  };
  
  const show = () => {
    if (tweets.length > 0) {
      return (
        <div id={`scrollableDiv-${leaning}`}>
          <InfiniteScroll
            dataLength={tweets.length}
            next={getMoreTweets}
            hasMore={true}
            inverse={false}
            style={{ display: 'flex', flexDirection: 'column' }}
            loader={<h4> Cargando más tuits... </h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b> ¡Has llegado al final de los tuits! </b>
              </p>
            }
            scrollableTarget={`scrollableDiv-${leaning}`}
          >
            <h4> {title} </h4>
            {tweets.map((tweet, idx) => {
              return (
                <div className='px-5 py-1' key={idx}>
                  <TwitterTweetEmbed tweetId={tweet.id}/>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      );
    }
  };

  return (
    <>
      {show()}
    </>
  );
};

export default Scaffold;
