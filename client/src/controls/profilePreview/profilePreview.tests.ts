import ProfilePreview from "./profilePreview";
import { ProfileResult } from "../../services/api/profileService";

describe("ProfilePreview", () => {
    let profile: ProfileResult;
    let sut: ProfilePreview;

    beforeEach(() => {
        profile = <ProfileResult>{
            birthYear: 1900
        };
    
        sut = new ProfilePreview();

        sut.profile = profile;
    });

    describe("Age", () => {
        it("returns empty when profile is null", () => {
            sut.profile = <ProfileResult><any>null;

            const actual = sut.Age;

            expect(actual).toEqual("");
        });
        it("returns empty when profile is undefined", () => {
            sut.profile = <ProfileResult><any>undefined;

            const actual = sut.Age;

            expect(actual).toEqual("");
        });
        it("returns empty when birthYear is null", () => {
            profile.birthYear = null;

            const actual = sut.Age;

            expect(actual).toEqual("");
        });
        it("returns empty when birthYear is undefined", () => {
            profile.birthYear = <number><any>undefined;

            const actual = sut.Age;

            expect(actual).toEqual("");
        });
        it("returns age based on current year", () => {
            let currentYear = new Date().getFullYear();
            let difference = currentYear - <number>sut.profile.birthYear;

            const actual = sut.Age;

            expect(actual).toEqual(difference.toLocaleString());
        });
    })
});
