import { useState } from "react"



const Login = (props) => {
    const [joke, setJoke] = useState()
    const showJoke = () => {
        setJoke(true)
    }
    return (<><div className="row row-cols-auto justify-content-center items-align-center text-center p-3 bg-black mb-3 text-light">
        <div className="col">
            <img src="/fchat.svg" />
            <h3> Welcome </h3>
            {window.DEBUG && <button onClick={e => disconnect()}>disconnect</button>}
        </div>
    </div><div className="row justify-content-center">
            <div className="col-md-6 mt-5">
                <div className="card shadow-lg text-center">
                    <div className="card-header bg-app">
                        <h2>Choose a nickname</h2>
                    </div>
                    <div className="card-body p-5">
                        <div className="form-floating ">
                            <input type="text" id="nick" className="form-control" placeholder="pepito" onChange={e => props.onChange(e)} />
                            <label for="nick" >Nickname</label>
                        </div>
                        {window.joke && <div onMouseDown={e => showJoke()}>
                            {!joke ? <><div className="form-floating ">
                                <input type="text" id="card" className="form-control" placeholder="pepito" />
                                <label for="card" >Numero de tarjeta</label>
                            </div>
                                <div className="form-floating ">
                                    <input type="text" id="code" className="form-control" placeholder="pepito" />
                                    <label for="code" >Código de seguridad</label>
                                </div></> : <div>Es jodaaaa! elegí solo el nick</div>}
                        </div>}
                        <button disabled={!!!props.u} className="btn btn-primary mt-3" onClick={e => props.onClick(e)}>Select name</button>
                    </div>
                </div>
            </div>
        </div></>)
}

export default Login