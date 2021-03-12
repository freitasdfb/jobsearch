import { ContainerGlobal } from "../../infra/components/Container";
import CardHome from "../../infra/components/CardHome";
import { useFormik } from "formik";
import styled from "styled-components";
import axios from "axios";
import React from "react";


const SendButton = styled.button`
  margin-top: 20px;
`;


export default function Trabalhador() {
  const [areasAtuacao, setAreasAtuacao] = React.useState([{}]);

  React.useEffect(async () => {
    const data = await axios.get("http://localhost:8080/areatuacao");
    setAreasAtuacao(data.data);
    console.log(areasAtuacao);
  }, []);

  const initialValues = {
    nome: "",
    cpf: "",
    cep: "",
    email: "",
    areaAtuacao: ''
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const json = JSON.stringify(values);
      const res = await axios.post("http://localhost:8080/trabalhador", json, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      });
    },
  });

  return (
    <ContainerGlobal>
      <CardHome>
        <h2>Cadastro de trabalhador</h2>

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
          <input
            type="text"
            id="cpf"
            placeholder="CPF"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.cpf}
            required
          />

          <label htmlFor="cep">CEP</label>
          <input
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
            {areasAtuacao ? areasAtuacao.map((areas) => (
              <option
                key={areas.id}
                value={areas.value}
                >
                {areas.nome}
              </option>
            )) : ''}

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
