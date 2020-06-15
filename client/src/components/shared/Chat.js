import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMessages } from '../../actions/message';
const ENDPOINT = 'http://127.0.0.1:5000';

function outputUsers(users) {
  const userList = document.getElementById('users');
  userList.innerHTML = users
    .map(user => `<li>${user.user.firstName}</li>`)
    .join('');
}

const outputMessage = msg => {
  const chat_messages = document.querySelector('.chat-messages');
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p className="meta">${msg.username}<span> ${new Date(
    msg.date
  ).toLocaleString()} </span></p><p className="text">${msg.text}</p>`;
  chat_messages.appendChild(div);
};

let socket;
let btnSend;

const Chat = ({
  auth: { user },
  group: { group },
  message: { messages, loading },
  getMessages
}) => {
  const history = useHistory();
  if (window.performance) {
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
    };
  }, []);

  useEffect(() => {
    if (loading) {
      getMessages(localStorage.getItem('groupId'));
    }
    while (document.querySelector('.chat-messages').firstChild) {
      document
        .querySelector('.chat-messages')
        .removeChild(document.querySelector('.chat-messages').lastChild);
    }
    messages.forEach(el => {
      const chat_messages = document.querySelector('.chat-messages');
      const div = document.createElement('div');
      div.classList.add('message');
      div.innerHTML = `<p className="meta">${el.user.firstName} ${
        el.user.lastName
      }<span> ${new Date(
        el.date
      ).toLocaleString()} </span></p><p className="text">${el.text}</p>`;
      chat_messages.appendChild(div);
    });
  }, [loading]);

  console.log(messages);
  // block until socket is not null
  let check = function() {
    setTimeout(function() {
      if (!socket || !btnSend || !user) check();
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
          btnSend.addEventListener('click', e => {
            e.preventDefault();
            let msg_input = document.getElementById('msg');
            let msg_text = msg_input.value;
            socket.emit('chatMessage', msg_text);
            document.getElementById('msg').value = '';
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
          <i class='fas fa-smile'></i> Rozmowa grupowa
        </h1>
        <a
          class='btn'
          onClick={() => {
            localStorage.removeItem('groupId');
            history.push('/groups');
          }}
        >
          Opuść czat
        </a>
      </header>

      <main className='chat-main'>
        <div className='chat-sidebar'>
          <h3>
            <i className='fas fa-comments'></i> Nazwa czatu:
          </h3>
          <h2 id='room-name'>{localStorage.getItem('groupName')}</h2>
          <h3>
            <i className='fas fa-users'></i> Aktywni użytkownicy
          </h3>
          <ul id='users'></ul>
        </div>
        <div className='chat-messages'></div>
      </main>
      <div className='chat-form-container'>
        <form id='chat-form'>
          <input
            id='msg'
            type='text'
            placeholder='Enter Message'
            required
            autoComplete='off'
          />
          <button className='btn btn-send'>
            <i className='fas fa-paper-plane'></i> Wyślij
          </button>
        </form>
      </div>
    </section>
  );
};

Chat.propTypes = {
  auth: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  group: state.group,
  message: state.message
});

export default connect(
  mapStateToProps,
  { getMessages }
)(Chat);
