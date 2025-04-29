import './index.css'

const OneLineOverview = ({pay, income}) => {
    return(
        <div className="oneLineOverview">
            <div className="pay">
                <span className="type">Pay</span>
                <span className="money">{pay.toFixed(2)}</span>
            </div>
            <div className="income">
                <span className="type">Income</span>
                <span className="money">{income.toFixed(2)}</span>
            </div>
            <div className="balance">
                <span className="money">{(pay+income).toFixed(2)}</span>
                <span className="type">Remaining</span>
            </div>
        </div>
    )
}

export default OneLineOverview