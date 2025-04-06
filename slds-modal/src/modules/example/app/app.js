import { LightningElement } from 'lwc';

export default class HelloWorldApp extends LightningElement {
	isOpen = true;

    handleModalClose() {
        this.isOpen = false;
    }

    handleModalConfirm() {
        this.isOpen = false;
    }
}
