import { JsonService } from "../../services/JsonService";
import { Assert } from "../../unit/Assert";
import { AtomTest } from "../../unit/AtomTest";
import { Test } from "../../unit/Test";

export class JsonServiceTest extends AtomTest {

    @Test
    public parse(): void {
        // nothing..

        const t = `{ "date1": "/Date(1530518926876)/", "date2": "2018-07-02T08:09:48.045Z" }`;

        const s = new JsonService();

        const v = s.parse(t);

        Assert.isTrue(v.date1 instanceof Date);
        Assert.isTrue(v.date2 instanceof Date);

    }

    @Test
    public stringify(): void {
        const s = new JsonService();
        const j = s.stringify({
            key: "value",
            _$_handlers: [
                "h1", "h2"
            ]
        });

        const p = s.parse(j);

        Assert.isUndefined(p._$_handlers);
    }

    @Test
    public underscoreNamingStrategy(): void {
        const s = new JsonService();
        s.namingStrategy = "underscore";

        const r = s.parse(`{
            "string_value": "text",
            "array_value": [1, {
                "string_value": "text",
                "object_value": {
                    "int_value": 10,
                    "bool_value": false
                }
            }]
        }`);

        Assert.equals("text", r.stringValue);
        Assert.equals(2, r.arrayValue.length);

        const av = r.arrayValue[1];
        Assert.equals("text", av.stringValue);
        Assert.equals(10, av.objectValue.intValue);
        Assert.equals(false, av.objectValue.boolValue);

    }

    @Test
    public hyphenNamingStrategy(): void {
        const s = new JsonService();
        s.namingStrategy = "hyphen";

        const r = s.parse(`{
            "string-value": "text",
            "array-value": [1, {
                "string-value": "text",
                "object-value": {
                    "int-value": 10,
                    "bool-value": false
                }
            }]
        }`);

        Assert.equals("text", r.stringValue);
        Assert.equals(2, r.arrayValue.length);

        const av = r.arrayValue[1];
        Assert.equals("text", av.stringValue);
        Assert.equals(10, av.objectValue.intValue);
        Assert.equals(false, av.objectValue.boolValue);
    }

    @Test
    public stringifyHyphenNamingStrategy(): void {
        const s = new JsonService();
        s.namingStrategy = "hyphen";

        const p = new JsonService();

        const a = s.stringify({
            stringValue: "text",
            objectValue: {
                boolValue: false
            },
            arrayLike: {
                length: 1,
                1: 1
            }
        });

        const o = p.parse(a);

        Assert.equals("text", o["string-value"]);
    }

    @Test
    public stringifyUnderscoreNamingStrategy(): void {
        const s = new JsonService();
        s.namingStrategy = "underscore";

        const p = new JsonService();

        const a = s.stringify({
            stringValue: "text",
            objectValue: {
                boolValue: false
            }
        });

        const o = p.parse(a);

        // tslint:disable-next-line:no-string-literal
        Assert.equals("text", o["string_value"]);
    }
}
