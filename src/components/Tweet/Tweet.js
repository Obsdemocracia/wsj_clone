import React from 'react';

const Tweet = ({ id }) => {
  return (
    <div>
      <blockquote className="twitter-tweet">
        <a href={`https://twitter.com/x/status/${id}`}></a>
      </blockquote>
    </div>
  );
};

export default Tweet;
