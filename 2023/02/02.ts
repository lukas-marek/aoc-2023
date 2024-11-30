import readLines from "../../utils/readLines";

// { ID: [[R,G,B], ...] }

type Reveal = [number, number, number];
type Game = Reveal[];
type Games = { [key: number]: Game[] };

const processReveal = (data: string): Reveal => {
    let [red, green, blue] = [0, 0, 0];

    data.split(", ").forEach((colorInfo) => {
        const [countStr, color] = colorInfo.split(" ");
        const count = parseInt(countStr);

        if (color == "red") {
            red += count;
        } else if (color == "green") {
            green += count;
        } else if (color == "blue") {
            blue += count;
        }
    });

    return [red, green, blue];
};

const processGameInputRow = (row: string): [number, Reveal[]] => {
    const [idStr, rawReveals] = row.split(": ");

    const id = parseInt(idStr.substring("Game ".length));

    const reveals = rawReveals
        .split("; ")
        .map((reveal) => processReveal(reveal));

    return [id, reveals];
};

const getMinCubes = (game: Game): Reveal => {
    let [red, green, blue] = [0, 0, 0];
    game.forEach(([r, g, b]) => {
        red = r > red ? r : red;
        green = g > green ? g : green;
        blue = b > blue ? b : blue;
    });
    return [red, green, blue];
};

const input = readLines("input.txt");
const result = input
    .map(processGameInputRow)
    // .filter(([_, reveals]) => {
    //     return reveals.every(([r, g, b]) => r <= 12 && g <= 13 && b <= 14)
    // })
    //.map(([id, _]) => id)
    //.reduce((sum, value) => sum + value, 0)
    .map(([id, game]) => getMinCubes(game))
    .map(([r, g, b]) => r * g * b)
    .reduce((sum, value) => sum + value, 0);

console.log(JSON.stringify(result, null, 4));
