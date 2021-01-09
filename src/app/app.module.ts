import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { AlbumsComponent } from './albums/albums.component';
import { ArticleComponent } from './article/article.component';
import { ArtistsComponent } from './artists/artists.component';
import { CalienteComponent } from './caliente/caliente.component';
import { ChartComponent } from './charts/chart.component';
import { CommentsComponent } from './comments/comments.component';
import { FeaturedComponent } from './featured/featured.component';
import { FormComponent } from './form/form.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GenreFilterComponent } from './genre-filter/genre-filter.component';
import { HomeComponent } from './home/home.component';
import { InstantSearchComponent } from './instant-search/instant-search.component';
import { LmpPlayerComponent} from './lmp-player/lmp-player.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ModalComponent } from './modal/modal.component';
import { MusicPreviewerComponent } from './music-previewer/music-previewer.component';
import { NewsComponent } from './news/news.component';
import { PageComponent } from './page/page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylisterComponent } from './playlister/playlister.component';
import { PodcastComponent } from './podcasts/podcast.component';
import { QueueComponent } from './queue/queue.component';
import { RecordPoolComponent } from './record-pool/record-pool.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SliderComponent } from './slider/slider.component';
import { SocialShareComponent } from './social-share/social-share.component';
import { SortFilterComponent } from './sort-filter/sort-filter.component';
import { TrackModalComponent } from './track-modal/track-modal.component';
import { TrackComponent } from './tracks/track.component';
import { AccountComponent } from './user/account/account.component';
import { ChangePasswordComponent } from './user/change-password/change-password';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { FavoritesComponent } from './user/favourites/favorites.component';
import { HistoryComponent } from './user/history/history.component';
import { OrderComponent } from './user/orders/order.component';
import { MyPlaylistsComponent } from './user/playlists/playlists.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { VideoComponent } from './videos/videos.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    AlbumsComponent,
    ArticleComponent,
    ArtistsComponent,
    CalienteComponent,
    ChartComponent,
    CommentsComponent,
    FeaturedComponent,
    FormComponent,
    GalleryComponent,
    GenreFilterComponent,
    HomeComponent,
    InstantSearchComponent,
    LmpPlayerComponent,
    LoginComponent,
    MainComponent,
    ModalComponent,
    MusicPreviewerComponent,
    NewsComponent,
    PageComponent,
    PageNotFoundComponent,
    PaginationComponent,
    PasswordResetComponent,
    PlaylistComponent,
    PlaylisterComponent,
    PodcastComponent,
    QueueComponent,
    RecordPoolComponent,
    SidebarComponent,
    SliderComponent,
    SocialShareComponent,
    SortFilterComponent,
    TrackModalComponent,
    TrackComponent,
    AccountComponent,
    ChangePasswordComponent,
    CheckoutComponent,
    FavoritesComponent,
    HistoryComponent,
    OrderComponent,
    MyPlaylistsComponent,
    ProfileComponent,
    UserMenuComponent,
    VideoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
