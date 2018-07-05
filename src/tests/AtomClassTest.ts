import { Atom } from "../Atom";
import { CancelToken } from "../core/types";
import { Assert } from "../unit/Assert";
import { AtomTest } from "../unit/AtomTest";
import { Test } from "../unit/Test";

export class AtomClassTest extends AtomTest {

    @Test
    public async postAsync(): Promise<any> {
        const r = await Atom.postAsync( async () => {
            await Atom.delay(100);
            return "test";
        });

        Assert.equals("test", r);

        try {
            await Atom.postAsync( async () => {
                await Atom.delay(1);
                throw new Error("error");
            });
        } catch (e) {
            Assert.equals("error", e.message);
        }
    }

    @Test
    public url(): void {

        let url = Atom.url(null);
        Assert.isNull(url);

        url = Atom.url("a", { b: "c" });
        Assert.equals("a?b=c", url);

        url = Atom.url("a?b=c", { d: "e" });
        Assert.equals("a?b=c&d=e", url);

        url = Atom.url("a", null,  { d: "e" });
        Assert.equals("a#d=e", url);

        url = Atom.url("a#b=c", null,  { d: "e" });
        Assert.equals("a#b=c&d=e", url);
    }

    @Test
    public async atomDelay(): Promise<any> {
        await Atom.delay(10);

        const ct = new CancelToken();
        const p = Atom.delay(10, ct);

        ct.cancel();

        try {
            await p;
        } catch (e) {
            Assert.equals("cancelled", e.message);
        }

        try {
            await Atom.delay(0, ct);
        } catch (e) {
            Assert.equals("cancelled", e.message);
        }
    }

    @Test
    public getMethod(): void {

        Assert.isUndefined(Atom.get({}, "a"));

        Assert.isNull(Atom.get({a: null}, "a"));

        Assert.equals("a", Atom.get({ a: {b: "a"}}, "a.b"));

        Assert.isUndefined(Atom.get({a: {}}, "a.b"));

        Assert.isNull(Atom.get({a: {b: null}}, "a.b"));
    }

}