import { useEffect, useState } from "react"

import UsersList from "../components/UsersList"
import Toast from "../components/Toast"
import * as Lib from '../lib'

import s from '../socket'
import Loader from "../components/Loader"

const ListChat = (props) => {
    const [state, setState] = useState({ users: [] })
    const [selectedUser, setSelectedUser] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        console.log('effecting', props.name)
        s.auth = { name: props.name }
        s.connect()
        s.on('user_connected', user => {
            console.log('conn', user)
            setState(state => {
                const _users = state.users.map(u => {
                    if (u.name === user.name)
                        u.connected = true
                    return u
                })
                if (!_users.some(u => u.name === user.name))
                    _users.push(user)
                return {
                    ...state,
                    users: _users
                }
            })
        })
        s.on('user_disconnected', user => {
            console.log('disc', user)
            setState(state => {
                const _users = state.users.map(u => {
                    if (u.name === user.name)
                        u.connected = user.connected
                    return u
                })
                return {
                    ...state,
                    users: _users
                }
            })
        })
        s.on('p-message', ({ content, id }) => {
            setState(state => {
                const users = state.users.map(u => {
                    if (u.name === content.from) {
                        const h = Lib.makeHash(props.name, content.from)
                        if (!u.messages[h])
                            u.messages[h] = []
                        if (u.name !== props.name)
                            u.newMessage = u.newMessage ? u.newMessage + 1 : 1
                        u.messages[h].push(content)
                    }
                    if (selectedUser?.name === u.name)
                            setSelectedUser((ps) => (u))
                    return u
                })
                return {
                    ...state,
                    users
                }
            })
        })
        s.on('users', users => {
            console.log('users', users)
            const _users = users.map(u => {
                const h = Lib.makeHash(props.name, u.name)
                u.messages = { [h]: u.messages[h] }
                if (u.name === props.name)
                    u.self = true
                return u
            })
            setState(state => ({ ...state, users: _users }))
        })

        setLoading(false)
        return () => {
            s.disconnect()
            s.off('user_connected')
            s.off('user_disconnected')
            s.off('p-message')
        }
    }, [])
    const disconnect = () => {
        s.disconnect()
    }
    if (loading) {
        return <Loader />
    }
    return (
        <div>
            <div className="row row-cols-auto justify-content-center items-align-center text-center p-3 bg-black mb-3 text-light">
                <div className="col">
                    <img src="/fchat.svg" />
                    <h3> Welcome {props.name} </h3>
                    {window.DEBUG && <button onClick={e => disconnect()}>disconnect</button>}
                </div>
            </div>
            <Toast />
            <div className="row">
                <div className="col">
                    {!!state.users.length ?
                        <UsersList users={state.users} selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                            self={props.name}
                            state={state}
                            setState={setState} /> :
                        <h3 className="text-center">No hay nadie conectado 🥺</h3>
                    }
                </div>
            </div>
        </div>
    )

}

export default ListChat