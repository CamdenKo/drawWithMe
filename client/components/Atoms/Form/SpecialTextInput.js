import styled from 'styled-components'

export default styled.input`
  background: none;
  border: none;
  border-bottom 2px dashed black;
  font-size: 5rem;
  padding: 0.5rem 0rem;
  font-family: ${({ theme }) => theme.typography.header};
  text-align: center;
`
