import React, { useState, useEffect } from 'react';
import Tweet from '../Tweet/Tweet';
// import Tweet from '../Tweet/Tweet';


// eslint-disable-next-line no-unused-vars
const Scaffold = ({ odd }) => {
  // Aqui se hace un renderizado de la lista como tal

  const [tweets, setTweets] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [index, setIndex] = useState(0);

  const PAGE_SIZE = 10;

  useEffect(() => {
    fetchTweets();
    console.log('Fetched tweets');
  }, []);

  useEffect(() => {
    getMoreData();
  }, [filtered]);

  const fetchTweets = async () => {
    fetch('https://gist.githubusercontent.com/favalosdev/be710f1fc60ff42ce8d3c59171f23c1b/raw/25cea926d46d7dc9e70def4f699c0437e04fb1c5/reduced_test_tweets.json')
      .then((response) => {
        console.log('Response', response);
        response.json()
          .then((data) => {
            console.log('Data',data['id']);
            setFiltered(data['id']);  
          })
          .catch((e)=>{
            console.log('error',e);
          });
      })
      .catch((e)=>{
        console.log('error', e);
      });
  };

  function getMoreData() {
    if (filtered && index < filtered.length){
      setTweets(tweets.concat(filtered.slice(index, index + PAGE_SIZE)));
      if (index + PAGE_SIZE < filtered.length) {
        setIndex(index + PAGE_SIZE);
      } else{
        setIndex(filtered.length);
      }
    }
    console.log('Loaded', tweets);
  }

  function show() {
    if (filtered){
      return(
        <div>
          {tweets.map((id, idx) => {
            return(
              <Tweet key={idx} id={id}/>
            );
          })}
          <button onClick={getMoreData}>
            Load more
          </button>
        </div>
      );
    }
    else{
      return(
        <h1>LOADING</h1>
      );
    }
  }
  
  return(
    <>{show()}</>
  );
};

export default Scaffold;