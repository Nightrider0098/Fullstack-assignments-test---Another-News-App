import React, { useState, useEffect } from 'react'
import Card from './Card'
export default function CardDeck(props) {

    const [currentPage, setCurrentPage] = useState(1)
    const [currentData, setCurrentData] = useState([])
    const [searchString, setSearchString] = useState('')
    const [searchMode, setsearchMode] = useState(false);
    const renderCards = () => {
        if (currentData && currentData.length) {
            let lan = props.lan
            let retArray = []
            if (currentData.length > 0) {
                for (let i = 0; i < 3; i++) {
                    retArray.push(< Card lan={lan} idx={currentPage * 3 + i - 3} searchMode={searchString === '' ? false : true} data={currentData[currentPage * 3 + i - 3]} key={lan + currentPage * 3 + i + 'id'
                    } />)
                }
            } return retArray;
        }
    }


    useEffect(() => {

        setSearchString("")
        setsearchMode(false)

        fetch(`https://gnews.io/api/v4/top-headlines?token=410db42779f25b2d81028050efe65502&page=${1}&lang=${props.lan}`).then(e => e.json()).then(data => {
            setCurrentData(data['articles'].slice(currentPage * 3 - 3, currentPage * 3 - 1))
        })


    }, [props.lan])

    const searchTheBar = () => {
        setsearchMode(true)
        fetch(`https://gnews.io/api/v4/search?q=${searchString}&token=410db42779f25b2d81028050efe65502&page=${1}&lang=${props.lan}`).then(e => e.json()).then(data => {
            setCurrentData(data['articles'])
        });
        setCurrentPage(1);
    }
    const movePage = (move) => {
        let currPage = currentPage;
        if (currentPage + move < 4 && currentPage + move > 0) {
            setCurrentPage(currentPage + move);
            if (searchMode) {
                fetch(`https://gnews.io/api/v4/search?q=${searchString}&token=410db42779f25b2d81028050efe65502&page=${currentPage + move}&lang=${props.lan}`).then(e => e.json()).then(data => {
                    setCurrentData(data['articles'].slice((currPage - 1) * 3, currPage * 3))
                })
            } else {
                fetch(`https://gnews.io/api/v4/top-headlines?token=410db42779f25b2d81028050efe65502&page=${currentPage + move}&lang=${props.lan}`).then(e => e.json()).then(data => {
                    setCurrentData(data['articles'].slice((currPage - 1) * 3, currPage * 3))
                })
            }
        }

    }


    return (
        <div>
            <input id='searchBox' value={searchString} onChange={(e) => { setSearchString(e.target.value) }} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    searchTheBar();
                }
            }} />
            {renderCards()}
            <button id='search' onClick={() => {
                searchTheBar(1);
            }}>search</button>
            <button id='Prev' disabled={currentPage == 1 ? true : false} onClick={() => movePage(-1)}>Prev</button>
            <button id='Next' disabled={currentPage == 3 ? true : false} onClick={() => movePage(1)}>Next</button>
            { searchMode ? <button id='exitSearchMode' onClick={() => {
                setSearchString('');
                setsearchMode(false)
                setCurrentPage(1);
                fetch(`https://gnews.io/api/v4/top-headlines?token=410db42779f25b2d81028050efe65502&page=${1}&lang=${props.lan}`).then(e => e.json()).then(data => {
                    setCurrentData(data['articles'].slice(0, 3))
                })

            }}>exitSearch Mode</button> : ''}
        </div >
    )
}
