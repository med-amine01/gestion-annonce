import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Ad} from "../model/ad";

@Injectable({
  providedIn: 'root'
})
export class AdService {
  constructor(private fireStore: Firestore) {
  }

  getAds(): Observable<Ad[]> {
    const adsRef = collection(this.fireStore, 'ads');
    return collectionData(adsRef, {idField : 'id'}) as Observable<Ad[]>;
  }

  getAdById(id: string): Observable<Ad> {
    const adDocRef = doc(this.fireStore, `ads/${id}`);
    return docData(adDocRef, {idField : 'id'}) as Observable<Ad>;
  }

  saveAd(ad: any) {
    const adDoc = collection(this.fireStore, 'ads');
    return addDoc(adDoc, ad);
  }

  updateAd(ad: any) {
    const adDoc = doc(this.fireStore, `ads/${ad.id}`);
    return updateDoc(adDoc, {
      id: ad.id,
      title: ad.title,
      subTitle: ad.subtitle,
      description: ad.description,
    });
  }
  removeAdById(id: string) {
    const adDocRef = doc(this.fireStore, `ads/${id}`);
    return deleteDoc(adDocRef);
  }
}
