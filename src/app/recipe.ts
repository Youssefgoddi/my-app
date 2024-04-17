export class Recipe {
    titre: string = "";
    description: string = "";
    preparation: string = "";
    cuisson: string = "";
    portions: string = "";
    comment: string = "";
    kcal: string = "";
    lip: string = "";
    glu: string = "";
    pro: string = "";
    ingredients: string[] = [];
    info: string = "";
    image: string = "";

    constructor(
        titre?: string,
        description?: string,
        preparation?: string,
        cuisson?: string,
        portions?: string,
        comment?: string,
        kcal?: string,
        lip?: string,
        glu?: string,
        pro?: string,
        info?: string,
        image?: string
    ) {
        this.titre = titre || "";
        this.description = description || "";
        this.preparation = preparation || "";
        this.cuisson = cuisson || "";
        this.portions = portions || "";
        this.comment = comment || "";
        this.kcal = kcal || "";
        this.lip = lip || "";
        this.glu = glu || "";
        this.pro = pro || "";
        this.info = info || "";
        this.image = image || "";
    }
}
