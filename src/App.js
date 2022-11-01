import React, { useState } from 'react';
import delete_icon from './icons/delete_icon.png';
import edit_icon from './icons/edit_icon.png';
import './App.css';

function App() {
  // State - React Hooks
  const [newItem, setNewItem] = useState('') ;
  const [items, setItems] = useState([]);
  const [editedItem, setEditedtem] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const addItem = () => {
    if(!newItem) {
      alert("Please add an item!")
      return;
    }
    const newItemObject = {
      id: Math.floor(Math.random()*1000),
      name: newItem,
    }
    // Adding new item to items (state) array
    setItems((currentItemsList) => [...currentItemsList, newItemObject]);
    // Reset newItem back to the original state
    setNewItem('');
  }
  const deleteItem = (id) => {
    const newArray = items.filter((item) => item.id !== id)
    setItems(newArray);
  }

  const editItem = (id, newName) => {
    const currentItem = items.filter((item) => item.id === id)[0];

    const updatedItem = {
      id: currentItem.id,
      name: newName,
    }
    deleteItem(id);
    setItems((oldItems) => [...oldItems, updatedItem]);
    setEditedtem('')
  }

  return (
    <div className="app">
      <h1>
        My todo list
      </h1>
      <div className="app-container">
        <div>
          <input type="text" placeholder="Please add an item" value={newItem} onChange={(e) => setNewItem(e.target.value)}/>
          {/* The add to the list button */}
          <button className="button-add" onClick={() => addItem()}>Add</button>
        </div>
        <ul>
          {items.map((item) => {
            const shouldEdit = editId === item.id;
            return(
              <li key={item.id} className="row" >
                { !showEdit && 
                  ( // will only show the edit button if it's not showing the updatingForm
                    <div className='item'>
                      {item.name}
                    </div>
                  )
                }
                {
                  !showEdit && 
                  ( // will only show the edit button if it's not showing the updatingForm
                    <button 
                      id="editButton" 
                      className="button-edit" 
                      onClick={() => {
                        setShowEdit(true);
                        setEditId(item.id);
                      }}
                    >
                      <img src={edit_icon} alt="edit" ></img>
                    </button> 
                  )
                }
                {
                  showEdit && shouldEdit &&( // will only show the edit button if the user clicked on the editButton
                  <div id="updatingForm" >
                    <input 
                      type="text" 
                      placeholder={item.name}
                      value={editedItem}
                      onChange={(e) => setEditedtem(e.target.value)}
                    />
                    <button 
                      onClick={() => {
                        setShowEdit(false);
                        setEditId(null);
                        editItem(item.id, editedItem)
                        }}
                    > 
                      Update 
                    </button>
                  </div>
                  )
                }
                { !showEdit && 
                  ( // will only show the delete button if it's not showing the updatingForm
                    <div className='div-delete'>
                      <button className="button-delete" onClick={() => deleteItem(item.id)}><img src={delete_icon} alt="delete" ></img></button>
                    </div>
                  )
                }
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
