// ChatMessage.js
import React, { useState } from 'react';
import './ChatMessage.js'; // Import CSS for message styling

function ChatMessage({ message, onDelete, onReply, auth }) {
  const { text, uid, photoURL } = message;
  const isCurrentUser = uid === auth.currentUser?.uid;
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowContextMenu(true);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const handleDelete = () => {
    onDelete(message.id);
    setShowContextMenu(false);
  };

  const handleReply = () => {
    onReply(message);
    setShowContextMenu(false);
  };

  const handleCloseContextMenu = () => {
    setShowContextMenu(false);
  };

  return (
    <div
      className={`message-container ${isCurrentUser ? 'sent' : 'received'}`}
      onContextMenu={handleContextMenu}
    >
      <div className={`message ${isCurrentUser ? 'sent' : 'received'}`}>
        {!isCurrentUser && (
          <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="User" className="user-avatar" />
        )}
        <div className="message-content">
          <p>{text}</p>
          {showContextMenu && isCurrentUser && (
            <div className="context-menu" style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={handleReply}>Reply</button>
              <button onClick={handleCloseContextMenu}>Close</button>
            </div>
          )}
        </div>
        {isCurrentUser && (
          <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="User" className="user-avatar" />
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
