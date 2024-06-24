// import logo from './logo.svg';
import React from 'react';
import './App.css';

const styles={
  card_list :{
    display: "flex",
    flexWrap: "wrap",
    gap:"16px",
  },
  card:{
    border: "1px solid #ccc",
    padding: "16px",
    borderRadius: "8px",
    width: "200px",
  }
};

function App({data}) {
 
  return (
    <div>
    <div style={styles.card_list}>
      {data.map((item) =>(
        <div key={item.id} style={styles.card}>
          <p><span style={{fontWeight:'bold'}}>Name: </span>{item.parameters[1].value}</p>
          <p><span style={{fontWeight:'bold'}}>Price: Rs </span>{item.price.value.raw}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;
