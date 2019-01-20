import { TestBed, inject } from "@angular/core/testing";
import { LobbyService } from "./lobby.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("LobbyService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LobbyService],
      imports: [HttpClientTestingModule]
    });
  });

  it("should be created", inject([LobbyService], (service: LobbyService) => {
    expect(service).toBeTruthy();
  }));
});
