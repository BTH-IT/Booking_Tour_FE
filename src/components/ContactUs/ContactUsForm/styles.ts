import styled from "styled-components";

export const ContactUsForm = styled.form`
  display: flex;
  align-items: center;
  border-radius: 50px;
  background-color: white;

  @media screen and (max-width: 567px) {
    flex-direction: column;
    border-radius: 12px;

    button {
      border-radius: 12px;
      max-width: 100%;
    }
  }
`;
export const ContactUsFormContent = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  padding: 15px;
  flex: 1;
  color: #8c8c8c;
  gap: 20px;
  width: 100%;
`;

export const ContactUsFormField = styled.input`
  outline: none;
  flex: 1;
  border: none;
  height: 100%;
  width: 100%;
  font-size: 1.4rem;
  color: black;
  font-weight: 300;
`;
