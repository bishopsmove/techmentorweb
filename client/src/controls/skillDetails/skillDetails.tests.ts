import SkillDetails from "./skillDetails";
import { Skill } from "../../services/api/profileService";

describe("SkillDetails", () => {
    let sut: SkillDetails;
    let model: Skill;

    beforeEach(() => {
        sut = new SkillDetails();
        model = <Skill>{
            name: "C#",
            level: "expert",
            yearLastUsed: 2011,
            yearStarted: 2006
        }

        sut.model = model;
    });

    describe("DisplayLevel", () => {
        it("returns empty when level is null", () => {
            sut.model.level = <string><any>null;

            let actual = sut.DisplayLevel();

            expect(actual).toEqual("");
        });
        it("returns empty when level is undefined", () => {
            sut.model.level = <string><any>undefined;

            let actual = sut.DisplayLevel();

            expect(actual).toEqual("");
        });
        it("returns propercase value", () => {
            let actual = sut.DisplayLevel();

            expect(actual).toEqual("Expert");
        });
        it("returns propercase value when level already propercase", () => {
            sut.model.level = "Expert";

            let actual = sut.DisplayLevel();

            expect(actual).toEqual("Expert");
        });
    });

    describe("DisplayYearRange", () => {
        it("returns empty when yearStarted and yearLastUsed are null", () => {
            sut.model.yearStarted = null;
            sut.model.yearLastUsed = null;

            let actual = sut.DisplayYearRange();

            expect(actual).toEqual("");
        });
        it("returns empty when yearStarted and yearLastUsed are undefined", () => {
            sut.model.yearStarted = undefined;
            sut.model.yearLastUsed = undefined;

            let actual = sut.DisplayYearRange();

            expect(actual).toEqual("");
        });
        it("returns range message when yearStarted and yearLastUsed have values", () => {
            let actual = sut.DisplayYearRange();

            expect(actual).toEqual("from " + sut.model.yearStarted + " to " + sut.model.yearLastUsed);
        });
        it("returns since message when only yearStarted has a value", () => {
            sut.model.yearLastUsed = null;

            let actual = sut.DisplayYearRange();

            expect(actual).toEqual("since " + sut.model.yearStarted);
        });
        it("returns up to message when only yearLastUsed has a value", () => {
            sut.model.yearStarted = null;

            let actual = sut.DisplayYearRange();

            expect(actual).toEqual("up to " + sut.model.yearLastUsed);
        });
    });
});