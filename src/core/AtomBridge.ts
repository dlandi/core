import { AtomControl } from "../web/controls/AtomControl";
import { AtomUI, ChildEnumerator } from "../web/core/AtomUI";
import { AtomDisposable, IAtomElement, IDisposable, INameValuePairs, INativeComponent } from "./types";

export abstract class BaseElementBridge<T extends IAtomElement> {

    public abstract create(type: string): T;

    public abstract attachControl(element: T, control: AtomControl): void;

    public abstract addEventHandler(
        element: T,
        name: string,
        handler: EventListenerOrEventListenerObject,
        capture?: boolean): IDisposable;

    public abstract atomParent(element: T, climbUp?: boolean): AtomControl;

    public abstract elementParent(element: T): T;

    public abstract templateParent(element: T): AtomControl;

    public abstract visitDescendents(element: T, action: (e: T, ac: AtomControl) => boolean): void;

    public abstract dispose(element: T): void;

    public abstract appendChild(parent: T, child: T): void;

    public abstract getValue(element: HTMLElement, name: string): any;

    public abstract setValue(element: T, name: string, value: any): void;

    public abstract watchProperty(element: T, name: string, f: (v: any) => void): IDisposable;

    public abstract loadContent(element: T, text: string): void;

    public abstract findChild(element: T, name: string): T;
}

export class AtomElementBridge extends BaseElementBridge<HTMLElement> {

    public addEventHandler(
        element: HTMLElement,
        name: string,
        handler: EventListenerOrEventListenerObject,
        capture?: boolean): IDisposable {
            element.addEventListener(name, handler, capture);
            return new AtomDisposable(() => {
                element.removeEventListener(name, handler, capture);
            });
        }

        public atomParent(element: HTMLElement, climbUp: boolean = true): AtomControl {
            const eany: INameValuePairs = element as INameValuePairs;
            if (eany.atomControl) {
                return eany.atomControl;
            }
            if (!climbUp) {
                return null;
            }
            if (!element.parentNode) {
                return null;
            }
            return this.atomParent(this.elementParent(element));
    }

    public elementParent(element: HTMLElement): HTMLElement {
        const eany = element as any;
        const lp = eany._logicalParent;
        if (lp) {
            return lp;
        }
        return element.parentElement;
    }

    public templateParent(element: HTMLElement): AtomControl {
        if (!element) {
            return null;
        }
        const eany = element as any;
        if (eany._templateParent) {
            return this.atomParent(element);
        }
        const parent = this.elementParent(element);
        if (!parent) {
            return null;
        }
        return this.templateParent(parent);
    }

    public visitDescendents(element: HTMLElement, action: (e: HTMLElement, ac: AtomControl) => boolean): void  {

        const en = new ChildEnumerator(element);
        while (en.next()) {
            const iterator = en.current;
            const eany = iterator as any;
            const ac = eany ? eany.atomControl : undefined;

            if (!action(iterator, ac)) {
                continue;
            }
            this.visitDescendents(iterator, action);
        }
    }

    public dispose(element: HTMLElement): void {
        const eany = element as any;
        eany.atomControl = undefined;
        delete eany.atomControl;
    }

    public appendChild(parent: HTMLElement, child: HTMLElement): void {
        parent.appendChild(child);
    }

    public setValue(element: HTMLElement, name: string, value: any): void {
        element[name] = value;
    }

    public getValue(element: HTMLElement, name: string): any {
        return element[name];
    }

    public watchProperty(element: HTMLElement, name: string, f: (v: any) => void): IDisposable {
        const l = (e) => {
            f((element as HTMLInputElement).value);
        };
        element.addEventListener("change", l , false);

        return new AtomDisposable(() => {
            element.removeEventListener("change", l, false);
        });
    }

    public attachControl(element: HTMLElement, control: AtomControl): void {
        (element as any).atomControl = control;
    }

    public create(type: string): HTMLElement {
        return document.createElement(type);
    }

    public loadContent(element: HTMLElement, text: string): void {
        throw new Error("Not supported");
    }

    public findChild(element: HTMLElement, name: string): HTMLElement {
        throw new Error("Not supported");
    }
}

export class AtomBridge {

    public static instance: BaseElementBridge<IAtomElement> = new AtomElementBridge();

    public static create(name: string): IAtomElement {
        return this.instance.create(name);
    }

}