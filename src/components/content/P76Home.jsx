import { useState} from "react";
import { Link } from "react-router";
import { Card, Carousel, Form } from "react-bootstrap";

function P76Home() {
    
    const {gameName, setName} = useState("");
    
    return (
        <div>
            <h1>Welcome to the game review corner</h1>
            <p></p>
            <h2>Here are the game reviews</h2>
            <Carousel>
            <Carousel.Item style={{backgroundColor: 'black'}}>
                <Card style={{backgroundColor: 'black'}}>
                    <p style={{color: "white"}}>Here would be an image</p>
                     <p><Link to="demoShowcase">Here is what a page on a game will look like!</Link></p>
                    <br/>
                </Card>
            </Carousel.Item>
            {/* Set up this carousel to feature SPECIFIC games */}
            </Carousel>
            <h2>Looking for a specific game?</h2>
            <Card>
                <Form>
                    <Form.Label htmlFor="gameName">Here is all the game reviews on the site!</Form.Label>
                    <Form.Control id="gameName"  value={gameName} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form>
                <p><Link to="demoShowcase">Here is what a page on a game will look like!</Link></p>
                {/* Change this so all game reviews that are related to the search (maybe tags alongside names?) appear. */}
            </Card>
        </div>
    );
}

export default P76Home;