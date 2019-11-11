import { createSlice } from 'redux-starter-kit'

const getSideNaviId = new URLSearchParams(document.location.search).get("sideNaviId") || '';
const sideNavi = createSlice({
    name: 'sideNaviId',
    initialState: getSideNaviId,
    reducers: {
        setSideNaviId:(state, action) => state = action.payload
    }
})

export const { setSideNaviId } = sideNavi.actions
export default sideNavi.reducer