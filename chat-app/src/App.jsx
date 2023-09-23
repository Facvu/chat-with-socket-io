import { useEffect, useState } from 'react'
import './App.css'
import './loader.scss'
import Login from './components/Login'
import Loader from './components/Loader'
import ChatList from './containers/ChatList'

function App() {
	const [state, setState] = useState({ name: '', loading: true })

	useEffect(() => {
		const searchUser = async () => {
			await setTimeout(() => {
				const name = localStorage.getItem('chat_name')
				console.log(name)
				if (name)
					setState({ ...state, name })
				setState(state => ({ ...state, loading: false }))
			}, 1000 * Math.floor(Math.random() * 4 + 1))
		}
		searchUser()
	}, [])

	const onChange = (e) => {
		setState({ ...state, nickname: e.target.value })
	}
	const onClick = (e) => {
		console.log(state)
		if (state.nickname) {
			setState(state => ({ ...state, name: state.nickname }))
			localStorage.setItem("chat_name", state.nickname)
		}
	}
	if (state.loading) {
		return <Loader />
	}
	return (
		<>
			{!state.name && (
				<Login onClick={onClick} onChange={onChange} u={state.nickname} />
			)}
			{
				state.name && <ChatList {...state} />
			}
		</>
	)
}

export default App
