import Component from "vue-class-component";
import Vue from "vue";
import { Skill } from "../../services/api/profileService";

@Component
export default class SkillDetails extends Vue {
    private _model: Skill = new Skill();

    public DisplayLevel() : string {
        if (!this.model.level) {
            return "";
        }
 
        let first = this.model.level[0].toLocaleUpperCase();
        let remainder = this.model.level.substr(1).toLocaleLowerCase();

        return first + remainder;
    }

    public DisplayYearRange(): string {
        if (!this.model.yearStarted) {
            if (this.model.yearLastUsed) {
                return "up to " + this.model.yearLastUsed;
            }

            // Both year values are not supplied
            return "";
        }

        // We have a year started
        if (this.model.yearLastUsed) {
            // We have a value for both years
            return "from " + this.model.yearStarted + " to " + this.model.yearLastUsed;
        }

        return "since " + this.model.yearStarted
    }
    
    get model(): Skill {
        return this._model;
    }
    set model(model: Skill) {
        this._model = model;
    }
};