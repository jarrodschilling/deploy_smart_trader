import React from 'react'

export default function AddTrade() {
  return (
    <>
      <div className="tradeFormContainer">
            <h1>Add a Trade</h1>
            <form className="tradeForm" onSubmit={handleSubmit}>
                <div className="formCol">
                    <label htmlFor="date">Date*</label>
                    <input type="date" name="date" id="date" value={stockState.date} onChange={handleChange} />
                    {formErrors.date? <p>{formErrors.date}</p>: <p> </p>}
                    {errors.date && <p>{errors.date.message}</p>}

                    <label htmlFor="shares">Shares*</label>
                    <input type="number" name="shares" id="shares" value={stockState.shares} onChange={handleChange} />
                    {formErrors.shares? <p>{formErrors.shares}</p>: <p> </p>}
                    {errors.shares && <p>{errors.shares.message}</p>}

                    <Shaper stockState={stockState} handleChange={handleChange} notRequired={notRequired} errors={errors} />


                    <button className="confirmTrade" type="submit" disabled={!validateForm()}>Confirm Trade</button>
                </div>

                <div className="formCol">
                    <label htmlFor="buySell">Buy or Sell*</label>
                    <select name="buySell" id="buySell" value={stockState.buySell} onChange={handleChange}>
                        <option value="">Pick One</option>
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                    {formErrors.buySell? <p>{formErrors.buySell}</p>: <p> </p>}
                    {errors.buySell && <p>{errors.buySell.message}</p>}

                    <label htmlFor="price">Price*</label>
                    <input type="number" name="price" id="price" value={stockState.price} onChange={handleChange} />
                    {formErrors.price? <p>{formErrors.price}</p>: <p> </p>}
                    {errors.price && <p>{errors.price.message}</p>}

                    <Tactical stockState={stockState} handleChange={handleChange} notRequired={notRequired} errors={errors} />

                </div>

                <div className="formCol">
                    <label htmlFor="ticker">Ticker*</label>
                    <input type="text" name="ticker" id="ticker" value={stockState.ticker} onChange={handleChange} />
                    {formErrors.ticker? <p>{formErrors.ticker}</p>: <p> </p>}
                    {errors.ticker && <p>{errors.ticker.message}</p>}
                    
                    {
                        stockState.buySell === "sell"?
                    <>
                        <label htmlFor="closeTrade">Close Trade?</label>
                        <select name="closeTrade" id="closeTrade" value={stockState.closeTrade} onChange={handleChange}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </>:
                    <></>
                    }

                    {
                        stockState.buySell === "buy"?
                    <>
                        <label htmlFor="openTrade">Open Trade?</label>
                        <select name="openTrade" id="openTrade" value={stockState.openTrade} onChange={handleChange}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </>:
                    <></>
                    }
                </div>
            </form>
        </div>
    </>
  )
}
