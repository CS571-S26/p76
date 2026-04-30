import { useState, useContext, useEffect} from "react";
import { Link } from "react-router";
import { Container, Card, Carousel, Form, Button, Row, Col } from "react-bootstrap";
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";

import { gameDatabase } from "../structural/firebaseP76";
import { ReviewUsername } from "../contexts/ReviewUsernameContext";
import { GameReviewContext } from '../contexts/GameReviewsContext'

function GameRecommendations() {

    const { username, setUser } = useContext(ReviewUsername);
    const { gameReviews } = useContext(GameReviewContext);
    const [recGame, setRecommend] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
    async function fetchTags() {
        const snapshot = await getDocs(collection(gameDatabase, "gamereviews"));

        let allTags = [];

        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.tags) {
                allTags = [...allTags, ...data.tags];
            }
        });

        // Remove duplicates + sort
        const uniqueTags = [...new Set(allTags)].sort((a, b) =>
            a.localeCompare(b)
        );

        setTags(uniqueTags);
    }

    fetchTags();
}, []);

    const searchTagSubmit = (e) => {
        e.preventDefault();
        const match = tags.find(
            (tag) => tag.toLowerCase() === searchValue.trim().toLowerCase()
        );
        if (match && !selectedTags.includes(match)) {
            setSelectedTags([...selectedTags, match]);
        }
        setSearchValue("");
    };
    
    async function recommendSend(e){
        e?.preventDefault();
        if (!recGame || !username) return;
        const normalizedGame = recGame.trim().toLowerCase();
        const recRef = doc(gameDatabase, "recommendations", normalizedGame);
        const recSnap = await getDoc(recRef);
        if (recSnap.exists()) {
            const data = recSnap.data();
            if (!data.users.includes(username)) {
                await updateDoc(recRef, {
                    users: arrayUnion(username),
                    count: increment(1)
                });
            }
        } else {
            await setDoc(recRef, {
                name: normalizedGame,
                users: [username],
                count: 1
            });
        }
        setRecommend("");
    }

    return <Container>
        <h1>Tags to search</h1>
        <Card>
            <Row>
                <Form onSubmit={searchTagSubmit}>
                    <Form.Label htmlFor="searchTag">Username for Recommendation</Form.Label>
                    <Form.Control id="searchTag" placeholder="Search tag here" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                </Form>
                {tags.map(tag => (
                    <Col xs ={12} sm ={12} md ={6} lg ={4} xl ={3}>
                        <Form.Check
                            key={tag}
                            type="checkbox"
                            reverse
                            label={tag}
                            checked={selectedTags.includes(tag)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedTags([...selectedTags, tag]);
                                } else {
                                    setSelectedTags(selectedTags.filter(t => t !== tag));
                                }
                            }}
                        />
                    </Col>
                ))}
            </Row>
        </Card>
        <Card>
            <h1>Games according to your request tags</h1>
            {gameReviews.filter(game => {
                    if (selectedTags.length === 0) return true;
                    return game.tags?.some(tag =>
                        selectedTags.includes(tag)
                    );
                }).sort((a, b) => a.game.localeCompare(b.game, { sensitivity: 'base' })).map(game => (
                    <p key={game.id}>
                        <Link to={`/review/${game.id}`}>{game.game}</Link>
                    </p>
            ))}
        </Card>
        <h1>Send your own recommendation</h1>
        <Card>
            <Form onSubmit={recommendSend}>
                <Form.Label htmlFor="username">Username for Recommendation</Form.Label>
                <Form.Control id="username" placeholder="Username" value={username} onChange={(e)=>setUser(e.target.value)}></Form.Control>
                <Form.Label htmlFor="recGameTitle">Recommend a game for me here!</Form.Label>
                <Form.Control id="recGameTitle" placeholder="Recommendation" value={recGame} onChange={(e)=>setRecommend(e.target.value)}></Form.Control>
                <Button type="submit" onClick={recommendSend}>Send</Button>
            </Form>
        </Card>
    </Container>
}

export default GameRecommendations;