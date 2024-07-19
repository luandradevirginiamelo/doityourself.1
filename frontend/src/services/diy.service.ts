import { Injectable } from '@angular/core';
import { diy } from '../app/shared/models/diy';
import { sample_datas } from '../data';

@Injectable({
  providedIn: 'root'
})
export class DiyService {

  constructor() { }

    getAll():diy[]{
      return sample_datas
    }
  
}
