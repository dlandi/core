import Assert from "@web-atoms/unit-test/dist/Assert";
import Category from "@web-atoms/unit-test/dist/Category";
import Test from "@web-atoms/unit-test/dist/Test";
import TestItem from "@web-atoms/unit-test/dist/TestItem";
import { App } from "../../../App";
import { Atom } from "../../../Atom";
import { AtomTest } from "../../../unit/AtomTest";
import AtomWebTest from "../../../unit/AtomWebTest";
import { AtomGridView } from "../../../web/controls/AtomGridView";

@Category("Grid view")
export class TestCase extends AtomWebTest {

    // @Test("Grid Test")
    // public async test(): Promise<any> {

    //     const gv = new AtomGridView(this.app, document.createElement("section"));
    //     gv.columns = "20,*,50";
    //     gv.rows = "10,*,30%";
    //     gv.element.style.width = "1000px";
    //     gv.element.style.height = "1000px";

    //     const header = document.createElement("header");
    //     const headerAny = header as any;
    //     headerAny.cell = "0:3,0";

    //     gv.append(header);

    //     const footer = document.createElement("footer");
    //     const footerAny = footer as any;
    //     footerAny.cell = "0:3,2";

    //     gv.append(footer);

    //     const left = document.createElement("div");
    //     const leftAny = left as any;
    //     leftAny.cell = "0,1";

    //     gv.append(left);

    //     const right = document.createElement("div");
    //     const rightAny = right as any;
    //     rightAny.cell = "2,1";

    //     gv.append(right);

    //     const fill = document.createElement("div");
    //     const fillAny = fill as any;
    //     fillAny.cell = "1,1";

    //     gv.append(fill);

    //     gv.invalidate();

    //     await Atom.delay(10);

    //     await this.app.waitForPendingCalls();

    //     const hps = header.parentElement.style;

    //     Assert.equals("0px", hps.left);
    //     Assert.equals("0px", hps.top);
    //     Assert.equals("1000px" , hps.width);
    //     Assert.equals("10px", hps.height);

    //     const lps = left.parentElement.style;

    //     Assert.equals("0px", lps.left);
    //     Assert.equals("10px", lps.top);
    //     Assert.equals("20px" , lps.width);
    //     Assert.equals("690px", lps.height);

    //     const rps = right.parentElement.style;

    //     Assert.equals("950px", rps.left);
    //     Assert.equals("10px", rps.top);
    //     Assert.equals("50px" , rps.width);
    //     Assert.equals("690px", rps.height);

    //     const fillps = fill.parentElement.style;

    //     Assert.equals("20px", fillps.left);
    //     Assert.equals("10px", fillps.top);
    //     Assert.equals("930px" , fillps.width);
    //     Assert.equals("690px", fillps.height);

    //     const footerps = footer.parentElement.style;

    //     Assert.equals("0px", footerps.left);
    //     Assert.equals("700px", footerps.top);
    //     Assert.equals("1000px" , footerps.width);
    //     Assert.equals("300px", footerps.height);
    // }

}
