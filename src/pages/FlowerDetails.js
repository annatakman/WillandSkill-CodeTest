import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { CommentForm } from '../components/CommentForm'
import { CommentList } from '../components/CommentList'

const Background = styled.section`
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 30px 20px 20px 20px;
  background-image: linear-gradient(rgba(0, 0, 0, 0) 40%, rgb(0, 0, 0) 100%),
    url(${(props) => (props.url)});
  a {
    text-decoration: none;
    color: #fff;
    font-size: 20px;
  }
`

const FlowerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 668px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 0 20px 20px;
  }
  `

const FlowerSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 668px) {
      width: 40%;
    }
  `

const Image = styled.img`
 display: none;

    @media (min-width: 668px) {
      display: flex;
      width: 70%;
      max-height: 60%;
      border: 4px solid #fff;
    }
  `

const Description = styled.div`
  margin-left: 20px;
  color: #fff;

    h1 {
      font-size: 28px;
    }
`
const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 668px) {
      width: 40%;
    }
`

export const FlowerDetails = ({ url }) => {
  const { flowerId } = useParams()
  const [flower, setFlower] = useState({})

  useEffect(() => {
    fetch(`https://flowers-mock-data.firebaseio.com/flowers/${flowerId}.json`)
      .then(res => res.json())
      .then(json => {
        setFlower(json)
      })
  }, [flowerId])

  return (

    <Background url={flower.cover_image}>
      <Link to="/">
        <span role="img" aria-label="back">◀️ </span>
        <span >All Flowers</span>
      </Link>
      <FlowerWrapper>
        <FlowerSection>
          <Image src={flower.cover_image} alt={flower.common_name} />
          <Description>
            <h1>{flower.common_name}</h1>
            <h3>Latin name: {flower.latin_name}</h3>
            <p>{flower.notes}</p>
            <p>Blooming season: {flower.blooming_season}</p>
          </Description>
        </FlowerSection>
        <CommentSection>
          <CommentForm />
          <CommentList />
        </CommentSection>
      </FlowerWrapper>
    </Background>

  )
}