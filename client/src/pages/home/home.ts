import Component from "vue-class-component";
import Vue from "vue";
import { ICategoriesService, CategoriesService, Category, CategoryGroup } from "../../services/api/categoriesService";

@Component
export default class Home extends Vue {
    private categoriesService: ICategoriesService
    
    // Properties for view binding
    private loadingLists: boolean = true;
    private genders: Array<string> = new Array<string>();
    private languages: Array<string> = new Array<string>();
    private skills: Array<string> = new Array<string>();
    private selectedGenders: Array<string> = new Array<string>();
    private selectedLanguages: Array<string> = new Array<string>();
    private selectedSkills: Array<string> = new Array<string>();

    public constructor() {
        super();
        
        this.categoriesService = new CategoriesService();
    }
    
    public configure(categoriesService: ICategoriesService) {
        this.categoriesService = categoriesService;
    }

    public mounted(): Promise<void> {
        return this.OnLoad();
    }

    public async OnLoad(): Promise<void> {
        let categories = await this.loadCategories();

        this.genders = categories
            .filter((item: Category) => {
                return item.group === CategoryGroup.Gender;
            }).map((item: Category) => {
                return item.name;
            });
        
        this.languages = categories
            .filter((item: Category) => {
                return item.group === CategoryGroup.Language;
            }).map((item: Category) => {
                return item.name;
            });

        this.skills = categories
            .filter((item: Category) => {
                return item.group === CategoryGroup.Skill;
            }).map((item: Category) => {
                return item.name;
            });
            
        this.loadingLists = false;
    }

    public async OnSearch(): Promise<void> {
        // Build up the search
        this.selectedSkills.forEach(element => {
            console.log(element);
        });
        this.selectedLanguages.forEach(element => {
            console.log(element);
        });
        this.selectedGenders.forEach(element => {
            console.log(element);
        });
    }

    public get FiltersSelected(): boolean {
        if (this.selectedSkills.length > 0) {
            return true;
        }
        
        if (this.selectedLanguages.length > 0) {
            return true;
        }

        if (this.selectedGenders.length > 0) {
            return true;
        }

        return false;
    }

    private async loadCategories(): Promise<Array<Category>> {
        let categories = await this.categoriesService.getCategories();

        // Filter out categories without links and then sort by case insensitive group, then name
        let availableCategories = categories.filter((item: Category) => {
            return item.linkCount > 0;
        }).sort((a: Category, b: Category) => {
            let firstGroup = a.group.toLocaleLowerCase();
            let secondGroup = b.group.toLocaleLowerCase();

            if (firstGroup < secondGroup) {
                return -1;
            }
            
            if (firstGroup > secondGroup) {
                return 1;
            }
            
            let firstName = a.name.toLocaleLowerCase();
            let secondName = b.name.toLocaleLowerCase();

            if (firstName < secondName) {
                return -1;
            }

            if (firstName > secondName) {
                return 1;
            }

            return 0;
        });

        return availableCategories;
    }
};