const topKFrequent = (nums,k) =>{

let elementsCounts = {}

for(let i = 0 ; i<nums.length ; i++){
    elementsCounts[nums[i]] = (elementsCounts[nums[i]] || 0) + 1 ;
}

const frequents = [] ;
const buckets = [] ;



for(key in elementsCounts){
   const frequency = elementsCounts[key] ;

   if(!buckets[frequency]){
    buckets[frequency] = [] ;
   } 
   buckets[frequency].push(Number(key)) ;

}

for(let i=buckets.length-1; i>=0 && frequents.length < k  ; i--){

    if(buckets[i]){
    frequents.push(...buckets[i]) ;
    }

}

 return frequents.slice(0,k);

}

console.log(topKFrequent([1,2,1,2,1,2,3,1,3,2,4,5,5],3))