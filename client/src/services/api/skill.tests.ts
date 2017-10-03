import { Skill } from "./skill";
import { Comparer } from "../../tests/comparer";

describe("Skill", () => {
    let source: Skill;
    
    beforeEach(function () {
        source = <Skill>{
            name: "C#",
            level: "expert",
            yearStarted: 1991,
            yearLastUsed: 2014
        };
    });

    describe("constructor", () => {
        it("copies values from source provided", () => {
            let actual = new Skill(source);
            let comparer = new Comparer();

            expect(comparer.IsEquivalent(source, actual)).toBeTruthy();
        });
        it("initializes with null values when no source provided", () => {
            let actual = new Skill();
            
            expect(actual.level).toBeNull();
            expect(actual.name).toBeNull();
            expect(actual.yearLastUsed).toBeNull();
            expect(actual.yearStarted).toBeNull();
        });
        it("initializes with null source", () => {
            let actual = new Skill(<Skill><any>null);
            
            expect(actual.level).toBeNull();
            expect(actual.name).toBeNull();
            expect(actual.yearLastUsed).toBeNull();
            expect(actual.yearStarted).toBeNull();
        });
        it("initializes with undefined source", () => {
            let actual = new Skill(<Skill><any>undefined);
            
            expect(actual.level).toBeNull();
            expect(actual.name).toBeNull();
            expect(actual.yearLastUsed).toBeNull();
            expect(actual.yearStarted).toBeNull();
        });
    });
});
