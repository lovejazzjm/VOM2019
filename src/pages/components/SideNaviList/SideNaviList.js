/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import classnames from "classnames";
import "./SideNavi.scss";

const SideNaviListItem = React.memo(
  ({ data = {}, className = "", onToggle = () => {}, children }) => {
    return (
      <a
        href="#"
        id={data.id}
        className={className}
        onClick={e => onToggle(e, data)}
      >
        {children}
      </a>
    );
  }
);

const SideNaviList = React.memo(
  ({ data = [], openIdArr = [], onToggle = () => {}, isFirst = true }) => {
    if (!data) return <ul></ul>;
    const el = data.map((item, i) => {
      const isOpen = openIdArr.includes(item.id);
      const className = classnames({
        subdep: item.isSubDep,
        open: isOpen,
        select: item.isSubDep ? false : isOpen
      });
      return (
        <li key={i}>
          <SideNaviListItem
            data={item}
            className={className}
            onToggle={onToggle}
          >
            {item.name}
          </SideNaviListItem>
          {item.isSubDep ? (
            <SideNaviList
              data={item.data}
              openIdArr={openIdArr}
              onToggle={onToggle}
              isFirst={false}
            ></SideNaviList>
          ) : (
            ""
          )}
        </li>
      );
    });
    return <ul className={classnames({ first: isFirst })}> {el}</ul>;
  }
);

export default SideNaviList;
