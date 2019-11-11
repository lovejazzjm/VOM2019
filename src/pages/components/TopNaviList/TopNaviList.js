/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./TopNavi.scss";

const TopNaviList = React.memo(({ data }) => {
  if (!data) return <ul></ul>;
  const el = Object.entries(data).map(([key, value], i) => {
    return (
      <li key={i}>
        <a href={value[0]}>{key}</a>
      </li>
    );
  });
  return <ul>{el}</ul>;
});

export default TopNaviList;
