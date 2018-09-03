import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./pages/home/home.component";
import { PostsComponent } from "./pages/posts/posts.component";
import { CoreRouting } from "./core.routing";

@NgModule({
  imports: [CommonModule, CoreRouting],
  declarations: [HomeComponent, PostsComponent]
})
export class CoreModule {}
