import React, { useState } from 'react'

export default function Card(props) {

    const [hiddenState, setHiddenState] = useState((localStorage.getItem(props.lan + props.idx + 'd') === 'true') ? true : false)
    const [likes, setLikes] = useState((localStorage.getItem(props.lan + props.idx + 'l') ? true : false))
    return (
        <div >
            <a href={props.data.url} >
                <div style={(hiddenState === true) ? { display: 'none' } : {}} >
                    <div>
                        <div>
                            {props.data.title}
                        </div>
                        <div>
                            {props.data.source ? props.data.source.name : ""}
                        </div>
                        <div>{props.data.publishedAt}</div>
                    </div>
                </div>
            </a>
            <div style={props.searchMode ? { display: 'none' } : {}}>
                <button onClick={() => {
                    localStorage.setItem(props.lan + props.idx + 'l', !likes)
                    setLikes(!likes)
                }}><span className="like_count">{likes === true ? 1 : 0}{" "}</span>Like</button>
                <button onClick={() => {
                    localStorage.setItem(props.lan + props.idx + 'd', !hiddenState)
                    setHiddenState(!hiddenState)
                }}> Hide</button>
            </div>
        </div>
    )
}
