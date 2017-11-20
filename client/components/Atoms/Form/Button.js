import styled from 'styled-components'

export default styled.button`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.title};
  font-size: 3rem;
  background: none;
  border-radius: 10rem;
  padding: 1rem 3rem;
  border: 4px solid ${({ theme }) => theme.colors.primary};
`
