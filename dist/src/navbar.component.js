"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
let NavbarComponent = class NavbarComponent {
    constructor() {
        this.navOpen = false;
        this.classes = "";
        this.navEvents = new core_1.EventEmitter();
    }
    toggleMenu() {
        this.navOpen = !this.navOpen;
        if (this.navOpen) {
            this.classes = "nav-open";
        }
        else {
            this.classes = "";
        }
    }
    toggleMenuItem(event) {
        let ulElms = document.getElementsByClassName("nav-item-submenus");
        let elm = event.target.parentNode.getElementsByClassName('nav-item-submenus');
        for (let i = 0, len = ulElms.length; i < len; i++) {
            if (ulElms[i] !== elm[0]) {
                if (ulElms[i].classList.contains('nav-item-submenus-visible')) {
                    ulElms[i].classList.remove('nav-item-submenus-visible');
                    ulElms[i].classList.add('nav-item-submenus-hidden');
                }
            }
        }
        if (elm[0].className === 'nav-item-submenus nav-item-submenus-hidden') {
            elm[0].className = 'nav-item-submenus nav-item-submenus-visible';
        }
        else {
            elm[0].className = 'nav-item-submenus nav-item-submenus-hidden';
        }
    }
    sendEvent(e) {
        this.navEvents.emit(e);
    }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], NavbarComponent.prototype, "navEvents", void 0);
NavbarComponent = __decorate([
    core_1.Component({
        selector: 'Navbar',
        templateUrl: 'template/navbar.component.html'
    }), 
    __metadata('design:paramtypes', [])
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
