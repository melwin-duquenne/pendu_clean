export class Player {
  constructor(
    public username: string,
    public score: number = 0,
    public level: number = 1,
    public consecutiveWins: number = 0
  ) {}
}
