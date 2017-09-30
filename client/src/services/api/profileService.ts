import { IHttp, Http } from "../http";
import { Skill } from "./skill";

export class CategoryFilter {
    group: string;
    name: string;
};

export class ProfileResult {    
    public id: string;
    public birthYear: number | null;
    public firstName: string;
    public gender: string | null;
    public lastName: string;
    public status: string;
    public timeZone: string | null;
    public yearStartedInTech: number | null;
};

export class Profile extends ProfileResult {    
    public about: string | null;
    public gitHubUsername: string | null;
    public languages: Array<string>;
    public skills: Array<Skill>;
    public twitterUsername: string | null;
    public website: string | null;
};

export interface IProfileService {
    searchProfiles(filters: Array<CategoryFilter>): Promise<Array<ProfileResult>>;
};

export class ProfileService implements IProfileService {
    public constructor(private http: IHttp = new Http()) {

    }

    public async searchProfiles(filters: Array<CategoryFilter>): Promise<Array<ProfileResult>> {
        let uri: string = "profiles/?";

        filters.forEach(element => {
            uri+= encodeURIComponent(element.group) + "=" + encodeURIComponent(element.name) + "&";
        });

        // Remove the trailing &
        uri = uri.substr(0, uri.length - 1);

        return await this.http.get<Array<ProfileResult>>(uri);
    }
}