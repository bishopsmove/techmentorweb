import store from "store";
import StoreData from "../dataStore/storeData";

export interface IDataStore {
    accessToken: string;
    email: string;
    firstName: string;
    idToken: string;
    isAdministrator: boolean;
    lastName: string;
    tokenExpires: number;
}

export class DataStore implements IDataStore {
    
    // This cannot be a setter because changes to vuex data must be done via Component.$state.commit()    
    public get accessToken(): string {
        let options = <StoreData>store.get("vuex");

        if (!options) {
            return "";
        }

        return options.accessToken;
    }
    
    public get email(): string {
        let options = <StoreData>store.get("vuex");

        if (!options) {
            return "";
        }

        return options.email;
    }
    
    public get firstName(): string {
        let options = <StoreData>store.get("vuex");

        if (!options) {
            return "";
        }

        return options.firstName;
    }
    
    public get isAdministrator(): boolean {
        let options = <StoreData>store.get("vuex");

        if (!options) {
            return false;
        }

        return options.isAdministrator;
    }
    
    public get idToken(): string {
        let options = <StoreData>store.get("vuex");

        if (!options) {
            return "";
        }

        return options.idToken;
    }
    
    public get lastName(): string {
        let options = <StoreData>store.get("vuex");

        if (!options) {
            return "";
        }

        return options.lastName;
    }
    
    public get tokenExpires(): number {
        let options = <StoreData>store.get("vuex");

        if (!options) {            
            // There are no options so we will return a value that would represent epoch
            return 0;
        }

        // vuex seems to store values as strings so we need to convert it again even though TypeScript thinks the type is correct
        let storedValue = <number><any>options.tokenExpires;
        
        return storedValue;
    }
}