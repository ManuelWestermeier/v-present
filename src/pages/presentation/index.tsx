import { useRef, useEffect, useState, useCallback } from 'react';
import { fetchPresentationData } from "../../utils/fetch-presentation";
import Markdown from 'react-markdown';
import "./index.css";

function Presentation({ url = "" }) {
    const [data, setData] = useState<Array<string>>(["Loading..."]);
    const [pageIndex, setPageIndex] = useState(0);
    const presentationView = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchPresentationData(url)
            .then(data => setData(data));
    }, [url]);

    const getCenteredElementIndex = useCallback(() => {
        if (!presentationView.current) return 0;

        const container = presentationView.current;
        const containerRect = container.getBoundingClientRect();
        const children = Array.from(container.children);

        let closestChildIndex = 0;
        let closestChildDistance = Number.MAX_VALUE;

        children.forEach((child, index) => {
            const childRect = child.getBoundingClientRect();
            const childCenter = (childRect.top + childRect.bottom) / 2;
            const containerCenter = (containerRect.top + containerRect.bottom) / 2;
            const distance = Math.abs(childCenter - containerCenter);

            if (distance < closestChildDistance) {
                closestChildDistance = distance;
                closestChildIndex = index;
            }
        });

        return closestChildIndex;
    }, []);

    const handleScroll = useCallback(() => {
        const newIndex = getCenteredElementIndex();
        setPageIndex(newIndex);
    }, [getCenteredElementIndex]);

    useEffect(() => {
        const container = presentationView.current;
        container?.addEventListener('scroll', handleScroll);
        return () => {
            container?.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className='presentation'>
            <header className='presentation-header'>
                <div>
                    <button onClick={() => {
                        var newPageIndex = 0;

                        setPageIndex((old) => {
                            newPageIndex = Math.max(old - 1, 0)
                            return newPageIndex
                        })

                        if (presentationView?.current?.children?.[newPageIndex]) {
                            presentationView
                                .current
                                .children[newPageIndex]
                                .scrollIntoView({
                                    block: "center",
                                    behavior: "smooth"
                                })
                        }
                    }}>
                        {"<Last"}
                    </button>
                    <span>
                        {pageIndex + 1}
                    </span>
                    <button onClick={() => {
                        var newPageIndex = 0;

                        setPageIndex((old: number) => {
                            newPageIndex = Math.min(old + 1, data.length - 1)
                            return newPageIndex
                        })

                        if (presentationView?.current?.children?.[newPageIndex]) {
                            presentationView
                                .current
                                .children[newPageIndex]
                                .scrollIntoView({
                                    block: "center",
                                    behavior: "smooth"
                                })
                        }
                    }
                    }>
                        {"Next>"}
                    </button>
                    <button onClick={() => {
                        presentationView.current?.requestFullscreen();
                    }}>
                        [Fullscreen]
                    </button>
                </div>
            </header >
            <div
                className='presentation-view'
                ref={presentationView}
                onScroll={handleScroll}
            >
                {data.map((markdown, index) => (
                    <Markdown key={index} className={"presentation-page"}>
                        {markdown}
                    </Markdown>
                ))}
            </div>
        </div >
    );
}

export default Presentation;
