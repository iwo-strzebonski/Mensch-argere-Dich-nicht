Array.range = (start, end) => { return [...Array(end - start).keys()].map(i => i + start) }

window.onload = () => {
    document.body.append('[' + Array.range(0, 20) + ']')
}
