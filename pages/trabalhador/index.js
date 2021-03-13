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
    telefone: "",
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

  return (
    <ContainerGlobal>
      <Alert show={alertShow} variant={variantAlert}>
        {alertText}
      </Alert>
      <CardHome>
        <div style={{display: "flex", alignItems: "center"}}>
        <img style={{marginRight: "10px"}} src="http://www.trabalho.df.gov.br/wp-conteudo/themes/site-secretarias/img/ico-logo-gdf.svg"></img>
        <h2>Cadastro de trabalhador</h2>
        </div>
        <div style={{ maxWidth: "100%" }}></div>

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

          <label htmlFor="telefone">Telefone</label>
          <InputMask
            mask="(99) 9 9999-9999"
            type="text"
            id="telefone"
            placeholder="Telefone"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.telefone}
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
