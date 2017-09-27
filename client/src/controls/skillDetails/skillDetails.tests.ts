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

        sut.skill = model;
    });

    describe("DisplayName", () => {
        it("returns empty when model is null", () => {
            sut.skill = <Skill><any>null;

            let actual = sut.DisplayName;

            expect(actual).toEqual("");
        });
        it("returns empty when model is undefined", () => {
            sut.skill = <Skill><any>undefined;

            let actual = sut.DisplayName;

            expect(actual).toEqual("");
        });
        it("returns empty when name is null", () => {
            sut.skill.name = <string><any>null;

            let actual = sut.DisplayName;

            expect(actual).toEqual("");
        });
        it("returns empty when name is undefined", () => {
            sut.skill.name = <string><any>undefined;

            let actual = sut.DisplayName;

            expect(actual).toEqual("");
        });
        it("returns model name", () => {
            let actual = sut.DisplayName;

            expect(actual).toEqual(model.name);
        });
    });

    describe("DisplayLevel", () => {
        it("returns empty when model is null", () => {
            sut.skill = <Skill><any>null;

            let actual = sut.DisplayLevel;

            expect(actual).toEqual("");
        });
        it("returns empty when model is undefined", () => {
            sut.skill = <Skill><any>undefined;

            let actual = sut.DisplayLevel;

            expect(actual).toEqual("");
        });
        it("returns empty when level is null", () => {
            sut.skill.level = <string><any>null;

            let actual = sut.DisplayLevel;

            expect(actual).toEqual("");
        });
        it("returns empty when level is undefined", () => {
            sut.skill.level = <string><any>undefined;

            let actual = sut.DisplayLevel;

            expect(actual).toEqual("");
        });
        it("returns propercase value", () => {
            let actual = sut.DisplayLevel;

            expect(actual).toEqual("Expert");
        });
        it("returns propercase value when level already propercase", () => {
            sut.skill.level = "Expert";

            let actual = sut.DisplayLevel;

            expect(actual).toEqual("Expert");
        });
    });

    describe("DisplayYearRange", () => {
        it("returns empty when model is null", () => {
            sut.skill = <Skill><any>null;

            let actual = sut.DisplayYearRange;

            expect(actual).toEqual("");
        });
        it("returns empty when model is null", () => {
            sut.skill = <Skill><any>undefined;

            let actual = sut.DisplayYearRange;

            expect(actual).toEqual("");
        });
        it("returns empty when yearStarted and yearLastUsed are null", () => {
            sut.skill.yearStarted = null;
            sut.skill.yearLastUsed = null;

            let actual = sut.DisplayYearRange;

            expect(actual).toEqual("");
        });
        it("returns empty when yearStarted and yearLastUsed are undefined", () => {
            sut.skill.yearStarted = undefined;
            sut.skill.yearLastUsed = undefined;

            let actual = sut.DisplayYearRange;

            expect(actual).toEqual("");
        });
        it("returns range message when yearStarted and yearLastUsed have values", () => {
            let actual = sut.DisplayYearRange;

            expect(actual).toEqual("from " + sut.skill.yearStarted + " to " + sut.skill.yearLastUsed);
        });
        it("returns since message when only yearStarted has a value", () => {
            sut.skill.yearLastUsed = null;

            let actual = sut.DisplayYearRange;

            expect(actual).toEqual("since " + sut.skill.yearStarted);
        });
        it("returns up to message when only yearLastUsed has a value", () => {
            sut.skill.yearStarted = null;

            let actual = sut.DisplayYearRange;

            expect(actual).toEqual("up to " + sut.skill.yearLastUsed);
        });
    });
});