import React, { useEffect} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {  apiMemberInfo } from '../actions/apiAction';
import { setSideNaviId } from '../reducers/sideNaviId';
import { createSelector } from 'reselect';


const mapDispatch = { setSideNaviId };
const mapStateToProp = state => ({ sideNaviId : state.sideNaviId });

const customSelector = createSelector(
	state => state && state['apiMemberInfo']? state['apiMemberInfo'].result : {},
	info => info && info['data']? info['data'].map((obj)=>{
		return obj;
	}) : [],
)


/*
<table class="d-checklist">
			<colgroup>
				<col style="width:10%">
                <col style="width:10%">
                <col style="width:10%">
                <col style="width:10%">
                <col style="width:10%">
                <col style="width:10%">
                <col style="width:10%">
                <col style="width:10%">
            </colgroup>
			<thead>
				<tr>
					<th scope="col">이름</th>
	                   	<th scope="col">1급부서</th>
	                   			<th scope="col">2급부서</th>
							<th scope="col">직무등급</th>
	                   	<th scope="col">기본직무</th>
	                   	<th scope="col">프로젝트 직책</th>
	                   	<th scope="col">기본사업유형</th>
	                   	<th scope="col">상태</th>
                </tr>
			</thead>
			<tbody>
				<tr id="row_EE00000263" data-employee-sn="EE00000263" data-account-department="">
					<td>김두일</td>
	                   	<td>기술개발본부</td>
	                   	<td>프론트엔드개발2그룹</td>
	                   	<td>수석</td>
	                   	<td>관리</td>
	                   	<td>디렉터</td>
	                   	<td>기타</td>
	                <td>근무중</td>
						</tr>
                </tbody>
		</table>
		*/

const MemberInfoContainer = ({setSideNaviId, sideNaviId}) =>{
	const dispatch = useDispatch();
	const data = useSelector( customSelector, []);

	useEffect(()=>{          
		dispatch(apiMemberInfo()); 
		return () => {};
	},[dispatch])

	return (
		<>
			<h1>{sideNaviId}</h1>
			<p>{JSON.stringify(data)}</p>
		</>
	)
}

export default connect(mapStateToProp, mapDispatch)(MemberInfoContainer)