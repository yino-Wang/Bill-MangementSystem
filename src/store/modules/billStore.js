//编写账单了表相关store
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { act } from 'react'
const billStore = createSlice({
    name: 'bill',
    //数据状态state
    initialState: {
        billList: [{
            pay: [],
            income: []
        }]
    },
    reducers: {
        // 同步修改方法
        setBillList (state, action) {
          state.billList = action.payload
        },
        // 同步添加账单方法
        addBill (state, action) {
          state.billList.push(action.payload)
        }
      }
    })

//解构actionCreater函数
const { setBillList, addBill } = billStore.actions

//编写异步
/*const  getBillList = () => {
    return async (dispatch) =>{
        //编写异步请求
        const res = await axios.get('http://localhost:8888/ka')
        //触发同步reducer
        dispatch(setBillList(res.data))
    }
}*/
const getBillList = () => {
    return async (dispatch) => {
        // 编写异步请求
        const res = await axios.get('http://localhost:8888/ka')
        // 触发同步reducer
        dispatch(setBillList(res.data))
    }
  }
  
  

const addBillList = (data) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:8888/ka', data) //data就是添加账单是收集到的数据 /New/index saveBill方法里
        dispatch(addBill(res.data))

    }
}
export {getBillList, addBillList}
//导出reducer
const reducer = billStore.reducer
export default reducer