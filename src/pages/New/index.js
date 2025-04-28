import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '../../components/icon'
import './index.css'
import classNames from 'classnames'
import { billListData } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillList } from '../../store/modules/billStore'
import {useDispatch} from 'react-redux'
import dayjs from 'dayjs'
import { Toast } from 'antd-mobile'

const New = () => {
const navigate = useNavigate()
//控制收入支出的状态
const [billtype, setBillType] = useState('pay')
//收集金额money
const [money,setMoney] = useState()
const moneyChange = (value) => {
    setMoney(value)
}
//收集账单类型 useFor
const [useFor,setUseFor] = useState('')
const dispatch = useDispatch()
//save new bill
const saveBill = () => {
    const data = {
        type: billtype,
        money: billtype === 'pay' ? -money : +money,
        date: selectedDate,
        useFor: useFor
    }
    console.log(data)
    dispatch(addBillList(data))
    // 弹出提示
    Toast.show({
        icon: 'success',
        content: 'Save successfully!',
        duration: 1000, // 1秒后消失
    })

    // 1秒后跳转到Monthly页面
    setTimeout(() => {
        navigate('/month')  // 这里填写你的Monthly页面路由地址
    }, 1000)
}

//
const [dateVisible,setDateVisible] = useState(false)
//
const [selectedDate,setSelectedDate] = useState()
//
const dateConfirm = (value) => {
    console.log(value)
    setSelectedDate(value)
    setDateVisible(false)
}

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        Create new bill
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billtype === 'pay' ? 'selected' : '')}
            onClick={() => setBillType('pay')}
          >
            Pay
          </Button>
          <Button
            className={classNames(billtype === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={() => setBillType('income')}
          >
            Income
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setDateVisible(true)}>{dayjs(selectedDate).format('YYYY-MM-DD')}</span>
              <DatePicker
                className="kaDate"
                title="Date"
                max={new Date()}
                visible = {dateVisible}
                onConfirm={dateConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="add a new bill"
                type="number"
                value = {money}
                onChange={moneyChange}
              />
              <span className="iconYuan">$</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/*可选操作符 ?.，意思是：如果billList存在，再去找pay 如果pay存在，再去调用map()函数*/ }
        {billListData[billtype]?.map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default New