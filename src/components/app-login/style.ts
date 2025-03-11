import styled from "styled-components";

export const LoginWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  color: #000;

  .modalContent {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .fromGroup {
    margin-bottom: 15px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .closeButton {
    padding: 10px;
    background-color: #ccc;
    color: #000;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .error {
    color: red;
    margin-bottom: 10px;
  }

  .switchButton {
    background: none;
    color: #000;
    text-decoration: underline;
  }
`