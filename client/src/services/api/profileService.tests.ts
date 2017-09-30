import { ProfileService, UserProfile, ProfileStatus, Skill } from "./profileService";
import { IHttp } from "../http";
import { Comparer } from "../../tests/comparer";

const core = require("../../tests/core");

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

describe("UserProfile", () => {
    let source: UserProfile;
    
    beforeEach(function () {
        source = <UserProfile>{
            bannedAt: new Date(),
            id: "someid",
            about: "My profile about information",
            birthYear: 1974,
            email: "here@test.com",
            firstName: "Barry",
            gender: "male",
            gitHubUsername: "barrygoods",
            languages: <Array<string>>["English", "Spanish"],
            lastName: "Goods",
            timeZone: "Australia/Canberra",
            skills: <Array<Skill>>[
                <Skill>{
                    name: "C#",
                    level: "expert",
                    yearStarted: 1991,
                    yearLastUsed: 2014
                }
            ],
            status: "available",
            twitterUsername: "twitgoods",
            website: "https://www.goods.com",
            yearStartedInTech: 1990
        };
    });

    describe("constructor", () => {
        it("sets status to hidden when no profile provided", () => {
            let actual = new UserProfile();

            expect(actual.status).toEqual(ProfileStatus.Hidden);
        });
        it("copies values from source profile", () => {
            let actual = new UserProfile(source);
            let comparer = new Comparer();

            expect(comparer.IsEquivalent(source, actual)).toBeTruthy();
        });
        it("creates empty languages when not provided in source", () => {
            source.languages = <Array<string>><any>null;

            let actual = new UserProfile(source);

            expect(actual.languages).toBeDefined();
            expect((<any>actual.languages).length).toEqual(0);
        });
        it("creates empty skills when not provided in source", () => {
            source.skills = <Array<Skill>><any>null;

            let actual = new UserProfile(source);

            expect(actual.skills).toBeDefined();
            expect((<any>actual.skills).length).toEqual(0);
        });
    });
});

describe("ProfileService", () => {
    let profile: UserProfile;
    let http: IHttp;
    let sut: ProfileService;

    beforeEach(function () {
        profile = <UserProfile>{
            timeZone: "Australia/Canberra",
            email: "here@test.com",
            firstName: "Barry",
            lastName: "Goods"
        };
        http = <IHttp>{
            get: async (resource: string): Promise<UserProfile> => {
                return profile;
            },
            put: async (resource: string, profile: UserProfile): Promise<void> => {
            }
        };

        sut = new ProfileService(http);          
    });

    describe("getAccountProfile", () => {
        it("returns profile from API", core.runAsync(async () => {
            spyOn(http, "get").and.callThrough();

            let actual = await sut.getAccountProfile();

            expect(http.get).toHaveBeenCalledWith("profile/");
            expect(actual).toEqual(profile);
        }));
    });

    describe("updateAccountProfile", () => {
        it("puts profile to API", core.runAsync(async () => {
            spyOn(http, "put").and.callThrough();

            await sut.updateAccountProfile(profile);

            expect(http.put).toHaveBeenCalledWith("profile/", profile);
        }));
    });
});