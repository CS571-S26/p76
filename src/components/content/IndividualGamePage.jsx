import { useState, useEffect } from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import { useParams } from "react-router";
import { doc, updateDoc, increment, onSnapshot } from "firebase/firestore";

import { gameDatabase } from "../structural/firebaseP76";
import GameCommentSection from "./GameCommentSection";

export default function IndividualGamePage(props){

    /* Change all of this so it takes input to make multiple pages of the stuff (ex Student from hw4).
    *  Change the like and dislike so they are sent and pulled from an API.
    */

    const { gameId } = useParams();
    const [game, setGame] = useState(null);
    const [buttonPressed, setButtonState] = useState(false);
    const [likeButtonPressed, setLikeButtonState] = useState(false);
    const [dislikeButtonPressed, setDislikeButtonState] = useState(false);

    useEffect(() => {
        const docRef = doc(gameDatabase, "gamereviews", gameId);

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setGame(docSnap.data());
            }
        });

        return () => unsubscribe();
    }, [gameId]);

    async function handleLike() {
        const docRef = doc(gameDatabase, "gamereviews", gameId);
        await updateDoc(docRef, {
            likes: increment(1)
        });
        setButtonState(true);
        setLikeButtonState(true);
    }

    async function handleLikeAgain() {
        const docRef = doc(gameDatabase, "gamereviews", gameId);
        await updateDoc(docRef, {
            likes: increment(-1)
        });
        setButtonState(false);
        setLikeButtonState(false);
    }

    async function handleDislike() {
        const docRef = doc(gameDatabase, "gamereviews", gameId);
        await updateDoc(docRef, {
            dislikes: increment(1)
        });
        setButtonState(true);
        setDislikeButtonState(true);
    }

    async function handleDislikeAgain() {
        const docRef = doc(gameDatabase, "gamereviews", gameId);
        await updateDoc(docRef, {
            dislikes: increment(-1)
        });
        setButtonState(false);
        setDislikeButtonState(false);
    }
    if (!game) return <p>Loading...</p>;

    return <div>
        <h1>{game.game}</h1>
        <Carousel interval={null}>
            {game.images.map((image, index) => (
                <Carousel.Item key={index} style={{backgroundColor: 'black'}}>
                    <Card style={{backgroundColor: 'black'}}>
                        <img src={image} alt={`${game.game} image ${index}`} style={{width: 'auto', height: "600px", margin: "0 auto"}}/>
                    </Card>
                </Carousel.Item>
            ))}
        </Carousel>
        <Card style={{margin: "auto", marginTop: "1rem", maxWidth: "40rem"}}>
            <p>{game.review}</p>
        </Card>
        <Card style={{margin: "auto", marginTop: "1rem", maxWidth: "40rem"}}>
            <p><strong>{game.likes} likes</strong> | <strong>{game.dislikes} dislikes</strong></p>
            <Button onClick={likeButtonPressed ? handleLikeAgain : handleLike} disabled={dislikeButtonPressed}>{buttonPressed ? "Thank you" : "Like this Review"}</Button>
            <Button variant="danger" onClick={dislikeButtonPressed ? handleDislikeAgain : handleDislike} disabled={likeButtonPressed}>{buttonPressed ? "Thank you" : "Dislike this Review"}</Button>
        </Card>
        <GameCommentSection gameId={gameId} comments={game.comments}/>
    </div>
}