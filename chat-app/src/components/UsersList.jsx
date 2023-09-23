import { useEffect, useState } from "react"
import Chat from "./Chat"

const UsersList = (props) => {
    const selectUser = (user) => {
        console.log(user)
        user.newMessage = 0
        props.setSelectedUser(user)
    }
    const sortedUsers = () => {
        return props.state.users
            .sort((a, b) => {
                return a.name.localeCompare(b.name)
            })
            .sort((a, b) => (b.connected - a.connected))
    }
    return (<div className="row">
        <div className="col-md-6" >
            {
                sortedUsers().map((u, i) => {
                    return (<div key={i} className="container mb-2" onClick={e => selectUser(u)}>
                        <div className="container">
                        </div>
                        <div className="card btn user">
                            <div className="p-2">
                                <div className="ring-container" style={{ color: 'black' }}>
                                    <div>{u.name}</div>
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex">
                                            {u.connected ? <div className="circle-connected">
                                                <div className="ringring-connected"></div>
                                            </div> : <div className="circle-offline"></div>
                                            }
                                            <div style={{ fontSize: '10px', marginLeft: '5px' }}>{u.connected ? 'online' : 'offline'}</div>
                                        </div>
                                        {u.newMessage > 0 ? <span className="badge bg-app me-3">{u.newMessage}</span> : null}
                                    </div>
                                </div >
                            </div>
                        </div>
                    </div>)
                })
            }
        </div>
        <div className="col-md-6">
            {props.selectedUser && <Chat user={props.selectedUser}
                setSelectedUser={props.setSelectedUser}
                self={props.self}
                state={props.state}
                setState={props.setState} />}
        </div>
    </div>)
}

export default UsersList