import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin: 8px;
  width: 100%;
  background-color: transparent;
  color: #fff;
`

const Label= styled.label`
display: flex;
flex-direction: column;
`

const Button = styled.button`
  padding: 4px 8px;
  background-color: #fff;
  border: none;
`

const TextArea = styled.textarea`
  padding: 12px;
  margin: 8px 0;
  width: 60%;
  font-family: Helvetica, sans-serif;
`

export const CommentForm = () => {
  const { flowerId } = useParams()
  const [comment, setComment] = useState("")

  const handleSubmit = event => {
    event.preventDefault()
    fetch(`https://flowers-mock-data.firebaseio.com/comments/annatakman/${flowerId}.json`, {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment: comment })
    }).then(() => {
      window.location.reload()
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Comment if you like this flower!
      <TextArea
          onChange={event => setComment(event.target.value)}>
        </TextArea>
      </Label>
      <div>
        <Button type="submit">
          Comment
        </Button>
      </div>
    </Form>
  )
}