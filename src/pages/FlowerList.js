import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.section`
  display: grid;

    @media (min-width: 668px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
`

const Card = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;
`

const Image = styled.img`
  display: block;
  width: 100%;
`

const Text = styled.div`
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  color: white;
  padding: 18px;

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 18px;
  }
`

export const FlowerList = () => {
  const [flowers, setFlowers] = useState([])

  useEffect(() => {
    fetch('https://flowers-mock-data.firebaseio.com/flowers.json')
      .then(res => res.json())
      .then(json => {
        setFlowers(json)
      })
  }, [])

  const filteredFlowers = flowers.filter(
    (flower) => flower.cover_image
  )

  return (
    <Container>
      {filteredFlowers.map((flower, index) => (
        <Card key={flower.common_name}>
          <Link to={`/flowers/[${index}]`}>
            <Image src={flower.cover_image} alt={flower.common_name} />
            <Text >
              <h1>{flower.common_name}</h1>
              <h2>{flower.latin_name}</h2>
            </Text>
          </Link>
        </Card>
      ))}
    </Container>
  )
}