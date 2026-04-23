import { useState } from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import GameCommentSection from "./GameCommentSection";

export default function IndividualGamePage(props){

    /* Change all of this so it takes input to make multiple pages of the stuff (ex Student from hw4).
    *  Change the like and dislike so they are sent and pulled from an API.
    */

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [buttonPressed, setButtonState] = useState(false);
    const [likeButtonPressed, setLikeButtonState] = useState(false);
    const [dislikeButtonPressed, setDislikeButtonState] = useState(false);

    function handleLike() {
        setLikes(oLikes => oLikes + 1)
        setButtonState(true);
        setLikeButtonState(true);
    }

    function handleLikeAgain() {
        setLikes(oLikes => oLikes - 1)
        setButtonState(false);
        setLikeButtonState(false);
    }

    function handleDislike() {
        setDislikes(oDislikes => oDislikes + 1)
        setButtonState(true);
        setDislikeButtonState(true);
    }

    function handleDislikeAgain() {
        setDislikes(oDislikes => oDislikes - 1)
        setButtonState(false);
        setDislikeButtonState(false);
    }

    return <div>
        <h1>Here would be a game title</h1>
        <Carousel interval={null}>
            <Carousel.Item style={{backgroundColor: 'black'}}>
                <Card style={{backgroundColor: 'black'}}>
                    <p style={{color: "white"}}>Here would be an image</p>
                    <br/>
                </Card>
            </Carousel.Item>
            <Carousel.Item style={{backgroundColor: 'black'}}>
                <Card style={{backgroundColor: 'black'}}>
                    <p style={{color: "white"}}>Here would be another image</p>
                    <br/>
                </Card>
            </Carousel.Item>
            <Carousel.Item style={{backgroundColor: 'black'}}>
                <Card style={{backgroundColor: 'black'}}>
                    <p style={{color: "white"}}>Here would be a third image</p>
                    <br/>
                </Card>
            </Carousel.Item>
            <Carousel.Item style={{backgroundColor: 'black'}}>
                <Card style={{backgroundColor: 'black'}}>
                    <p style={{color: "white"}}>There would probably be an image here</p>
                    <br/>
                </Card>
            </Carousel.Item>
        </Carousel>
        <Card style={{margin: "auto", marginTop: "1rem", maxWidth: "40rem"}}>
            <p>Here would be a short spoilerfree review</p>
        </Card>
        <Card style={{margin: "auto", marginTop: "1rem", maxWidth: "40rem"}}>
            <p><strong>{likes} likes</strong> | <strong>{dislikes} dislikes</strong></p>
            <Button onClick={likeButtonPressed ? handleLikeAgain : handleLike} disabled={dislikeButtonPressed}>{buttonPressed ? "Thank you" : "Like this Review"}</Button>
            <Button variant="danger" onClick={dislikeButtonPressed ? handleDislikeAgain : handleDislike} disabled={likeButtonPressed}>{buttonPressed ? "Thank you" : "Dislike this Review"}</Button>
        </Card>
        <GameCommentSection comments={props.comments}/>
    </div>
}