import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
import { ProfileResult } from "../../services/api/profileService";

@Component
export default class ProfilePreview extends Vue {
    
    @Prop()
    profile: ProfileResult
    
    public get Age() : string {
        if (!this.profile) {
            return "";
        }

        if (!this.profile.birthYear) {
            return "";
        }

        let currentYear = new Date().getFullYear();
        let value = currentYear - this.profile.birthYear;

        return value.toLocaleString();
    }

    public get Gender() : string {
        if (!this.profile) {
            return "";
        }

        return this.ToProperCase(this.profile.gender);
    }

    public get Status() : string {
        if (!this.profile) {
            return "";
        }

        return this.ToProperCase(this.profile.status);
    }

    public get YearsInTech() : string {
        if (!this.profile) {
            return "";
        }

        if (!this.profile.yearStartedInTech) {
            return "";
        }

        let currentYear = new Date().getFullYear();
        let value = currentYear - this.profile.yearStartedInTech;

        if (value < 1) {
            value = 1;
        }

        return value.toLocaleString();
    }

    private ToProperCase(value: string | null) : string {
        if (!value) {
            return "";
        }
 
        let first = value[0].toLocaleUpperCase();
        let remainder = value.substr(1).toLocaleLowerCase();

        return first + remainder;
    }
};