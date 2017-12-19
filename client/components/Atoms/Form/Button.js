import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.header};
  font-size: 3rem;
  background: none;
  border-radius: 10rem;
  padding: 1rem 3rem;
  border: 4px solid ${({ theme }) => theme.colors.primary};
`

export default (props) => {
  const StyledButton = props.disabled ?
    Button.extend`
      color: grey;
      border-color: grey;
    ` :
    Button

  return (
    <StyledButton disabled={props.disabled}>
      {props.children}
    </StyledButton>
  )
}
