import { useState } from 'react'
import './App.css'
import ExpensesTable from './components/ExpensesTable'
import { useLocalStorage } from './hooks/useLocaStorage'
import { v4 as uuidV4 } from "uuid"
import CreateExpense from './components/CreateExpense';

export type RawExpense = {
  id: string
} & RawExpenseData

export type RawExpenseData = {
  item: string
  tagIds: string[],
  value: string,
}

export type ExpenseData = {
  item: string
  tags: Tag[],
  value: string,
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [expenses, setExpenses] = useLocalStorage<RawExpense[]>("EXPENSES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  function onCreateExpense({ tags, ...data }: ExpenseData) {
    setExpenses(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }


  return (
    <div className="app">
      <ExpensesTable/>
      <CreateExpense 
      onSubmit={onCreateExpense} 
      onAddTag={addTag} 
      onDeleteTag={deleteTag}
      updateTag={updateTag}
      availableTags={tags}></CreateExpense>
    </div>
  )
}

export default App
