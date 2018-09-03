import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { PostsComponent } from "./pages/posts/posts.component";
import { PostsGuard } from "./guards/posts/posts.guard";

const coreRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "posts", component: PostsComponent, resolve: [PostsGuard] }
];

export const CoreRouting = RouterModule.forChild(coreRoutes);
