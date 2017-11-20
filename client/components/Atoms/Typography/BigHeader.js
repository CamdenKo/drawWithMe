import styled from 'styled-components'

export default styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.header};
  font-size: 4rem;
  margin: 0;
`
