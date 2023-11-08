import styled from "styled-components";

export const FiltersContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    width: 75%;

    @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`