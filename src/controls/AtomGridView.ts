import { bindableProperty } from "../core/bindable-properties";
import { IRect } from "../core/types";
import { AtomControl } from "./AtomControl";

interface IOffsetSize {
    offset: number;
    size: number;
}

export class AtomGridView extends AtomControl {

    @bindableProperty
    public columns: string = "*";

    @bindableProperty
    public rows: string = "*";

    private columnSizes: IOffsetSize[];

    private rowSizes: IOffsetSize[];

    private children: HTMLElement[] = [];

    private attempt: number = 0;

    private availableRect: IRect = null;

    constructor(e?: HTMLElement) {
        super(e || document.createElement("section"));
    }

    public append(e: HTMLElement | Text | AtomControl): AtomControl {
        this.children = this.children || [];
        this.children.push(e instanceof AtomControl ? (e as AtomControl).element : e as HTMLElement);
        return this;
    }

    public onUpdateUI(): void {

        this.attempt ++;

        this.removeAllChildren(this.element);

        const width =  this.element.offsetWidth || this.element.clientWidth || parseFloat(this.element.style.width);
        const height = this.element.offsetHeight || this.element.clientHeight || parseFloat(this.element.style.height);

        if (!(width && height)) {
            if (this.attempt > 100) {
                // tslint:disable-next-line:no-console
                console.error(`AtomDockPanel (${width}, ${height}) must both have non zero width and height`);
                return;
            }
            // AtomDispatcher.instance.callLater(() => this.invalidate());
            setTimeout(() => {
                this.invalidate();
            }, 100);
            return;
        }

        this.attempt = 0;

        this.availableRect = { width, height, x: 0, y: 0 };

        this.columnSizes = this.columns.split(",").map( (s) => this.toSize(s.trim(), this.availableRect.width));
        this.rowSizes = this.rows.split(",").map( (s) => this.toSize(s.trim(), this.availableRect.height));

        this.assignOffsets(this.columnSizes, this.availableRect.width);
        this.assignOffsets(this.rowSizes, this.availableRect.height);

        for (const iterator of this.children) {
            const host = document.createElement("section");
            host.appendChild(iterator);
            this.element.appendChild(host);
        }
        super.onUpdateUI();
        this.updateSize();
    }

    protected onUpdateSize(): void {
        for (const iterator of this.children) {
            this.updateStyle(iterator);
        }
    }

    private updateStyle(e: HTMLElement): void {

        const row = (e as any).row || 0;
        const column = (e as any).column || 0;
        const rowSpan = (e as any).rowSpan || 1;
        const colSpan = (e as any).colSpan || 1;

        const host = e.parentElement as HTMLElement;
        host.style.position = "absolute";
        host.style.overflow = "hidden";
        host.style.padding = "0";
        host.style.margin = "0";
        host.appendChild(e);

        const rowStart = this.rowSizes[row].offset;
        let rowSize = 0;
        for (let i = row; i < row + rowSpan; i++) {
            rowSize += this.rowSizes[i].size;
        }

        host.style.top = `${rowStart}px`;
        host.style.height = `${rowSize}px`;

        const colStart = this.columnSizes[column].offset;
        let colSize = 0;
        for (let i = column; i < column + colSpan; i++) {
            colSize += this.columnSizes[i].size;
        }

        host.style.left = `${colStart}px`;
        host.style.width = `${colSize}px`;

        this.element.appendChild(host);
    }

    private toSize(s: string, total: number): IOffsetSize {
        if (!s || s === "*") {
            return { offset: -1, size: NaN };
        }

        let n: number = 0;
        if (s.endsWith("%")) {
            s = s.substr(0, s.length - 1);
            n = parseFloat(s);
            return { offset: -1, size: total * n / 100 };
        }

        return { offset: -1, size: parseFloat(s) };
    }

    private assignOffsets(a: IOffsetSize[], end: number): void {
        let start = 0;
        let fill: IOffsetSize = null;
        for (const item of a) {
            item.offset = start;
            if (isNaN(item.size)) {
                fill = item;
                break;
            }
            start += item.size;
        }
        if (!fill) {
            return;
        }
        const lastStart = start;
        start = end;

        const r = a.map((x) => x).reverse();

        for (const item of r) {
            if (isNaN(item.size)) {
                if (fill !== item) {
                    throw new Error("Multiple * cannot be defined");
                }
                break;
            }
            start -= item.size;
            item.offset = start;
        }
        fill.offset = lastStart;
        fill.size = start - lastStart;
    }
}
