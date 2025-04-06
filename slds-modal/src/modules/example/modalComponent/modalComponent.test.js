import { createElement } from 'lwc';
import ModalComponent from 'c/modalComponent';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('c-modal-component', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('is accessible when closed', async () => {
        const element = createElement('c-modal-component', {
            is: ModalComponent
        });
        document.body.appendChild(element);
        
        const results = await axe(document.body);
        expect(results).toHaveNoViolations();
    });

    it('is accessible when open', async () => {
        const element = createElement('c-modal-component', {
            is: ModalComponent
        });
        document.body.appendChild(element);
        
        // Open the modal
        element.openModal();
        
        // Wait for the modal to render
        await Promise.resolve();
        
        const results = await axe(document.body);
        expect(results).toHaveNoViolations();
    });

    it('traps focus when open', async () => {
        const element = createElement('c-modal-component', {
            is: ModalComponent
        });
        document.body.appendChild(element);
        
        // Open the modal
        element.openModal();
        await Promise.resolve();
        
        const closeButton = element.shadowRoot.querySelector('.slds-modal__close');
        expect(document.activeElement).toBe(closeButton);
    });

    it('returns focus when closed', async () => {
        const button = document.createElement('button');
        button.textContent = 'Test Button';
        document.body.appendChild(button);
        button.focus();
        
        const element = createElement('c-modal-component', {
            is: ModalComponent
        });
        document.body.appendChild(element);
        
        // Open and then close the modal
        element.openModal();
        await Promise.resolve();
        element.closeModal();
        await Promise.resolve();
        
        expect(document.activeElement).toBe(button);
    });
});