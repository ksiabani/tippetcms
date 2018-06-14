import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { PostsComponent } from "./pages/posts/posts.component";
import { PostsGuard } from "./guards/posts/posts.guard";

const normalSectionRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "posts", component: PostsComponent, resolve: [PostsGuard] }
];

export const NormalSectionRouting = RouterModule.forChild(normalSectionRoutes);
