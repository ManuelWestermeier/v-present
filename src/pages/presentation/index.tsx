import { useRef, useEffect, useState } from 'react'
import { fetchPresentationData } from "../../utils/fetch-presentation"
import Markdown from 'react-markdown'
import "./index.css"

function Presentation({ url = "" }) {
    const [data, setData] = useState<Array<string>>(["Loading..."])
    const [pageIndex, setPageIndex] = useState(0)
    const presentationView = useRef<HTMLDivElement>()

    useEffect(() => {
        fetchPresentationData(url)
            .then(data => setData(data))
    }, [])

    return (
        <div className='presentation'>
            <header className='presentation-header'>
                <div>
                    <button onClick={e => setPageIndex(old => (old - 1) > 0 ? (old - 1) : 0)}>
                        {"<Last"}
                    </button>
                    <span>
                        {pageIndex + 1}
                    </span>
                    <button onClick={e => setPageIndex(old => (old + 1) > data.length - 1 ? data.length - 1 : (old + 1))}>
                        {"Next>"}
                    </button>
                    <button onClick={e => {
                        presentationView?.current?.requestFullscreen()
                    }}>
                        [Fullscreen]
                    </button>
                </div>
            </header>
            <div className='presentation-view' ref={presentationView}>
                {data.map((markdown, index) => {
                    if (index == pageIndex && presentationView?.current?.children?.[index]) {
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