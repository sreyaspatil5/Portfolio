// VideoCall.js
import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Peer from 'simple-peer';
import './VideoCall.css';

const VideoCall = ({ username }) => {
    const [caller, setCaller] = useState('');
    const [callee, setCallee] = useState('');
    const [stream, setStream] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [receivingCall, setReceivingCall] = useState(false);
    const [callerSignal, setCallerSignal] = useState();

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const stompClient = useRef();

    useEffect(() => {
        const socket = new SockJS('/ws');
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
            stompClient.current.subscribe('/topic/callUser', (message) => {
                const data = JSON.parse(message.body);
                if (data.userToCall === username) {
                    setReceivingCall(true);
                    setCaller(data.from);
                    setCallerSignal(data.signalData);
                }
            });
            stompClient.current.subscribe('/topic/acceptCall', (message) => {
                const data = JSON.parse(message.body);
                if (data.from === username) {
                    setCallAccepted(true);
                    connectionRef.current.signal(data.signalData);
                }
            });
        });

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream);
            if (myVideo.current) {
                myVideo.current.srcObject = stream;
            }
        });
    }, [username]);

    const callUser = (calleeUsername) => {
        const peer = new Peer({ initiator: true, trickle: false, stream: stream });

        peer.on('signal', (data) => {
            stompClient.current.send('/app/callUser', {}, JSON.stringify({ userToCall: calleeUsername, signalData: data, from: username }));
        });

        peer.on('stream', (stream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        });

        connectionRef.current = peer;
    };

    const acceptCall = () => {
        setCallAccepted(true);
        const peer = new Peer({ initiator: false, trickle: false, stream: stream });

        peer.on('signal', (data) => {
            stompClient.current.send('/app/acceptCall', {}, JSON.stringify({ signalData: data, from: username }));
        });

        peer.on('stream', (stream) => {
            userVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;
    };

    return (
        <div>
            <div>
                <h2>Make a call</h2>
                <input type="text" placeholder="Callee Username" value={callee} onChange={(e) => setCallee(e.target.value)} />
                <button onClick={() => callUser(callee)}>Call</button>
            </div>
            <div>
                <video playsInline muted ref={myVideo} autoPlay style={{ width: '300px' }} />
                {callAccepted && !receivingCall ? (
                    <video playsInline ref={userVideo} autoPlay style={{ width: '300px' }} />
                ) : null}
            </div>
            <div>
                {receivingCall ? (
                    <div>
                        <h1>{caller} is calling...</h1>
                        <button onClick={acceptCall}>Accept</button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default VideoCall;
