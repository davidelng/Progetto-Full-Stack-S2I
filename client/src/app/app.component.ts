import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mint';

  windowScrolled: boolean = false;

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0 && window.pageYOffset > 100;
    });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
