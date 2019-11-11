import React, { useEffect, useState, useCallback, useMemo } from "react";
import { connect, useSelector, useDispatch, shallowEqual } from "react-redux";
import { apiSideNavi } from "../actions/apiAction";
import SideNaviList from "../components/SideNaviList/SideNaviList";
import { setSideNaviId } from "../reducers/sideNaviId";
import { createSelector } from "reselect";

const naviId =
  Math.random()
    .toString(36)
    .substr(2, 6) + "_";

const convertIdArr = id => {
  if (!id) return [];
  return id
    .split("/")
    .reduce((ac, cur, i) => {
      ac[i] = ac[i - 1] === undefined ? cur : ac[i - 1] + "/" + cur;
      return ac;
    }, [])
    .map(item => naviId + item);
};

const flatArr = arr => {
  return arr.reduce((ac, cur) => {
    return cur.data ? ac.concat(cur).concat(flatArr(cur.data)) : ac.concat(cur);
  }, []);
};

const mapDispatch = { setSideNaviId };
const mapStateToProp = state => ({ sideNaviId: state.sideNaviId });

const convertData = (data = {}, prefix = "", id = "") => {
  if (!data) return [];
  const ndata = Object.entries(data).map(([key, value], i) => {
    const cId = id === "" ? id + i : id + "/" + i;
    const nId = prefix + cId;
    const isSubDep = typeof value === "object" && !Array.isArray(value);
    return {
      id: nId,
      name: key,
      isSubDep: isSubDep,
      data: isSubDep ? convertData(value, prefix, cId) : null,
      linkInfo: isSubDep ? null : value
    };
  });
  return ndata;
};

const customSelector = createSelector(
  state => (state && state["apiSideNavi"] ? state["apiSideNavi"].result : {}),
  data => convertData(data, naviId)
);

const SideNaviContainer = ({ setSideNaviId, sideNaviId }) => {
  const data = useSelector(customSelector, shallowEqual);
  const [openIdArr, setOpenIdArr] = useState(convertIdArr(sideNaviId));
  const dispatch = useDispatch();
  const newSideNaviId = useMemo(() => naviId + sideNaviId, [sideNaviId]);

  const onOpen = useCallback(
    id => {
      setSideNaviId(id);
      setOpenIdArr(convertIdArr(id));
    },
    [setSideNaviId]
  );

  const onToggleAll = useCallback(() => {
    if (openIdArr.length > 1) {
      setOpenIdArr([newSideNaviId]);
    } else {
      const arr = flatArr(data)
        .filter(item => item.isSubDep)
        .map(item => item.id);
      if (arr) setOpenIdArr([...arr, newSideNaviId]);
    }
  }, [data, openIdArr, newSideNaviId]);

  const onToggle = useCallback(
    (e, obj) => {
      e.preventDefault();
      const id = obj.id;
      if (obj.isSubDep) {
        if (openIdArr.includes(id)) {
          setOpenIdArr([...openIdArr].filter(item => item !== id));
        } else {
          setOpenIdArr([...openIdArr, id]);
        }
      } else {
        if (id === newSideNaviId) return;
        setSideNaviId(id.replace(naviId, ""));
        const isSideNaviId = !!flatArr(data).filter(
          item => item.id === newSideNaviId
        ).length;
        if (!isSideNaviId) {
          setOpenIdArr(convertIdArr(id.replace(naviId, "")));
        } else {
          const arr = [...openIdArr, id].filter(item => item !== newSideNaviId);
          setOpenIdArr(arr);
        }
      }
    },
    [openIdArr, newSideNaviId, setSideNaviId, data]
  );

  useEffect(() => {
    dispatch(apiSideNavi());
    return () => {};
  }, [dispatch]);

  return (
    <>
      <div>
        <button onClick={e => onOpen("4/0/0")}> openBtn </button>
        <button onClick={e => onToggleAll()}>
          {" "}
          {openIdArr.length > 1 ? "전체닫기" : "전체열기"}{" "}
        </button>
      </div>
      <nav id={naviId} className={"sideNavi"}>
        <SideNaviList
          data={data}
          openIdArr={openIdArr}
          onToggle={onToggle}
        ></SideNaviList>
      </nav>
    </>
  );
};

export default connect(
  mapStateToProp,
  mapDispatch
)(SideNaviContainer);
