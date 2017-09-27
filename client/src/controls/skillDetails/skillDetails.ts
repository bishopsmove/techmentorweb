import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
import { Skill } from "../../services/api/profileService";

@Component
export default class SkillDetails extends Vue {
    
    @Prop()
    skill: Skill
    
    public DisplayName(): string {
        if (!this.skill) {
            return "";
        }

        if (!this.skill.name) {
            return "";
        }

        return this.skill.name;
    }

    public DisplayLevel() : string {
        if (!this.skill) {
            return "";
        }

        if (!this.skill.level) {
            return "";
        }
 
        let first = this.skill.level[0].toLocaleUpperCase();
        let remainder = this.skill.level.substr(1).toLocaleLowerCase();

        return first + remainder;
    }

    public DisplayYearRange(): string {
        if (!this.skill) {
            return "";
        }

        if (!this.skill.yearStarted) {
            if (this.skill.yearLastUsed) {
                return "up to " + this.skill.yearLastUsed;
            }

            // Both year values are not supplied
            return "";
        }

        // We have a year started
        if (this.skill.yearLastUsed) {
            // We have a value for both years
            return "from " + this.skill.yearStarted + " to " + this.skill.yearLastUsed;
        }

        return "since " + this.skill.yearStarted
    }
};