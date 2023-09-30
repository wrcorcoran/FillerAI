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

    getJSON() {
        let tempMap: {
            [rowIndex: number]: { [colIndex: number]: Boolean }[];
        }[] = [];
        let rowIndex = 0;

        this.personalMap.forEach((row) => {
            let colIndex = 0;
            let tempRow: { [colIndex: number]: Boolean }[] = [];
            row.forEach((cell) => {
                tempRow.push({
                    [colIndex]: cell,
                });
                colIndex++;
            });
            tempMap.push({ [rowIndex]: tempRow });
            rowIndex++;
        });

        let tempJSON = { color: this.color, score: this.score, map: tempMap };
        return { [this.type]: tempJSON };
    }
}

export default Player;
