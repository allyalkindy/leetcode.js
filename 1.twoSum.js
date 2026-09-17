 function twoSum(arr, target) {
 let seen = {

 }


 for(let i=0 ; i<arr.length ; i++){
     const complement = target - arr[i] ;

      if(seen.hasOwnProperty(complement)){
        return [seen[complement],i]
      }

      seen[arr[i]] = i ;
 }

 return undefined ;
}



console.log(twoSum([2,9,3,6,7],25))