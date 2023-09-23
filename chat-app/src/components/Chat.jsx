import moment from "moment/moment"
import { useEffect, useState } from "react"

import s from '../socket'
import * as Lib from '../lib'
const Chat = (props) => {
    const [text, setText] = useState('')
    const [bottom, setBottom] = useState(true)
    const { user, self } = props
    useEffect(() => {
        s.on('rescroll', data => {
            console.log(data, bottom)
            if (bottom) {
                refreshScroll()
                console.log('rescrollin', bottom)
            }
        })


        return () => {
            s.off('rescroll')
        }
    }, [bottom])
    const onEnter = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            send()
            setText('')
        }
    }
    const onClick = (e) => {
        send()
        setText('')
    }
    const send = () => {
        const m = {
            name: user.name,
            text,
            date: moment().format('llll'),
            from: props.self
        }
        const sUser = props.user
        const h = Lib.makeHash(sUser.name, self)
        if (!sUser.messages[h])
            sUser.messages[h] = []
        sUser.messages[h].push(m)
        props.setSelectedUser(sUser)
        refreshScroll()
        s.emit('p-message', { content: m, to: user.id })
    }
    const onChange = (e) => {
        setText(e.target.value)
    }

    const refreshScroll = () => {
        setTimeout(() => {
            var chatHistory = document.getElementById("messgs");
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }, 50)
    }

    const isScrolled = (e) => {
        var chatHistory = document.getElementById("messgs");
        if (e.deltaY < 0) {
            setBottom(() => (false))
            return
        }
        if (chatHistory.scrollTop + 400 === chatHistory.scrollHeight)
            setBottom(() => (true))
    }


    return (<div className="bg-app" style={{ borderRadius: '10px' }}>
        <div className="container py-3">
            <div className="row d-flex justify-content-center">
                <div className="col">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center p-3"
                            style={{ borderTop: '4px solid #000000' }}>
                            <h5 className="mb-0">Chat with {user.name}</h5>
                            <div className="d-flex flex-row align-items-center">
                                <span className="badge bg-app me-3">{'  '}</span>
                                <i className="fas fa-minus me-3 text-muted fa-xs"></i>
                                <i className="fas fa-comments me-3 text-muted fa-xs"></i>
                                <i className="fas fa-times text-muted fa-xs"></i>
                            </div>
                        </div>
                        <div id="messgs" className="card-body" data-mdb-perfect-scrollbar="true"
                            style={{
                                position: 'relative',
                                height: '400px',
                                overflowY: 'auto',
                            }}
                            onWheel={e => isScrolled(e)}>
                            {Messages(user.messages[Lib.makeHash(user.name, self)] || [], props.self)}
                        </div>
                        <div className="card-footer text-muted d-flex justify-content-start align-items-center mt-3 p-3">
                            <div className="input-group mb-0">
                                <input type="text" className="form-control" placeholder="Type message" value={text}
                                    aria-label="Recipient's username" aria-describedby="button-addon2" onChange={e => onChange(e)} onKeyDown={e => onEnter(e)} />
                                <button className="btn btn-dark bg-app" type="button" id="button-addon2"
                                    style={{ paddingTop: '.55rem' }} onClick={(e) => onClick(e)}>
                                    Button
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>)
}

const Messages = (messages, self) => {
    return (messages).map(m => {
        return m.from === self ? ownMessage(m) : incomingMessage(m)
    })
}

const ownMessage = (message) => {
    const { pic = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp",
        text, date } = message
    return (<>
        <div className="d-flex justify-content-between">
            <p className="small mb-1 text-muted">{date}</p>
            <p className="small mb-1">{'Tú'}</p>
        </div>
        <div className="bg-app rounded-5 d-flex flex-row justify-content-end mb-4 pt-1">
            <div>
                <p className="small p-2 me-3 mb-0 text-black rounded-3">{Lib.manageEmojis(text)}</p>
            </div>
            <img src={pic}
                alt="avatar 1" style={{ width: '45px', height: '100%' }}></img>
        </div>
    </>)
}

const incomingMessage = (message) => {
    const { from, text, date,
        pic = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp" } = message
    return (<>
        <div className="d-flex justify-content-between">
            <p className="small mb-1">{from}</p>
            <p className="small mb-1 text-muted">{date}</p>
        </div>
        <div className="d-flex flex-row justify-content-start">
            <img src={pic} alt="avatar 1" style={{ width: '45px', height: '100%' }}></img>
            <div>
                <p className="small p-2 ms-3 mb-0 rounded-5" style={{ backgroundColor: '#f5f6f7' }}>{Lib.manageEmojis(text)}</p>
            </div>
        </div>
    </>)
}

export default Chat