import { useState} from "react";
import { Link } from "react-router";
import { Container, Card, Carousel, Form, Button, } from "react-bootstrap";

function GameRecommendations() {

    const [recGame, setRecommend] = useState();
    const [demoBox, setDemoBox] = useState(false);
    
    function recommendSend(e){
        e?.preventDefault();
        //Set this up so the reccomendation is sent to another API (if it has already been reccomended, instead increase a counter)
    }

    return <Container>
        <Card>
            <label>
                Demo tester: <input type="checkbox" name="demoBox" defaultChecked={demoBox} onChange={(e)=>setDemoBox((e.target.checked))} />
            </label>
            {/* Set up a map that takes all the possible tags from the API (Maybe both APIs?) */}
        </Card>
        <Card>
            {demoBox && <Card>
                <h1><Link to="/demoShowcase">DemoShowcase</Link></h1>
                <p>Tags: demo</p>    
            </Card>}
            {/* Showcasing the list of games from the api, but only the results of that match the above*/}
        </Card>
        <h1>Send your own recommendation</h1>
        <Card>
            <Form onSubmit={recommendSend}>
                <Form.Label htmlFor="recGameTitle">Recommend a game for me here!</Form.Label>
                <Form.Control id="recGameTitle" value={recGame} onChange={(e)=>setRecommend(e.target.value)}></Form.Control>
                <Button type="submit" onClick={recommendSend}>Send</Button>
            </Form>
        </Card>
    </Container>
}

export default GameRecommendations;