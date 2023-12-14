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
  constructor(private fireStore: Firestore) {}

  // Retrieve all ads from the Firestore collection
  getAds(): Observable<Ad[]> {
    const adsRef = collection(this.fireStore, 'ads');
    return collectionData(adsRef, { idField: 'id' }) as Observable<Ad[]>;
  }

  // Retrieve a specific ad by its ID from the Firestore collection
  getAdById(id: string): Observable<Ad> {
    const adDocRef = doc(this.fireStore, `ads/${id}`);
    return docData(adDocRef, { idField: 'id' }) as Observable<Ad>;
  }

  // Save a new ad to the Firestore collection
  saveAd(ad: any) {
    const adDoc = collection(this.fireStore, 'ads');
    return addDoc(adDoc, ad);
  }

  // Update an existing ad in the Firestore collection
  updateAd(ad: any) {
    const adDoc = doc(this.fireStore, `ads/${ad.id}`);
    return updateDoc(adDoc, {
      id: ad.id,
      title: ad.title,
      subTitle: ad.subtitle,
      description: ad.description,
    });
  }

  // Remove a specific ad by its ID from the Firestore collection
  removeAdById(id: string) {
    const adDocRef = doc(this.fireStore, `ads/${id}`);
    return deleteDoc(adDocRef);
  }
}
