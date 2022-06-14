import React, { useState, useEffect } from 'react';
import Tweet from '../Tweet/Tweet';

const Scaffold = ({ odd }) => {
  // Aqui se hace un renderizado de la lista como tal
  const [tweets, setTweets] = useState(null);

  useEffect(() => {
    fetchTweets();
    console.log('Fetched tweets');
  }, []);

  const fetchTweets = async () => {
    let response = await fetch('https://gist.githubusercontent.com/favalosdev/c8335d9a81f508f1d969b6a22d407a01/raw/20563f7f061f9da91f36db08a90d776e4ee0148e/reduced_tweets.json');
    let data = await response.json();

    // Has to be reduced for performance reasons
    let mod = odd === true ? 1 : 0;

    let filtered = data.filter((tweet, index) => index % 2 === mod);
    setTweets(filtered);
  };

  return(
    <div>
      {tweets.map((id) => {
        <Tweet id={id}/>;
      })}
    </div>
  );
};

export default Scaffold;