import { Injectable } from '@angular/core';
import { diy } from '../shared/models/diy';
import { sample_datas } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class DIYService {

  constructor() { }

  getAll():diy[]{
    return sample_datas;
  }
}
