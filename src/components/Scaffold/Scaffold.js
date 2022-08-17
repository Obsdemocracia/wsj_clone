import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { FixedSizeList as List } from 'react-window';

import './Scaffold.scss';

const Scaffold = ({ data, title, leaning }) => {
    
  const Tweet = ({ data, index }) => {
    const tweetId = data[index]['id'];

    return (
      <div className='px-5 py-1' key={index}>
        <TwitterTweetEmbed tweetId={tweetId} key={tweetId}/>
      </div>
    );
  };

  const renderTweets = () => {
    return(
      <List
        className="list"
        height={700}
        itemCount={data.length}
        itemSize={200}
        width={400}
      >
        {Tweet}
      </List>
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
