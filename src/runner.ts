export class Runner {
  name: string;
  startTime: number;
  endTime: number;

  constructor(name: string, startTime: number, endTime: number) {
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public stop(): Runner {
    return new Runner(this.name, this.startTime, Date.now());
  }

  public resume(): Runner {
    return new Runner(this.name, this.startTime, 0);
  }

  public isRunning(): boolean {
    return this.endTime === 0;
  }

  public isEnded(): boolean {
    return this.endTime > 0;
  }

  public getElapsed(): number {
    return this.isEnded()
      ? this.endTime - this.startTime
      : Date.now() - this.startTime;
  }
}
