import React, { useState } from 'react'

export default function Card(props) {
    const [hiddenState, setHiddenState] = useState(localStorage.getItem(props.lan + props.idx + 'd') ? true : false)
    return (

        <div style={hiddenState ? { display: none } : {}}>
            <div>
                <div>
                    {props.data.title}
                </div>
                <div>
                    {props.data.source ? props.data.source.name : ""}
                </div>
                <div>{props.data.publishedAt}</div>
            </div>
            <button onClick={() => {
            }}><span className="like_count">{props.like_count || 0}</span>Like</button>
            <button onClick={() => {
                localStorage.setItem(props.lan + props.idx + 'd', !hiddenState)
                setHiddenState(!hiddenState)
            }}> Hide</button>
        </div>

    )
}
