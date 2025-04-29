import dayjs from 'dayjs'
export const billListData = {
    pay: [
      {
        type: 'foods',
        name: 'Food',
        list: [
          { type: 'food', name: 'Food' },
          { type: 'drinks', name: 'Drink' },
          { type: 'dessert', name: 'Dessert' },
        ],
      },
      {
        type: 'taxi',
        name: 'Transportation',
        list: [
          { type: 'taxi', name: 'Taxi/Rent car' },
          { type: 'longdistance', name: 'Trip' },
        ],
      },
      {
        type: 'recreation',
        name: 'Recreation',
        list: [
          { type: 'bodybuilding', name: 'Sports' },
          { type: 'game', name: 'Game' },
          { type: 'audio', name: 'Media/Audio' },
          { type: 'travel', name: 'Travel' },
        ],
      },
      {
        type: 'daily',
        name: 'Daily expenses',
        list: [
          { type: 'clothes', name: 'Clothes' },
          { type: 'bag', name: 'Bags/Shoes' },
          { type: 'book', name: 'Study' },
          { type: 'promote', name: 'Promote' },
          { type: 'home', name: 'Home decoration' },
        ],
      },
      {
        type: 'other',
        name: 'Other expenses',
        list: [{ type: 'community', name: 'Community' }],
      },
    ],
    income: [
      {
        type: 'professional',
        name: 'Income',
        list: [
          { type: 'salary', name: 'Salary' },
          { type: 'overtimepay', name: 'Overtime' },
          { type: 'bonus', name: 'Bonus' },
        ],
      },
      {
        type: 'other',
        name: 'Other income',
        list: [
          { type: 'financial', name: 'Financial' },
          { type: 'cashgift', name: 'cashgift' },
        ],
      },
    ],
  }
  
  export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
    billListData[key].forEach(bill => {
      bill.list.forEach(item => {
        prev[item.type] = item.name
      })
    })
    return prev
  }, {})

  export const getOverview = (data = []) => {
    return data.reduce(
      (prev, item) => {
        return {
          ...prev,
          date: item.date,
          [item.type]: prev[item.type] + +item.money,
        }
      },
      { pay: 0, income: 0, date: null }
    )
  }
  
  export const getMonthOverview = (data, month) => {
    // 某个月的账单可能有多个
    const bill = data.filter(item => {
      return month === dayjs(item.date).get('month')
    })
    return getOverview(bill)
  }
  