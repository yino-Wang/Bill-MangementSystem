import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '../../components/icon'
import './index.css'
import classNames from 'classnames'
import { billListData } from '../../constants'
import { useNavigate } from 'react-router-dom'

const New = () => {
const navigate = useNavigate()
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        Create new bill
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames('selected')}
          >
            Pay
          </Button>
          <Button
            className={classNames('')}
            shape="rounded"
          >
            Income
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text">{'Today'}</span>
              <DatePicker
                className="kaDate"
                title="Date"
                max={new Date()}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
              />
              <span className="iconYuan">$</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/*可选链操作符 ?.，意思是：如果billList存在，再去找pay 如果pay存在，再去调用map()函数*/ }
        {billListData?.pay?.map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        ''
                      )}
                      key={item.type}

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
        <Button className="btn save">
          Save
        </Button>
      </div>
    </div>
  )
}

export default New