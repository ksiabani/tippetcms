import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { GetMedia, RemoveMedia } from "../../store/admin.actions";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { LoginState } from "../../../login/store/login.state";
import { User } from "../../../shared/model/user.interface";
import { MediaState } from "../../store/children/media.state";
import { environment } from "../../../../environments/environment";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";

@Component({
  selector: "app-media-library",
  templateUrl: "./media-library.component.html",
  styleUrls: ["./media-library.component.scss"]
})
export class MediaLibraryComponent implements OnInit {
  @Input()
  hideUploader: boolean;
  @Input()
  inModal: boolean;
  @Output()
  image = new EventEmitter<string>();
  @Select(LoginState.user)
  user: Observable<User>;
  login: string;
  siteId: string;
  api: string = environment.api.root;

  @Select(MediaState.media)
  media: Observable<string[]>;

  dropzoneConfig: DropzoneConfigInterface;

  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.siteId = this.activatedRoute.root.snapshot.children[0].params["id"];
    this.user.pipe(filter(user => !!user)).subscribe(({ githubUser }) => {
      this.login = githubUser.login;
      this.store.dispatch(new GetMedia(githubUser.login, this.siteId));
      const url = `${environment.api.admin}/media/${githubUser.login}/${this.siteId}`;
      this.dropzoneConfig = { url, previewsContainer: false };
    });
  }

  removeMedia(user, siteId, mediaName) {
    this.store.dispatch(new RemoveMedia(user, siteId, mediaName));
  }

  selectMedia(image) {
    if (this.inModal) {
      this.image.emit(image);
    }
  }

  onUploadError(e) {
    console.log(e);
  }

  onUploadSuccess(e) {
    this.store.dispatch(new GetMedia(this.login, this.siteId));
  }
}
