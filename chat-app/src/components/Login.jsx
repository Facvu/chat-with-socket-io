


const Login = (props) => {


    return (<div className="row justify-content-center">
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
                    <button disabled={!!!props.u} className="btn btn-primary mt-3" onClick={e => props.onClick(e)}>Select name</button>
                </div>
            </div>
        </div>
    </div>)
}

export default Login