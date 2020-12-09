import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MashService } from '../services/mash.service';

@Component({
  selector: 'app-score-details',
  templateUrl: './score-details.page.html',
  styleUrls: ['./score-details.page.scss'],
})
export class ScoreDetailsPage implements OnInit {
  private scoreId: string;

  constructor(public mashService:MashService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.scoreId = this.route.snapshot.paramMap.get("id");
    this.mashService.getScoreDetails(this.scoreId);
  }

  canDelete():boolean{
    if(this.scoreId == this.mashService.user.uid) return true;
    else return false;
  }

  delete(){
    this.mashService.delete();
  }

}
