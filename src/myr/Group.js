/** Class representing a Group in MYR */
class Group {
    /**
     * Instantiate a new Group class
     * 
     * @param {Myr} originalMyr MYR instance
     * @param {string} id ID assigned for this Group
     */
    constructor(originalMyr, id) {
        this.els = [];
        this.entity = true;
        this.myr = originalMyr;
        this.id = id;
    }

    /**
     * Add new MYR entity to the Group
     * 
     * @param {(Group|string)} id Instance of Group or ID of MYR entity
     */
    add = (id) => {
        if (id instanceof Group) {
            this.els.push(this.myr.transfer(id.id));
        }
        this.els.push(this.myr.transfer(id));
    }

    /**
     * Remove MYR entity from the Group
     * 
     * @param {(Group|string)} id Instance of Group or ID of MYR entity
     */
    remove = (id) => {
        if (id instanceof Group) {
            id = id.id;
        }
        let index = this.getIndex(id);
        let el = this.els[index];
        delete this.els[index];
        this.myr.els.push(el);
    }

    /**
     * Retrieve specific MYR entity in the Group
     * 
     * @param {string} outerElId - ID of the entity to retrieve 
     * @returns {object} MYR object if found, null other wise
     */
    getEl = (outerElId) => {
        if (outerElId.entity) {
            outerElId = outerElId.id;
        }
        return this.els[outerElId];
    }

    /**
     * Retrieve the index of specific MYR entity in the Group
     * 
     * @param {string} outerElId - ID of the object to retrieve 
     * @returns {number} - Index of the array if found, null otherwise.
     */
    getIndex = (outerElId) => {
        for (let i in this.els) {
            if (this.els[i].id === outerElId) {
                return i;
            }
        }
        return null;
    }

    /**
     * Sets the x, y, and z position of the Group 
     * 
     * @param {number} x New x position
     * @param {number} y New y position
     * @param {number} z New z position
     */
    setPosition = (x = 0, y = 1, z = 0) => {
        let ent = this.myr.getEl(this.id);
        ent.position = {
            x, y, z
        };
        this.myr.els[this.id] = ent;
    }

    /**
     * Sets the x, y, and z scale of the Group 
     * 
     * @param {number} x New x scale
     * @param {number} y New y scale
     * @param {number} z New z scale
     */
    setScale = (x = 1, y = 1, z = 1) => {
        let ent = this.myr.getEl(this.id);
        ent.scale = {
            x, y, z
        };
        this.myr.els[this.id] = ent;
    }

    /**
     * Sets the x, y, and z rotation of the Group 
     * 
     * @param {number} x New x rotation
     * @param {number} y New y rotation
     * @param {number} z New z rotation
     */
    setRotation = (x = 0, y = 0, z = 0) => {
        let ent = this.myr.getEl(this.id);
        ent.rotation = {
            x, y, z
        };
        this.myr.els[this.id] = ent;
    }

    /**
     * Return an object with elements of the Group
     * @returns {object} Flag indicates it's a Group and elements
     */
    entObj = () => {
        return {
            group: true,
            els: this.els
        };
    }
}

export default Group;
