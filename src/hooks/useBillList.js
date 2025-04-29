import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { getBillList } from '../store/modules/billStore'

/*获取账单列表	从redux取billList，没有就去dispatch拉取
返回数据	{ billList } */
export const useBillList = () => {
    const dispatch = useDispatch()
    const {billList} = useSelector(state => state.bill)

    useEffect(() => {
        dispatch(getBillList())
    },[dispatch])

    return {billList}
}

export const useYearBillList = selectedYear => {
    const {billList} = useBillList()
    const yearBills = useMemo(() => 
        billList.filter(item => selectedYear === dayjs(item.date).get('year')),
        [billList, selectedYear]
        /*[billList, selectedYear] 是 useMemo 的依赖数组（dependency array），
        它的作用是：
        告诉 React：只有当 billList 或 selectedYear 变化时，才重新执行 useMemo 里的计算逻辑。 */
    )
    return yearBills
}

export const useMonthBillList = (selectedYear,selectedMonth) => {
    const selectedYearBills = useYearBillList(selectedYear)
    const currentBillList = useMemo(() => 
        selectedYearBills.filter(item => {
            return selectedMonth === dayjs(item.date).get('month')
        }),
        [selectedYearBills,selectedMonth]
    )
    return currentBillList

}