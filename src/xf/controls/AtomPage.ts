import { AtomBridge } from "../../core/AtomBridge";
import { AtomXFControl } from "./AtomXFControl";

export class AtomPage extends AtomXFControl {

    protected create(): void {
        this.element = AtomBridge.instance.create("Xamarin.Forms.ContentPage");
    }

}