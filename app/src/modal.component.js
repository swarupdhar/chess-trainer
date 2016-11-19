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
let ModalComponent = class ModalComponent {
    constructor() {
        this.modalEvents = new core_1.EventEmitter();
    }
    ngOnInit() {
        this.modalTitleElm = document.getElementById('modal-title');
        this.modalBodyElm = document.getElementById('modal-body');
        this.modalFooterElm = document.getElementById('modal-footer');
        this.modalTitleElm.innerHTML = this.title;
        this.modalBodyElm.innerHTML = this.body;
        this.modalFooterElm.innerHTML = this.footer;
    }
    sendEvent(e) {
        this.modalEvents.emit(e);
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], ModalComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], ModalComponent.prototype, "body", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], ModalComponent.prototype, "footer", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], ModalComponent.prototype, "modalEvents", void 0);
ModalComponent = __decorate([
    core_1.Component({
        selector: 'Modal',
        templateUrl: 'template/modal.component.html'
    }), 
    __metadata('design:paramtypes', [])
], ModalComponent);
exports.ModalComponent = ModalComponent;
