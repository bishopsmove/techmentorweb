import Component from "vue-class-component";
import VueComponent from "vue";
import { Config } from "../../services/config/config";

@Component
export default class Dev extends VueComponent {

    private config: Config = new Config();

    public constructor() {
        super();
    }
    
    public get accessToken(): string {
        return this.$store.getters["accessToken"];
    }

    public set accessToken(value: string) {
        this.$store.commit("accessToken", value);
    }

    public get apiUri(): string {
        return this.config.apiUri;
    }

    public set apiUri(value: string) {
        this.config.apiUri = value;
    }

    public get email(): string {
        return this.$store.getters["email"];
    }

    public set email(value: string) {
        this.$store.commit("email", value);
    }

    public get firstName(): string {
        return this.$store.getters["firstName"];
    }

    public set firstName(value: string) {
        this.$store.commit("firstName", value);
    }

    public get idToken(): string {
        return this.$store.getters["idToken"];
    }

    public set idToken(value: string) {
        this.$store.commit("idToken", value);
    }

    public get isAdministrator(): boolean {
        return <boolean>this.$store.getters["isAdministrator"];
    }

    public set isAdministrator(value: boolean) {
        this.$store.commit("isAdministrator", value);
    }

    public get lastName(): string {
        return this.$store.getters["lastName"];
    }

    public set lastName(value: string) {
        this.$store.commit("lastName", value);
    }

    public get tokenExpires(): Date {
        return <Date>this.$store.getters["tokenExpires"];
    }

    public set tokenExpires(value: Date) {
        this.$store.commit("tokenExpires", value);
    }
}