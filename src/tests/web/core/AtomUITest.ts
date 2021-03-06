import Assert from "@web-atoms/unit-test/dist/Assert";
import Test from "@web-atoms/unit-test/dist/Test";
import { AtomUI } from "../../../web/core/AtomUI";
import AtomWebTest from "../../../unit/AtomWebTest";

export class AtomUITest extends AtomWebTest {

    @Test
    public newIndex(): void {
        const div = document.createElement("div");
        div.id = "a";

        const aid = AtomUI.assignID(div);

        Assert.equals("a", aid);

        const b = document.createElement("div");
        const bid = AtomUI.assignID(b);

        Assert.equals("__waID" + 1002, bid);
    }

    @Test
    public parseUrl(): void {

        const a = AtomUI.parseUrl("a&=c&int=123&true=true&false=false&float=1.2");

        Assert.equals(true, a.true);
        Assert.equals(false, a.false);
        Assert.equals(123, a.int);
        Assert.equals(1.2, a.float);
    }

    @Test
    public screenOffsetTest(): void {

        const e = {} as any;

        const child1 = {} as any;

        e.offsetLeft = 20;
        e.offsetTop = 20;
        e.offsetWidth = 80;
        e.offsetHeight = 80;

        child1.offsetLeft = 20;
        child1.offsetTop = 20;
        child1.offsetWidth = 60;
        child1.offsetHeight = 60;

        child1.offsetParent = e;

        const a = AtomUI.screenOffset(child1);

        Assert.equals(40, a.x);

        const ap = AtomUI.screenOffset(e);

        Assert.equals(20, ap.x);
    }

    @Test
    public toNumber(): void {
        Assert.equals(0, AtomUI.toNumber(""));
        Assert.equals(0, AtomUI.toNumber(null));
        Assert.equals(0, AtomUI.toNumber("0"));
        // Assert.equals(1, AtomUI.toNumber(1 as any));
    }

}
