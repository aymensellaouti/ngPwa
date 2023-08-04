import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-pwa-app';
  isDownladable = false;
  deferredPrompt!: Event | null;
  constructor(private swUpdate: SwUpdate) {
    addEventListener('beforeinsatallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.isDownladable = true;
    });
  }
  ngOnInit(): void {
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
}
