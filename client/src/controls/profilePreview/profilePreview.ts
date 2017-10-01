import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
import { ProfileResult } from "../../services/api/profileService";

@Component
export default class ProfilePreview extends Vue {
    
    @Prop()
    profile: ProfileResult
    
    public get DisplayGender() : string {
        if (!this.profile) {
            return "";
        }

        return this.ToProperCase(this.profile.gender);
    }

    public get DisplayStatus() : string {
        if (!this.profile) {
            return "";
        }

        return this.ToProperCase(this.profile.status);
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