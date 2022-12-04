import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { FormEvent, useRef, useState } from "react"
import { ExpenseData, Tag } from "../App";
import CreatableReactSelect from "react-select/creatable"
import { v4 as uuidV4 } from "uuid"
import { Button } from "@mui/material";
import './CreateExpense.css';


type ExpenseFormProps = {
  onSubmit: (data: ExpenseData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<ExpenseData>

function CreateExpense({
  onSubmit,
  onAddTag,
  availableTags,
  item = "",
  value = 0,
  tags = [],
}: ExpenseFormProps) {
  const itemRef = useRef<HTMLInputElement>(null)
  const valueRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    onSubmit({
      item: itemRef.current!.value,
      value: Number(valueRef.current!.value),
      tags: selectedTags,
    })
  }

  return (
    <Box className="box">
        <TextField id="outlined-basic" label="item" variant="standard" />
        <TextField id="outlined-basic" label="value- U$" variant="standard" />
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
        <Button variant="contained">Save</Button>
    </Box>
  )
}


export default CreateExpense;