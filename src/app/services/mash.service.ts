import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MashService{
  public user: any;
  public records: any = [];
  public detail: any;
  public needsRedirect = true;
  

  constructor(private firestore:AngularFirestore, private auth:AngularFireAuth, private router:Router) {
    this.auth.onAuthStateChanged((user)=>{
      if(user){
        console.log('user is signed in');
        console.log(user);
        this.user = user;
        // console.log(this.user);
        this.router.navigateByUrl('/home');

        // if(this.needsRedirect){
        //   this.needsRedirect = false;
        //   // document.location.href = "/home";
        // }

      }else{
        console.log('no user is signed in');
        this.router.navigateByUrl('/login');
        // if(this.needsRedirect){
        //   this.needsRedirect = false;
        //   document.location.href = "/login";
        // }
      }
    });
  }

  getRecords():void{
    this.firestore
      .collection('records')
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc)=>{
          this.records.push({id: doc.id, data: doc.data()});
        });
        this.sortRecords();
      });
    
  }

  getScoreDetails(id):void{
    this.firestore 
      .collection("records")
      .doc(id)
      .get()
      .subscribe((querySnapshot)=>{
        this.detail = querySnapshot.data();
        console.log(this.detail);
      });
  }

  sortRecords():void{
    let arr = this.records;
    
    for(let i = 0; i < arr.length; i++){
      let lowVal = i;
      for(let x = i + 1; x < arr.length; x++){        
        if(parseInt(arr[x].data.clicks) > parseInt(arr[lowVal].data.clicks)){
          lowVal = x;
        }
      }

      if(parseInt(arr[i].data.clicks) < parseInt(arr[lowVal].data.clicks)){
        let temp = arr[i];
        arr[i] = arr[lowVal];
        arr[lowVal] = temp;
      }
    }
    this.records = arr;
  }

  submitRecord(clicks, time):void{
    let newScore = {
      name: this.user.displayName,
      clicks: clicks,
      time: time,
      uid: this.user.uid
    };
    console.log(this.user.displayName);
    console.log(clicks);
    console.log(time);
    console.log(this.user.uid);

    this.firestore
      .collection('records')
      .doc(this.user.uid)
      .set(newScore)
      .then((docRef)=>{
        console.log("Document written with ID:");
        alert("Your score has been submitted!");
      })
      .catch((error)=>{
        console.log("Error adding document: " + error);
      });
  }

  canSubmit(newScore, time):void{
    console.log(this.user.uid);
     this.firestore
      .collection('records')
      .doc(this.user.uid)
      .get()
      .subscribe((querySnapshot)=>{

        if(querySnapshot.data()){
          let oldScore:any = querySnapshot.data();
          console.log(oldScore);
          
          if(oldScore.clicks < newScore){
            this.updateScore(newScore, time);
          }else{
            console.log('worse score');
            alert("Unable to submit, your score is worse than your personal best.");
          }
        }else{
          this.submitRecord(newScore, time);
        }
      });
  }

  updateScore(clicks, time){
    this.firestore
      .collection('records')
      .doc(this.user.uid)
      .update({
        clicks: clicks,
        time: time
      })
      .then(()=>{
        console.log("document updated");
        alert("Your score has been submitted!");
      })
      .catch((error)=>{
        console.log("Error adding document: " + error);
      });
  }

  delete():void{
    this.firestore
      .collection('records')
      .doc(this.detail.uid)
      .delete()
      .then(()=>{
        console.log('document deleted');
        alert("Your score has been deleted.");
        this.router.navigateByUrl('/home');
      })
      .catch((error)=>{
        console.log('error deleting document: ' + error);
      })
  }

  register(email, password, name){
    this.auth.createUserWithEmailAndPassword(email, password)
      .then((user)=>{
        console.log('signed in');
        console.log(user);
        // this.user = user;

        user.user.updateProfile({
          displayName: name
        })
          .then(()=>{
            this.user = user;
            document.location.href = "https://in-info-web4.informatics.iupui.edu/~pacaldwe/mousemash/home";
            // this.signin(email, password);
          })
          .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
          })
      })
      .catch((error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }

  signin(email, password){
    this.auth.signInWithEmailAndPassword(email, password)
      .then((user)=>{
        console.log('signed in');
        console.log(user);
        this.user = user;
        document.location.href = "https://in-info-web4.informatics.iupui.edu/~pacaldwe/mousemash/home";
      })
      .catch((error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }

  signout():void{
    this.auth.signOut()
      .then(()=>{
        console.log('signed out');
        this.router.navigateByUrl('/login');
      })
      .catch((error)=>{
        console.log(error);
      });
  }
}
