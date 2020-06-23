import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const List = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: 8px;
  color: #fff;
`

const Article = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0;
  padding: 0 4px;
  width: 70%;
  overflow-wrap: break-word;
  border-bottom: 1px solid #fff;
`

const Button = styled.button`
display: flex;
align-items: center;
justify-content: center;
width: 12px;
height: 12px;
font-size: 22px;
border-radius: 50%;
border: none;
background: #fff;
`

export const CommentList = () => {
  const { flowerId } = useParams()
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch(`https://flowers-mock-data.firebaseio.com/comments/annatakman/${flowerId}.json`)
      .then(res => res.json())
      .then(data => {
//The comments are stored in an object in the API, this converts the object into an array with a key 
// (the id-string) and a value (the comment), so that I can map over the array later on to show each comment.
        const commentsArray = Object.entries(data || {})
          .map(entry => {
            return ({ id: entry[0], value: entry[1] })
          })
        setComments(commentsArray)
      })
  }, [flowerId])

  // I started out with a delete-function but didn't have time to solve the problems that came of me having
  // converted the comment-object to an array and the backend expecting to get an object back.
  // Right now the delete-function deletes the right comment but data is not sent in the right way to 
  // the backend. Therefore I commented it out.

  // const handleDelete = (id) => {
  //   const filteredComments = comments.filter(
  //     item => item.id !== id)
  //   setComments(filteredComments)

  //   fetch(`https://flowers-mock-data.firebaseio.com/comments/annatakman/${flowerId}.json`, {
  //     method: "put",
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(filteredComments)
  //   })
  // }

  return (
    <List>
      {comments.length > 0 &&
        <>
          {comments.map((comment) => (
            <Article
              key={comment.id}>
              <p>{comment.value.comment}</p>
              {/* <Button onClick={e => handleDelete(comment.id)}> - </Button> */}
            </Article>
          ))}
        </>
      }
    </List>
  )
}