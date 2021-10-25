import React from "react";

import classes from "./Score.module.css";

const Score = ({ score }) => {
  return (
    <div className={classes.score}>
      <h2>Score: {score}</h2>
    </div>
  );
};

export default Score;
