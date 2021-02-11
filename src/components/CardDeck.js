import React, { useState, useEffect } from 'react'
import Card from './Card'
export default function CardDeck(props) {

    const [currentPage, setCurrentPage] = useState(1)
    const [currentData, setCurrentData] = useState([])
    const [searchString, setSearchString] = useState('')
    const [justToggle, setJustToggle] = useState(0);

    const renderCards = () => {
        let lan = props.lan
        let retArray = []
        if (currentData.length > 0) {
            // console.log('printing')
            for (let i = 0; i < 3; i++) {
                retArray.push(< Card lan={lan} idx={currentPage * 3 + i - 3} data={currentData[currentPage * 3 + i - 3]} key={lan + currentPage * 3 + i + 'id'} />)
            }
        } return retArray;
    }


    useEffect(() => {
        if (currentPage !== 1)
            setCurrentPage(1)
        else {

            if (searchString === '')
                fetch(`https://gnews.io/api/v4/top-headlines?token=cf38da615afef723c4298acb88067130&page=${currentPage}&lang=${props.lan}`).then(e => e.json()).then(data => {
                    setCurrentData(data['articles'])
                })
            else {
                fetch(`https://gnews.io/api/v4/search?q=${searchString}&token=cf38da615afef723c4298acb88067130&page=${currentPage}&lang=${props.lan}`).then(e => e.json()).then(data => {
                    setCurrentData(data['articles'])
                })
            }
        }
    }, [props.lan])

    const searchTheBar = () => {
        fetch(`https://gnews.io/api/v4/search?q=${searchString}&token=cf38da615afef723c4298acb88067130&page=${1}&lang=${props.lan}`).then(e => e.json()).then(data => {
            setCurrentData(data['articles'])
        });
        setCurrentData(1);
    }
    useEffect(() => {

        if (searchString === '')
            fetch(`https://gnews.io/api/v4/top-headlines?token=cf38da615afef723c4298acb88067130&page=${currentPage}&lang=${props.lan}`).then(e => e.json()).then(data => {
                setCurrentData(data['articles'])
            })
        else {
            fetch(`https://gnews.io/api/v4/search?q=${searchString}&token=cf38da615afef723c4298acb88067130&page=${currentPage}&lang=${props.lan}`).then(e => e.json()).then(data => {
                setCurrentData(data['articles'])
            })
        }
    }, [currentPage, justToggle])

    useEffect(() => {
        console.log(currentData)
    }, [currentData])
    return (
        <div>
            <input id='searchBox' value={searchString} onChange={(e) => { setSearchString(e.target.value) }} onKeyDown={(e) => {
                if (e.key === 'Enter') { searchTheBar(); }
            }} />
            {renderCards()}
            <button id='search' onClick={() => {
                searchTheBar();
            }}>search</button>
            <button id='Pre' onClick={() => { currentPage > 1 ? setCurrentPage(currentPage - 1) : undefined }}>Prev</button>
            <button id='Next' onClick={() => { currentPage < 3 ? setCurrentPage(currentPage + 1) : undefined }}>Next</button>
            <button id='exitSearchMode' onClick={() => {
                setSearchString('');
                if (currentPage !== 1)
                    setCurrentPage(1)
                else
                    setJustToggle(justToggle + 1);
            }}>exitSearch Mode</button>
        </div>
    )
}
