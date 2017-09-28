export interface IComparer {
    IsEquivalent(first: any, second: any): boolean;
}

export class Comparer implements IComparer {
    public IsEquivalent(first: any, second: any) {
        // Check for null/undefined values
        if (!first) {
            if (!second) {
                return true;
            }

            return false;
        }

        if (this.IsPrimitiveType(first)) {
            return first === second;
        }

        // Check array items individually
        if (first.constructor === Array) {
            if (second.constructor !== Array) {
                // One is an array but the other isn't
                return false;
            }

            let firstArray = <Array<any>>first;
            let secondArray = <Array<any>>second;

            if (firstArray.length !== secondArray.length) {
                return false;
            }
            
            for (let index = 0; index < firstArray.length; index++) {
                let firstItem = firstArray[index];
                let secondItem = secondArray[index];

                if (this.IsEquivalent(firstItem, secondItem) === false) {
                    return false;
                }
            }

            return true;
        }

        let firstProperties = Object.getOwnPropertyNames(first);
        let secondProperties = Object.getOwnPropertyNames(second);

        // If number of properties is different,
        // objects are not equivalent
        if (firstProperties.length !== secondProperties.length) {
            return false;
        }

        for (let i = 0; i < firstProperties.length; i++) {
            let propName = firstProperties[i];
            let secondPropertyIndex = secondProperties.indexOf(propName);

            if (secondPropertyIndex === -1) {
                // The second object does not have this property
                return false;
            }

            // If values of same property are not equal,
            // objects are not equivalent
            // Use recursion to check the tree
            if (this.IsEquivalent(first[propName], second[propName]) === false) {
                return false;
            }
        }

        // If we made it this far, objects
        // are considered equivalent
        return true;
    }

    private IsPrimitiveType(source: any): boolean {
        if (typeof source === "string") {
            return true;
        }
        
        if (typeof source === "number") {
            return true;
        }
        
        if (typeof source === "boolean") {
            return true;
        }

        if (source instanceof Date) {
            return true;
        }
        
        return false;
    }

}