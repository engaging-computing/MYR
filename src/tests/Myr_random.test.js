import Myr from "../myr/Myr";

const myr = new Myr();

describe("Random Function Tests", () => {
    
    //randomInt
    it("randomInt value should be within default range", () => {
        const rand = myr.randomInt();
        let within;

        within = Boolean(rand >= -40 && rand < 40);

        expect(within).toBeTruthy();
    });

    it("randomInt value should be within preset range", () => {
        let within;
        const rand = myr.randomInt(15, 20);

        within = Boolean(rand >= 15 && rand < 20);

        expect(within).toBeTruthy();
    });

    it("inverted random values should be swapped and within range", () => {
        let within; 
        const rand = myr.randomInt(20, 15);
        
        within = Boolean(rand >= 15 && rand < 20);
        
        expect(within).toBeTruthy();
    });

    it("random number should equal 5", () => {
        const rand = myr.randomInt(5,5);
        expect(rand).toEqual(5);
    });

    //random
    it("random number should be within default range", () => {
        const rand = myr.random();
        let within;

        within = Boolean(rand >= -40 && rand < 40);

        expect(within).toBeTruthy();
    });

    it("random number should be within preset range", () => {
        const rand = myr.random(15, 20);
        let within;

        within = Boolean(rand >= 15 && rand < 20);

        expect(within).toBeTruthy();
    });

    it("inverted random values should be swapped and within range", () => {
        let within;
        const rand = myr.random(20, 15);
        within = Boolean(rand >= 15 && rand < 20);
        
        expect(within).toBeTruthy();
    });

    it("random number should equal 5", () => {
        const rand = myr.random(5,5);
        expect(rand).toEqual(5);
    });

    //seeding
    it("setSeed should set seed to a default value", () => {
        myr.setSeed();
        expect(myr.rand.seed).not.toEqual(0);
    });

    it("setSeed should set seed to given seed", () => {
        myr.setSeed(5);
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
        const first = myr.randomInt();
        myr.randomInt();
        myr.decrementRandCounter();
        myr.decrementRandCounter();
        const second = myr.randomInt();
        expect(first).toEqual(second);
    });
});
