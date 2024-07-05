import React, { useEffect } from 'react';
import './App.css';
import { connect } from "react-redux";
import { fetchData } from "./store/store";

const styles = {
  card_list: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
  },
  card: {
    border: "1px solid #ccc",
    padding: "16px",
    borderRadius: "8px",
    width: "200px",
  }
};

const App = ({ data, fetchData }) => {
  useEffect(() => {
    fetchData();
    // console.log(fetchData())
  }, [fetchData]);

  return (
    <div>
      <div style={styles.card_list}>
        {/* {console.log(data)} */}
        {data.map((item) => (
          <div key={item.id} style={styles.card}>
            <p><span style={{ fontWeight: 'bold' }}>Name : </span>{item.parameters[1].value}</p>
            <p><span style={{ fontWeight: 'bold' }}>Price : Rs </span>{item.price.value.raw}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  data: state.data, 
});

const mapDispatchToProps = {
  fetchData, 
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

