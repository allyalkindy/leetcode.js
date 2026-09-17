const containDuplicate = (nums)=>{
    let seen = {}

    for(let i = 0 ; i< nums.length ;i++){
        if(seen.hasOwnProperty(nums[i])) return true; 
        seen[nums[i]] = i ;
        
    }

    return false ;
}


console.log(containDuplicate([1,2,3,1]))