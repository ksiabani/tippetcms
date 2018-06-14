import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./pages/home/home.component";
import { PostsComponent } from "./pages/posts/posts.component";
import { NormalSectionRouting } from "./normal-section.routing";

@NgModule({
  imports: [CommonModule, NormalSectionRouting],
  declarations: [HomeComponent, PostsComponent]
})
export class NormalSectionModule {}
