import styled from "styled-components";
import Link from "next/link";
import CardHome from "../../infra/components/CardHome";
import { ContainerGlobal } from "../../infra/components/Container";

const MenuButton = styled.button`
  margin: 20px;
`;

export default function HomeMain() {
  return (
    <ContainerGlobal>
      <CardHome style={{ width: " 30vw" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{ marginRight: "10px" }}
            src="http://www.trabalho.df.gov.br/wp-conteudo/themes/site-secretarias/img/ico-logo-gdf.svg"
          ></img>
          <h2>Busca de empregos</h2>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="col-sm-6 col-lg-12 col-md-6"
        >
          <Link href="trabalhador">
            <MenuButton type="button" className="btn btn-primary btn-lg">
              Trabalhador
            </MenuButton>
          </Link>
          <Link href="empregador">
            <MenuButton type="button" className="btn btn-secondary btn-lg">
              Empregador
            </MenuButton>
          </Link>
        </div>
      </CardHome>
    </ContainerGlobal>
  );
}
