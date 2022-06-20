import axios from 'axios'
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'
import { Text, Input, Container, Button, Title } from '@mantine/core'


const Chat = ({ sender }) => {
    const [chats, setChats] = useState([])
    const [msgSend, setMsgSend] = useState('')
    const [test, setTest] = useState()
    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY,{
            clust: 'eu'
        })
        const channel = pusher.subscribe("chat");

        channel.bind("chat-event", (data) => {
            console.log('something happened', data)
            setTest(data)
            // setChats((prevState => [
            //     ...prevState,
            //     { sender: data.sender, message: data.message }
            // ]))
        })
        
        return () => {
            pusher.unsubscribe("chat")
        }
    }, [])
    const handleSend = async(e) => {
        if(e.keyCode !== 13 || e.shiftKey) return
        console.log({ message: msgSend, sender})
        // await axios.post("/api/pusher", { message: msgSend, sender})
    }
    return(
        <Container size={600}>
            <Title order={1}>{sender}</Title>
            <Input onKeyUp={(e) => handleSend(e)} onChange={e => setMsgSend(e.target.value)} placeholder='message...' />
            <Button onClick={() => console.log(test)}>console</Button>
        </Container>
    )
}

export default Chat