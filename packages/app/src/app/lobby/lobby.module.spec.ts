import { LobbyModule } from './lobby.module';

describe('LobbyModule', () => {
  let lobbyModule: LobbyModule;

  beforeEach(() => {
    lobbyModule = new LobbyModule();
  });

  it('should create an instance', () => {
    expect(lobbyModule).toBeTruthy();
  });
});
