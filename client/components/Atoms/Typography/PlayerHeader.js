import styled from 'styled-components'

export default styled.h3`
  margin: 0;
  background-color: ${({ theme }) => theme.colors.dark};
  color: white;
  font-family: ${({ theme }) => theme.typography.header};
  font-size: 2.7rem;
  text-align: center;
  margin: 10px 0;
  padding: 10px 0;
`
