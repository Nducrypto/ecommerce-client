import styled from "styled-components";
import { categories } from "../../data";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const ContainerTwo = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <ContainerTwo key={item.id}>
          <Link to={`/productlist/${item.category}`}>
            <Image src={item.img} />
            <Info>
              <Title>{item.title}</Title>
              <Button>SHOP NOW</Button>
            </Info>
          </Link>
        </ContainerTwo>
      ))}
    </Container>
  );
};

export default Categories;
