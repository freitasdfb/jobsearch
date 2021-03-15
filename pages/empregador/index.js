import { ContainerGlobal } from "../../infra/components/Container";
import CardHome from "../../infra/components/CardHome";
import axios from "axios";
import React from "react";
import styled from "styled-components";

const ContainerTrabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  heigth: 100vh;
`;

const especialidade = "tecnologia";

export default function Empregador() {
  const [listTrab, setListTrab] = React.useState([{}]);

  React.useEffect(async () => {
    try {
      const res = await axios.get(
        "https://backend-jobsearch.herokuapp.com/trabalhador",
        {
          params: { areaAtuacao: especialidade },
        }
      );
      setListTrab(res.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <ContainerGlobal>
      <ContainerTrabs
        className="container"
        style={{ alignItems: "center", height: "100vh" }}
      >
        <div className="row">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{ marginRight: "10px" }}
              src="http://www.trabalho.df.gov.br/wp-conteudo/themes/site-secretarias/img/ico-logo-gdf.svg"
            ></img>
          <h2> Pessoas disponíveis com especialidade em {especialidade}: </h2>
          </div>
          {listTrab.map((values) => (
            <div style={{cursor: "pointer"}} className="col col-12">
              <div
                className="card"
                style={{
                  display: "flex",
                  height: "100px",
                  marginTop: "20px",
                  padding: "10px",
                }}
              >
                <h6>{values.nome}</h6>
                <div>Telefone: {values.telefone}</div>
                <div style={{ textTransform: "capitalize" }}>
                  Profissão: {values.areaAtuacao}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContainerTrabs>
    </ContainerGlobal>
  );
}
