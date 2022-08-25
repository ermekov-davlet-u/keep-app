import React, { createContext, useState, useId } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './pages/Main';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NoteContext } from './store';
export const context = createContext({});

export interface INotes {
  id: any;
  title: string;
  content: string;
  date: Date;

}


function App() {

  const [ trash, setTrash ] = useState<INotes[]>([])
    const [ notes, setNotes ] = useState<INotes[]>([
    {
      id: 1,
      title: "Заметка 1",
      content: "Текст заметки",
      date: new Date(),
    },
    {
      id: 2,
      title: "Заметка 2",
      content: "Текст заметки",
      date: new Date(),
    },
    {
      id: 3,
      title: "Заметка 3",
      content: "Текст заметки",
      date: new Date(),
    },
    {
      id: 4,
      title: "Заметка 4",
      content: "Текст заметки",
      date: new Date(),
    }
  ])

  function createNew(){
    const newNote: INotes = {
      id: Date.now(),
      title: "",
      content: "",
      date: new Date(),
    }
    setNotes( [ ...notes, newNote ] )
    return newNote
  }
  function deleteNote ( idNote: string ) {
    setTrash(( state: any ) => {
      const note = notes.find( note => note.id === idNote)
      return [state, note]
    })
    setNotes( ( state: INotes[] ) => {
        return state.filter( note => note.id !== idNote)
    } )
  }

  return (
    <div className="App">
      <NoteContext.Provider value={{ notes, setNotes, createNew, trash, deleteNote}}>
        <BrowserRouter>
          <Routes>  
            <Route path="/" element={ <Main /> } />
          </Routes>
        </BrowserRouter>
      </NoteContext.Provider>
    </div>
  );
}

export default App;
