import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { FormEvent, useRef, useState } from "react"
import { ExpenseData, Tag } from "../App";
import CreatableReactSelect from "react-select/creatable"
import { v4 as uuidV4 } from "uuid"
import { Button } from "@mui/material";
import './CreateExpense.css';
import { Form } from "react-bootstrap";


type ExpenseFormProps = {
  onSubmit: (data: ExpenseData) => void
  onAddTag: (tag: Tag) => void
  onDeleteTag: (id: string) => void;
  updateTag: (id: string, label: string) => void;
  availableTags: Tag[]
} & Partial<ExpenseData>

function CreateExpense({
  onSubmit,
  onAddTag,
  onDeleteTag,
  updateTag,
  availableTags,
  item = "",
  value = "",
  tags = [],
}: ExpenseFormProps) {
//   const itemRef = useRef<HTMLInputElement>(null)
//   const valueRef = useRef<HTMLTextAreaElement>(null)

  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const [expense, setExpense] = useState({
    item: "",
    value: "",
    tags: selectedTags
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    onSubmit(expense)
  }

  function handleInputChange(event: any) {
    console.log("aaa", event.target.value)
    setExpense({...expense, [event.target.name]: event.target.value});
  }

  return (
    <Form className="box">
        {/* <Form.Control name="item" value={expense.item} onChange={(e) => handleInputChange(e)} placeholder="item"/>
        <Form.Control name="value" value={expense.value} onChange={(e) => handleInputChange(e)} placeholder="value- U$"/> */}
        <TextField name="item" value={expense.item} onChange={(e) => handleInputChange(e)} label="item" variant="standard" /> 
        <TextField name="value" value={expense.value} onChange={(e) => handleInputChange(e)} label="value- U$" variant="standard" />
        <CreatableReactSelect
            onCreateOption={label => {
            const newTag = { id: uuidV4(), label }
            onAddTag(newTag)
            setSelectedTags(prev => [...prev, newTag])
            }}
            value={selectedTags.map(tag => {
            return { label: tag.label, value: tag.id }
            })}
            options={availableTags.map((tag: { label: any; id: any }) => {
            return { label: tag.label, value: tag.id }
            })}
            onChange={tags => {
            setSelectedTags(
                tags.map(tag => {
                return { label: tag.label, id: tag.value }
                })
            )
            }}
            isMulti
        />
        <Button onClick={handleSubmit} variant="contained">Save</Button>
    </Form>
  )
}


export default CreateExpense;