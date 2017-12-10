import React from 'react'
import styled from 'styled-components'

const Parent = styled.li`
  margin: 0;
  width: 100%;
  height: fit-content;
  padding: 10px 0px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`
const Content = styled.p`
  margin: 0;
`

export default (props) => {
  const {
    author,
    content,
  } = props.message

  return (
    <Parent>
      <Content>
        <b>{author}: </b>{content}
      </Content>
    </Parent>
  )
}

