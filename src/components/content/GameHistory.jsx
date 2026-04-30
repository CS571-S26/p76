import { useState} from "react";
import { Link } from "react-router";
import { Card, Carousel, Container } from "react-bootstrap";
import gameHistory from "./data/gameHistory.json";

function GameHistory() {
    const [carouselSlide, setSlide] = useState(0);
    const images = import.meta.glob('/src/assets/GameHistoryImgs/*', {
        eager: true,
        import: 'default'
    });
    //const sortedImages = Object.entries(images).sort(([a], [b]) => a.localeCompare(b));

    return ( <Container>
            <Carousel activeIndex={carouselSlide} onSelect={setSlide} interval={null}>
                {Object.entries(images).map(([path, src]) => {
                    const fileName = path.split('/').pop().replace(/\.[^/.]+$/, '');
                    return (
                        <Carousel.Item key={path} style={{ backgroundColor: 'black', }}>
                            <img src={src} alt={fileName} style={{width: '600px', height: "400px",  objectFit: 'contain'}}/>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
            <Card>
                <h1>{gameHistory[carouselSlide].title || "No title available"}</h1>
                <p>{gameHistory[carouselSlide].des || "No description available"}</p>
            </Card>
        </Container>
    );
}

export default GameHistory;