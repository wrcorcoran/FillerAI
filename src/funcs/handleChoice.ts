import Board from "@/app/components/Board";
import Player from "@/app/components/Player";
import { minimax } from "./minimax";

export default async function handleBotChoice(
    board: Board,
    human: Player,
    bot: Player,
    colors: any
) {
    return new Promise<string>(async (resolve) => {
        let color = "";
        let colors_list = (colors: any) => [...colors].sort(() => 0.5 - Math.random());

        await minimax(
            board.cloneBoard(),
            11,
            -Infinity,
            +Infinity,
            true,
            colors,
            bot,
            human,
            ""
        ).then(([tS, tV]) => {
            color = tS;
            console.log(color);
            console.log(tV);
        });

        resolve(color);
    });
}
