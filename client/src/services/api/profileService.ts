import { IHttp, Http } from "../http";

export class SkillLevel {
    public static Hobbyist = "hobbyist";
    public static Beginner = "beginner";
    public static Intermediate = "intermediate";
    public static Expert = "expert";
    public static Master = "master";
};

export class Skill {
    level: string;
    name: string;
    yearLastUsed: number | null;
    yearStarted: number | null;

    public constructor(skill?: Skill) {
        if (skill) {
            // This is a copy constructor
            this.level = skill.level;
            this.name = skill.name;
            this.yearLastUsed = skill.yearLastUsed;
            this.yearStarted = skill.yearStarted;
        } else {
            // Add default values so that properties exist for binding in the UI
            this.level = <string><any>null;
            this.name = <string><any>null;
            this.yearLastUsed = null;
            this.yearStarted = null;
        }
    }
};

export class ProfileStatus
{
    public static Hidden: string = "hidden";
    public static Unavailable: string = "unavailable";
    public static Available: string = "available";
};

export class UserProfile {    
    public bannedAt: Date | null;
    public id: string;
    public about: string | null;
    public birthYear: number | null;
    public email: string;
    public firstName: string;
    public gender: string | null;
    public gitHubUsername: string | null;
    public languages: Array<string>;
    public lastName: string;
    public timeZone: string | null;
    public skills: Array<Skill>;
    public status: string;
    public twitterUsername: string | null;
    public website: string | null;
    public yearStartedInTech: number | null;

    public constructor(profile: UserProfile | null = null) {
        if (profile) {
            // This is a copy constructor
            this.bannedAt = profile.bannedAt;
            this.id = profile.id;
            this.about = profile.about;
            this.birthYear = profile.birthYear;
            this.email = profile.email;
            this.firstName = profile.firstName;
            this.gender = profile.gender;
            this.gitHubUsername = profile.gitHubUsername;
            this.languages = profile.languages || new Array<string>();
            this.lastName = profile.lastName;
            this.timeZone = profile.timeZone;

            this.skills = new Array<Skill>();

            if (profile.skills) {
                let sourceSkills = <Array<Skill>>profile.skills;
                
                sourceSkills.forEach(element => {
                    let skill = new Skill(element);
                    
                    this.skills.push(skill);
                });
            }

            this.status = profile.status;
            this.twitterUsername = profile.twitterUsername;
            this.website = profile.website;
            this.yearStartedInTech = profile.yearStartedInTech;
        }
        else {
            this.status = ProfileStatus.Hidden;
            this.languages = new Array<string>();
            this.skills = new Array<Skill>();
        }
    }
};

export interface IProfileService {
    getAccountProfile(): Promise<UserProfile>;
    updateAccountProfile(profile: UserProfile): Promise<void>;
}

export class ProfileService implements IProfileService {
    public constructor(private http: IHttp = new Http()) {
    }

    public getAccountProfile(): Promise<UserProfile> {
        let uri: string = "profile/";

        return this.http.get<UserProfile>(uri);
    }

    public updateAccountProfile(profile: UserProfile): Promise<void> {
        let uri: string = "profile/";

        return this.http.put<UserProfile, void>(uri, profile);
    }
};