import React, {  useState } from 'react';
import { Link } from "react-router-dom";
import { Card, Button, Nav, Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ParticlesBg from 'particles-bg'
import '../assets/styles/Favoris.css';

function Favoris() {

  const [gif, setGif] = useState("");

  //Fonction permettant d'enlever le gif sélectionné des favoris
  const removeFav = id => () => {
    setGif(id)
    console.log(gif)
    localStorage.removeItem(id);
  }

  //Lorsqu'un gif n'a pas de nom dans le json, on lui affecte ce string par défaut
  function getGifName(nameGif) {
    if (nameGif==="")
      return "Ce gif n'a pas de nom 😔"
    return nameGif
  }

  //On récupère les gifs depuis le localStorage puis on les affiche
  const getGif = () => {

    let tab = [];

    for (var id in localStorage) {

      if (JSON.parse(localStorage.getItem(id)) !== null) {
        let nameGif = getGifName(JSON.parse(localStorage.getItem(id)).title)

        tab.push(
          <div id="centerfav" key={"div" + id}>
            <Card id="fav">
              <Card.Header className="favtitle"></Card.Header>
              <Card.Title className="titleGif">{nameGif}</Card.Title>
              <Card.Img id="imagefav" variant="top" src={JSON.parse(localStorage.getItem(id)).images.original.url} />
              <Card.Body>
                <Button variant="primary" key={"button" + id} onClick={removeFav(id)}>
                  Enlever de la liste
                </Button>
              </Card.Body>
            </Card>
          </div>

        )
      }
    }

    return tab
  }

  return (
    <div>
      <div className="wrapper">
        <ParticlesBg num={10} type="" bg={true} />
      </div>
      <Navbar bg="dark" variant="dark" >
        <Container className="container">
          <Navbar.Brand href="#home">Richard CHEN</Navbar.Brand>
          <Nav className="me-auto" >
            <Link className="link" to="/">Home</Link>
            <Link className="link" to="/fav/">Favoris</Link>
          </Nav>
        </Container>
      </Navbar>

      <h1> Mes Favoris </h1>
      
      <div id="flex">
        {getGif()}
      </div>
    </div>

  )
}

Favoris.propTypes = {};

Favoris.defaultProps = {};

export default Favoris;
