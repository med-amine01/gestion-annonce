import {Component, OnInit} from '@angular/core';
import {Ad} from "../../model/ad";
import {AdService} from "../../services/ad.service";

@Component({
  selector: 'app-ad',
  templateUrl: './ad.page.html',
  styleUrls: ['./ad.page.scss'],
})
export class AdPage implements OnInit {
  ads: Ad[];
  uid = localStorage.getItem('uid');
  constructor(private adService: AdService) {}

  ngOnInit() {
    this.getAllOtherAds();
  }

  getAds(isMyAds: boolean) {
    if (isMyAds) {
      this.adService.getAds().subscribe(data => {
        this.ads = data.filter(ad => ad.createdBy === this.uid);
      });
    } else {
      this.getAllOtherAds();
    }
  }

  private getAllOtherAds() {
    this.adService.getAds().subscribe(data => {
      this.ads = data.filter(ad => ad.createdBy !== this.uid);
    });
  }
}
