import { Component, Watch } from "vue-property-decorator";
import AuthComponent from "../../components/authComponent";
import { IAuthenticationService, AuthenticationService } from "../../services/authentication/authenticationService";
import Failure from "../../services/failure";

@Component
export default class SignIn extends AuthComponent {
    private authenticationService: IAuthenticationService;
    private model: Failure | null = null;

    public constructor() {
        super();

        this.authenticationService = new AuthenticationService();
    }

    public configure(
        authenticationService: IAuthenticationService): void {
        this.authenticationService = authenticationService;
    }

    public mounted(): Promise<void> {
        return this.OnLoad();
    }

    @Watch("$route")
    public OnRouteChanged(): void {
        this.OnLoad();
    }

    public async OnLoad(): Promise<void> {
        try {
            let authenticated = await this.Authenticate();
    
            if (!authenticated) {
                return;
            }
    
            this.redirect();   
        }
        catch (failure) {
            // Check Failure.visibleToUser
            if (failure.visibleToUser) {
                this.model = <Failure>failure;
            } else {
                throw failure;
            }
        }     
    }

    private redirect(): void {
        let redirectUri = this.getRedirectUri();

        if (!redirectUri) {
            this.$router.replace({ name: "accountProfile" });

            return;
        }

        // Ensure that the redirect uri is not rooted
        let parsedUri = redirectUri.replace(/^(ht|f)tp(s)?:\/\/[^\/]+/i, "");

        this.$router.replace(parsedUri);
    }

    public async Authenticate(): Promise<Boolean> {
        if (this.IsAuthenticated
            && !this.SessionExpired) {
            // The user already has an auth session
            return true;
        }
        else if (this.authenticationService.IsAuthResponse()) {
            // The user does not yet have an auth session
            let response = await this.authenticationService.ProcessAuthResponse();

            // Store session context
            this.$store.commit("accessToken", response.accessToken);
            this.$store.commit("email", response.email);
            this.$store.commit("firstName", response.firstName);
            this.$store.commit("idToken", response.idToken);
            this.$store.commit("isAdministrator", response.isAdministrator);
            this.$store.commit("lastName", response.lastName);
            this.$store.commit("tokenExpires", response.tokenExpires);
            
            return true;
        }
        else {
            // The user does not yet have an auth session
            let redirectUri = this.getRedirectUri();

            this.authenticationService.Authenticate(redirectUri);
            
            // We are redirecting to authenticate
            return false;
        }
    }

    private getRedirectUri (): string {
        let uri = this.$route.query.redirectUri;

        if (uri) {
            return uri;
        }

        return this.getHomeUri();
    }

    private getHomeUri(): string {
        let currentRoute = this.$router.currentRoute;
        let location = <any>{
            name: "home"
        };
        let targetRoute = this.$router.resolve(location, currentRoute);

        return targetRoute.href;
    }
}