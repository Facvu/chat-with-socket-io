

const Loader = () => {
    const rd = Math.floor(Math.random() * 1000 + 1)
    const l = rd > 48 ? 39 : rd

    return (<div>
        <div className="loading">
            <div className="loading-text">
                <img src="public/fchat.svg" />
                <span className="loading-text-words">C</span>
                <span className="loading-text-words">A</span>
                <span className="loading-text-words">R</span>
                <span className="loading-text-words">G</span>
                <span className="loading-text-words">A</span>
                <span className="loading-text-words">N</span>
                <span className="loading-text-words">D</span>
                <span className="loading-text-words">O</span>
            </div>
        </div>
        <div className='d-flex  align-items-center flex-column '>
            <div className={`loader${l}`}></div>
        </div>
    </div>)
}

export default Loader