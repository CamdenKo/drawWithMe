import styled from 'styled-components'

export default styled.h3`
  color: ${({ theme }) => theme.colors.primaryAccent};
  font-family: ${({ theme }) => theme.typography.header};
  font-size: 3rem;
  margin: 0;
`
