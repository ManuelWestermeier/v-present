export async function fetchPresentationData(url = "") {
    try {
        //fetch the response and make it text
        const res = await fetch(url)
        const data = await res.text()

        const pages = data.replace(/\r/g, "").split("\n#page#\n")
        return pages
        
    } catch (error) {
        return []
    }
}