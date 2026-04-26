import styled from "styled-components";

export const Container = styled.div`
  width: 60%;
  max-width: 90%;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  h3 {
    margin: 0;
  }
`;

export const InfoItem = styled.p`
  font-size: 14px;
  margin: 4px 0;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #00b050;
  }
`;

export const Button = styled.button`
  background-color: #00b050;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #009e48;
  }
`;

export const EditButton = styled.button`
  margin-right: 8px;
  margin-top: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: #e0e0e0;

  &:hover {
    opacity: 0.8;
  }
`;