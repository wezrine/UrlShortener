import React, { useState } from 'react'

function HomePage() {

    const [url, setUrl] = useState({input: "", output: ""})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    const handleOnChange = (e) => {
        setUrl({
            ...url,
            input: e.target.value
        })
    }

    const handleSubmit = () => {

        // check for http:// or https://
        const input = url.input
        if (input.slice(0,7) === 'http://' || input.slice(0,8) === 'https://') {
            fetch('http://localhost:8080/shorten-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(url)
            }).then(response => response.json())
            .then(data => setUrl({
                ...url,
                output: `http://localhost:8080/${data.slug}`
            }))
        } else {
            setErrorMessage('Input must be a valid URL (http:// or https://)')
        }

        setIsSubmitted(true)
    }

    const refreshForm = () => {

        const urlInputTextBox = document.getElementById('urlInputTextBox')
        const urlOutputTextBox = document.getElementById('urlOutputTextBox')
        urlInputTextBox.value = ''
        urlOutputTextBox.value = ''

        setUrl({input: '', output: ''})
        setErrorMessage()
        setIsSubmitted(false)
    }

    return (
        <div className="box">
            <div className="field">
                <label className="label">Enter a long URL</label>
                <div className="control">
                    <input id="urlInputTextBox" className="input url-input" name="urlInput" onChange={handleOnChange}/>
                </div>
            </div>

            <div className="field">
                <label className="label">Shortend URL</label>
                <div className="control">
                    <div id="urlOutputTextBox" className="input url-output">
                        <a className='output-link' href={url.output.length > 0 ? url.output : ""}>
                        {url.output.length > 0 ? url.output : ""}</a>
                    </div>
                </div>
            </div>
            {errorMessage ? <div className='error-message-container'><h1 className='error-message'>{errorMessage}</h1></div> : ""}
            {isSubmitted ? <button className="button is-link submit-form" onClick={refreshForm}>New URL</button> : <button className="button is-primary submit-form" onClick={handleSubmit}>Shorten URL</button>}
        </div>
    )
}
export default HomePage