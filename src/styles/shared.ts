import styled from "styled-components";

export const Button = styled.button`
  background-color: #242424;
  border: 0.67px solid #5a5a5a;
  border-radius: 4px;
  padding: 10px 7px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #363637;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #2c2e334d;
  border: 1px solid #5a5a5a;
  backdrop-filter: blur(24.216867446899414px);
  padding: 8px 12px;
  border-radius: 5px;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  &::placeholder {
    color: #ffffff;
  }
`;
