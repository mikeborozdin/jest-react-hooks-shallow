import React, { useEffect, useState } from 'react'
import { expensiveOperation1, expensiveOperation2, expensiveOperation3, expensiveOperation4 } from './expensiveOperations';

export default function ComponentWithProps({ strProp, arrProp }) {
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        expensiveOperation1();
    })
    
    useEffect(() => {
        expensiveOperation2();
    }, [strProp])

    useEffect(() => {
        expensiveOperation3();
    }, [arrProp])

    useEffect(() => {
        expensiveOperation4();
    }, [strProp, arrProp])

    return (<div><button onClick={() => setIsClicked(!isClicked)}>{isClicked ? "Clicked" : "Not Clicked"}</button></div>)
}