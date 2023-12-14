import {Component, OnInit} from '@angular/core';
import {Ad} from "../../model/ad";
import {AdService} from "../../services/ad.service";
import {ToolBaringService} from "../../services/tool-baring.service";
import {ToastService} from "../../services/toast.service";
import {ToastType} from "../../enum/toast-type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ad',
  templateUrl: './ad.page.html',
  styleUrls: ['./ad.page.scss'],
})
export class AdPage implements OnInit {
  ads: Ad[]; // Array to store ads
  uid = localStorage.getItem('uid'); // User ID obtained from local storage
  isMyAds = true; // Flag to determine if the ads belong to the user

  constructor(
    private adService: AdService,
    protected toolBaring: ToolBaringService,
    private toast: ToastService,
    private router: Router
  ) {
    if (localStorage.getItem('uid') === null) {
      router.navigate(['/login'])
    }
  }

  ngOnInit() {
    this.getAds(); // Initial method call to retrieve ads
  }

  // Filter ads by the user who created them
  private filterAdsByUser(data: Ad[]): Ad[] {
    return data.filter(ad => ad.createdBy === this.uid);
  }

  // Filter ads by category and user
  private filterAdsByCategory(data: Ad[], isCategory1: boolean): Ad[] {
    return data.filter(ad => ad.createdBy === this.uid && ad.category === (isCategory1 ? 'cat1' : 'cat2'));
  }

  // Handle ads based on whether they belong to the current user or others
  private handleAds(data: Ad[]) {
    this.ads = this.isMyAds ? this.filterAdsByUser(data) : this.getAllOtherAds(data);
  }

  // Get all ads created by other users
  private getAllOtherAds(data: Ad[]): Ad[] {
    return data.filter(ad => ad.createdBy !== this.uid);
  }

  // Get all ads, either belonging to the user or others
  getAds() {
    this.adService.getAds().subscribe(data => {
      this.handleAds(data);
      this.isMyAds = !this.isMyAds; // Toggle the isMyAds flag
    });
  }

  // Get ads by category, either belonging to the user or others
  getCategory(isCategory1: boolean) {
    this.adService.getAds().subscribe(data => {
      this.ads = this.isMyAds ? this.filterAdsByCategory(data, isCategory1) : this.getAllOtherAds(data);
      this.isMyAds = !this.isMyAds; // Toggle the isMyAds flag
    });
  }

  // Delete an ad by its ID
  deleteAd(id: string) {
    this.adService.removeAdById(id).then(() => {
      this.toast.toaster("Deleted successfully", ToastType.INFO);
    }).catch(reason => {
      console.log(reason);
    });
  }
}
