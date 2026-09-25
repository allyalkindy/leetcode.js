const longestConsecutive = (nums)=>{
      const set = new Set(nums) ; 
      let longest = 0 ;

      for(const num of set){
        if(!set.has(num-1)){
            let current = num ; 
            let length = 1 ;

            while(set.has(current + 1)){
                current++ ;
                length++ ;
            }

            longest = Math.max(longest,length) ;
        }
      }

      return longest ;
}


console.log(longestConsecutive([300,4,200,1,3,2]))

