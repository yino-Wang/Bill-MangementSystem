import classNames from 'classnames'
import './index.css'
import { useMemo, useState } from 'react'
import Icon from '../../../../components/icon'

const DailyBill = ({ date, billList }) => {
  const safeBillList = Array.isArray(billList) ? billList : []
  console.log('💬 DailyBill收到的date', date)
  console.log('💬 DailyBill收到的billList', billList)
  const dailyResult = useMemo(() => {
    // pay  /  income  / remaining
    const pay = safeBillList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    const income = safeBillList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
    return {
      pay,
      income,
      total: pay + income
    }
  }, [safeBillList])

  //
  const [visible, setVisible] = useState(false)
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow', visible && 'expand')} onClick={() => setVisible(!visible)}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{(dailyResult.pay ?? 0).toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{(dailyResult.income ?? 0).toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{(dailyResult.total ?? 0).toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      {/* 单日列表 */}
      {/*display 控制元素展示 block：元素正常展示 none：元素完全隐藏*/}
      <div className="billList" style={{display : visible ? 'block' : 'none'}}>
        {billList.map(item => {
          return (
            <div className="bill" key={item.id}>
              {/*渲染图标*/}
              <Icon type={item.useFor}></Icon>
              <div className="detail">
                <div className="billType">{item.useFor}</div>
              </div>
              <div className={classNames('money', item.type)}>
              {(item.money ?? 0).toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default DailyBill