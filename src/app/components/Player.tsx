interface PlayerProps {
    color: string;
    personalMap: Boolean[][];
    score: number;
    type: string;
}

class Player {
    type: string;
    color: string;
    personalMap: Boolean[][];
    score: number;
    constructor(props: PlayerProps) {
        this.color = props.color;
        this.personalMap = props.personalMap;
        this.score = props.score;
        this.type = props.type;
    }

    setColor(color: string) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    addToMap(location: string) {
        let row = Number(location[0]);
        let col = Number(location[1]);

        this.personalMap[row][col] = true;
    }

    getMap() {
        return this.personalMap;
    }

    getScore() {
        return this.score;
    }

    incrementScore(score: number) {
        this.score += score;
    }
}

export default Player;
