import { Project } from "../projects/Project";

export function selectRandom(arr: Array<Project>, sizeToSelect: number) {

    const shuffled = arr.slice();

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, sizeToSelect);
}