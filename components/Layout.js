import { Container } from "react-bootstrap";
import MainNav from "./MaiNav";

export default function Layout(props) {
  return (
    <>
      <MainNav />
      <br />
      <Container>{props.children}</Container>
      <br />
    </>
  );
}
