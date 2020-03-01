import Myr from "../myr/Myr";

const myr = new Myr();

describe("Random Function Tests", () => {
    
    //randomInt
    it("randomInt should move box to random x coordinate", () => {
        let xPos = myr.randomInt();
        myr.setPosition(xPos, 1, 1);
        expect(myr.cursor.position).toEqual({ x: xPos, y: 1, z: 1 });
    });

    it("randomInt value should be within default range", () => {
        let within = 0, xPos = myr.randomInt();
        xPos = myr.randomInt();
        myr.setPosition(1, 1, xPos);
        if(xPos >= -40 && xPos < 40) {
            within = 1;
        }
        expect(within).toEqual(1);
    });

    it("random value should be within preset range", () => {
        let within = 0, xPos = myr.random(15, 20);
        xPos = Math.floor(xPos);
        myr.setPosition(1, 1, xPos);
        if(xPos >= 15 && xPos < 20){
            within = 1;
        }
        expect(within).toEqual(1);
    });

    //random
    it("random should move box to random z coordinate", () => {
        let zPos = myr.random();
        zPos = Math.floor(zPos);
        myr.setPosition(1, 1, zPos);
        expect(myr.cursor.position).toEqual({ x: 1, y: 1, z: zPos });
    });

    it("random number should be within default range", () => {
        let within = 0, zPos = myr.random();
        zPos = Math.floor(zPos);
        myr.setPosition(1, 1, zPos);
        if(zPos >= -40 && zPos < 40) {
            within = 1;
        }
        expect(within).toEqual(1);
    });

    it("random number should be within preset range", () => {
        let within = 0, zPos = myr.random(15, 20);
        zPos = Math.floor(zPos);
        myr.setPosition(1, 1, zPos);
        if(zPos >= 15 && zPos < 20) {
            within = 1;
        }
        expect(within).toEqual(1);
    });

    it("inverted random values should be swapped and within range", () => {
        let within = 0, zPos = myr.random(20, 15);
        zPos = Math.floor(zPos);
        myr.setPosition(1, 1, zPos);
        if(zPos >= 15 && zPos < 20) {
            within = 1;
        }
        expect(within).toEqual(1);
    });

    it("random number should equal 0", () => {
        let zPos = myr.random(5,5);
        expect(zPos).toEqual(5);
    });

    //seeding
    it("getSeedCounter should return correct seed value", () => {
        myr.setSeed();
        let seed = myr.getSeed();
        expect(myr.rand.seed).toEqual(seed);
    });

    it("setSeed should set seed to given seed", () => {
        myr.setSeed(5);
        expect(myr.rand.seed).toEqual(5);
    });

    it("getSeed should return correct seed", () => {
        myr.setSeed();
        let seed = myr.getSeed();
        expect(myr.rand.seed).toEqual(seed);
    });
    
    //counter 
    it("counter should increment to 1", () => {
        myr.setSeed();
        myr.randomInt();
        expect(myr.rand.randCounter).toEqual(1);
    });

    it("getSeedCounter should return correct counter value", () => {
        myr.setSeedCounter(12);
        expect(myr.rand.randCounter).toEqual(12);
    });

    it("decrementRandCounter should decrement randCounter back to 0", () => {
        myr.setSeed();
        myr.randomInt();
        myr.randomInt();
        myr.decrementRandCounter();
        myr.decrementRandCounter();
        expect(myr.rand.randCounter).toEqual(0);
    });

    it("should return the same 'random' number", () => {
        myr.setSeed();
        let first = myr.randomInt();
        myr.randomInt();
        myr.decrementRandCounter();
        myr.decrementRandCounter();
        let second = myr.randomInt();
        expect(first).toEqual(second);
    });
});
