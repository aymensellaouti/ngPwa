import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { VAPID } from './config/vapid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-pwa-app';
  isDownladable = false;
  deferredPrompt!: Event | null;
  constructor(private swUpdate: SwUpdate, private swPush: SwPush, private http: HttpClient) {
    // addEventListener('beforeinsatallprompt', (e) => {
    //   e.preventDefault();
    //   this.deferredPrompt = e;
    //   this.isDownladable = true;
    // });
  }
  ngOnInit(): void {
    this.http.get('http://localhost:3000').subscribe(
      (todo) => {
        console.log(todo);
      }
    );
    this.swUpdate.versionUpdates.subscribe((version) => {
      if (version.type === 'VERSION_READY') {
        if (
          confirm(
            `Une nouvelle version de l'application est disponionible, vouslez vous recharger la page ?`
          )
        ) {
          window.location.reload();
        }
      }
    });
  }
  download() {
    // if (this.deferredPrompt) {
    //   this.deferredPrompt.prompt();
    //   this.deferredPrompt = null;
    // }
  }
  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: VAPID.publicKey,
      })
      .then((sub:PushSubscription) => {
        console.log({sub});
        this.http
          .post('http://localhost:3000/notifications', sub)
          .subscribe((data) => console.log({ data: data }));
      })
      .catch((err) =>
        console.error('Could not subscribe to notifications', err)
      );
  }
}
