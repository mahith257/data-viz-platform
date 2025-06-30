import styled from "styled-components";

export const Button = styled.button<{ theme?: string }>`
  background-color: ${({ theme }) =>
    theme === "light" ? "#e0e0e0" : "#242424"};
  border: 0.67px solid
    ${({ theme }) => (theme === "light" ? "#c0c0c0" : "#5a5a5a")};
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
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};

  &:hover {
    background-color: ${({ theme }) =>
      theme === "light" ? "#d0d0d0" : "#363637"};
  }
`;

export const InputContainer = styled.div<{ theme?: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme }) =>
    theme === "light" ? "rgba(200, 200, 200, 0.3)" : "#2c2e334d"};
  border: 1px solid
    ${({ theme }) => (theme === "light" ? "#c0c0c0" : "#5a5a5a")};
  backdrop-filter: blur(24.216867446899414px);
  padding: 8px 12px;
  border-radius: 5px;
`;

export const SearchInput = styled.input<{ theme?: string }>`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
  font-size: 16px;
  font-weight: 500;
  &::placeholder {
    color: ${({ theme }) => (theme === "light" ? "#666666" : "#ffffff")};
  }
`;
