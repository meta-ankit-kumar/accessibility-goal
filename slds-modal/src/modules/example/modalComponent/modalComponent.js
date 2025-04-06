import { LightningElement, api } from 'lwc';

export default class ModalComponent extends LightningElement {
    @api isOpen = false;
    _previouslyFocusedElement = null;

    @api
    openModal() {
        this._previouslyFocusedElement = document.activeElement;
        this.isOpen = true;
        
        requestAnimationFrame(() => {
            const closeButton = this.template.querySelector('.slds-modal__close');
            if (closeButton) {
                closeButton.focus();
            }
        });
    }

    @api
    closeModal() {
        this.isOpen = false;
        
        if (this._previouslyFocusedElement) {
            this._previouslyFocusedElement.focus();
        }
    }

    handleClose() {
        this.closeModal();
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleConfirm() {
        this.closeModal();
        this.dispatchEvent(new CustomEvent('confirm'));
    }

    handleKeyDown(event) {
        if (event.key === 'Escape') {
            this.handleClose();
        }
        
        if (event.key === 'Tab') {
            const focusableElements = this.getFocusableElements();
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (event.shiftKey && document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    }

    getFocusableElements() {
        const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        return [...this.template.querySelectorAll(selector)].filter(
            el => !el.disabled && el.offsetParent !== null
        );
    }

    connectedCallback() {
        this.template.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    disconnectedCallback() {
        this.template.removeEventListener('keydown', this.handleKeyDown.bind(this));
    }
}