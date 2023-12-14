import { Component, OnInit } from '@angular/core';
import { Ad } from "../../model/ad";
import { AdService } from "../../services/ad.service";
import { ToolBaringService } from "../../services/tool-baring.service";
import { ToastService } from "../../services/toast.service";
import { ToastType } from "../../enum/toast-type";

@Component({
  selector: 'app-ad',
  templateUrl: './ad.page.html',
  styleUrls: ['./ad.page.scss'],
})
export class AdPage implements OnInit {
  ads: Ad[];
  uid = localStorage.getItem('uid');
  isMyAds = true;

  constructor(
    private adService: AdService,
    protected toolBaring: ToolBaringService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getAds();
  }

  private filterAdsByUser(data: Ad[]): Ad[] {
    return data.filter(ad => ad.createdBy === this.uid);
  }

  private filterAdsByCategory(data: Ad[], isCategory1: boolean): Ad[] {
    return data.filter(ad => ad.createdBy === this.uid && ad.category === (isCategory1 ? 'cat1' : 'cat2'));
  }

  private handleAds(data: Ad[]) {
    this.ads = this.isMyAds ? this.filterAdsByUser(data) : this.getAllOtherAds(data);
  }

  private getAllOtherAds(data: Ad[]): Ad[] {
    return data.filter(ad => ad.createdBy !== this.uid);
  }

  getAds() {
    this.adService.getAds().subscribe(data => {
      this.handleAds(data);
      this.isMyAds = !this.isMyAds;
    });
  }

  getCategory(isCategory1: boolean) {
    this.adService.getAds().subscribe(data => {
      this.ads = this.isMyAds ? this.filterAdsByCategory(data, isCategory1) : this.getAllOtherAds(data);
      this.isMyAds = !this.isMyAds;
    });
  }

  deleteAd(id: string) {
    this.adService.removeAdById(id).then(value => {
      this.toast.toaster("Deleted successfully", ToastType.INFO);
    }).catch(reason => {
      console.log(reason);
    });
  }
}
