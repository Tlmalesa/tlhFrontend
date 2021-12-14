import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup,FormControl} from '@angular/forms';
import { ContactServiceService } from '../service/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

 slides: string [] = ['./assets/images/pexels-negative-space-160107.jpg', './assets/images/Black and Gold Real Estate House Brand Logo.png', './assets/images/1.png' ]

  //slides: string [] = ['./assets/SBI_Slide_1.jpg', './assets/Eagle_Slide_2.jpg', './assets/Knot_Slide_3.jpg' ]
  i=0;




  // ngOnInit() {
  //   this.i = 0;
  // }
  
  FormData= new FormGroup({
    firstName: new FormControl(''),
    cellNumber: new FormControl(''),
    username: new FormControl(''),
    message: new FormControl('')
  })
  sidebar:boolean = false;
  static?:boolean;
   // Declare height and width variables
   scrHeight:any;
   scrWidth:any;

   timeLeft: number = 5;
  interval:any;
  status:boolean = false;
   public successMessage: any;
   public errorMessage: any;

   @HostListener('window:resize', ['$event'])
   getScreenSize(event?:any) {
         this.scrHeight = window.innerHeight;
         this.scrWidth = window.innerWidth;

         if(this.scrHeight >= 700 && this.scrWidth >=1000)
         {
          this.static = true;
          console.log(this.static);
          console.log(this.scrHeight, this.scrWidth);
         }else{
          this.static = false;
         }
         
   }
  constructor(public router: Router,private builder: FormBuilder,private contactService:ContactServiceService) { 
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.i=0;
  }
 

//   getSlide() {
//       return this.slides[this.i];
//   }

//   getPrev() {
//       this.i = this.i===0 ? 0 : this.i - 1;
//   }
// //edit here    
//   getNext() {
    
//       this.i = this.i===this.slides.length ? this.i : this.i + 1;
//   }
  onClick() {
    this.router.navigate(["/app"]);
  }
  open()
  {
    this.sidebar =! this.sidebar;
    this.static =! this.static;
  }

  contact(){
    let FormData= {
      firstName:this.FormData.value.firstName,
      cellNumber:this.FormData.value.cellNumber,
      username:this.FormData.value.username,
      message:this.FormData.value.message,
    }
  this.contactService.contactMe(FormData).subscribe((res:any)=>{
    this.successMessage ='Message Successfully Sent! Thank you For Contacting Us.'
    this.status =! this.status;

  this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        
        console.log(this.timeLeft);
        
      } else {
        this.status =! this.status;
        this.timeLeft = 0;
        this.resetForm(this.FormData);
        console.log(this.timeLeft);
        this.router.navigate(["/app"]);
      }
    },1000)

    // console.log("vfghjk",res);
  });
  
  // this.resetForm(this.FormData);
  }

  resetForm(form: FormGroup){
    form.reset();
  }
}
