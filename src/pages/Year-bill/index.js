import classNames from 'classnames'
import { DatePicker, NavBar } from 'antd-mobile'
import dayjs from 'dayjs'
import TwoLineOverview from '../../components/TwoLineOverview'
import OneLineOverview from '../../components/OneLineOverview'
import { useDate } from '../../hooks/useDate'
import { useYearBillList } from '../../hooks/useBillList'
import { getMonthOverview, getOverview } from '../../constants'
import './index.css'

const BillAll = () => {

        const { date, visible, onDateChange, onShowDate, onHideDate } = useDate()
      
        const selectedYear = date.get('year')
        const selectedYearBills = useYearBillList(selectedYear)
      
        const overview = getOverview(selectedYearBills)
        const thisYear = dayjs().get('year')
        const maxMonth = thisYear === selectedYear ? dayjs().get('month') + 1 : 12
        const monthBillList = new Array(maxMonth)
          .fill('')
          .map((_, month) => {
            return getMonthOverview(selectedYearBills, month)
          })
          .reverse()
    return (
        <div className="billDetail">
            <NavBar className="nav" backArrow={false}>
                <div className='title'>
                    Yearly balance
                </div>
            </NavBar>
            <DatePicker        
                className="kaDate"
                title="Billing date"
                precision="year"
                visible={visible}
                onClose={onHideDate}
                max={new Date()}
                onConfirm={onDateChange}>   
            </DatePicker>
            <div className="content">
                <div className='overview'>
                    <div className="nav-title" onClick={onShowDate}>
                        Year: {selectedYear}
                        <span className={classNames('arrow', visible && 'expand')}></span>
                    </div>
                    <TwoLineOverview
                        pay={overview.pay}
                        income={overview.income}
                        className="overview"
                    />
                </div>

                {monthBillList.map((item, index) => {
                return (
                    <div
                    className="monthBill"
                    key={index}
                    >
                    <div className="date">Month:{maxMonth - index}</div>
                    <OneLineOverview pay={item.pay} income={item.income} />
                    </div>
                )
                })}
            </div>
        </div>

    )
}

export default BillAll 