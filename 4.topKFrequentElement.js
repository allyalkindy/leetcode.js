const topKFrequent = (nums,k) =>{

let mostFrequent = {}

for(let i = 0 ; i<nums.length ; i++){
    mostFrequent[nums[i]] = (mostFrequent[nums[i]] || 0) + 1 ;
}


const values = Object.values(mostFrequent) ;


return  values ;



}

console.log(topKFrequent([1,1,1,2,2,3],2))