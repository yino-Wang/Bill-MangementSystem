import { NavBar, DatePicker } from 'antd-mobile'
import './index.css'
import { useState } from 'react'
import classNames from 'classnames'

const Month = () => {
    //控制弹框打开和关闭
    const [dataVisible,setDataVisible] = useState(false)
    const onClose = () => {
        setDataVisible(false)
    }
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
              2023 | 3月账单
            </span>
            {/**/}
            <span className= {classNames('arrow', dataVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker /*组件 具体取消确定按钮绑定事件看文档 */
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dataVisible}
            onCancel={() => setDataVisible(false)}
            onConfirm={() => setDataVisible(false)}
            onClose={onClose} //点击盲层关闭
            max={new Date()}
          />
        </div>
      </div>
    </div >
  )
}

export default Month