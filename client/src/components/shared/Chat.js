import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { isUndefined } from 'util';
// import { groupId } from '../dashboard/GroupProfile';
const ENDPOINT = 'http://127.0.0.1:5000';

function outputUsers(users) {
  const userList = document.getElementById('users');
  console.log(users);
  userList.innerHTML = `${users
    .map(user => `<li>${user.user.firstName}</li>`)
    .join('')}`;
}

const outputMessage = (msg) => {
  const chat_messages = document.querySelector('.chat-messages');
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${msg.username}<span> ${new Date(msg.date).toLocaleString()} </span></p><p class="text">${msg.text}</p>`;
  chat_messages.appendChild(div);
};

let socket;
let btnSend;
const Chat = ({ auth: { user }, group: { group } }) => {

  if(window.performance) {
    if (performance.navigation.type === 1) {
      localStorage.removeItem('listening');
    }
  }

  useEffect(() => { 
    socket = socketIOClient(ENDPOINT);  
    btnSend = document.querySelector('.btn-send');
    return () => {
      socket.disconnect();
      localStorage.removeItem('listening');
    }
  }, []);

  // block until socket is not null
  let check = function() {
    setTimeout(function () {
      if (!socket || !btnSend || !user)
        check();
      else {
        if (!localStorage.getItem('listening')) {
          socket.emit('joinRoom', {
            user: user,
            room: localStorage.getItem('groupId')
          });
          socket.on('roomUsers', ({ chatUsers }) => {
            outputUsers(chatUsers);
          });
          // Message from server
          socket.on('message', message => {
            outputMessage(message);
          });
          btnSend.addEventListener('click', (e) => {
            e.preventDefault();
            let msg_input = document.getElementById('msg');
            let msg_text = msg_input.value;
            socket.emit('chatMessage', msg_text);
          });
          localStorage.setItem('listening', '1');
        }

      }
    }, 500);
  };
  check();
  
  return (
    <section className='container container-dashboard'>
      <header class='chat-header'>
        <h1>
          <i class='fas fa-smile'></i> ChatCord
        </h1>
        <a
          href='index.html'
          class='btn'
          onClick={() => localStorage.removeItem('groupId')}
        >
          Leave Room
        </a>
      </header>

      <main className='chat-main'>
        <div className='chat-sidebar'>
          <h3>
            <i className='fas fa-comments'></i> Room Name:
          </h3>
          <h2 id='room-name'>JavaScript</h2>
          <h3>
            <i className='fas fa-users'></i> Users
          </h3>
          <ul id='users'></ul>
        </div>
        <div className='chat-messages'>
          
        </div>
      </main>
      <div className='chat-form-container'>
        <form id='chat-form'>
          <input
            id='msg'
            type='text'
            placeholder='Enter Message'
            required
            autocomplete='off'
          />
          <button className='btn btn-send'>
            <i className='fas fa-paper-plane'></i> Send
          </button>
        </form>
      </div>
    </section>
  );
};

Chat.propTypes = {
  auth: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  group: state.group
});

export default connect(mapStateToProps)(Chat);
