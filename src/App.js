import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Footer } from "./Components/Footer";
import { Map } from "./Components/Map";
import { NavBar } from "./Components/NavBar";

function App() {
  return (
    <Container className="p-0 d-flex flex-column h-100">
      <NavBar />
      <Map />
      <Footer />
    </Container>
  );
}

export default App;
