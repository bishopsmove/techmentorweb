import { Vue, Component, Prop } from "vue-property-decorator";
import ProfileResult from "../../services/api/profileResult";

@Component
export default class ProfilePreview extends Vue {
    
    @Prop()
    profile: ProfileResult;
}