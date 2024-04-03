import React from 'react'

function BalanceContainer({ title, amount, currency }) {
    return (
      <div className="balance-container">
        <h2>{title}</h2>
        <div className="balance-data">
          <span className="balance-amount">{amount}</span>
          <span className="balance-currency">{currency}</span>
        </div>
      </div>
    );
  }
  
  export default BalanceContainer;