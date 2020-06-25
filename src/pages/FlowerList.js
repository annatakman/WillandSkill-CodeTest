import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;
  background: #000;

    @media (min-width: 668px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
`

const Text = styled.h1`
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 40px;
  color: #fff;
  font-size: 24px;
`

const Image = styled.img`
  display: block;
  width: 100%;
  height: 40vh;
  object-fit: cover;
  transition: all 0.3s ease-in-out;
`

const Card = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;
    &:hover ${Text} {
      display: block;
    }
    &:hover ${Image} {
    opacity: 0.5;
  }
`

export const FlowerList = () => {
  const [flowers, setFlowers] = useState([])

  useEffect(() => {
    fetch('https://flowers-mock-data.firebaseio.com/flowers.json')
      .then(res => res.json())
      .then(json => {
        json.forEach((value, index) => {
          value.index = index
        })
        setFlowers(json)
      })
  }, [])

  // Filters out one of the flowers that didn't have a picture
  const filteredFlowers = flowers.filter(
    (flower) => flower.cover_image
  )

  // Since I used a filter-function and since the API is built so that you navigate to the individual flowers
  // using their array index, I made the forEach-function above in the fetch to make sure that every item 
  // keeps its original index. Otherwise the navigation wouldn't work correctly.

    return(
      <Container>
        {filteredFlowers.map((flower) => (
          <Card key={flower.common_name}>
            <Link to={`/flowers/${flower.index}`}>
              <Image src={flower.cover_image} alt={flower.common_name} />
              <Text >{flower.common_name}
              </Text>
            </Link>
          </Card>
        ))}
      </Container>
    )
}