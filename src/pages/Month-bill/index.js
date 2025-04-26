import { NavBar, DatePicker } from 'antd-mobile'
import './index.css'
import { useEffect, useState } from 'react'
import { useMemo } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _, { groupBy } from 'lodash'
import '../Month-bill/components/dayBill/index'
import DailyBill from '../Month-bill/components/dayBill/index'

const Month = () => {
    //按月做数据的分组
    const billList = useSelector(state => state.bill.billList)
    //数据二次处理useMemo lodash库的groupBy用来分组
    const monthGroup = useMemo(() => {
        const grouped = _.groupBy(billList, (item) => {
          console.log('item.date', item.date)
          return dayjs(item.date).format('YYYY-MM')
        })
        console.log('最终生成的monthGroup keys:', Object.keys(grouped))
        return grouped
      }, [billList])

    //控制弹框打开和关闭
    const [dataVisible,setDataVisible] = useState(false)
    
    // 控制时间显示
    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs(new Date()).format('YYYY-MM')
    })

    const [currentMonthList, setCurrentMonthList] = useState([])

    const monthResult = useMemo(() => {
        // 支出  /  收入  / 结余
        const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        const income = currentMonthList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
        return {
          pay,
          income,
          total: pay + income
        }
    
    }, [currentMonthList])
    
    //
    useEffect(() => {
        const nowDate = dayjs().format('YYYY-MM')
        //边界值控制
        if(monthGroup[nowDate]){
            setCurrentMonthList(monthGroup[nowDate])
        }
    },[monthGroup])

    //确认回调
    const onComfirm = (date) => {
        setDataVisible(false)
        // 其他逻辑
        console.log(date)
        const formatDate = dayjs(date).format('YYYY-MM')
        console.log(formatDate)
        setCurrentMonthList(monthGroup[formatDate] || [])
        setCurrentDate(formatDate) 
        console.log('当前选择的formatDate:', formatDate)
        console.log('monthGroup中有哪些key:', Object.keys(monthGroup))
        console.log('拿到的账单:', monthGroup[formatDate])

    }

    //
    const dayGroup = useMemo(() => {
        const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(groupData)
        console.log('currentMonthList 用于按天分组的数据：', currentMonthList)

        return {
            groupData,
            keys
        }
      }, [currentMonthList])
      console.log(dayGroup);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDataVisible(true)}>
            <span className="text">
              {currentDate + ''}月账单
            </span>
            {/**/}
            <span className= {classNames('arrow', dataVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">Pay</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">Income</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">Remaining</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker /*组件 具体取消确定按钮绑定事件看文档 */
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dataVisible}
            onCancel={() => setDataVisible(false)}
            onConfirm={onComfirm}
            onClose={() => setDataVisible(false)} //点击盲层关闭
            max={new Date()}
          />
        </div>
        {/*单日列表统计渲染*/}
            {
                dayGroup.keys.map(key => {
                    return <DailyBill key={key} date={key} billList={dayGroup.groupData[key] || []} />
                })
            }
      </div>
    </div >
  )
}

export default Month