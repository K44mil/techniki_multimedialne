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

const Chat = ({ auth: { user }, group: { group } }) => {
  if (user !== null) {
    const socket = socketIOClient(ENDPOINT);
    socket.emit('joinRoom', {
      user: user,
      room: localStorage.getItem('groupId')
    });
    socket.on('roomUsers', ({ chatUsers }) => {
      outputUsers(chatUsers);
    });
  }

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
          <div className='message'>
            <p className='meta'>
              Brad <span>9:12pm</span>
            </p>
            <p className='text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              repudiandae.
            </p>
          </div>
          <div className='message'>
            <p className='meta'>
              Brad <span>9:12pm</span>
            </p>
            <p className='text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              repudiandae.
            </p>
          </div>
          <div className='message'>
            <p className='meta'>
              Brad <span>9:12pm</span>
            </p>
            <p className='text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              repudiandae.
            </p>
          </div>
          <div className='message'>
            <p className='meta'>
              Brad <span>9:12pm</span>
            </p>
            <p className='text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              repudiandae.
            </p>
          </div>
          <div className='message'>
            <p className='meta'>
              Brad <span>9:12pm</span>
            </p>
            <p className='text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              repudiandae.
            </p>
          </div>
          <div className='message'>
            <p className='meta'>
              Brad <span>9:12pm</span>
            </p>
            <p className='text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              repudiandae.
            </p>
          </div>
          <div className='message'>
            <p className='meta'>
              Mary <span>9:15pm</span>
            </p>
            <p className='text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              repudiandae.
            </p>
          </div>
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
          <button className='btn'>
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
