import React, {useState, useEffect} from 'react';
import baseUrl from '../urls/baseUrl';
import { useCookies } from 'react-cookie';
import { Audio, BallTriangle } from 'react-loader-spinner'


function Dashboard () {
    
        const [cookies, setCookie, removeCookie] = useCookies(['yoga']);
        const [data, setData] = useState({name : "", email : ""});
        const [slot, setSlot] = useState([]);
        const [date, setDate] = useState({year: 2022, month: 12});
        const [payment, setPayment] = useState({status: "pending", amount: 500});
        const [history, setHistory] = useState([]);
        const [nextSlot, setNextSlot] = useState({year: 2023, month: 1, slot: 1});
    
        useEffect(() => {
            var d = new Date();
            setDate({year: d.getFullYear(), month: d.getMonth() + 1});
            console.log(date);
            var y = date.year;
            var m = date.month;
            if(date.month === 12) {
                y = date.year + 1;
                m = 1;
            }
            else {
                m = date.month + 1;
            }
            const setUp = async ()=>  {
            console.log(cookies.yoga);
            if (!cookies.yoga) {
                window.location.href = '/';
            }
            else
            {
                var session = await fetch(baseUrl + 'users/get', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify({email : cookies.yoga.email}),
                })
                session = await session.json();
                setData(session.data);
                var slotData = await fetch(baseUrl + 'time-slots', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + cookies.yoga.token
                    },
                    body: JSON.stringify({email : cookies.yoga.email, year: date.year, month: date.month}),
                })
                slotData = await slotData.json();
                console.log(slotData);
                setSlot(slotData.data.slot);

                var paymentData = await fetch(baseUrl + 'payments/get', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + cookies.yoga.token
                    },
                    body: JSON.stringify({email : cookies.yoga.email, year: date.year, month: date.month}),
                })
                paymentData = await paymentData.json();
                console.log(paymentData);
                if (paymentData.data.status === 'success') {
                    setPayment({status: paymentData.data.status, amount: paymentData.data.amount});
                }

                var historyData = await fetch(baseUrl + 'payments/all', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + cookies.yoga.token
                    },
                    body: JSON.stringify({email : cookies.yoga.email}),
                })
                historyData = await historyData.json();
                console.log(historyData);
                setHistory(historyData.data);

                var nextSlotData = await fetch(baseUrl + 'time-slots', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + cookies.yoga.token
                    },
                    body: JSON.stringify({email : cookies.yoga.email, year: y, month: m}),
                })
                nextSlotData = await nextSlotData.json();
                console.log(nextSlotData);
                setNextSlot({year: y, month: m, slot: nextSlotData.data.slot});
            }
        }
        setUp();
        }, []);

        const delay = ms => new Promise(
            resolve => setTimeout(resolve, ms)
          );

        const makePayment = async () => {
            setPayment({status: "processing"})
            var paymentData = await fetch(baseUrl + 'payments', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + cookies.yoga.token
                },
                body: JSON.stringify({email : cookies.yoga.email, year: date.year, month: date.month, amount: 500}),
            })
            await delay(5000);
            paymentData = await paymentData.json();
            setPayment({status: paymentData.data.status, amount: paymentData.data.amount});
        }

        const updateSlot = async (slot) => {
            console.log("update slot called")
            var y = date.year;
            var m = date.month;
            if(date.month === 12) {
                y = date.year + 1;
                m = 1;
            }
            else {
                m = date.month + 1;
            }
            var slotData = await fetch(baseUrl + 'time-slots/book', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + cookies.yoga.token,
                },
                body: JSON.stringify({email : cookies.yoga.email, year: y, month: m, slot: slot}),
            })
            slotData = await slotData.json();
            console.log(slotData);
            setSlot(slotData.data.slot);
        }

        return (
            <div>
                <h1>Dashboard</h1>
                <h2>{data.name}</h2>
                <h2>{data.email}</h2>
                <h2>{data.age}</h2>
                <h2>Current Slot {(slot === 1) ? <>6:00 AM - 7:00 AM</>:<>{(slot === 2)?<>7:00 AM - 8:00 AM</>: <>{(slot === 3)? <>8:00 AM - 9:00 AM</>:<>5:00 PM - 6:00 PM</>}</>}</>}</h2>
                <h2>Current Payment Status - ₹{payment.amount} {payment.status}</h2>
                {(payment.status === 'pending' || payment.status === 'failed') ? <><input type="button" value="Pay Now" onClick={() => makePayment()}/></>:<>{(payment.status === "processing")? <><BallTriangle height="80" width="80" radius="3" color="green" ariaLabel="ball-triangle-loading"/></>:<></>}</>}
                <input type="button" value="Logout" onClick={() => removeCookie('yoga')}/>
                <div>
                    <h2>Next Month</h2>
                    <select name='Slot' defaultValue={nextSlot.slot} onChange={(e) => updateSlot(e.target.value)}>
                        <option value='1'>6:00 AM - 7:00 AM</option>
                        <option value='2'>7:00 AM - 8:00 AM</option>
                        <option value='3'>8:00 AM - 9:00 AM</option>
                        <option value='4'>5:00 PM - 6:00 PM</option>
                    </select>
                </div>
                <div>
                    <h2>Payment History</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Transaction Time</th>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.createdAt}</td>
                                        <td>{item.month}</td>
                                        <td>{item.year}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    export default Dashboard;