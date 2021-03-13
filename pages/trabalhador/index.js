import { ContainerGlobal } from "../../infra/components/Container";
import CardHome from "../../infra/components/CardHome";
import { useFormik } from "formik";
import styled from "styled-components";
import axios from "axios";
import React from "react";
import { Alert } from "react-bootstrap";
import InputMask from "react-input-mask";

const SendButton = styled.button`
  margin-top: 20px;
`;

export default function Trabalhador() {
  const [areasAtuacao, setAreasAtuacao] = React.useState([{}]);
  const [alertShow, setAlertShow] = React.useState(false);
  const [variantAlert, setVariantAlert] = React.useState();
  const [alertText, setAlertText] = React.useState("");

  React.useEffect(async () => {
    try {
      const data = await axios.get(
        "https://backend-jobsearch.herokuapp.com/areatuacao"
      );
      setAreasAtuacao(data.data);
    } catch (error) {
      handleAlert(error.message, "danger");
    }
  }, []);

  const initialValues = {
    nome: "",
    cpf: "",
    cep: "",
    email: "",
    areaAtuacao: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        const json = JSON.stringify(values);
        const res = await axios.post(
          "https://backend-jobsearch.herokuapp.com/trabalhador",
          json,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        handleAlert("Cadastro realizado com sucesso", "success");
      } catch (error) {
        handleAlert(error.response.data.error, "danger");
      }
    },
  });

  function handleAlert(alertText, alertVariant) {
    setVariantAlert(alertVariant);
    setAlertText(alertText);
    setAlertShow(!alertShow);
    setTimeout(() => {
      setAlertShow(false);
    }, 3000);
  }

  function cpfMask(value) {
    return value
      .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }

  return (
    <ContainerGlobal>
      <CardHome>
        <h2>Cadastro de trabalhador</h2>
        <div style={{ maxWidth: "100%" }}>
          <Alert show={alertShow} variant={variantAlert}>
            {alertText}
          </Alert>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Nome completo"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.nome}
            required
          />

          <label htmlFor="cpf">CPF</label>
          <InputMask
            mask="999.999.999-99"
            type="text"
            id="cpf"
            placeholder="CPF"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.cpf}
            required
          />

          <label htmlFor="cep">CEP</label>
          <InputMask
            mask="99999-999"
            type="text"
            id="cep"
            placeholder="CEP"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.cep}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />

          <label htmlFor="areaAtuacao">Area de atuação</label>
          <select
            value={formik.values.areaAtuacao}
            id="areaAtuacao"
            className="form-select"
            onChange={formik.handleChange}
          >
            <option selected> Selecione sua área de atuação </option>
            {areasAtuacao
              ? areasAtuacao.map((areas) => (
                  <option key={areas._id} value={areas.value}>
                    {areas.nome}
                  </option>
                ))
              : ""}
          </select>

          <SendButton
            disabled={formik.isSubmitting}
            type="submit"
            className="btn btn-success"
          >
            Enviar dados
          </SendButton>
        </form>
      </CardHome>
    </ContainerGlobal>
  );
}
