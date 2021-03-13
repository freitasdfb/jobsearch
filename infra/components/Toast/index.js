import React from 'react'


export default function Toast() {

    const toastList = []

    const[list, setList] = React.useState(toastList)

    React.useEffect(() => {
        setList(toastList)
    },[toastList, list])


    return (
        <>
        {list.map((toast, i) => {
            <div>{toast}</div>
        })}
        </>
    )
}