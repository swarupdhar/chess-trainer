import { Component } from '@angular/core';

@Component({
  selector: 'Navbar',
  templateUrl: 'template/navbar.component.html'
})
export class NavbarComponent {
  private navOpen: boolean = false;
  private classes:string = "";

  toggleMenu(){
    this.navOpen = ! this.navOpen;
    if(this.navOpen){
      this.classes = "nav-open";
    }else{
      this.classes = "";
    }
  }

  toggleMenuItem(event){
    let ulElms = document.getElementsByClassName("nav-item-submenus");
    let elm = event.target.parentNode.getElementsByClassName('nav-item-submenus');

    for(let i = 0, len = ulElms.length; i < len; i++){
      if(ulElms[i] !== elm[0]){
        if(ulElms[i].classList.contains('nav-item-submenus-visible')){
          ulElms[i].classList.remove('nav-item-submenus-visible');        
          ulElms[i].classList.add('nav-item-submenus-hidden');
        }
      }
    }

    if(elm[0].className === 'nav-item-submenus nav-item-submenus-hidden'){
      elm[0].className = 'nav-item-submenus nav-item-submenus-visible';
    }else{
      elm[0].className = 'nav-item-submenus nav-item-submenus-hidden';        
    }
    
  }

}