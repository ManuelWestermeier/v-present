import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { fetchPresentationData } from "../../utils/fetch-presentation/"
import Markdown from 'react-markdown'
import "./index.css"

function Presentation({ url = "" }) {
    const [data, setData] = useState < Boolean | any > (false)
    const [pageIndex, setPageIndex] = useState(0)
    const presentationView = useRef()

    useEffect(() => {
        fetchPresentationData(url)
            .then(data => setData(data))
    }, [])

    if (!data) {
        return <h1>Loading</h1>
    }

    return (
        <div className='presentation'>
            <header className='presentation-header'>
                <h1>
                    Page
                </h1>
                <div>
                    <button onClick={e => setPageIndex(old => old - 1)}>
                        -
                    </button>
                    <button onClick={e => setPageIndex(old => old + 1)}>
                        +
                    </button>
                </div>
            </header>
            <div className='presentation-view' ref={presentationView}>
                {data.map((markdown, index) => {
                    if (index == pageIndex && presentationView?.current?.children[index]) {
                        presentationView
                            .current
                            .children[index]
                            .scrollIntoView({
                                block: "center",
                                behavior: "smooth"
                            })
                    }

                    return <Markdown key={index} className={"presentation-page"}>{markdown}</Markdown>
                })}
            </div>
        </div>
    )
}

export default Presentation