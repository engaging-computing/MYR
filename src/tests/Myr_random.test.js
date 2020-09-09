import Myr from "../myr/Myr";

const myr = new Myr();

describe("Random Function Tests", () => {
    
    //randomInt
    it("default randomInt value is an integer" , () => {
        for(let i = 0; i < 20; i++) {
            let rand = myr.randomInt();
            expect(Number.isInteger(rand));
        }
    });

    it("preset randomInt value is an integer" , () => {
        for(let i = 0; i < 20; i++) {
            let rand = myr.randomInt(0, 20);
            expect(Number.isInteger(rand));
        }
    });   
    
    it("randomInt value should be within default range", () => {
        let rand = myr.randomInt();
        expect(Boolean(rand >= -40 && rand < 40)).toBeTruthy();
    });

    it("randomInt value should be within preset range", () => {
        let rand = myr.randomInt(15, 20);
        expect(Boolean(rand >= 15 && rand < 20)).toBeTruthy();
    });

    it("inverted random values should be swapped and within range", () => {
        let rand = myr.randomInt(20, 15);
        expect(Boolean(rand >= 15 && rand < 20)).toBeTruthy();
    });

    it("random number should equal 5", () => {
        let rand = myr.randomInt(5,5);
        expect(rand).toEqual(5);
    });

    //random
    it("default random value is not an integer" , () => {
        for(let i = 0; i < 20; i++) {
            let rand = myr.random();
            expect(!Number.isInteger(rand));
        }
    });

    it("preset random value is not an integer" , () => {
        for(let i = 0; i < 20; i++) {
            let rand = myr.random(0, 20);
            expect(!Number.isInteger(rand));
        }
    });   

    it("random number should be within default range", () => {
        let rand = myr.random();
        expect(Boolean(rand >= -40 && rand < 40)).toBeTruthy();
    });

    it("random number should be within preset range", () => {
        let rand = myr.random(15, 20);
        expect(Boolean(rand >= 15 && rand < 20)).toBeTruthy();
    });

    it("inverted random values should be swapped and within range", () => {
        let rand = myr.random(20, 15);
        expect(Boolean(rand >= 15 && rand < 20)).toBeTruthy();
    });

    //seeding
    it("setSeed should set seed to a default value", () => {
        myr.setSeed();
        expect(myr.rand.seed).not.toEqual(undefined);
    });

    it("setSeed should set seed to given seed", () => {
        myr.setSeed(5);
        expect(myr.rand.seed).toEqual(5);
    });

    it("empty and zero setSeed input should replace seed", () => {
        myr.setSeed(5);
        myr.setSeed();
        expect(myr.rand.seed).not.toEqual(5);
        myr.setSeed(4);
        myr.setSeed(0);
        expect(myr.rand.seed).not.toEqual(4);
    });    

    it("invalid setSeed input should not replace seed", () => {
        myr.setSeed(5);
        myr.setSeed(-4);
        myr.setSeed("failure");
        myr.setSeed({"name":"Json"});
        expect(myr.rand.seed).toEqual(5);
    });
    
    it("getSeed should return correct seed value", () => {
        myr.setSeed(12);
        expect(myr.getSeed()).toEqual(12);
    });

    //counter 
    it("counter should increment to 1", () => {
        myr.setSeed();
        myr.randomInt();
        expect(myr.rand.randCounter).toEqual(1);
    });

    it("setSeedCounter should set the seed to 12", () => {
        myr.setSeedCounter(12);
        expect(myr.rand.randCounter).toEqual(12);
    });

    it("getSeedCounter should return correct counter value", () => {
        myr.setSeedCounter(12);
        expect(myr.getSeedCounter()).toEqual(12);
    });

    it("decrementRandCounter should decrement randCounter back to 0", () => {
        myr.setSeed();
        myr.randomInt();
        myr.randomInt();
        myr.decrementRandCounter();
        myr.decrementRandCounter();
        expect(myr.rand.randCounter).toEqual(0);
    });

    it("should return the same 'random' number after incrementing and decrementing counter value", () => {
        myr.setSeed();
        let first = myr.randomInt();
        myr.randomInt();
        myr.decrementRandCounter();
        myr.decrementRandCounter();
        let second = myr.randomInt();
        expect(first).toEqual(second);
    });
});
