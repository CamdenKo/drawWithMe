import styled from 'styled-components'

export default styled.p`
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.typography.header};
  font-size: 1.5rem;
  margin: 0;
`
