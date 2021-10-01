import React, { useState, useEffect } from 'react'
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { cardData } from './App'

function Counter(props) {
    const { id, data } = props
    const [count, setCount] = useState(0);

    // useEffect(() => {
    //     setCount(JSON.parse(window.localStorage.getItem('count')));
    // }, []);

    // useEffect(() => {
    //     window.localStorage.setItem('count', count);
    // }, [count]);

    let redCount = () => {
        if (count === 0) {
            setCount(0)
        } else {
            setCount(count - 1)
        }
    }

    let incCount = (id) => {
        setCount(count + 1)
        const finaldata = data.map((data) => {
            if (data.id === id) {
                const obj = {
                    ...data,
                    count: count + 1
                }
                return obj;
            }
        })
        console.log('i', ...finaldata)
    }

    return (
        <div>
            {count > 0 ?
                <button className="counter">
                    <div className="counter-inner" onClick={redCount}>-</div>
                    <div className="counter-inner">{count}</div>
                    <div className="counter-inner" onClick={() => incCount(id)}>+</div>
                </button> :
                <button onClick={() => incCount(id)}>Add to cart</button>
            }
        </div>
    );
}

function ListPage(props) {
    const [showCart, setShowCart] = useState(false)
    const [cardList, setCardList] = useState(cardData)

    let redCount = (id) => {
        // if (count === 0) {
        //     setCount(0)
        // } else {
        //     setCount(count - 1)
        // }
        const newData = [...cardList]
        const index = newData.findIndex(item => item.id === id);
        if (index > -1) {
            const item = newData[index]
            if (item.count) {
                let count = item.count
                const obj = {
                    count: count - 1
                }
                newData.splice(index, 1, {
                    ...item,
                    ...obj
                })
                setCardList(newData)
            }
            // else {
            //     const obj = {
            //         count: 0
            //     }
            //     newData.splice(index, 1, {
            //         ...item,
            //         ...obj
            //     })
            //     setCardList(newData)
            // }
        }
    }

    const incCount = (id) => {
        // setCount(count + 1)
        const newData = [...cardList]
        const index = newData.findIndex(item => item.id === id);
        if (index > -1) {
            const item = newData[index]
            if (item.count) {
                let count = item.count
                const obj = {
                    count: count + 1
                }
                newData.splice(index, 1, {
                    ...item,
                    ...obj
                })
                setCardList(newData)
            } else {
                const obj = {
                    count: 1
                }
                newData.splice(index, 1, {
                    ...item,
                    ...obj
                })
                setCardList(newData)
            }
        }
    }

    const showCartData = (id) => (
        cardList.length > 0 && cardList.map((data, index) => (
            data?.count > 0 &&
            <div key={index} className="cart-container">
                {/* sl.no: {index} */}
                <div >Name: {data?.name}</div>
                {/* count: {data?.count} */}
                count:  {
                    <div>
                        <button className="counter">
                            <div className="counter-inner" onClick={() => redCount(data.id)}>-</div>
                            <div className="counter-inner">{data?.count}</div>
                            <div className="counter-inner" onClick={() => incCount(data.id)}>+</div>
                        </button>
                    </div>
                }
                <div>price: ${`${data?.final_price}.00 * ${data?.count}`}  =  ${`${data?.final_price * data?.count}`}.00</div>
            </div>
        ))
    )

    const displayCart = () => setShowCart(true)
    return (
        <div>
            <header2>
                <div className="header-outer">
                    <div className="headerLeft">
                        <img src="https://happay.com/assets/img/Logo-original.svg" alt="logo" />
                    </div>
                    <div className="headerRight">
                        <FaShoppingCart onClick={() => displayCart()} />
                        <FaUserCircle />
                    </div>
                </div>
            </header2>
            <div className="center-text"><p>Most Popular</p></div>
            <div className="main_container">
                {
                    cardList.map((card) => (
                        <div key={card?.id} className="Card">
                            <img className="card_img" src={card?.img_url} alt={card?.name} />
                            <div className="name_container">
                                <h4 className="card_name">{card?.name}</h4>
                                <div className="price_container">
                                    {card?.original_price ? <h4 className="card_oriPrice">${card?.original_price}.00</h4> : ""}
                                    <h4 className="card_fiPrice">${card?.final_price}.00</h4>
                                </div>
                            </div>
                            <p>{card?.description}</p>

                            <div>
                                {card?.count ?
                                    // console.log('enter')
                                    <button className="counter">
                                        <div className="counter-inner" onClick={() => redCount(card.id)}>-</div>
                                        <div className="counter-inner">{card.count && card.count}</div>
                                        <div className="counter-inner" onClick={() => incCount(card.id)}>+</div>
                                    </button>
                                    :
                                    <button onClick={() => incCount(card.id)}>Add to cart</button>
                                }
                            </div>

                            {/* <Counter id={card.id} data={props && props.cardData} /> */}
                        </div>
                    ))
                }

            </div>
            {showCart ? showCartData()
                : null}
        </div>
    );
}

export default ListPage
