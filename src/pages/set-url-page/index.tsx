import { useRef } from "react"

type SetPageProps = {
    url: string,
    setUrl: Function
}

function SetPageUrlPage(props: SetPageProps) {
    const urlInput = useRef()

    const onSubmit = (e: any) => {
        e.preventDefault()
        props.setUrl(urlInput?.current?.value || "")
    }

    return <form onSubmit={onSubmit}>
        <input placeholder="url..." type="text" ref={urlInput} />
        <button type="submit">
            Go
        </button>
    </form>
}

export default SetPageUrlPage