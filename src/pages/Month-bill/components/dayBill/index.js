import classNames from 'classnames'
import './index.css'
import { useMemo } from 'react'


const DailyBill = ({ date, billList }) => {
  const safeBillList = Array.isArray(billList) ? billList : []
  console.log('💬 DailyBill收到的date', date)
  console.log('💬 DailyBill收到的billList', billList)
  const dailyResult = useMemo(() => {
    // 支出  /  收入  / 结余
    const pay = safeBillList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    const income = safeBillList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
    return {
      pay,
      income,
      total: pay + income
    }
  }, [safeBillList])
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow')}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dailyResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dailyResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dailyResult.total.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DailyBill