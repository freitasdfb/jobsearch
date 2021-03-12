import styled from "styled-components";
import Link from "next/link";
import CardHome from '../../infra/components/CardHome'

const MenuButton = styled.button`
  margin: 20px;
`;

export function HomeMain() {
  return (
    <CardHome>
      <div className="col-sm-6 col-lg-12 col-md-6">
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
  );
}
