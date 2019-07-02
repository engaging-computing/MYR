class Group {
    constructor(originalMyr, id) {
        this.els = [];
        this.entity = true;
        this.myr = originalMyr;
        this.id = id;
    }

    add = (id) => {
        if (id instanceof Group) {
            this.els.push(this.myr.transfer(id.id));
        }
        this.els.push(this.myr.transfer(id));

    }

    remove = (id) => {
        if (id instanceof Group) {
            id = id.id;
        }
        let index = this.getIndex(id);
        let el = this.els[index];
        delete this.els[index];
        this.myr.els.push(el);
    }

    getEl = (outerElId) => {
        return this.els[outerElId];
    }

    getIndex = (outerElId) => {
        for (let i in this.els) {
            if (this.els[i].id === outerElId) {
                return i;
            }
        }
        return null;
    }

    setPosition = (x = 0, y = 1, z = 0) => {
        let ent = this.myr.getEl(this.id);
        ent.position = {
            x, y, z
        };
        this.myr.els[this.id] = ent;
    }

    setScale = (x = 1, y = 1, z = 1) => {
        let ent = this.myr.getEl(this.id);
        ent.scale = {
            x, y, z
        };
        this.myr.els[this.id] = ent;
    }

    setRotation = (x = 0, y = 0, z = 0) => {
        let ent = this.myr.getEl(this.id);
        ent.rotation = {
            x, y, z
        };
        this.myr.els[this.id] = ent;
    }

    entObj = () => {
        return {
            group: true,
            els: this.els
        };
    }

}

export default Group;
