const twoSum = (nums,target) =>{
  let seen = {} ;

  for(let i = 0 ; i<nums.length ; i++){
     const complement = target - nums[i] ;

     if(seen.hasOwnProperty(complement)) {
       return [seen[complement], i] ;
     }

     seen[nums[i]] = i ;
  }
}



console.log(twoSum([2,9,3,6,7],10))