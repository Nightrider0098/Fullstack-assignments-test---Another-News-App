import React, { useState } from 'react'

export default function Card(props) {

    const [hiddenState, setHiddenState] = useState((localStorage.getItem(props.lan + props.idx + 'd') === 'true') ? true : false)
    const [likes, setLikes] = useState((localStorage.getItem(props.lan + props.idx + 'l') ? parseInt(localStorage.getItem(props.lan + props.idx + 'l')) : 0))
    return (
        <div >
            <div style={(hiddenState === true) ? { display: 'none' } : {}}>
                <a href={props.data.url} >
                    <div  >
                        <div>
                            <div>
                                {props.data.title}
                            </div>
                            <div>
                                {props.data.source ? props.data.source.name : ""}
                            </div>
                            <div>{new Date(props.data.publishedAt).toLocaleDateString('en-US')}</div>
                            <img src={props.data.image}></img>
                        </div>
                    </div>
                </a>
                <button id={props.lan + props.idx + 'l'} onClick={() => {
                    localStorage.setItem(props.lan + props.idx + 'l', likes + 1)
                    setLikes(likes + 1)
                }}><span className="like_count">{likes}{" "}</span>Like</button>
            </div>
            <div style={props.searchMode ? { display: 'none' } : {}}>

                <button id={props.lan + props.idx + 'd'} onClick={() => {
                    localStorage.setItem(props.lan + props.idx + 'd', !hiddenState)
                    setHiddenState(!hiddenState)
                }}> Hide</button>
            </div>
        </div>
    )
}
