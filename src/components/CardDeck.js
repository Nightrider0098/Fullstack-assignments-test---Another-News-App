import React, { useState, useEffect } from 'react'
import Card from './Card'
export default function CardDeck(props) {

    const [currentPage, setCurrentPage] = useState(1)
    const [currentData, setCurrentData] = useState([])
    const [searchString, setSearchString] = useState('')
    // const [searchString, setSearchString] = useState('')
    const [justToggle, setJustToggle] = useState(0);
    const [searchMode, setsearchMode] = useState(false);
    const renderCards = () => {
        if (currentData && currentData.length) {
            let lan = props.lan
            let retArray = []
            if (currentData.length > 0) {
                // console.log('printing')
                for (let i = 0; i < 3; i++) {
                    retArray.push(< Card lan={lan} idx={currentPage * 3 + i - 3} searchMode={searchString === '' ? false : true} data={currentData[currentPage * 3 + i - 3]} key={lan + currentPage * 3 + i + 'id'
                    } />)
                }
            } return retArray;
        }
    }


    useEffect(() => {
        if (currentPage !== 1) {

            setSearchString("")
            setCurrentPage(1);
        }
        else {

            setSearchString("")
            setsearchMode(false)
            fetch(`https://gnews.io/api/v4/top-headlines?token=410db42779f25b2d81028050efe65502&page=${currentPage}&lang=${props.lan}`).then(e => e.json()).then(data => {
                setCurrentData(data['articles'])
            })

        }
    }, [props.lan])

    const searchTheBar = () => {
        setsearchMode(true)
        fetch(`https://gnews.io/api/v4/search?q=${searchString}&token=410db42779f25b2d81028050efe65502&page=${1}&lang=${props.lan}`).then(e => e.json()).then(data => {
            setCurrentData(data['articles'])
        });
        setCurrentData(1);
    }
    useEffect(() => {

        if (searchString === '')
            fetch(`https://gnews.io/api/v4/top-headlines?token=410db42779f25b2d81028050efe65502&page=${currentPage}&lang=${props.lan}`).then(e => e.json()).then(data => {
                setCurrentData(data['articles'])
            })
        else {
            fetch(`https://gnews.io/api/v4/search?q=${searchString}&token=410db42779f25b2d81028050efe65502&page=${currentPage}&lang=${props.lan}`).then(e => e.json()).then(data => {
                setCurrentData(data['articles'])
            })
        }
    }, [currentPage, justToggle])


    return (
        <div>
            <input id='searchBox' value={searchString} onChange={(e) => { setSearchString(e.target.value) }} onKeyDown={(e) => {
                if (e.key === 'Enter') { searchTheBar(); }
            }} />
            {renderCards()}
            <button id='search' onClick={() => {
                searchTheBar();
            }}>search</button>
            <button id='Prev' disabled={currentPage == 1 ? true : false} onClick={() => { currentPage > 1 ? setCurrentPage(currentPage - 1) : undefined }}>Prev</button>
            <button id='Next' disabled={currentPage == 3 ? true : false} onClick={() => { currentPage < 3 ? setCurrentPage(currentPage + 1) : undefined }}>Next</button>
            <button id='exitSearchMode' style={!searchMode ? { display: 'none' } : {}} onClick={() => {
                setSearchString('');
                setsearchMode(false)
                if (currentPage !== 1)
                    setCurrentPage(1)
                else
                    setJustToggle(justToggle + 1);
            }}>exitSearch Mode</button>
        </div >
    )
}
