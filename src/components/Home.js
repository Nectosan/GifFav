import { Link } from "react-router-dom";
import { GiphyFetch } from "@giphy/js-fetch-api";
import React, { useEffect, useState } from 'react';
import { Card, Button, Nav, Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ParticlesBg from 'particles-bg'

import '../assets/styles/Home.css';

function Home() {

    // On utilise l'objet proposé par notre api afin de faciliter les l'appels de requêtes
    const gf = new GiphyFetch("6zXsDwmCSHaWp7z67hsH1xhYR2NvX7Qc");
    const [urlgif, setUrlGif] = useState({});
    const [favtitle, setfavtitle] = useState("Featured");
    const [gif, setGif] = useState({});
    const [titlegif, settitleGif] = useState("");

    //Fonction random permettant de récupérer un gif aléatoire depuis l'api 
    const random = async () => {
        try {

            //On récupère les données JSON du gif
            const result = await gf.random();

            //On affecte les données aux différentes variables d'état pour les réutiliser dans l'affichage
            setUrlGif(`https://media1.giphy.com/media/${result.data.id}/giphy.gif`)
            settitleGif(result.data.title)
            setGif(result.data);
            if(result.data.title === ""){
                settitleGif("Ce gif n'as pas de nom 😔")
            }
            setfavtitle("Featured")
        } catch (error) {
            console.error(`random`, error);
        }

       
    };

    //Le useEffect avec [] nous permet d'appeler une fois la fonction random au début
    useEffect(() => {
        random()
    //La ligne suivante a été implémenté afin d'ignorer le warning indiquant la dépendance manquante (déploiement impossible autrement)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //fonction ajoutant le gif sélectionné dans le localStorage
    const addFav = () => {
        setfavtitle("Ajouté au favoris ! 👏")
        localStorage.setItem(gif.id, JSON.stringify(gif));
    };

    return (

        <div className="center">   

            <ParticlesBg num={10} type="" bg={true} />
            <Navbar className="nav" bg="dark" variant="dark" >
                <Container className="container">
                    <Navbar.Brand href="#home">Richard CHEN</Navbar.Brand>
                    <Nav className="me-auto" >
                        <Link className="link" to="/">Home</Link>
                        <Link className="link" to="/fav/">Favoris</Link>
                    </Nav>
                </Container>
            </Navbar>

            <div>
                <Card id="card" >
                    <Card.Header className="favtitle">{favtitle}</Card.Header>
                    <Card.Title className="titleGif">{titlegif}</Card.Title>
                    <Card.Img className="image" variant="top" src={urlgif} />
                    <Card.Body>    
                        <Card.Text>
                            Date d'importation du gif : {gif.import_datetime}
                        </Card.Text>
                        <Button variant="primary" className="buttonFav" onClick={addFav}>Ajouter aux favoris</Button>
                    </Card.Body>
                </Card>
                <button className="random" onClick={async () => {random()}}> <span> Next GIF 👏 </span></button>
            </div>
        </div>)
}



export default Home;
