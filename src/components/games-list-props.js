// @flow
import { GameDetail } from './game-detail';

export interface GamesListProps {
    fetchNext(): void;
    changeData(): void;
    games: Array<GameDetail>;
    match: any;
}