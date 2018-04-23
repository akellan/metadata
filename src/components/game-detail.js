//@flow

export interface GameDetail {
    _id: { [string]: string };
    Name: string;
    UserScore: {
        Score: number;
        Amount: number;
    };
}
