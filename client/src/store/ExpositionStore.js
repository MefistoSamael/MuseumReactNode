import {makeAutoObservable} from 'mobx'
export default class ExpositionStore {
    constructor() {
        this._expositions = [{id:1, name: "awesome exposition", themeId: "3"},
            {id:2, name: "brilliant exposition", themeId: "4"}];

        this._themes = [{id:3, name: "awesome theme"},
            {id:4, name: "brilliant theme"}]
        makeAutoObservable(this);
    }

    setExpositions(expositions) {
        this._expositions = expositions;
    }

    setThemes(themes) {
        this._themes = themes;
    }

    get Expositions(){
        return this._expositions;
    }

    get Themes() {
        return this._themes;
    }
}