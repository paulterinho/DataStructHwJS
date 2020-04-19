namespace com.walterp.datastruct.four{

    class SubArrayInfo{
        /**
         * @param arr
         * @param low
         * @param high
         * @param sum
         */
        constructor(  arr, low:number, high:number, sum:number ){

        }
    }

    const
        /**
         * Summs up the segment of an array as defined by the "low" and "high" indices.
         *
         * @param {Array} arr       The array of deltas we wish to inspect
         * @param {int} low         The starting index of the array segment we wish to inspect.
         * @param {int} high        The ending index of the array segment we wish to inspect.
         */
        maxCrosSubArray = ( arr, low, middle, high ):SubArrayInfo =>{

            let left_sum:number = Number.MIN_SAFE_INTEGER,
                right_sum:number =  Number.MIN_SAFE_INTEGER,
                sum:number = 0,
                max_left:number = 0;

            for (let i = middle; i>-1; i--){

                sum = sum + arr[i];

                if(sum > left_sum){
                    left_sum = sum;
                    max_left = i;
                }
            }

            for (let j = middle + 1; j < high + 1; j++){

                sum = sum + arr[j];

                if(sum > left_sum){
                    right_sum = sum;
                    max_left = j;
                }
            }


            // return .max-left; max-right; left-sum + right-sum/
            return new SubArrayInfo( arr, max_left, max_right, (left_sum + right_sum) );

        },
        /**
         * This method will chunk up the sub arrays, find the greatest sum, and then return that answer.
         *
         * @param {Array}   arr       The array of deltas we wish to inspect
         * @param {int}     low       The starting index of the array segment we wish to inspect.
         * @param {int}     high      The ending index of the array segment we wish to inspect.
         *
         * @return {SubArrayInfo}
         */
        maxSubArray = ( arr, low, high ): SubArrayInfo =>{

            // base case
            if ( l = h ){
                return new SubArrayInfo( l, h, arr[l] );
            }

            // recursive case
            const 	middle:Number = ( (low + high) / 2 ),
                left:SubArrayInfo  = maxSubArray(arr, low, middle),
                right:SubArrayInfo = maxSubArray(arr, middle + 1, high),
                cross:SubArrayInfo = maxCrosSubArray( arr, low, middle, high );

            // Return the greatest sum.
            if( ( left.sum >= right.sum ) && ( left.sum >= cross.sum ) ){
                return new SubArrayInfo( l, h, arr[l] );
            }

            /*
             * if left-sum 􏰃 right-sum and left-sum 􏰃 cross-sum
             return .left-low; left-high; left-sum/
             elseif right-sum 􏰃 left-sum and right-sum 􏰃 cross-sum
             return .right-low; right-high; right-sum/ else return .cross-low; cross-high; cross-sum/
             */

        },
        arr = [-2, -5, 6, -2, -3, 1, 5, -6];


    maxSubArray(arr, 0, arr.length -1 );

    export { maxSubArray };
    export { SubArrayInfo };
}



