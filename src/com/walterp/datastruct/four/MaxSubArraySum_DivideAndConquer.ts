/**
 * Simple class to keep track of the array segment, and where it was found.
 */
export class SubArrayInfo {

    readonly origArray: number [];
    readonly low: number;
    readonly high: number;
    readonly sum: number;

    /**
     * @param {Array} arr       The array of deltas we wish to inspect
     * @param {int} low         The starting index of the array segment we wish to inspect.
     * @param {int} high        The ending index of the array segment we wish to inspect.
     * @param {int} sum         How much the segment equals.
     */
    constructor(arr: number [], low: number, high: number, sum: number) {
        this.origArray = arr;
        this.low = low;
        this.high = high;
        this.sum = sum;
    }

    /**
     * Get the array whose sum this is associated with.
     * @return {number[]}
     */
    get arraySegment(): number[] {
        return this.origArray.slice(this.low, this.high);
    }
}

/**
 * Summs up the segment of an array as defined by the "low" and "high" indices.
 *
 * @param {Array} arr       The array of deltas we wish to inspect
 * @param {int} low         The starting index of the array segment we wish to inspect.
 * @param {int} high        The ending index of the array segment we wish to inspect.
 */
const maxCrosSubArray = (arr, low, middle, high): SubArrayInfo => {

    let leftSum: number = Number.MIN_SAFE_INTEGER;
    let rightSum: number = Number.MIN_SAFE_INTEGER;
    let sum: number = 0;
    let maxLeft: number = 0;
    let maxRight: number = 0;

    for (let i = middle; i > -1; i--) {

        sum = sum + arr[i];

        if (sum > leftSum) {
            leftSum = sum;
            maxLeft = i;
        }
    }

    for (let j = middle + 1; j < high + 1; j++) {

        sum = sum + arr[j];

        if (sum > leftSum) {
            rightSum = sum;
            maxRight = j;
        }
    }


    // return .max-left; max-right; left-sum + right-sum/
    return new SubArrayInfo(arr, maxLeft, maxRight, (leftSum + rightSum));

}
/**
 * This method will chunk up the sub arrays, find the greatest sum, and then return that answer.
 *
 * @param {Array}   arr       The array of deltas we wish to inspect
 * @param {int}     low       The starting index of the array segment we wish to inspect.
 * @param {int}     high      The ending index of the array segment we wish to inspect.
 *
 * @return {SubArrayInfo}
 */
const maxSubArray = (arr, low, high): SubArrayInfo => {

    // base case
    if (l === h) {
        return new SubArrayInfo(l, h, arr[l]);
    }

    // recursive case
    const middle: number = ( (low + high) / 2 );
    const left: SubArrayInfo = maxSubArray(arr, low, middle);
    const right: SubArrayInfo = maxSubArray(arr, middle + 1, high);
    const cross: SubArrayInfo = maxCrosSubArray(arr, low, middle, high);

    // Return the greatest sum.
    if (( left.sum >= right.sum ) && ( left.sum >= cross.sum )) {
        return new SubArrayInfo(l, h, arr[l]);
    }

    /*
     * if left-sum 􏰃 right-sum and left-sum 􏰃 cross-sum
     return .left-low; left-high; left-sum/
     elseif right-sum 􏰃 left-sum and right-sum 􏰃 cross-sum
     return .right-low; right-high; right-sum/ else return .cross-low; cross-high; cross-sum/
     */

}

const startingArray = [-2, -5, 6, -2, -3, 1, 5, -6];


maxSubArray(startingArray, 0, arr.length - 1);

export {maxSubArray};




