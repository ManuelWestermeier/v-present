import { useRef } from "react"

type SetPageProps = {
    url: string,
    setUrl: (url: string) => void
}

function SetPageUrlPage(props: SetPageProps) {
    const urlInput = useRef<HTMLInputElement>(null)

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (urlInput.current) {
            props.setUrl(urlInput.current.value)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input placeholder="url..." type="text" ref={urlInput} />
            <button type="submit">
                Go
            </button>
        </form>
    )
}

export default SetPageUrlPage
