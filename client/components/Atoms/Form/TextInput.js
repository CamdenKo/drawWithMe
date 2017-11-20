import styled from 'styled-components'

export default styled.input`
  background: none;
  border: none;
  border-bottom: 2px solid black;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  font-family: ${({ theme }) => theme.typography.body};
`
