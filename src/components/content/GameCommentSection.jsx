import { useState, useContext } from "react";
import { Container, Row, Card, Form, Button } from "react-bootstrap";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { gameDatabase } from "../structural/firebaseP76";
import { ReviewUsername } from "../contexts/ReviewUsernameContext";

function GameCommentSection(props) {
    
    const { username, setUser } = useContext(ReviewUsername);
    const [comment, setComment] = useState("");
    
    async function commentSubmit(e){
        e?.preventDefault();
        if (!username.trim() || !comment.trim()) return;

        try {
            const docRef = doc(gameDatabase, "gamereviews", props.gameId);
            await updateDoc(docRef, {
                comments: arrayUnion({
                    user: username,
                    comment: comment
                })
            });
            setComment("");
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    }

    return <Container>
    <h1>Comment Section</h1>
        <Card>
            <Form onSubmit={commentSubmit}>
                <Form.Label htmlFor="username">Username for Comment</Form.Label>
                <Form.Control id="username" placeholder="Username" value={username} onChange={(e)=>setUser(e.target.value)}></Form.Control>
                <Form.Label htmlFor="comment">Comment</Form.Label>
                <Form.Control id="comment" placeholder="Comment" value={comment} onChange={(e)=>setComment(e.target.value)}></Form.Control>
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