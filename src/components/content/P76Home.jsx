import { useState,  useContext} from "react";
import { Link } from "react-router";
import { Card, Carousel, Form } from "react-bootstrap";

import { GameReviewContext } from '../contexts/GameReviewsContext'

function P76Home() {
    
    const [gameName, setName] = useState("");
    const { gameReviews } = useContext(GameReviewContext);
    
    return (
        <div>
            <h1>Welcome to the Game Review Corner</h1>
            <p></p>
            <h2>Here are the game reviews</h2>
            <Carousel>
            {gameReviews.filter(game => (game.featured)).sort((a, b) => a.game.localeCompare(b.game, { sensitivity: 'base' })).map(game => (
                <Carousel.Item key={game.id} style={{backgroundColor: 'black'}}>
                    <Card style={{backgroundColor: 'black'}}>
                        <img src={game.images[0]} alt={`${game.game} cover`} style={{width: '300px', height: "auto", margin: "0 auto"}}/>
                        <p><Link style={{color: 'white'}} to={`/review/${game.id}`}>{game.game}</Link></p>
                        <br/>
                    </Card>
                </Carousel.Item>
            ))}
            </Carousel>
            <h2>Looking for a specific game?</h2>
            <Card>
                <Form>
                    <Form.Label htmlFor="gameName">Here are all the game reviews on the site!</Form.Label>
                    <Form.Control id="gameName"  value={gameName} placeholder ="Search here" onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form>
                {gameReviews.filter(game => game.game.toLowerCase().includes(gameName.toLowerCase)).sort((a, b) => a.game.localeCompare(b.game, { sensitivity: 'base' })).map(game => (
                    <p key={game.id}>
                        <Link to={`/review/${game.id}`}>{game.game}</Link>
                    </p>
                ))}
            </Card>
        </div>
    );
}

export default P76Home;