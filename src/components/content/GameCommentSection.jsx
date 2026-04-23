import { useState } from "react";
import { Container, Row, Card, Form, Button } from "react-bootstrap";

function GameCommentSection(props) {
    
    const [username, setUser] = useState(""); //set this so a context & local storage work together to keep it saved across pages.
    const [comment, setComment] = useState("");
    
    function commentSubmit(e){
        e?.preventDefault();
        //Set this up so the comment from the form is sent to the API.
    }

    return <Container>
    <h1>Comment Section</h1>
        <Card>
            <Form onSubmit={commentSubmit}>
                <Form.Label htmlFor="username">Username for Comment</Form.Label>
                <Form.Control id="username" value={username} onChange={(e)=>setUser(e.target.value)}></Form.Control>
                <Form.Label htmlFor="comment">Comment</Form.Label>
                <Form.Control id="comment" value={comment} onChange={(e)=>setComment(e.target.value)}></Form.Control>
                <br/>
                <Button type="submit" onClick={commentSubmit}>Create Comment</Button>
            </Form>
        </Card>
        <br/>
        {props.comments.map(message => <Card>
            <h2>{message.user}</h2>
            <p>{message.comment}</p>
        </Card>)}
    </Container>
}

export default GameCommentSection;