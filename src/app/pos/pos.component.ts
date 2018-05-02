import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authetication } from './services/auth.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {
header=true;
  constructor(private router:Router,
  private auth:Authetication) { }

  ngOnInit() {



  }


}
