import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'


const Background = styled.section`
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
  background-image: linear-gradient(rgba(0, 0, 0, 0) 70%, rgb(0, 0, 0) 100%),
    url(${(props) => (props.url)});
  a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}
`

const FlowerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 668px) {
    flex-direction: row;
    align-items: flex-end;
    padding: 20px;
  }
  `

const Image = styled.img`
  width: 100%;
  border: 5px solid white;
    @media (min-width: 668px) {
      width: 40%;
    }
  `

const Description = styled.div`
    margin-left: 20px;
    color: white;

      h1 {
        font-size: 28px;
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
        <Image src={flower.cover_image} alt={flower.common_name} />
        <Description>
          <h1>{flower.common_name}</h1>
          <h3>Latin name: {flower.latin_name}</h3>
          <p>{flower.notes}</p>
          <p>Blooming season: {flower.blooming_season}</p>
        </Description>
      </FlowerWrapper>
    </Background>

  )
}